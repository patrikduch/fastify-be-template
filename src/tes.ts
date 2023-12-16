import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export default async function (
  fastify: FastifyInstance,
  opts: Record<string, unknown>
): Promise<void> {
  fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    return "Patrik Duch";
  });
}
