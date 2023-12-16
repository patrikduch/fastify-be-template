import { fastify } from "fastify";
import pino from "pino";
import test from "./tes";

const Port = process.env.PORT || 7000;
const server = fastify({
  logger: pino({ level: "info" }),
});

// register plugin below:
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
