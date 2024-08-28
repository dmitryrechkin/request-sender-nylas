import { type RequestSenderInterface, type RequestSenderFactoryInterface } from '@dmitryrechkin/request-sender-core';
import { type TypeNylasAuthentication } from './Type/NylasAuthentication';
import { NylasRequestSender } from './NylasRequestSender';

export class NylasRequestSenderFactory implements RequestSenderFactoryInterface
{
	private auth: TypeNylasAuthentication;

	/**
	 * Constructor.
	 *
	 * @param {Partial<TypeNylasAuthentication>} auth - The authentication overrides.
	 */
	public constructor(auth: Partial<TypeNylasAuthentication>)
	{
		this.auth = {
			apiKey: '',
			apiUrl: '',
			grantId: '',
			...auth
		};
	}

	/**
	 * Creates a new request sender instance.
	 *
	 * @param {Partial<TypeNylasAuthentication>} auth - The authentication overrides.
	 * @returns {RequestSenderFactoryInterface} - The request sender instance
	 */
	public create(auth: Partial<TypeNylasAuthentication> = {}): RequestSenderInterface
	{
		return new NylasRequestSender({ ...this.auth, ...auth });
	}
}
