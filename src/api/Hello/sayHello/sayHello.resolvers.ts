import { SayHelloQueryArgs, Greeting } from "../../../types/graph";

const resolvers = {
  Query: {
    sayHello: (_, args: SayHelloQueryArgs): Greeting => {
      return {
        error: false,
        text: `hello ${args.name}`
      };
    }
  }
};

export default resolvers;
