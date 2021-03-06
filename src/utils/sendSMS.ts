import Twilio from "twilio";

const twilioClient = Twilio(process.env.TWILLIO_SID, process.env.TWILLIO_TOKEN)

const sendSMS = (to: string, body: string) => {
    return twilioClient.messages.create({
        body,
        to,
        from: process.env.TWILLIO_PHONE
    });
};

export const sendVerificationSMS = (to: string, key: string) => {
    sendSMS(to, `Your verification key is: ${key}`);
    console.log("sendVerificationSMS ======= : ", to, key)
}