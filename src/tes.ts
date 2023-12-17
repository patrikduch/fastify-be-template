import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import { UserEntity } from "./entity/user-entity";
import { ObjectLiteral, Repository } from "typeorm";

// Augment the Fastify types to include the orm property
declare module "fastify" {
  export interface FastifyInstance {
    orm: {
      // Specify that the Entity type parameter must extend ObjectLiteral
      getRepository<Entity extends ObjectLiteral>(
        entity: new () => Entity
      ): Repository<Entity>;
    };
  }
}

export default async function (
  fastify: FastifyInstance,
  opts: Record<string, unknown>
): Promise<void> {
  fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    // Retrieve the repository for the UserEntity
    const userRepository = fastify.orm.getRepository(UserEntity);

    // Find all users
    const users = await userRepository.find();

    console.log(users);

    // Return the users
    return users;
  });
}
