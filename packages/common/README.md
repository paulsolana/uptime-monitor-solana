# Wakey-Wakey Common Package

Shared types, utilities, and constants used across the Wakey-Wakey platform. This package provides a centralized location for common functionality that is used by multiple applications and packages.

## Features

- **Shared Types**: TypeScript interfaces and types for consistent data structures
- **Utility Functions**: Common helper functions for data processing and validation
- **Constants**: Platform-wide constants and configuration values
- **Validation Schemas**: Zod schemas for data validation
- **Error Handling**: Standardized error types and handling utilities
- **Date/Time Utilities**: Consistent date formatting and timezone handling

## Package Structure

```
src/
├── types/
│   ├── api.ts           # API request/response types
│   ├── database.ts      # Database model types
│   ├── websocket.ts     # WebSocket message types
│   └── index.ts         # Exported types
├── utils/
│   ├── validation.ts    # Zod validation schemas
│   ├── formatting.ts    # Data formatting utilities
│   ├── crypto.ts        # Cryptographic utilities
│   └── index.ts         # Exported utilities
├── constants/
│   ├── config.ts        # Platform configuration
│   ├── errors.ts        # Error codes and messages
│   └── index.ts         # Exported constants
└── index.ts             # Main package exports
```

## Installation

This package is used internally within the monorepo:

```bash
bun install
```

## Usage

### Types

```typescript
import { 
  User, 
  Website, 
  Validator, 
  WebsiteTick,
  ApiResponse,
  WebSocketMessage 
} from '@repo/common';

// Use shared types for consistency
const user: User = {
  id: 'uuid',
  email: 'user@example.com',
  websites: []
};

const apiResponse: ApiResponse<Website[]> = {
  success: true,
  data: websites,
  message: 'Websites retrieved successfully'
};
```

### Validation Schemas

```typescript
import { 
  userSchema, 
  websiteSchema, 
  validatorSchema,
  websiteTickSchema 
} from '@repo/common';

// Validate user input
const validateUser = (data: unknown) => {
  return userSchema.parse(data);
};

// Validate website data
const validateWebsite = (data: unknown) => {
  return websiteSchema.parse(data);
};
```

### Utility Functions

```typescript
import { 
  formatLatency,
  calculateUptime,
  generateApiKey,
  hashPassword,
  validateUrl 
} from '@repo/common';

// Format latency for display
const displayLatency = formatLatency(150); // "150ms"

// Calculate uptime percentage
const uptime = calculateUptime(goodTicks, totalTicks); // 99.5

// Generate secure API key
const apiKey = generateApiKey();

// Validate URL format
const isValid = validateUrl('https://example.com'); // true
```

### Constants

```typescript
import { 
  MONITORING_INTERVALS,
  ERROR_CODES,
  WEBSOCKET_EVENTS,
  SOLANA_CONFIG 
} from '@repo/common';

// Use platform constants
const interval = MONITORING_INTERVALS.DEFAULT; // 180000 (3 minutes)
const errorCode = ERROR_CODES.VALIDATION_ERROR;
const event = WEBSOCKET_EVENTS.TASK_ASSIGNMENT;
```

## API Types

### Request/Response Types

```typescript
// API Response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  message?: string;
}

// Pagination
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Authentication
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
```

### Database Model Types

```typescript
// User types
export interface User {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  websites: Website[];
}

// Website types
export interface Website {
  id: string;
  url: string;
  userId: string;
  disabled: boolean;
  latencyAlert: number;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  ticks?: WebsiteTick[];
}

// Validator types
export interface Validator {
  id: string;
  publicKey: string;
  location: string;
  ip: string;
  pendingPayouts: number;
  history: ValidatorHistory[];
  createdAt: Date;
  updatedAt: Date;
  ticks?: WebsiteTick[];
}

// Monitoring result types
export interface WebsiteTick {
  id: string;
  websiteId: string;
  validatorId: string;
  status: 'GOOD' | 'BAD';
  latency: number;
  createdAt: Date;
  website?: Website;
  validator?: Validator;
}
```

## WebSocket Message Types

```typescript
// Base message structure
export interface WebSocketMessage<T = any> {
  type: string;
  data: T;
  timestamp: string;
  id?: string;
}

// Validator registration
export interface ValidatorRegistration {
  publicKey: string;
  location: string;
  ip: string;
}

// Task assignment
export interface TaskAssignment {
  taskId: string;
  websiteId: string;
  url: string;
  timeout: number;
}

// Task result
export interface TaskResult {
  taskId: string;
  status: 'GOOD' | 'BAD';
  latency: number;
  error?: string;
}
```

