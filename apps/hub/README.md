# Wakey-Wakey Hub

The coordination hub for the Wakey-Wakey decentralized uptime monitoring platform. This WebSocket server manages communication between validators and the platform, distributing monitoring tasks and collecting results.

## Features

- **Task Distribution**: Assigns website monitoring tasks to connected validators
- **Real-time Communication**: WebSocket-based bidirectional communication
- **Validator Coordination**: Manages validator connections and load balancing
- **Result Collection**: Aggregates monitoring results from validators
- **Reward Distribution**: Coordinates SOL payments to validators
- **Health Monitoring**: Tracks validator performance and availability

## Tech Stack

- **Runtime**: Bun
- **WebSocket**: Native WebSocket implementation
- **Database**: PostgreSQL with Prisma ORM
- **Blockchain**: Solana Web3.js for payments
- **Shared Libraries**: Common types and database client

## Prerequisites

- Bun >= 1.2.4
- PostgreSQL database (shared with API)
- Solana wallet for reward distribution
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
HUB_PORT=3002
SOLANA_RPC_URL="https://api.devnet.solana.com"
REWARD_WALLET_PRIVATE_KEY="your-solana-private-key"
MONITORING_INTERVAL=180000
```

## Development

Start the development server with hot reload:
```bash
bun run dev
```

The Hub will be available at `ws://localhost:3002`

## Production

Build and start the production server:
```bash
# Build the application
bun run build

# Start production server
bun run start
```

## How It Works

### 1. Validator Connection
Validators connect to the Hub via WebSocket and register with their:
- Public key (Solana wallet address)
- Geographic location
- IP address
- Performance capabilities

### 2. Task Distribution
Every 3 minutes, the Hub:
1. Fetches active websites from the database
2. Selects available validators based on location and load
3. Distributes monitoring tasks via WebSocket messages
4. Tracks task assignments and timeouts

### 3. Result Processing
When validators complete monitoring tasks:
1. Results are received via WebSocket
2. Data is validated and stored in the database
3. Validator performance metrics are updated
4. Rewards are calculated and queued for payment

### 4. Reward Distribution
Periodically, the Hub:
1. Calculates validator earnings based on completed tasks
2. Initiates SOL transfers to validator wallets
3. Updates payment records in the database
4. Handles failed transactions and retries

## WebSocket Protocol

### Validator Registration
```json
{
  "type": "register",
  "data": {
    "publicKey": "validator-solana-address",
    "location": "US-East",
    "ip": "192.168.1.1"
  }
}
```

### Task Assignment
```json
{
  "type": "task",
  "data": {
    "taskId": "uuid",
    "websiteId": "uuid",
    "url": "https://example.com",
    "timeout": 30000
  }
}
```

### Result Submission
```json
{
  "type": "result",
  "data": {
    "taskId": "uuid",
    "status": "GOOD",
    "latency": 150,
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

### Heartbeat
```json
{
  "type": "ping",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Monitoring and Metrics

The Hub tracks:
- **Validator Performance**: Response times, success rates, uptime
- **Task Distribution**: Load balancing across validators
- **Network Health**: Connection stability, message throughput
- **Payment Status**: Successful/failed reward distributions

## Error Handling

- **Connection Failures**: Automatic reconnection attempts
- **Task Timeouts**: Reassignment to other validators
- **Invalid Results**: Data validation and rejection
- **Payment Failures**: Retry mechanisms and error logging

## Security Considerations

- **Validator Authentication**: Public key verification
- **Message Validation**: Schema validation for all WebSocket messages
- **Rate Limiting**: Protection against spam and abuse
- **Secure Payments**: Private key management for reward distribution

## Configuration

Key configuration options:

```typescript
const config = {
  monitoringInterval: 3 * 60 * 1000, // 3 minutes
  maxValidatorsPerTask: 3,
  taskTimeout: 30 * 1000, // 30 seconds
  rewardPerTask: 0.001, // SOL
  maxPendingTasks: 100
};
```

## Contributing

When contributing to the Hub:

1. Maintain WebSocket protocol compatibility
2. Add proper error handling for network issues
3. Update protocol documentation for changes
4. Test with multiple concurrent validators
5. Consider performance impact of new features

## Related Packages

- `@repo/db` - Database client and schema
- `@repo/common` - Shared types and utilities
- `@solana/web3.js` - Solana blockchain integration
