import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    status: z.enum(['active', 'shipped', 'archived', 'wip']).default('wip'),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    repo: z.url().optional(),
    demo: z.url().optional(),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    devto_url: z.url().optional(),
  }),
});

export const collections = { projects, blog };
