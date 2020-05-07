import * as nodemailer from "nodemailer";

export class MailerService {
    private _transporter: nodemailer.Transporter;
    constructor() {
        this._transporter = nodemailer.createTransport(
            `smtps://UnitTest404%40gmail.com:UnitTest404@smtp.gmail.com`
        );
    }

    public ageRequirement = (age: number) => age > 18;

    sendMail(to: string, subject: string, content: string, age: number) {

        if (this.ageRequirement(age)) {
            // On envoie le mail
            return true
            // let options = {
            //     from: "toDoListAdmin@gmail.com",
            //     to: to,
            //     subject: subject,
            //     text: content,
            // };

            // this._transporter.sendMail(options, (error, info) => {
            //     if (error) {
            //         return console.log(`error: ${error}`);
            //     }
            //     console.log(`Message Sent ${info.response}`);
            // });
        }
        return false
    }
}
