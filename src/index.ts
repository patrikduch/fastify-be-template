import { fastify } from "fastify";
import mercurius from "mercurius";
import pino from "pino";
import test from "./tes";
import { renderPlaygroundPage } from "graphql-playground-html";
import { schema } from "./graphql/schema";

const Port = process.env.PORT || 7000;
const server = fastify({
  logger: pino({ level: "info" }),
});

const resolvers = {
  Query: {
    hello: () => "Hello World!",
  },
};

server.get("/playground", (_, reply) => {
  reply.header("Content-Type", "text/html");
  reply.send(renderPlaygroundPage({ endpoint: "/graphql" }));
});

server.register(test);

server.register(mercurius, {
  schema,
  resolvers,
});

const start = async () => {
  try {
    await server.listen(Port);
    console.log("Server started successfully");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
