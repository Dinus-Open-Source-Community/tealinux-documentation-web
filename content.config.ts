import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    documentation: defineCollection({
        type:'page',
        source: 'documentation/**/*.md',
    }),
    content: defineCollection({
      type: 'page',
      source: '**/*.md'
    })
  }
})
