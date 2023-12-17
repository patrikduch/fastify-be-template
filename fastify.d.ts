import { ObjectLiteral, Repository } from "typeorm";

declare module "fastify" {
  interface FastifyInstance {
    orm: {
      getRepository<Entity extends ObjectLiteral>(
        entity: new () => Entity
      ): Repository<Entity>;
    };
  }
}
