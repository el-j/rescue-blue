import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    exclude: [
      'e2e/**',
      '**/node_modules/**',
      '**/dist/**',
    ],
    coverage: {
      provider: 'v8',
      include: [
        'src/**/*.{ts,tsx}',
      ],
      exclude: [
        'src/main.tsx',
        'src/entry-server.tsx',
        'src/vite-env.d.ts',
        'src/components/demo/GermanyMapData.ts',
        'src/test/**',
        'src/__tests__/**',
      ],
      reporter: ['text', 'html', 'lcov'],
      thresholds: {
        lines: 80,
        branches: 75,
      },
    },
  },
})