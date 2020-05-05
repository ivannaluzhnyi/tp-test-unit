import User from "../src/Models/User";

describe("User Tests", () => {
    const userInstance = new User();

    beforeEach(() => {
        userInstance.setBirthDay(new Date(2000, 1, 1));
        userInstance.setEmail("ivan.naluzhnyi@gmail.com");
        userInstance.setFirstName("Ivan");
        userInstance.setLastName("Naluzhnyi");
        userInstance.setPassword("12345678");
    });

    it("bad email", () => {
        userInstance.setEmail("ivan.naluzhail.com");
        expect(userInstance.isValid()).toBe(false);
    });

    it("email", () => {
        userInstance.setEmail("ivan.naluzhnyi@gmail.com");
        expect(userInstance.isValid()).toBe(true);
    });

    it("birthday not valid (b < 13)", () => {
        userInstance.setBirthDay(new Date(new Date().getFullYear() - 13, 1, 1));
        expect(userInstance.isValid()).toBe(false);
    });

    it("birthday null", () => {
        expect(new User().isValid()).toBe(false);
    });

    it("birthday", () => {
        userInstance.setBirthDay(new Date(2000, 1, 1));
        expect(userInstance.isValid()).toBe(true);
    });

    it("firstName null", () => {
        userInstance.setFirstName("");
        expect(userInstance.isValid()).toBe(false);
    });

    it("lastName null", () => {
        userInstance.setLastName("");
        expect(userInstance.isValid()).toBe(false);
    });

    it("password < 7 ", () => {
        userInstance.setPassword("1234567");
        expect(userInstance.isValid()).toBe(false);
    });

    it("7 > password < 41 ", () => {
        userInstance.setPassword("12345678910");
        expect(userInstance.isValid()).toBe(true);
    });
});
