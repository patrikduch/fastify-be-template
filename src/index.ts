import "reflect-metadata";
import { fastify } from "fastify";
import mercurius, { IResolvers } from "mercurius";
import pino from "pino";
import homecontroller from "./rest/home/home-controller";
import { renderPlaygroundPage } from "graphql-playground-html";
import { schema } from "./graphql/schema";
import { AppDataSource } from "./data-source";
import { helloResolver } from "./graphql/resolvers/hello-resolver";
import { typeOrmExampleResolver } from "./graphql/resolvers/typeorm-example-resolver";
import { diContainer, fastifyAwilixPlugin } from "@fastify/awilix";
import TypeOrmExampleService from "./services/typeorm-example-service";
import { asClass, asValue } from "awilix";
import { IGraphQLContext } from "./typescript/interfaces/IGraphQLContext";

const dbConn = require("typeorm-fastify-plugin");

const Port = process.env.PORT || 7000;
const server = fastify({
  logger: pino({ level: "info" }),
});

// Registration of DI container
server.register(fastifyAwilixPlugin, {
  disposeOnClose: true,
  disposeOnResponse: true,
});
// Registration of DI services
diContainer.register({
  logger: asValue(server.log),
  typeOrmExampleService: asClass(TypeOrmExampleService).singleton(),
});

const resolvers: IResolvers<any, IGraphQLContext> = {
  Query: {
    hello: helloResolver,
    getUsers: typeOrmExampleResolver,
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
  context: (_request, _reply) => {
    // Make sure to return the context object with the Fastify instance
    return {
      fastify: server,
    };
  },
});

server
  .register(dbConn, {
    connection: AppDataSource,
  })
  .ready();

server.register(homecontroller);

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
