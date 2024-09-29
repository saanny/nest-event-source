
# Nest Event Sourcing with Cassandra

This project demonstrates the implementation of **Event Sourcing** and **CQRS** (Command Query Responsibility Segregation) patterns in a **NestJS** application using **Cassandra** as the event store and projection database.

## Features

- **Event Sourcing**: Events are stored in Cassandra and can be used to rebuild the state of the system at any point in time.
- **CQRS**: Separates the logic of commands (write operations) and queries (read operations).
- **Cassandra Integration**: Cassandra is used to store both event logs and projections.