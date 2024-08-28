import { HttpRequestSender } from '@dmitryrechkin/request-sender-core';
import { type TypeNylasAuthentication } from './Type/NylasAuthentication';

export class NylasRequestSender extends HttpRequestSender
{
	/**
	 * Constructor.
	 *
	 * @param {TypeNylasAuthentication} auth
	 */
	public constructor(private auth: TypeNylasAuthentication)
	{
		super();
	}

	/**
	 * Sends a request to the Nylas API
	 *
	 * @param {string} path - The endpoint URL
	 * @param {RequestInit} options - The request options (method, headers, body, etc.)
	 * @param {boolean} includeGrantId - Whether to include the grant ID in the URL
	 * @returns {Promise<Response>} - A promise that resolves to the response
	 */
	public async send(path: string, options: RequestInit = {}, includeGrantId: boolean = true): Promise<Response>
	{
		const headers = new Headers(options.headers || {});
		// eslint-disable-next-line @typescript-eslint/naming-convention
		headers.append('Authorization', `Bearer ${this.auth.apiKey}`);
		// eslint-disable-next-line @typescript-eslint/naming-convention
		headers.append('Content-Type', 'application/json');

		const url = this.auth.apiUrl + '/v3' + (includeGrantId ? `/grants/${this.auth.grantId}` : '') + path;

		return super.send(url, {
			...options,
			headers
		});
	 }
}
