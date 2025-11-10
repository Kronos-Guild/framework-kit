# @solana/client-core

> Framework-agnostic Solana client orchestration layer that wraps `@solana/kit` primitives with a higher-level API inspired by modern web3 client tooling.

This package is not meant for production yet. It showcases the building blocks for a future `@solana/client` release:

- A headless client factory that bootstraps RPC transports, subscriptions, and a composable state store.
- Framework agnostic actions and watchers that make building Solana experiences less verbose.
- Optional Zustand integration so apps can opt-in to a ready-made store or supply their own.
- Wallet Standard helpers (`createWalletStandardConnector`, `watchWalletStandardConnectors`) so you can surface browser wallets without adopting a framework-specific adapter.

## Transaction helper

`client.helpers.transaction` wraps the verbose transaction-building plumbing (`@solana/kit`, wallet sessions, compute budget math) into composable methods:

- `prepare` – build a `TransactionMessage` from arbitrary instructions.
- `sign`/`toWire` – sign or serialize a prepared transaction.
- `send` – submit a prepared transaction (partial or full send).
- `prepareAndSend` – new convenience that chains the entire flow and automatically tunes compute units via `prepareTransaction`.

### Compute-unit aware prepare + send

```ts
import { createClient } from '@solana/client-core';

const client = createClient({ endpoint: 'https://api.devnet.solana.com' });

const signature = await client.helpers.transaction.prepareAndSend(
	{
		authority: walletSession,
		instructions: [myInstruction],
		prepareTransaction: {
			computeUnitLimitMultiplier: 1.25,
			logRequest: ({ base64WireTransaction }) =>
				console.debug('tx wire', base64WireTransaction),
		},
	},
	{ commitment: 'confirmed' },
);
```

`prepareTransaction` simulates the transaction, inserts a compute-unit-limit instruction if you forgot one, refreshes the blockhash, and (optionally) reports the Base64 wire payload for observability.

### Address lookup tables without version juggling

Need `v0` transactions? Pass any deserialized lookup tables via `addressLookupTables` and the helper automatically switches the transaction version to `0`. Leave it alone and you get legacy transactions—no need to think about versioning unless you explicitly want to override it:

```ts
await client.helpers.transaction.prepare({
	addressLookupTables: [lookupTable],
	instructions,
	version: 'auto', // default; supplying lookup tables flips to v0 automatically
});
```

### Manual transaction prep + logging

Prefer to manage the signing or sending yourself? Call the utility directly via `client.prepareTransaction` or `client.helpers.prepareTransaction`:

```ts
const preparedMessage = await client.prepareTransaction({
	computeUnitLimitMultiplier: 1.4,
	logRequest: ({ base64WireTransaction }) => logger.info({ base64WireTransaction }),
	transaction: unsignedMessage,
});

const wire = await client.helpers.transaction.toWire({
	...somePreparedState,
	message: preparedMessage,
});
```

Because the helper never re-exports `@solana/kit`, you keep the ergonomic surface without giving up low-level control.

## Scripts

- `pnpm build` - runs both `compile:js` and `compile:typedefs`
- `pnpm test:typecheck` - validates TypeScript types without emitting
- `pnpm lint` / `pnpm format` - Biome-powered linting and formatting

## Status

This POC prioritizes API ergonomics and testable primitives. Expect rapid iteration and breaking changes.
