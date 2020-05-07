import User from "../src/Models/User";

import { v4 as uuidv4 } from "uuid";

describe("User Tests", () => {
    const userInstance = new User();

    beforeEach(() => {
        userInstance.setEmail("ivan.naluzhnyi@gmail.com");
        userInstance.setFirstName("Ivan");
        userInstance.setLastName("Naluzhnyi");
        userInstance.setPassword("12345678");
    });

    it("User id test ", () => {
        expect(userInstance.getId).not.toEqual("");
    });

    it("check date null", () => {
        expect(userInstance.getBirthday === null).toBeTruthy();
    });

    it("bad email", () => {
        userInstance.setBirthDay(new Date(2000, 1, 1));
        userInstance.setEmail("ivan.naluzhail.com");
        expect(userInstance.isValid()).toBeFalsy();
    });

    it("email", () => {
        userInstance.setEmail("ivan.naluzhnyi@gmail.com");
        expect(userInstance.isValid()).toBeTruthy();
    });

    it("birthday not valid (b < 13)", () => {
        userInstance.setBirthDay(new Date(new Date().getFullYear() - 13, 1, 1));
        expect(userInstance.isValid()).toBeFalsy();
    });

    it("birthday null", () => {
        expect(new User().isValid()).toBeFalsy();
    });

    it("birthday string", () => {
        userInstance.setBirthDay("2000-01-02");
        expect(userInstance.isValid()).toBeTruthy();
    });

    it("birthday", () => {
        userInstance.setBirthDay(new Date(2000, 1, 1));
        expect(userInstance.isValid()).toBeTruthy();
    });

    it("firstName null", () => {
        userInstance.setFirstName("");
        expect(userInstance.isValid()).toBeFalsy();
    });

    it("lastName null", () => {
        userInstance.setLastName("");
        expect(userInstance.isValid()).toBeFalsy();
    });

    it("password < 7 ", () => {
        userInstance.setPassword("1234567");
        expect(userInstance.isValid()).toBeFalsy();
    });

    it("7 > password < 41 ", () => {
        userInstance.setPassword("12345678910");
        expect(userInstance.isValid()).toBe(true);
    });
});
