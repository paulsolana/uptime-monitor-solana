# Wakey-Wakey Web Application

The frontend web application for the Wakey-Wakey decentralized uptime monitoring platform. Built with Next.js, this application provides interfaces for both website owners and validators to interact with the monitoring network.

## Features

### For Website Owners
- **Dashboard**: Overview of all monitored websites
- **Website Management**: Add, edit, and remove websites from monitoring
- **Real-time Analytics**: Live uptime statistics and performance metrics
- **Historical Reports**: Detailed uptime history and trends
- **Alert Configuration**: Set up latency and downtime alerts
- **Export Functionality**: Download reports in CSV, JSON, and PDF formats

### For Validators
- **Validator Dashboard**: Performance tracking and earnings overview
- **Network Statistics**: Global network health and participation metrics
- **Reward History**: Detailed payment history and pending payouts
- **Performance Metrics**: Success rates, response times, and reliability scores

### Shared Features
- **Authentication**: Secure login with Clerk integration
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Live data updates using React Query
- **Dark/Light Mode**: Theme switching support
- **Solana Integration**: Wallet connection and transaction handling

## Tech Stack

- **Framework**: Next.js 15.2.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **State Management**: React Query (TanStack Query)
- **Authentication**: Clerk
- **Blockchain**: Solana Wallet Adapter
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with Zod validation

## Prerequisites

- Node.js >= 18
- Bun >= 1.2.4 (recommended) or npm/yarn
- Running API and Hub services

## Installation

1. Install dependencies:
```bash
bun install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

Configure the following variables:
```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXT_PUBLIC_HUB_WS_URL="ws://localhost:3002"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
CLERK_SECRET_KEY="your-clerk-secret-key"
NEXT_PUBLIC_SOLANA_NETWORK="devnet"
```

## Development

Start the development server:
```bash
bun run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Development Features
- **Hot Reload**: Automatic page refresh on file changes
- **Turbopack**: Fast bundling for development (enabled by default)
- **TypeScript**: Full type checking and IntelliSense
- **ESLint**: Code quality and consistency checking

## Production

Build and start the production server:
```bash
# Build the application
bun run build

# Start production server
bun run start
```

## Project Structure

```
app/
├── (auth)/          # Authentication pages
├── dashboard/       # Main dashboard pages
├── validators/      # Validator-specific pages
├── websites/        # Website management pages
├── globals.css      # Global styles
├── layout.tsx       # Root layout
└── page.tsx         # Home page

components/
├── ui/              # Reusable UI components
├── charts/          # Chart components
├── forms/           # Form components
└── layout/          # Layout components

hooks/
├── use-api.ts       # API interaction hooks
├── use-websocket.ts # WebSocket connection hooks
└── use-solana.ts    # Solana wallet hooks

lib/
├── api.ts           # API client configuration
├── utils.ts         # Utility functions
└── validations.ts   # Zod schemas

types/
└── index.ts         # TypeScript type definitions
```

## Key Components

### Dashboard Components
- **WebsiteCard**: Individual website status display
- **UptimeChart**: Real-time uptime visualization
- **AlertsPanel**: Active alerts and notifications
- **StatsOverview**: Key performance metrics

### Validator Components
- **ValidatorStats**: Performance and earnings overview
- **NetworkMap**: Global validator distribution
- **RewardHistory**: Payment history and analytics

### Shared Components
- **DataTable**: Sortable and filterable data tables
- **ExportButton**: Report generation and download
- **WalletConnect**: Solana wallet integration
- **ThemeToggle**: Dark/light mode switching

## API Integration

The application uses React Query for efficient data fetching:

```typescript
// Example API hook
const { data: websites, isLoading } = useQuery({
  queryKey: ['websites'],
  queryFn: () => api.get('/websites'),
  refetchInterval: 30000, // Refresh every 30 seconds
});
```

## WebSocket Integration

Real-time updates are handled through WebSocket connections:

```typescript
// Example WebSocket hook
const { connectionStatus, lastMessage } = useWebSocket(
  process.env.NEXT_PUBLIC_HUB_WS_URL,
  {
    onMessage: (event) => {
      // Handle real-time updates
    },
  }
);
```

## Solana Integration

Wallet connection and transaction handling:

```typescript
// Example wallet integration
const { publicKey, connected, connect } = useWallet();
const { connection } = useConnection();
```

## Styling Guidelines

- Use Tailwind CSS utility classes
- Follow the design system defined in `tailwind.config.ts`
- Use CSS variables for theme colors
- Maintain responsive design principles
- Follow accessibility best practices

## Performance Optimization

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Use `bun run analyze` to analyze bundle size
- **Caching**: React Query for efficient data caching
- **Lazy Loading**: Dynamic imports for heavy components

## Testing

Run the test suite:
```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test:watch

# Run tests with coverage
bun run test:coverage
```

## Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main

### Docker
```bash
# Build Docker image
docker build -t wakey-wakey-web .

# Run container
docker run -p 3000:3000 wakey-wakey-web
```

## Contributing

When contributing to the web application:

1. Follow the established component patterns
2. Use TypeScript for all new code
3. Add proper error boundaries for new features
4. Update this README for significant changes
5. Test responsive design on multiple devices
6. Follow accessibility guidelines (WCAG 2.1)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |
| `NEXT_PUBLIC_HUB_WS_URL` | WebSocket Hub URL | Yes |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk authentication | Yes |
| `CLERK_SECRET_KEY` | Clerk server key | Yes |
| `NEXT_PUBLIC_SOLANA_NETWORK` | Solana network (mainnet/devnet) | Yes |

## Related Packages

- `@repo/ui` - Shared UI component library
- `@repo/common` - Shared types and utilities
- API service at `../api`
- Hub service at `../hub`
