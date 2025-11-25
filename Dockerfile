# Build stage
FROM node:20-slim AS build
WORKDIR /app

# Install build dependencies for better-sqlite3 and native modules
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy package files first for better layer caching
COPY package.json package-lock.json* ./

# Install dependencies with clean install
RUN npm ci --prefer-offline --no-audit

# Rebuild native modules for Alpine Linux
RUN npm rebuild better-sqlite3 --build-from-source

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-slim AS production
WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    dumb-init \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user for security
RUN groupadd -g 1001 nodejs && \
    useradd -r -u 1001 -g nodejs nuxt

# Copy built output from build stage
COPY --from=build --chown=nuxt:nodejs /app/.output /app/.output

# CRITICAL: Copy node_modules (Nuxt Content needs better-sqlite3 binaries)
COPY --from=build --chown=nuxt:nodejs /app/node_modules /app/node_modules

# Copy content folder
COPY --from=build --chown=nuxt:nodejs /app/content /app/content

# Copy package.json for reference
COPY --from=build --chown=nuxt:nodejs /app/package.json /app/package.json

# Switch to non-root user
USER nuxt

# Expose port
EXPOSE 3003

# Environment variables
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3003 \
    NODE_OPTIONS="--max-old-space-size=2048"


# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", ".output/server/index.mjs"]