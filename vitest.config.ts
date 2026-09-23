import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Browser regressions use Playwright; Vitest covers domain/route contracts.
    exclude: [...configDefaults.exclude, 'e2e/**'],
  },
});
