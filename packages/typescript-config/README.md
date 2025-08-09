# Wakey-Wakey TypeScript Configuration

A collection of shared TypeScript configurations for the Wakey-Wakey monorepo. This package provides consistent TypeScript compiler settings across all applications and packages, ensuring type safety, modern JavaScript features, and optimal development experience.

## Features

- **Base Configuration**: Core TypeScript settings for all projects
- **Next.js Configuration**: Optimized settings for Next.js applications
- **React Library Configuration**: Specialized settings for React component libraries
- **Strict Type Checking**: Enhanced type safety with strict mode enabled
- **Modern JavaScript**: Support for latest ECMAScript features
- **Incremental Compilation**: Optimized build performance
- **Declaration Generation**: Automatic type declaration files

## Available Configurations

### Base Configuration (`@repo/typescript-config/base.json`)

The foundational TypeScript configuration that includes:

- **Strict Mode**: Enhanced type checking and safety
- **Modern Target**: ES2022 compilation target
- **Node.js Support**: NodeNext module resolution
- **Declaration Maps**: Source map support for declarations
- **Isolated Modules**: Ensures each file can be transpiled independently

**Key Settings:**
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "declaration": true,
    "declarationMap": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "noUncheckedIndexedAccess": true
  }
}
```

**Usage:**
```json
// tsconfig.json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    // Project-specific overrides
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Next.js Configuration (`@repo/typescript-config/nextjs.json`)

Specialized configuration for Next.js applications that extends the base config with:

- **Next.js Optimizations**: Settings optimized for Next.js builds
- **JSX Support**: React JSX transformation
- **Client/Server Compatibility**: Supports both client and server-side code
- **Incremental Builds**: Faster development builds

**Usage:**
```json
// apps/web/tsconfig.json
{
  "extends": "@repo/typescript-config/nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

### React Library Configuration (`@repo/typescript-config/react-library.json`)

Configuration for React component libraries and packages:

- **Library Optimizations**: Settings for building reusable libraries
- **React Support**: JSX and React-specific configurations
- **Declaration Generation**: Type definitions for consumers
- **Tree Shaking**: Optimized for bundle splitting

**Usage:**
```json
// packages/ui/tsconfig.json
{
  "extends": "@repo/typescript-config/react-library.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.*"]
}
```

## Installation

This package is used internally within the monorepo:

```bash
bun install
```

## Usage in Applications

### Web Application (Next.js)

```json
// apps/web/tsconfig.json
{
  "extends": "@repo/typescript-config/nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

### API Application (Node.js)

```json
// apps/api/tsconfig.json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "types": ["node"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.*"]
}
```

### Hub Application (Node.js)

```json
// apps/hub/tsconfig.json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "types": ["node"],
    "lib": ["es2022"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### UI Package (React Components)

```json
// packages/ui/tsconfig.json
{
  "extends": "@repo/typescript-config/react-library.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "jsx": "react-jsx"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.stories.*", "**/*.test.*"]
}
```

### Database Package

```json
// packages/db/tsconfig.json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "types": ["node"]
  },
  "include": ["src/**/*", "prisma/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Common Package

```json
// packages/common/tsconfig.json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true,
    "declarationMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.*"]
}
```

## Compiler Options Explained

### Core Settings

#### `target: "ES2022"`
Compiles TypeScript to ES2022, providing modern JavaScript features while maintaining broad compatibility.

#### `module: "NodeNext"`
Uses Node.js's native module resolution, supporting both CommonJS and ES modules.

#### `moduleResolution: "NodeNext"`
Enables Node.js 16+ module resolution algorithm for better package.json exports support.

#### `strict: true`
Enables all strict type checking options:
- `noImplicitAny`: Errors on expressions with implied `any` type
- `strictNullChecks`: Strict null and undefined checking
- `strictFunctionTypes`: Strict checking of function types
- `strictBindCallApply`: Strict checking of bind, call, and apply
- `strictPropertyInitialization`: Strict checking of property initialization
- `noImplicitReturns`: Error on code paths that don't return a value
- `noImplicitThis`: Error on `this` expressions with implied `any` type

### Declaration Settings

#### `declaration: true`
Generates corresponding `.d.ts` files for TypeScript declarations.

#### `declarationMap: true`
Generates source maps for declaration files, enabling "Go to Definition" in IDEs.

### Module Settings

#### `isolatedModules: true`
Ensures each file can be safely transpiled without relying on other imports.

#### `esModuleInterop: true`
Enables interoperability between CommonJS and ES modules.

#### `resolveJsonModule: true`
Allows importing JSON files as modules.

### Safety Settings

#### `noUncheckedIndexedAccess: true`
Adds `undefined` to index signature results, preventing runtime errors.

#### `skipLibCheck: true`
Skips type checking of declaration files for faster compilation.

## Path Mapping

### Setting Up Path Aliases

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"],
      "@/utils/*": ["./src/utils/*"]
    }
  }
}
```

### Using Path Aliases

```typescript
// Instead of relative imports
import { Button } from '../../../components/ui/Button';
import { formatDate } from '../../../lib/utils';

