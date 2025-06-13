FROM oven/bun:1 AS build 
WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install --ignore-scripts --verbose

COPY . .

RUN bun --bun run build 

FROM oven/bun:1 AS production 
WORKDIR /app

COPY --from=build /app/.output /app

EXPOSE 3003
ENTRYPOINT ["bun","--bun","run","/app/server/index.mjs"]


