export const typeDefs = ["type Query {\n  sayBye: String!\n  sayHello(name: String!): Greeting!\n}\n\ntype Greeting {\n  error: Boolean!\n  text: String!\n}\n"];
/* tslint:disable */

export interface Query {
  sayBye: string;
  sayHello: Greeting;
}

export interface SayHelloQueryArgs {
  name: string;
}

export interface Greeting {
  error: boolean;
  text: string;
}
