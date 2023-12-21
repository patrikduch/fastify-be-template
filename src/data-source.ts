import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "./entities/user-entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "patrikduch",
  password: "duch",
  database: "fastify-postgres-db",
  synchronize: false,
  logging: false,
  entities: [UserEntity],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: [],
});
