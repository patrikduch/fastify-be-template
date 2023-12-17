import { fastify } from "fastify";
import mercurius from "mercurius";
import pino from "pino";
import test from "./tes";
import { renderPlaygroundPage } from "graphql-playground-html";
import { schema } from "./graphql/schema";
import ormConfig from "./ormconfig.json";
import { UserEntity } from "./entity/user-entity";
import { helloResolver } from "./graphql/resolvers/hello-resolver";

const dbConn = require("typeorm-fastify-plugin");

const Port = process.env.PORT || 7000;
const server = fastify({
  logger: pino({ level: "info" }),
});

const resolvers = {
  Query: {
    hello: helloResolver,
  },
};
// GraphQL quering background
server.get("/playground", (_, reply) => {
  reply.header("Content-Type", "text/html");
  reply.send(renderPlaygroundPage({ endpoint: "/graphql" }));
});

server.register(mercurius, {
  schema,
  resolvers,
});

server
  .register(dbConn, {
    ...ormConfig,
    entities: [UserEntity],
  })
  .ready();

server.register(test);

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
