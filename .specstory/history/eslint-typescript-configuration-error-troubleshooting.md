## SpecStory

## ESLint TypeScript Configuration Error Troubleshooting (2/5/2025, 4:59:01 PM)

_**User**_

why this error might have occured?

---

_**Assistant**_

This error is occurring because of a missing or incorrect TypeScript configuration for ESLint. The specific error message indicates that the custom rule `@nx/workspace-explicit-boolean-predicates-in-if` requires TypeScript parser services, but the parser options aren't properly configured.

Here's what's likely causing the issue:

1. The ESLint TypeScript parser (`@typescript-eslint/parser`) needs to know about your TypeScript configuration
2. The `parserOptions.project` property is missing in your ESLint configuration

To fix this, you'll need to update your ESLint configuration. Here's how you can modify your `.eslintrc.js` (or similar) file:

```javascript:packages/twenty-server/.eslintrc.js
// ... existing code ...
{
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json', // Point to your TypeScript configuration
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
}
// ... existing code ...
```

A few other things to check:

1. Make sure your `tsconfig.json` exists and is valid
2. Verify that all TypeScript-related ESLint dependencies are installed:
   ```bash
   yarn add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
   ```
3. Ensure that the path to your `tsconfig.json` is correct relative to the `.eslintrc.js` file

If you're working in a monorepo (which Twenty is), you might need to ensure that the TypeScript configuration is properly set up for each package that needs it.

---



---

