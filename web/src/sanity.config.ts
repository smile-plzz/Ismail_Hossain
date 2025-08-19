import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import schemas from './sanity/schemas';

export default defineConfig({
  name: 'default',
  title: 'Ismail Portfolio',
  projectId: process.env.SANITY_PROJECT_ID || '',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: process.env.SANITY_API_VERSION || '2025-01-01',
  basePath: '/admin',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemas,
  },
});

