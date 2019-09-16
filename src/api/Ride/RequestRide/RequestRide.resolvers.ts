import { Resolvers } from "../../../types/resolvers";
import { RequestRideMutationArgs, RequestRideResponse } from "../../../types/graph";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Ride from "../../../entities/Ride";


const resolvers: Resolvers = {
    Mutation: {
        RequestRide: privateResolver(async (
            _,
            args: RequestRideMutationArgs,
            { req, pubSub }): Promise<RequestRideResponse> => {

            const user: User = req.user;
            if (!user.isRiding) {
                try {
                    const ride: any = await Ride.create({ ...args, passenger: user }).save();
                    pubSub.publish("rideRequest", { NearbyRideSubscription: ride });
                    return {
                        ok: true,
                        error: null,
                        ride
                    }
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        ride: null
                    }
                }
            } else {
                return {
                    ok: false,
                    error: "You can't request two rides",
                    ride: null
                }
            }


        })
    }
}

export default resolvers