import { UserEntity } from "../../entities/user-entity";
import { IGraphQLContext } from "./context";

export const typeOrmExampleResolver = async (
  parent: any,
  args: any,
  context: IGraphQLContext
) => {
  try {
    const userRepository = context.fastify.orm.getRepository(UserEntity);
    return await userRepository.find();
  } catch (error) {
    console.error("Resolver error:", error);
  }
};
