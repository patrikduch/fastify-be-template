import { FastifyInstance } from "fastify";
import TypeOrmExampleService from "../services/typeorm-example-service";

export default async function servicesPlugin(
  fastify: FastifyInstance,
  options: Record<string, unknown>
) {
  const pokemonService = new TypeOrmExampleService(fastify);
  fastify.decorate("pokemonService", pokemonService);
}
