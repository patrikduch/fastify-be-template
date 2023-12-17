import { FastifyInstance } from "fastify";

class TypeOrmExampleService {
  private readonly fastify;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }
}

export default TypeOrmExampleService;
