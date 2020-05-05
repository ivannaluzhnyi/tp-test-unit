import User from "../src/User";

describe("User Tests", () => {
    const userInstance = new User();

    beforeEach(() => {
        userInstance.setBirthDay(new Date(2000, 1, 1));
        userInstance.setEmail("teest");
        userInstance.setFirstName("Ivan");
        userInstance.setLastName("Naluzhnyi");
    });

    it("email", () => {
        userInstance.setEmail("ivan.naluzhnyi@gmail.com");
        expect(userInstance.isValid()).toBe(true);
    });

    it("email false", () => {
        userInstance.setEmail("ivan.naluzhail.com");
        expect(userInstance.isValid()).toBe(false);
    });

    it("birthday", () => {
        userInstance.setBirthDay(new Date(new Date().getFullYear() - 14, 1, 1));
        expect(userInstance.isValid()).toBe(false);
    });

    it("birthday null", () => {
        expect(new User().isValid()).toBe(false);
    });

    it("birthday false", () => {
        userInstance.setBirthDay(new Date(2000, 1, 1));
        expect(userInstance.isValid()).toBe(false);
    });

    it("firstName null", () => {
        userInstance.setFirstName("");
        expect(userInstance.isValid()).toBe(false);
    });

    it("lastName null", () => {
        userInstance.setLastName("");
        expect(userInstance.isValid()).toBe(false);
    });
});
