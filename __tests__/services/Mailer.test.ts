import User from "../../src/Models/User";
import { MailerService } from "../../src/services/Mailer.service";

describe("MailerService Tests", () => {
    const userInstance = new User();
    const mailerInstance = new MailerService();

    it("should can send mailer", () => {
        expect(mailerInstance.ageRequirement(14)).toBe(true);
    });
});
