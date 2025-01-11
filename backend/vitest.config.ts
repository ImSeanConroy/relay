import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node', // Use Node.js environment
    coverage: {
      reporter: ['text', 'json', 'html'], // Enable code coverage reports
    },
  },
});