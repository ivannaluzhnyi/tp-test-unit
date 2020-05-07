import { MailerService } from "../../src/services/Mailer.service";

describe("MailerService Tests", () => {
    const mailerInstance = new MailerService();

    it("should can return false with age < 18", () => {
        expect(mailerInstance.ageRequirement(16)).toBe(false);
    });
    it("should can return true with age < 18", () => {
        expect(mailerInstance.ageRequirement(23)).toBe(true);
    });
    it("should can send mailer with age > 18", () => {
        expect(mailerInstance.sendMail("test","test","test", 13)).toBe(false);
    });;
    it("should can send mailer with age > 18", () => {
        expect(mailerInstance.sendMail("test","test","test", 53)).toBe(true);
    });;
  
});
