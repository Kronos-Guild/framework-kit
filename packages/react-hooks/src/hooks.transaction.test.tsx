// @vitest-environment jsdom

import { describe, expect, it, vi } from 'vitest';

import { createAddress } from '../test/fixtures';
import { act, renderHookWithClient } from '../test/utils';

import { useTransactionPool } from './hooks';

function createInstruction(seed: number) {
	return {
		accounts: [],
		data: new Uint8Array([seed]),
		programAddress: createAddress(seed),
	};
}

describe('useTransactionPool.prepareAndSend', () => {
	it('delegates to the helper with the pooled instructions and tracks status', async () => {
		const instructions = [createInstruction(1)];
		const { client, result } = renderHookWithClient(() => useTransactionPool({ instructions }));

		await act(async () => {
			await result.current.prepareAndSend();
		});

		expect(client.helpers.transaction.prepareAndSend).toHaveBeenCalledWith(
			expect.objectContaining({ instructions }),
			undefined,
		);
		expect(result.current.sendStatus).toBe('success');
		expect(result.current.sendSignature).toBe('MockTxSignature1111111111111111111111111');
	});

	it('supports overriding instructions, prepareTransaction options, and send options', async () => {
		const logRequest = vi.fn();
		const initialInstructions = [createInstruction(2)];
		const overrideInstructions = [createInstruction(3)];
		const { client, result } = renderHookWithClient(() =>
			useTransactionPool({ instructions: initialInstructions }),
		);

		await act(async () => {
			await result.current.prepareAndSend(
				{
					instructions: overrideInstructions,
					prepareTransaction: {
						computeUnitLimitMultiplier: 1.3,
						logRequest,
					},
				},
				{ commitment: 'processed' },
			);
		});

		expect(client.helpers.transaction.prepareAndSend).toHaveBeenLastCalledWith(
			expect.objectContaining({
				instructions: overrideInstructions,
				prepareTransaction: expect.objectContaining({
					computeUnitLimitMultiplier: 1.3,
					logRequest,
				}),
			}),
			{ commitment: 'processed' },
		);
	});
});
