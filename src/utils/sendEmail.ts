import Mailgun from "mailgun-js"

const mailGunClient = new Mailgun({
    apiKey: process.env.MAILGUN_API_KEY || "",
    domain: "sandboxfd81e2d0c9c74ae99347deb478b712fc.mailgun.org"
})

const sendEmail = (subject: string, html: string) => {
    const emailData = {
        from: "lovesky4294@gmail.com",
        to: "lovesky4294@gmail.com",
        subject,
        html
    }

    return mailGunClient.messages().send(emailData)
}

export const sendVerificationEmail = (fullName: string, key: string) => {
    const emailSubject = `Hello! ${fullName}, please verify your email`;
    const emailBody = `Verify your email by clicking <a href="http://nuber.com/verification/${key}/">here</a>`;

    return sendEmail(emailSubject, emailBody)

}