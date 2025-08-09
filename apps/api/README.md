# Wakey-Wakey API

The backend API service for the Wakey-Wakey decentralized uptime monitoring platform. This Express.js-based API handles website and validator management, authentication, and data storage.

## Features

- **Website Management**: CRUD operations for monitored websites
- **Validator Management**: Registration and management of network validators
- **Authentication**: JWT-based authentication system
- **Monitoring Data**: Storage and retrieval of uptime monitoring results
- **Analytics**: Performance metrics and historical data

## Tech Stack

- **Runtime**: Bun
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Zod (when implemented)

## Prerequisites

- Bun >= 1.2.4
- PostgreSQL database
- Node.js >= 18 (for compatibility)

## Installation

1. Install dependencies:
```bash
bun install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Configure the following variables:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/wakey_wakey"
JWT_SECRET="your-jwt-secret-key"
PORT=3001
```

3. Set up the database:
```bash
# Generate Prisma client
bun run db:generate

# Run migrations
bun run db:migrate

# Seed the database (optional)
bun run db:seed
```

## Development

Start the development server with hot reload:
```bash
bun run dev
```

The API will be available at `http://localhost:3001`

## Production

Build and start the production server:
```bash
# Build the application
bun run build

# Start production server
bun run start
```

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/refresh` - Refresh JWT token

### Websites
- `GET /websites` - Get user's websites
- `POST /websites` - Add new website to monitor
- `PUT /websites/:id` - Update website settings
- `DELETE /websites/:id` - Remove website from monitoring
- `GET /websites/:id/stats` - Get website performance statistics

### Validators
- `GET /validators` - Get all active validators
- `POST /validators/register` - Register new validator
- `PUT /validators/:id` - Update validator information
- `GET /validators/:id/stats` - Get validator performance stats

### Monitoring
- `POST /ticks` - Submit monitoring results (validator endpoint)
- `GET /ticks/:websiteId` - Get monitoring history for website
- `GET /analytics/:websiteId` - Get detailed analytics

## Database Schema

The API uses the following main models:

- **User**: Website owners who monitor their sites
- **Website**: Monitored websites with configuration
- **Validator**: Network participants performing checks
- **WebSiteTicks**: Individual monitoring results

## Error Handling

The API returns standardized error responses:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {}
  }
}
```

## Contributing

When contributing to the API:

1. Follow RESTful API conventions
2. Add proper error handling and validation
3. Update this README for new endpoints
4. Write tests for new functionality
5. Use TypeScript for type safety

## Related Packages

- `@repo/db` - Database client and schema
- `@repo/common` - Shared types and utilities
