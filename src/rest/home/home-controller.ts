import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import { UserEntity } from "../../entities/user-entity";

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
