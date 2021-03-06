import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetNearbyDriversResponse } from "../../../types/graph";
import User from "../../../entities/User";
import { Between, getRepository } from "typeorm";


const resolvers: Resolvers = {
    Query: {
        GetNearbyDrivers: privateResolver(async (_, __, { req }): Promise<GetNearbyDriversResponse> => {

            const user: User = req.user;
            const { lastLat, lastLng } = user;
            try {

                const drivers: any = await getRepository(User).find({
                    isDriving: true,
                    lastLat: Between(lastLat - 0.05, lastLat + 0.05),
                    lastLng: Between(lastLng - 0.05, lastLng + 0.05)
                });
                return {
                    ok: false,
                    error: null,
                    drivers
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    drivers: null
                }
            }
        })
    }
}

export default resolvers