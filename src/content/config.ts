import { defineCollection, z } from 'astro:content';

// Schema untuk koleksi blog
const blogCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        author: z.string().default('Orion OS Team'),
        image: image().optional(),
        tags: z.array(z.string()).optional(),
    }),
});

// Export collections
export const collections = {
    blog: blogCollection,
};
