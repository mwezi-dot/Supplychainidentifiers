# gRPC + C/C++ (Asio) + Blockchain + Supply-Chain Simulation Starter

This starter defines protocol contracts and storage primitives for:

- Tilt sensor ingestion from fiber telephone poles
- Grid simulation for mine + agriculture supply chain risk
- Blockchain anchoring for event integrity
- PostgreSQL-backed persistence

## Layout

- `grpc-protos/telemetry.proto` — ingest service
- `grpc-protos/simulation.proto` — simulation service
- `grpc-protos/anchor.proto` — blockchain anchor service
- `sql/postgres-schema.sql` — baseline relational schema

## Suggested service topology

1. Edge collector in C++ (`boost::asio`) receives raw device frames.
2. Collector publishes normalized frames via `TelemetryIngestService`.
3. Simulation engine consumes readings + topology and exposes `SimulationService`.
4. Anchor worker hashes critical events and calls `AnchorService`.
5. Product gateway (ASP.NET Core) reads/writes PostgreSQL and queries gRPC services.

## Next implementation steps

1. Generate gRPC stubs:
   - `protoc --cpp_out=. --grpc_out=. --plugin=protoc-gen-grpc=$(which grpc_cpp_plugin) grpc-protos/*.proto`
2. Build ingest + simulation servers in C++.
3. Add ASP.NET Core gRPC clients for these services.
4. Add REST/GraphQL endpoints for product UX.
