# Staking API

This project implements a backend service for staking functionality, built with NestJS and PostgreSQL. It simulates staking behavior similar to Hyperliquid Staking but operates entirely off-chain, without using smart contracts.

Users can stake tokens, claim rewards based on an APR model, and withdraw their staked tokens through simple REST API endpoints.

## Overview

This API allows users to stake tokens off-chain, accrue rewards over time based on a configurable APR, and manage staking actions such as claiming rewards and unstaking. It is built entirely as a backend system with no blockchain integration, ideal for prototyping or centralized staking simulations.

The API supports the following features:

- Stake tokens with a wallet address
- Claim accrued rewards
- Unstake tokens and retrieve final rewards
- View current staking details
- Configure APR (Annual Percentage Rate) from environment

## Technical Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- yarn
- Docker and Docker Compose (for local PostgreSQL instance)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/soban-khan/staking-api.git
cd staking-api
```

2. Install dependencies:

```bash
yarn install
```

3. Set up environment variables:

The project includes a `.env` file. Create your own `.env` file with appropriate values.

```bash
PORT = 3000

PSQL_HOST=localhost
PSQL_PORT=5432
PSQL_USERNAME=username
PSQL_PASSWORD=password
PSQL_DATABASE=database
PSQL_SYNCHRONIZE = true

JWT_AUTHSECRET = authentication_secret
JWT_EXPIRY = 8h
```

### Running the Application

1. Start the PostgreSQL database using Docker:

```bash
docker-compose up -d
```

2. Run the application:

```bash
# Development mode with hot reload
yarn run start:dev

# Production mode
yarn run build
yarn run start:prod

The API will be available at: http://localhost:3000 by default
```

3. API Documentation

```bash
The API documentation (Swagger) will be available at: http://localhost:3000/docs by default
```

## Reward Calculation

Rewards are calculated using a simple time-weighted APR formula:

```bash
reward = (amount * APR / 100) * (daysStaked / 365)
```

## Key Features Implemented

1. **Database-managed Token Locking**: All staking logic handled via PostgreSQL
2. **Flexible APY System**: Time-based APY configurations with different lock periods
3. **Automated Reward Calculation**: Daily cron job for reward distribution
4. **Comprehensive Transaction History**: Full audit trail
5. **Swagger Documentation**: Complete API documentation
6. **TypeORM Integration**: Type-safe database operations
7. **Validation & Error Handling**: Input validation and proper error responses

## Design Decisions and Trade-offs

### Data Storage

```bash
Timestamps for reward calculation: Rewards are not calculated in real-time but inferred based on time elapsed between stake and claim/unstake.

Single-stake model per wallet: Each wallet can have only one active stake. Extending to multiple stakes would require an indexed staking history table.

APR as environment config: Configurable through .env for simplicity; not stored per-user or per-stake.
```

### Trade-offs

```bash
No blockchain verification: This API simulates staking and cannot verify actual wallet balances or signatures.

Manual trust: All inputs are trusted (e.g., wallet address format), but can be extended with wallet verification or login flows.

Precision: Rewards are calculated using simple math with floating-point numbers; consider using BigInt or fixed-point libraries for high-value systems.
```
