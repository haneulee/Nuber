import { Resolvers } from "../../../types/resolvers";
import { EmailSignInConnectMutationArgs, EmailSignInConnectResponse } from "../../../types/graph";
import User from "../../../entities/User";


const resolvers: Resolvers = {
    Mutation: {
        EmailSignInConnect: async (
            _, args: EmailSignInConnectMutationArgs): Promise<EmailSignInConnectResponse> => {
            const { email, password } = args;
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    return {
                        ok: false,
                        error: null,
                        token: "No user with that email"
                    };
                }

                const checkPassword = await user.comparePassword(password);
                if (checkPassword) {
                    return {
                        ok: true,
                        error: null,
                        token: "Comming Soon"
                    };
                } else {
                    return {
                        ok: false,
                        error: null,
                        token: "Wrong password"
                    };
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                };
            }

        }
    }
}

export default resolvers