export const typeDefs = ["type Query {\n  sayBye: String!\n  sayHello: Greeting!\n}\n\ntype Greeting {\n  error: Boolean!\n  text: String!\n}\n"];
/* tslint:disable */

export interface Query {
  sayBye: string;
  sayHello: Greeting;
}

export interface Greeting {
  error: boolean;
  text: string;
}
