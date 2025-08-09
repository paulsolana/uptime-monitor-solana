# `@turbo/eslint-config`

# Wakey-Wakey ESLint Configuration

A collection of shared ESLint configurations for the Wakey-Wakey monorepo. This package provides consistent linting rules across all applications and packages, ensuring code quality, consistency, and best practices.

## Features

- **Base Configuration**: Core ESLint rules for JavaScript and TypeScript
- **Next.js Configuration**: Specialized rules for Next.js applications
- **React Configuration**: React-specific linting rules and hooks
- **TypeScript Support**: Full TypeScript integration with type-aware rules
- **Prettier Integration**: Seamless integration with Prettier formatting
- **Turbo Integration**: Monorepo-specific rules for Turborepo
- **Performance Optimized**: Fast linting with minimal overhead

## Available Configurations

### Base Configuration (`@repo/eslint-config/base`)

The foundational ESLint configuration that includes:

- **JavaScript Recommended**: ESLint's recommended JavaScript rules
- **TypeScript Recommended**: TypeScript ESLint recommended rules
- **Prettier Integration**: Disables conflicting ESLint rules
- **Turbo Plugin**: Monorepo-specific linting (undeclared env vars)
- **Only Warn Plugin**: Converts errors to warnings for better DX

**Included Rules:**
- `turbo/no-undeclared-env-vars`: Warns about undeclared environment variables
- All TypeScript recommended rules
- All JavaScript recommended rules
- Prettier conflict resolution

**Usage:**
```javascript
// eslint.config.mjs
import { config } from '@repo/eslint-config/base';

export default [
  ...config,
  // Your custom rules here
];
```

### Next.js Configuration (`@repo/eslint-config/next-js`)

Specialized configuration for Next.js applications that extends the base config with:

- **Next.js Plugin**: Official Next.js ESLint rules
- **React Rules**: React-specific linting rules
- **React Hooks Rules**: Rules for React hooks usage
- **Browser Globals**: Browser environment globals

**Additional Rules:**
- All Next.js recommended rules
- React recommended rules
- React hooks rules
- Browser environment support

**Usage:**
```javascript
// eslint.config.mjs (for Next.js apps)
import { config } from '@repo/eslint-config/next-js';

export default [
  ...config,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    // Additional Next.js specific rules
  },
];
```

### React Internal Configuration (`@repo/eslint-config/react-internal`)

Configuration for internal React packages and components:

- **React Rules**: Core React linting rules
- **React Hooks Rules**: Comprehensive hooks linting
- **Component Best Practices**: Rules for component development

**Usage:**
```javascript
// eslint.config.mjs (for React packages)
import { config } from '@repo/eslint-config/react-internal';

export default [
  ...config,
  {
    files: ['**/*.{jsx,tsx}'],
    // Package-specific rules
  },
];
```

## Installation

This package is used internally within the monorepo:

```bash
bun install
```

## Usage in Applications

### Web Application (Next.js)

```javascript
// apps/web/eslint.config.mjs
import { config } from '@repo/eslint-config/next-js';

export default [
  ...config,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // App-specific overrides
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
];
```

### API Application (Node.js)

```javascript
// apps/api/eslint.config.mjs
import { config } from '@repo/eslint-config/base';

export default [
  ...config,
  {
    files: ['**/*.{js,ts}'],
    env: {
      node: true,
    },
    rules: {
      // API-specific rules
      'no-console': 'warn',
    },
  },
];
```

### Hub Application (Node.js)

```javascript
// apps/hub/eslint.config.mjs
import { config } from '@repo/eslint-config/base';

export default [
  ...config,
  {
    files: ['**/*.{js,ts}'],
    env: {
      node: true,
    },
    rules: {
      // Hub-specific rules
      'no-process-exit': 'off',
    },
  },
];
```

### UI Package (React Components)

```javascript
// packages/ui/eslint.config.mjs
import { config } from '@repo/eslint-config/react-internal';

export default [
  ...config,
  {
    files: ['**/*.{jsx,tsx}'],
    rules: {
      // UI component specific rules
      'react/prop-types': 'off', // Using TypeScript
    },
  },
];
```

### Database Package

```javascript
// packages/db/eslint.config.mjs
import { config } from '@repo/eslint-config/base';

export default [
  ...config,
  {
    files: ['**/*.{js,ts}'],
    rules: {
      // Database-specific rules
      'no-console': 'off', // Allow logging in DB operations
    },
  },
];
```

## Rule Categories

### Code Quality Rules

- **no-unused-vars**: Prevents unused variables
- **no-console**: Warns about console statements (configurable)
- **prefer-const**: Enforces const for immutable variables
- **no-var**: Disallows var declarations

### TypeScript Rules

- **@typescript-eslint/no-unused-vars**: TypeScript-aware unused variable detection
- **@typescript-eslint/no-explicit-any**: Discourages use of `any` type
- **@typescript-eslint/prefer-nullish-coalescing**: Prefers nullish coalescing
- **@typescript-eslint/strict-boolean-expressions**: Enforces strict boolean expressions

### React Rules

- **react/jsx-uses-react**: Prevents React being marked as unused
- **react/jsx-uses-vars**: Prevents variables used in JSX being marked as unused
- **react-hooks/rules-of-hooks**: Enforces rules of hooks
- **react-hooks/exhaustive-deps**: Ensures effect dependencies are correct