// Use clean path aliases
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
```

## Project References

### Setting Up Project References

For better build performance in monorepos:

```json
// Root tsconfig.json
{
  "files": [],
  "references": [
    { "path": "./apps/web" },
    { "path": "./apps/api" },
    { "path": "./apps/hub" },
    { "path": "./packages/ui" },
    { "path": "./packages/db" },
    { "path": "./packages/common" }
  ]
}
```

### Package Dependencies

```json
// packages/ui/tsconfig.json
{
  "extends": "@repo/typescript-config/react-library.json",
  "references": [
    { "path": "../common" }
  ]
}
```

## Build Scripts

### Package.json Scripts

```json
{
  "scripts": {
    "build": "tsc",
    "build:watch": "tsc --watch",
    "type-check": "tsc --noEmit",
    "type-check:watch": "tsc --noEmit --watch"
  }
}
```

### Turbo Integration

```json
// turbo.json
{
  "pipeline": {
    "type-check": {
      "dependsOn": ["^type-check"]
    },
    "build": {
      "dependsOn": ["^build", "type-check"],
      "outputs": ["dist/**"]
    }
  }
}
```

## IDE Integration

### VS Code Settings

```json
// .vscode/settings.json
{
  "typescript.preferences.includePackageJsonAutoImports": "on",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  }
}
```

### Multi-root Workspace

```json
// wakey-wakey.code-workspace
{
  "folders": [
    { "path": "./apps/web" },
    { "path": "./apps/api" },
    { "path": "./apps/hub" },
    { "path": "./packages/ui" },
    { "path": "./packages/db" },
    { "path": "./packages/common" }
  ],
  "settings": {
    "typescript.preferences.includePackageJsonAutoImports": "on"
  }
}
```

## Performance Optimization

### Incremental Compilation

```json
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": ".tsbuildinfo"
  }
}
```

### Composite Projects

```json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "declarationMap": true
  }
}
```

### Build Optimization

```bash
# Build all projects
tsc --build

# Build with force
tsc --build --force

# Clean build artifacts
tsc --build --clean
```

## Type Definitions

### Global Type Declarations

```typescript
// types/global.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      DATABASE_URL: string;
      NEXTAUTH_SECRET: string;
    }
  }
}

export {};
```

### Module Declarations

```typescript
// types/modules.d.ts
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}
```

## Troubleshooting

### Common Issues

#### "Cannot find module" errors

```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
rm -rf .tsbuildinfo

# Reinstall dependencies
bun install
```

#### Path mapping not working

```json
// Ensure baseUrl is set
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### Slow compilation

```json
// Enable incremental compilation
{
  "compilerOptions": {
    "incremental": true,
    "skipLibCheck": true
  }
}
```

### Debug Mode

```bash
# Verbose TypeScript compilation
tsc --listFiles

# Show configuration
tsc --showConfig

# Trace module resolution
tsc --traceResolution
```

## Best Practices

### Configuration Management

- **Extend Base Configs**: Always extend from base configurations
- **Minimal Overrides**: Only override necessary settings
- **Consistent Paths**: Use consistent path mapping across projects
- **Project References**: Use project references for better performance

### Type Safety

- **Strict Mode**: Always enable strict mode
- **No Any**: Avoid `any` type, use `unknown` instead
- **Explicit Types**: Be explicit with function return types
- **Null Checks**: Enable strict null checks

### Performance

- **Incremental Builds**: Enable incremental compilation
- **Skip Lib Check**: Skip type checking of declaration files
- **Project References**: Use for large monorepos
- **Composite Projects**: Enable for better caching

### Development Experience

- **Path Mapping**: Use path aliases for cleaner imports
- **Declaration Maps**: Enable for better IDE support
- **Source Maps**: Generate source maps for debugging
- **Watch Mode**: Use watch mode during development

## Contributing

When contributing to TypeScript configurations:

1. **Test Changes**: Test on all affected packages
2. **Backward Compatibility**: Avoid breaking existing builds
3. **Performance**: Consider compilation performance impact
4. **Documentation**: Update documentation for new settings
5. **Team Review**: Get team approval for configuration changes

## Migration Guide

### From Legacy Configurations

1. **Update extends**: Change to new configuration paths
2. **Remove Duplicates**: Remove settings already in base config
3. **Update Scripts**: Update build scripts if necessary
4. **Test Builds**: Ensure all projects still compile

### Version Updates

1. **Check Compatibility**: Verify TypeScript version compatibility
2. **Update Dependencies**: Update TypeScript and related packages
3. **Test Thoroughly**: Test all configurations
4. **Update Documentation**: Update any changed settings

## Related Packages

- Used by `web` - Frontend web application
- Used by `api` - Backend API application
- Used by `hub` - Hub application
- Used by `@repo/ui` - UI component library
- Used by `@repo/db` - Database package
- Used by `@repo/common` - Common utilities
- Configured with `@repo/eslint-config` - ESLint settings

## Future Enhancements

- [ ] Add configuration for Deno runtime
- [ ] Create configuration for testing frameworks
- [ ] Add configuration for serverless functions
- [ ] Implement stricter type checking options
- [ ] Add configuration for Web Workers
- [ ] Create configuration for Node.js libraries
- [ ] Add support for experimental TypeScript features