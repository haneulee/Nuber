
import User from "../../../entities/User";
import { GetMyPlacesResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
    Query: {
        GetMyPlaces: privateResolver(
            async (_, __, { req }): Promise<GetMyPlacesResponse> => {
                try {
                    const user = await User.findOne(
                        { id: req.user.id },
                        { relations: ["places"] }
                    );

                    if (user) {
                        const places: any = user.places;

                        return {
                            ok: true,
                            error: null,
                            places
                        };
                    } else {
                        return {
                            ok: false,
                            error: "User not found",
                            places: null
                        };

                    }
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        places: null
                    };
                }
            }
        )
    }
};
export default resolvers;