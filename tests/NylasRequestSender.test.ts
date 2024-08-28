import { describe, beforeEach, it, expect, vi } from 'vitest';
import { NylasRequestSender } from '../src/NylasRequestSender';
import { type TypeNylasAuthentication } from '../src/Type/NylasAuthentication';

describe('NylasRequestSender', () => {
	// Mock fetch
	const mockFetch = vi.fn();

	beforeEach(() => {
		// Reset the mock before each test
		mockFetch.mockReset();
		global.fetch = mockFetch;
	});

	const mockAuth: TypeNylasAuthentication = {
		apiKey: 'mockApiKey',
		apiUrl: 'https://api.nylas.com',
		grantId: 'mockGrantId'
	};

	const sender = new NylasRequestSender(mockAuth);

	it('should send a request to the Nylas API with the correct headers and URL', async () => {
		const mockResponse = new Response(JSON.stringify({ data: 'test' }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	
		// Set up the mock fetch to resolve with the mock response
		mockFetch.mockResolvedValueOnce(mockResponse);
	
		const response = await sender.send('/events', {
			method: 'GET'
		});
	
		expect(response).toBe(mockResponse);
	
		// Check that fetch was called with the correct URL and options
		expect(mockFetch).toHaveBeenCalledWith(
			'https://api.nylas.com/v3/grants/mockGrantId/events',
			expect.objectContaining({
				method: 'GET',
				headers: expect.any(Headers)
			})
		);
	
		// Verify the headers
		const headers = mockFetch.mock.calls[0][1]?.headers as Headers;
		expect(headers.get('Authorization')).toBe(`Bearer ${mockAuth.apiKey}`);
		expect(headers.get('Content-Type')).toBe('application/json');
	});

	it('should handle errors and return a custom response', async () => {
		const mockError = new Error('Network Error');
		mockFetch.mockRejectedValueOnce(mockError);

		const response = await sender.send('/events', {
			method: 'GET'
		});

		expect(response.status).toBe(500);
		expect(response.statusText).toBe('Network Error');
	});

	it('should construct the URL without grantId if includeGrantId is false', async () => {
		const mockResponse = new Response(JSON.stringify({ data: 'test' }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});

		mockFetch.mockResolvedValueOnce(mockResponse);

		await sender.send('/events', { method: 'GET' }, false);

		expect(mockFetch).toHaveBeenCalledWith(
			'https://api.nylas.com/v3/events',
			expect.objectContaining({
				method: 'GET',
				headers: expect.any(Headers)
			})
		);
	});
});
