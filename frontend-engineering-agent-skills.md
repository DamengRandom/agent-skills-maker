# Agent Skills: Frontend Engineering
## Philosophy
The Frontend Engineering team is dedicated to delivering high-quality, scalable, and maintainable software solutions. Our philosophy is centered around consistency, reusability, and simplicity. We believe in writing clean, modular, and well-documented code that adheres to industry standards and best practices. Our goal is to ensure that backend and frontend schemas or contracts definitions are consistent, enabling seamless integration and reducing errors.

## Code Standards (Language specific)
As a team that utilizes TypeScript, ORM, Contracts, and Zod Schema, we adhere to the following language-specific code standards:
* **TypeScript**:
	+ Use interfaces to define types for complex objects and data structures
	+ Utilize type guards and conditional types to ensure type safety
	+ Avoid using the `any` type; instead, use unknown or never when necessary
* **ORM (Object-Relational Mapping)**:
	+ Use ORM to interact with the database, ensuring a clear separation of concerns
	+ Define models using TypeScript interfaces, ensuring consistency with backend schemas
* **Contracts**:
	+ Define contracts using Zod Schema, ensuring validation and consistency across the application
	+ Use contracts to validate inputs, outputs, and data structures
* **Zod Schema**:
	+ Use Zod Schema to define and validate schemas for data structures and APIs
	+ Ensure that Zod Schema definitions are consistent with backend schemas and contracts

## Architecture Patterns
To maintain a scalable and maintainable architecture, we follow these patterns:
* **API-First Development**: Design and develop APIs first, ensuring that backend and frontend schemas are consistent
* **Layered Architecture**: Separate concerns into distinct layers, including presentation, application, domain, and infrastructure
* **Micro-Frontends**: Use micro-frontend architecture to enable modular, independent, and scalable frontend development
* **Event-Driven Architecture**: Use events to communicate between micro-frontends and backend services, ensuring loose coupling and scalability

## Review Checklist
To ensure that our code meets the highest standards, we use the following review checklist:
* **Consistency**:
	+ Are backend and frontend schemas or contracts definitions consistent?
	+ Are coding conventions and standards adhered to?
* **Type Safety**:
	+ Are TypeScript types correctly defined and used?
	+ Are type guards and conditional types used correctly?
* **ORM and Database**:
	+ Is ORM used correctly to interact with the database?
	+ Are database transactions and queries optimized?
* **Contracts and Zod Schema**:
	+ Are contracts and Zod Schema definitions consistent and correct?
	+ Are inputs, outputs, and data structures validated correctly?
* **Architecture and Design**:
	+ Is the architecture modular, scalable, and maintainable?
	+ Are concerns separated correctly, and is the code organized logically?
* **Testing and Validation**:
	+ Are unit tests, integration tests, and end-to-end tests written and passing?
	+ Are validation and error handling mechanisms in place?