## Validation Schemas

```typescript
import { z } from 'zod';

// User validation
export const userSchema = z.object({
  email: z.string().email('Invalid email format'),
});

// Website validation
export const websiteSchema = z.object({
  url: z.string().url('Invalid URL format'),
  latencyAlert: z.number().min(0).max(30000),
});

// Validator validation
export const validatorSchema = z.object({
  publicKey: z.string().min(32, 'Invalid public key'),
  location: z.string().min(2, 'Location required'),
  ip: z.string().ip('Invalid IP address'),
});

// WebSocket message validation
export const websocketMessageSchema = z.object({
  type: z.string(),
  data: z.any(),
  timestamp: z.string().datetime(),
  id: z.string().optional(),
});
```

## Utility Functions

### Data Formatting

```typescript
// Format latency for display
export const formatLatency = (ms: number): string => {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
};

// Format uptime percentage
export const formatUptime = (percentage: number): string => {
  return `${percentage.toFixed(2)}%`;
};

// Format date for display
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};
```

### Calculation Utilities

```typescript
// Calculate uptime percentage
export const calculateUptime = (goodTicks: number, totalTicks: number): number => {
  if (totalTicks === 0) return 0;
  return (goodTicks / totalTicks) * 100;
};

// Calculate average latency
export const calculateAverageLatency = (latencies: number[]): number => {
  if (latencies.length === 0) return 0;
  return latencies.reduce((sum, latency) => sum + latency, 0) / latencies.length;
};

// Calculate validator score
export const calculateValidatorScore = (
  successRate: number,
  averageLatency: number,
  uptime: number
): number => {
  return (successRate * 0.4) + ((1000 / averageLatency) * 0.3) + (uptime * 0.3);
};
```

### Cryptographic Utilities

```typescript
// Generate secure random string
export const generateSecureId = (length: number = 32): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Generate API key
export const generateApiKey = (): string => {
  return `ww_${generateSecureId(40)}`;
};

// Hash password (placeholder - use proper hashing in production)
export const hashPassword = async (password: string): Promise<string> => {
  // Implementation would use bcrypt or similar
  return password; // Placeholder
};
```

## Constants

```typescript
// Monitoring intervals
export const MONITORING_INTERVALS = {
  DEFAULT: 3 * 60 * 1000, // 3 minutes
  FAST: 1 * 60 * 1000,    // 1 minute
  SLOW: 5 * 60 * 1000,    // 5 minutes
} as const;

// Error codes
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
} as const;

// WebSocket events
export const WEBSOCKET_EVENTS = {
  REGISTER: 'register',
  TASK_ASSIGNMENT: 'task',
  TASK_RESULT: 'result',
  HEARTBEAT: 'ping',
  ERROR: 'error',
} as const;

// Solana configuration
export const SOLANA_CONFIG = {
  NETWORKS: {
    MAINNET: 'mainnet-beta',
    DEVNET: 'devnet',
    TESTNET: 'testnet',
  },
  REWARD_PER_TASK: 0.001, // SOL
  MIN_PAYOUT_THRESHOLD: 0.01, // SOL
} as const;
```

## Error Handling

```typescript
// Custom error classes
export class ValidationError extends Error {
  constructor(message: string, public details?: any) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends Error {
  constructor(message: string = 'Authentication required') {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends Error {
  constructor(message: string = 'Insufficient permissions') {
    super(message);
    this.name = 'AuthorizationError';
  }
}

// Error response helper
export const createErrorResponse = (
  code: string,
  message: string,
  details?: any
): ApiResponse => ({
  success: false,
  error: { code, message, details },
});
```

## Contributing

When contributing to the common package:

1. **Type Safety**: Ensure all types are properly defined
2. **Validation**: Add Zod schemas for new data structures
3. **Documentation**: Document all exported functions and types
4. **Testing**: Add unit tests for utility functions
5. **Backward Compatibility**: Avoid breaking changes to existing exports

## Related Packages

- Used by `api` - Backend API service
- Used by `hub` - WebSocket coordination service
- Used by `web` - Frontend web application
- Shared with `@repo/db` - Database package
