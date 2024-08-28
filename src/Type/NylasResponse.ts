export interface TypeNylasResponse<TypeData>
{
	// eslint-disable-next-line @typescript-eslint/naming-convention
	request_id: string;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	next_cursor?: string;
	data?: TypeData | undefined;
}
