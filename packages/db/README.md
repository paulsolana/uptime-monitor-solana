# Wakey-Wakey Database Package

The database client and schema package for the Wakey-Wakey platform. This package provides a Prisma-based PostgreSQL client with type-safe database operations and shared database utilities.

## Features

- **Type-Safe Database Client**: Prisma-generated client with full TypeScript support
- **Schema Management**: Centralized database schema definition
- **Migration System**: Version-controlled database migrations
- **Seed Data**: Development and testing data seeding
- **Connection Pooling**: Optimized database connections
- **Query Optimization**: Efficient database queries with proper indexing

## Database Schema

The platform uses the following main entities:

### User
Website owners who monitor their sites
```prisma
model User {
  id       String    @id @default(uuid())
  email    String    @unique
  websites Website[]
}
```

### Website
Monitored websites with configuration
```prisma
model Website {
  id           String         @id @default(uuid())
  url          String
  userId       String
  user         User           @relation(fields: [userId], references: [id])
  ticks        WebSiteTicks[]
  disabled     Boolean        @default(false)
  latencyAlert Int            @default(0)
}
```

### Validator
Network participants performing monitoring checks
```prisma
model Validator {
  id             String         @id @default(uuid())
  publicKey      String         // Solana wallet address
  location       String         // Geographic location
  ip             String         // IP address
  pendingPayouts Int            @default(0)
  ticks          WebSiteTicks[]
  history        Json           @default("[]")
}
```

### WebSiteTicks
Individual monitoring results
```prisma
model WebSiteTicks {
  id          String    @id @default(uuid())
  websiteId   String
  website     Website   @relation(fields: [websiteId], references: [id])
  validatorId String
  validator   Validator @relation(fields: [validatorId], references: [id])
  status      Status    // GOOD or BAD
  latency     Int       // Response time in milliseconds
  createdAt   DateTime  @default(now())
}
```

## Prerequisites

- PostgreSQL >= 12
- Node.js >= 18
- Bun >= 1.2.4

## Installation

1. Install dependencies:
```bash
bun install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Configure the database connection:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/wakey_wakey"
```

## Database Setup

### Initial Setup
```bash
# Generate Prisma client
bun run db:generate

# Create and run initial migration
bun run db:migrate:dev

# Seed the database with sample data
bun run db:seed
```

### Development Workflow
```bash
# Reset database (drops all data)
bun run db:reset

# Push schema changes without migration
bun run db:push

# View database in Prisma Studio
bun run db:studio
```

### Production Deployment
```bash
# Run migrations in production
bun run db:migrate:deploy

# Generate client for production
bun run db:generate
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `db:generate` | Generate Prisma client |
| `db:migrate:dev` | Create and apply migration in development |
| `db:migrate:deploy` | Apply migrations in production |
| `db:push` | Push schema changes without migration |
| `db:reset` | Reset database and apply all migrations |
| `db:seed` | Seed database with sample data |
| `db:studio` | Open Prisma Studio |

## Usage

### Basic Client Usage
```typescript
import { db } from '@repo/db';

// Create a new user
const user = await db.user.create({
  data: {
    email: 'user@example.com',
  },
});

// Add a website to monitor
const website = await db.website.create({
  data: {
    url: 'https://example.com',
    userId: user.id,
    latencyAlert: 1000, // Alert if latency > 1000ms
  },
});

// Record a monitoring result
const tick = await db.webSiteTicks.create({
  data: {
    websiteId: website.id,
    validatorId: validator.id,
    status: 'GOOD',
    latency: 150,
  },
});
```

### Advanced Queries
```typescript
// Get website with recent monitoring data
const websiteWithStats = await db.website.findUnique({
  where: { id: websiteId },
  include: {
    ticks: {
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: {
        validator: {
          select: {
            location: true,
            publicKey: true,
          },
        },
      },
    },
  },
});

// Calculate uptime percentage
const uptimeStats = await db.webSiteTicks.groupBy({
  by: ['status'],
  where: {
    websiteId,
    createdAt: {
      gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
    },
  },
  _count: {
    status: true,
  },
});

// Get validator performance metrics
const validatorStats = await db.validator.findUnique({
  where: { id: validatorId },
  include: {
    ticks: {
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
        },
      },
    },
  },
});
```

## Database Optimization

### Indexes
The schema includes optimized indexes for common queries:

```sql
-- Composite index for efficient tick queries
CREATE INDEX idx_website_ticks_website_created 
ON "WebSiteTicks" ("websiteId", "createdAt" DESC);

-- Index for validator performance queries
CREATE INDEX idx_website_ticks_validator_created 
ON "WebSiteTicks" ("validatorId", "createdAt" DESC);

-- Index for status-based queries
CREATE INDEX idx_website_ticks_status 
ON "WebSiteTicks" ("status", "createdAt" DESC);
```

### Connection Pooling
```typescript
// Configure connection pooling
const db = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL + '?connection_limit=10&pool_timeout=20',
    },
  },
});
```

## Data Seeding

The seed script creates sample data for development:

```typescript
// packages/db/seed.ts
import { db } from './index';

async function seed() {
  // Create sample users
  const users = await Promise.all([
    db.user.create({
      data: { email: 'alice@example.com' },
    }),
    db.user.create({
      data: { email: 'bob@example.com' },
    }),
  ]);

  // Create sample websites
  const websites = await Promise.all([
    db.website.create({
      data: {
        url: 'https://google.com',
        userId: users[0].id,
        latencyAlert: 1000,
      },
    }),
    db.website.create({
      data: {
        url: 'https://github.com',
        userId: users[1].id,
        latencyAlert: 2000,
      },
    }),
  ]);

  // Create sample validators
  const validators = await Promise.all([
    db.validator.create({
      data: {
        publicKey: 'validator1_public_key',
        location: 'US-East',
        ip: '192.168.1.1',
      },
    }),
    db.validator.create({
      data: {
        publicKey: 'validator2_public_key',
        location: 'EU-West',
        ip: '192.168.1.2',
      },
    }),
  ]);

  console.log('Database seeded successfully!');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `DIRECT_URL` | Direct database connection (for migrations) | No |

## Migration Best Practices

1. **Always review migrations** before applying to production
2. **Backup database** before running migrations in production
3. **Test migrations** in a staging environment first
4. **Use descriptive names** for migration files
5. **Avoid breaking changes** in production migrations

## Troubleshooting

### Common Issues

**Connection refused**
```bash
# Check if PostgreSQL is running
psql -h localhost -p 5432 -U username -d wakey_wakey
```

**Migration conflicts**
```bash
# Reset migration state
bun run db:migrate:reset
```

**Client out of sync**
```bash
# Regenerate client
bun run db:generate
```

## Contributing

When contributing to the database package:

1. **Schema Changes**: Always create migrations for schema changes
2. **Backward Compatibility**: Ensure changes don't break existing code
3. **Performance**: Consider query performance impact
4. **Documentation**: Update this README for schema changes
5. **Testing**: Test migrations in development environment

## Related Packages

- Used by `api` - Backend API service
- Used by `hub` - WebSocket coordination service
- Shared with `@repo/common` - Common types and utilities
