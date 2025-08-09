# Wakey-Wakey UI Component Library

A shared React component library for the Wakey-Wakey platform. This package provides reusable, accessible, and consistent UI components used across the web application and other frontend packages.

## Features

- **Reusable Components**: Consistent UI components across the platform
- **TypeScript Support**: Full type safety and IntelliSense
- **Accessibility**: WCAG 2.1 compliant components
- **Responsive Design**: Mobile-first responsive components
- **Theme Support**: Consistent design system integration
- **Tree Shaking**: Optimized bundle size with selective imports

## Installation

This package is used internally within the monorepo:

```bash
bun install
```

## Usage

### Importing Components

```typescript
// Import individual components
import { Button } from '@repo/ui/button';
import { Card } from '@repo/ui/card';
import { Code } from '@repo/ui/code';

// Use in your React components
function MyComponent() {
  return (
    <Card>
      <Button appName="web">
        Click me
      </Button>
      <Code>console.log('Hello World');</Code>
    </Card>
  );
}
```

### Component Props

All components are fully typed with TypeScript:

```typescript
interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

interface CodeProps {
  children: string;
  language?: string;
  className?: string;
}
```

## Available Components

### Button
A versatile button component with consistent styling and behavior.

```typescript
import { Button } from '@repo/ui/button';

<Button 
  appName="web" 
  className="bg-blue-500 text-white px-4 py-2 rounded"
>
  Click me
</Button>
```

**Props:**
- `children`: ReactNode - Button content
- `className?`: string - Additional CSS classes
- `appName`: string - Application name for context

### Card
A container component for grouping related content.

```typescript
import { Card } from '@repo/ui/card';

<Card 
  title="Website Status" 
  className="p-6 border rounded-lg"
>
  <p>Your website is online</p>
</Card>
```

**Props:**
- `children`: ReactNode - Card content
- `className?`: string - Additional CSS classes
- `title?`: string - Optional card title

### Code
A component for displaying code snippets with syntax highlighting.

```typescript
import { Code } from '@repo/ui/code';

<Code 
  language="typescript"
  className="bg-gray-100 p-4 rounded"
>
  {`const greeting = "Hello, World!";`}
</Code>
```

**Props:**
- `children`: string - Code content to display
- `language?`: string - Programming language for syntax highlighting
- `className?`: string - Additional CSS classes

## Development

### Adding New Components

Use the built-in generator to create new components:

```bash
bun run generate:component
```

This will prompt you for component details and generate:
- Component file with TypeScript interface
- Basic component structure
- Export statement

### Manual Component Creation

1. Create a new `.tsx` file in the `src/` directory:

```typescript
// src/new-component.tsx
"use client";

import { ReactNode } from "react";

interface NewComponentProps {
  children: ReactNode;
  className?: string;
  // Add other props as needed
}

export const NewComponent = ({ 
  children, 
  className,
  ...props 
}: NewComponentProps) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};
```

2. The component is automatically available for import due to the package.json exports configuration.

### Component Guidelines

#### TypeScript
- Always define proper interfaces for component props
- Use generic types where appropriate
- Export both the component and its props interface

#### Accessibility
- Include proper ARIA attributes
- Ensure keyboard navigation support
- Use semantic HTML elements
- Test with screen readers

#### Styling
- Accept `className` prop for custom styling
- Use consistent naming conventions
- Support theme variables
- Ensure responsive design

#### Performance
- Use React.memo for expensive components
- Implement proper prop drilling prevention
- Optimize re-renders with useMemo/useCallback when needed

### Example Component Template

```typescript
"use client";

import { ReactNode, forwardRef } from "react";
import { cn } from "../utils"; // Utility for className merging

export interface ComponentNameProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
}

export const ComponentName = forwardRef<
  HTMLDivElement,
  ComponentNameProps
>(({ 
  children, 
  className, 
  variant = "default",
  size = "md",
  disabled = false,
  onClick,
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center";
  const variantClasses = {
    default: "bg-gray-100 text-gray-900",
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-500 text-white",
  };
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <div
      ref={ref}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={disabled ? undefined : onClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </div>
  );
});

ComponentName.displayName = "ComponentName";
```

## Testing

Run type checking:
```bash
bun run check-types
```

Run linting:
```bash
bun run lint
```

## Build and Export

The package uses a simple export strategy defined in `package.json`:

```json
{
  "exports": {
    "./*": "./src/*.tsx"
  }
}
```

This allows direct imports from any component file:
```typescript
import { Button } from '@repo/ui/button';
import { Card } from '@repo/ui/card';
```

## Design System Integration

### Color Palette
Components should use consistent color variables:

```css
:root {
  --color-primary: #3b82f6;
  --color-secondary: #6b7280;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-background: #ffffff;
  --color-foreground: #111827;
}
```

### Typography
Use consistent typography scales:

```css
.text-xs { font-size: 0.75rem; }
.text-sm { font-size: 0.875rem; }
.text-base { font-size: 1rem; }
.text-lg { font-size: 1.125rem; }
.text-xl { font-size: 1.25rem; }
```

### Spacing
Use consistent spacing units:

```css
.p-1 { padding: 0.25rem; }
.p-2 { padding: 0.5rem; }
.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }
.p-8 { padding: 2rem; }
```

## Best Practices

### Component Composition
- Prefer composition over inheritance
- Use render props or children functions for flexibility
- Keep components focused on a single responsibility

### Props Design
- Use descriptive prop names
- Provide sensible defaults
- Make required props obvious
- Use union types for limited options

### Performance
- Avoid unnecessary re-renders
- Use React.memo for pure components
- Implement proper key props for lists
- Lazy load heavy components

### Accessibility
- Always include proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers
- Use semantic HTML elements
- Provide focus indicators

## Contributing

When contributing to the UI package:

1. **Follow Design System**: Use consistent colors, typography, and spacing
2. **Write Tests**: Add unit tests for new components
3. **Document Props**: Clearly document all component props
4. **Accessibility**: Ensure components are accessible
5. **Performance**: Consider performance implications
6. **Backward Compatibility**: Avoid breaking changes

## Related Packages

- Used by `web` - Frontend web application
- Shared with `@repo/common` - Common types and utilities
- Configured with `@repo/eslint-config` - Linting rules
- Configured with `@repo/typescript-config` - TypeScript settings

## Future Enhancements

- [ ] Add Storybook for component documentation
- [ ] Implement automated visual regression testing
- [ ] Add more complex components (DataTable, Modal, etc.)
- [ ] Create theme provider for dynamic theming
- [ ] Add animation and transition utilities
- [ ] Implement component variants system
- [ ] Add form components with validation
- [ ] Create layout components (Grid, Flex, etc.)