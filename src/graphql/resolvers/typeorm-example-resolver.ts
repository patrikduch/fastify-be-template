import { UserEntity } from "../../entities/user-entity";
import TypeOrmExampleService from "../../services/typeorm-example-service";
import { IGraphQLContext } from "../../typescript/interfaces/IGraphQLContext";

export const typeOrmExampleResolver = async (
  parent: any,
  args: any,
  context: IGraphQLContext
) => {
  try {
    const userRepository = context.fastify.orm.getRepository(UserEntity);

    const typeOrmExampleService = context.fastify.diContainer.resolve(
      "typeOrmExampleService"
    ) as TypeOrmExampleService;

    typeOrmExampleService.test();

    return await userRepository.find();
  } catch (error) {
    console.error("Resolver error:", error);
  }
};
