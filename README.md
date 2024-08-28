# Request Sender Nylas

**Request Sender Nylas is a TypeScript library that provides an implementation of the `RequestSenderInterface` specifically for interacting with the Nylas API.** This library builds on the foundation provided by `Request Sender Core`, making it easy to send authenticated requests to the Nylas API using a consistent interface.

## Installation

Install the package using pnpm:

```bash
pnpm add @dmitryrechkin/request-sender-nylas
```

## Features

- **Nylas-Specific Implementation**: Extends the `HttpRequestSender` class to add authentication headers and handle Nylas-specific API requirements.
- **Factory Pattern Support**: Easily create instances of `NylasRequestSender` using the factory pattern, enabling dynamic instantiation based on your application’s needs.
- **Simple Integration**: Easily integrate with the Nylas API by providing API key, grant ID, and other required authentication details.

## Usage

### Sending a Request to the Nylas API

```typescript
import { NylasRequestSender } from '@dmitryrechkin/request-sender-nylas';
import { TypeNylasAuthentication } from './Type/NylasAuthentication';

const auth: TypeNylasAuthentication = {
    apiKey: 'your-nylas-api-key',
    apiUrl: 'https://api.nylas.com',
    grantId: 'your-grant-id'
};

const nylasSender = new NylasRequestSender(auth);
const response = await nylasSender.send('/events', {
    method: 'GET'
});

const data = await response.json();
console.log('Nylas API response data:', data);
```

### Using the Nylas Request Sender Factory

The factory pattern allows you to create instances of `NylasRequestSender` dynamically, which can be useful for dependency injection or when you need multiple senders with different configurations.

#### Creating a Factory

```typescript
import { NylasRequestSenderFactory } from '@dmitryrechkin/request-sender-nylas';
import { TypeNylasAuthentication } from './Type/NylasAuthentication';

const factory = new NylasRequestSenderFactory();

const auth: TypeNylasAuthentication = {
    apiKey: 'your-nylas-api-key',
    apiUrl: 'https://api.nylas.com',
    grantId: 'your-grant-id'
};

const nylasSender = factory.create(auth); // Create a new NylasRequestSender instance

const response = await nylasSender.send('/events', {
    method: 'POST',
    body: JSON.stringify({ ... }),
});

console.log('Response status:', response.status);
```

## When to Use

`Request Sender Nylas` is ideal for projects that integrate with the Nylas API, particularly when you need to:

- **Standardize Request Handling**: Use the same interface for sending requests to Nylas as you do with other services, making your codebase more consistent.
- **Simplify API Integration**: Reduce boilerplate code by using a pre-built implementation that handles authentication and other Nylas-specific requirements.
- **Enable Dynamic Request Sending**: Leverage the factory pattern to create request senders on the fly, tailored to different authentication or configuration settings.

## Installation & Setup

Install the package using pnpm:

```bash
pnpm add @dmitryrechkin/request-sender-nylas
```

Ensure your project is set up to handle TypeScript and supports ES modules, as this library is built with modern JavaScript standards.

## Rationale

### Specialized for Nylas API Integration

The `Request Sender Nylas` library extends the `Request Sender Core` to provide a specialized implementation for the Nylas API. By building on top of a unified interface, this library ensures that you can easily integrate Nylas-specific functionality while maintaining consistency across your codebase.

- **Simplified API Calls**: By abstracting the Nylas-specific logic, you can focus on your application's business logic without worrying about the details of API integration.
- **Extensible Design**: The use of the factory pattern allows for dynamic creation of request sender instances, making your application more modular and adaptable to different environments.

## Contributing

Contributions are welcome! Feel free to fork this project and submit pull requests. Before submitting, please ensure your code passes all linting and unit tests.

You can run unit tests using:

```bash
pnpm test
```