import User from "../../src/Models/User";

describe("User Tests", () => {
    const userInstance = new User();

    beforeEach(() => {
        userInstance.setEmail("ivan.naluzhnyi@gmail.com");
        userInstance.setFirstName("Ivan");
        userInstance.setLastName("Naluzhnyi");
        userInstance.setPassword("12345678");
    });

    it("Should have a user id", () => {
        expect(userInstance.getId).not.toEqual("");
    });

    it("Initial birthday is null", () => {
        expect(userInstance.getBirthday === null).toBeTruthy();
    });

    it("Vrong email => email validator", () => {
        userInstance.setBirthDay(new Date(2000, 1, 1));
        userInstance.setEmail("ivan.naluzhail.com");
        expect(userInstance.isValid()).toBeFalsy();
    });

    it("Correct email", () => {
        userInstance.setEmail("ivan.naluzhnyi@gmail.com");
        expect(userInstance.isValid()).toBeTruthy();
    });

    it("Birthday not valid (b < 13)", () => {
        userInstance.setBirthDay(new Date(new Date().getFullYear() - 13, 1, 1));
        expect(userInstance.isValid()).toBeFalsy();
    });

    it("Birthday is null", () => {
        expect(new User().isValid()).toBeFalsy();
    });

    it("Set birthday as string", () => {
        userInstance.setBirthDay("2000-01-02");
        expect(userInstance.isValid()).toBeTruthy();
    });

    it("Set birthday as date", () => {
        userInstance.setBirthDay(new Date(2000, 1, 1));
        expect(userInstance.isValid()).toBeTruthy();
    });

    it("FirstName is null", () => {
        userInstance.setFirstName("");
        expect(userInstance.isValid()).toBeFalsy();
    });

    it("LastName is null", () => {
        userInstance.setLastName("");
        expect(userInstance.isValid()).toBeFalsy();
    });

    it("Password length < 7", () => {
        userInstance.setPassword("1234567");
        expect(userInstance.isValid()).toBeFalsy();
    });

    it("7 > password < 41 ", () => {
        userInstance.setPassword("12345678910");
        expect(userInstance.isValid()).toBe(true);
    });
});
