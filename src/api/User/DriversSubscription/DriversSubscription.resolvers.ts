import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";


const resolvers = {
    Subscription: {
        DriversSubscription: {
            subscribe: withFilter(
                (_, __, { pubSub }) => pubSub.asyncIterator("driverUpdate"),
                (payload, _, { context }) => {
                    const user: User = context.user;
                    console.log(user);
                    const {
                        DriversSubscription: {
                            lastLat: driverLastLat,
                            lastLng: driverLastLng
                        }
                    } = payload;
                    // console.log(payload);
                    const { lastLat: userLastLat, lastLng: userLastLng } = user;

                    console.log(context);
                    return (
                        driverLastLat >= userLastLat - 0.05 &&
                        driverLastLat <= userLastLat + 0.05 &&
                        driverLastLng >= userLastLng - 0.05 &&
                        driverLastLng <= userLastLng + 0.05
                    );

                })
        }
    }
}

export default resolvers