### Next.js Rules

- **@next/next/no-img-element**: Prefers Next.js Image component
- **@next/next/no-html-link-for-pages**: Prefers Next.js Link component
- **@next/next/no-head-element**: Prefers Next.js Head component

### Turbo Rules

- **turbo/no-undeclared-env-vars**: Ensures environment variables are declared

## Customization

### Adding Custom Rules

```javascript
// eslint.config.mjs
import { config } from '@repo/eslint-config/base';

export default [
  ...config,
  {
    files: ['**/*.{js,ts}'],
    rules: {
      // Custom rules
      'no-console': 'error',
      'prefer-const': 'error',
      // TypeScript specific
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
];
```

### Ignoring Files

```javascript
// eslint.config.mjs
import { config } from '@repo/eslint-config/base';

export default [
  ...config,
  {
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      '*.config.js',
    ],
  },
];
```

### Environment-Specific Configuration

```javascript
// eslint.config.mjs
import { config } from '@repo/eslint-config/base';

export default [
  ...config,
  {
    files: ['**/*.test.{js,ts}'],
    env: {
      jest: true,
    },
    rules: {
      // Test-specific rules
      'no-console': 'off',
    },
  },
];
```

## Integration with Development Tools

### VS Code Integration

Add to your VS Code settings:

```json
{
  "eslint.workingDirectories": ["apps/*", "packages/*"],
  "eslint.format.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Pre-commit Hooks

```json
// package.json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

### CI/CD Integration

```yaml
# .github/workflows/lint.yml
name: Lint
on: [push, pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run lint
```

## Performance Optimization

### Caching

ESLint automatically caches results. To clear cache:

```bash
# Clear ESLint cache
rm -rf .eslintcache

# Or use the flag
eslint --cache-location .eslintcache
```

### Parallel Linting

For large codebases, use parallel processing:

```bash
# Lint with maximum CPU cores
eslint --max-warnings 0 --ext .js,.jsx,.ts,.tsx .
```

## Troubleshooting

### Common Issues

#### "Cannot resolve configuration"

```bash
# Ensure the package is installed
bun install @repo/eslint-config

# Check import path
import { config } from '@repo/eslint-config/base';
```

#### "Parsing error"

```javascript
// Ensure TypeScript parser is configured
export default [
  ...config,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
];
```

#### "Rule not found"

```bash
# Install missing plugin
bun add -D eslint-plugin-react

# Or check if rule name is correct
```

### Debug Mode

```bash
# Run ESLint in debug mode
DEBUG=eslint:* eslint .

# Check configuration
eslint --print-config file.js
```

## Development

### Adding New Configurations

1. Create a new configuration file:

```javascript
// new-config.js
import { config as baseConfig } from './base.js';
import somePlugin from 'eslint-plugin-some-plugin';

export const config = [
  ...baseConfig,
  {
    plugins: {
      'some-plugin': somePlugin,
    },
    rules: {
      'some-plugin/some-rule': 'error',
    },
  },
];
```

2. Add to package.json exports:

```json
{
  "exports": {
    "./base": "./base.js",
    "./next-js": "./next.js",
    "./react-internal": "./react-internal.js",
    "./new-config": "./new-config.js"
  }
}
```

3. Update documentation and tests.

### Testing Configurations

```bash
# Test configuration on sample files
eslint --config ./base.js test-files/

# Validate configuration
eslint --print-config test-file.js
```

## Best Practices

### Configuration Management

- **Extend, Don't Override**: Build upon base configurations
- **Consistent Rules**: Maintain consistency across packages
- **Document Changes**: Document any rule modifications
- **Test Thoroughly**: Test configurations before deployment

### Rule Selection

- **Start Conservative**: Begin with recommended rules
- **Gradual Enhancement**: Add stricter rules incrementally
- **Team Consensus**: Ensure team agreement on rules
- **Performance Impact**: Consider linting performance

### Maintenance

- **Regular Updates**: Keep ESLint and plugins updated
- **Rule Review**: Periodically review and update rules
- **Performance Monitoring**: Monitor linting performance
- **Documentation**: Keep documentation current

## Contributing

When contributing to ESLint configurations:

1. **Test Changes**: Test on all affected packages
2. **Document Rules**: Document new rules and their purpose
3. **Backward Compatibility**: Avoid breaking existing code
4. **Performance**: Consider impact on linting speed
5. **Team Review**: Get team approval for rule changes

## Dependencies

### Core Dependencies

- **@eslint/js**: Core ESLint JavaScript rules
- **typescript-eslint**: TypeScript integration
- **eslint-config-prettier**: Prettier integration

### Plugin Dependencies

- **eslint-plugin-turbo**: Turborepo-specific rules
- **eslint-plugin-react**: React-specific rules
- **eslint-plugin-react-hooks**: React hooks rules
- **@next/eslint-plugin-next**: Next.js-specific rules
- **eslint-plugin-only-warn**: Convert errors to warnings

## Related Packages

- Used by `web` - Frontend web application
- Used by `api` - Backend API application
- Used by `hub` - Hub application
- Used by `@repo/ui` - UI component library
- Used by `@repo/db` - Database package
- Used by `@repo/common` - Common utilities
- Configured with `@repo/typescript-config` - TypeScript settings
