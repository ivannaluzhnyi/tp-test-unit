import { calculateAge } from "../utils";
import { v4 as uuidv4 } from "uuid";

class User {
    private email: string | null;
    private firstName: string | null;
    private lastName: string | null;
    private birthday: Date | null;
    private password: string | null;
    private id: string;

    constructor() {
        this.email = null;
        this.firstName = null;
        this.lastName = null;
        this.birthday = null;
        this.password = null;
        this.id = uuidv4();
    }

    public setEmail(email: string) {
        this.email = email;
    }
    public setLastName(lastName: string) {
        this.lastName = lastName;
    }
    public setFirstName(firstName: string) {
        this.firstName = firstName;
    }

    public setPassword(password: string) {
        this.password = password;
    }

    public setBirthDay(birthday: Date | string) {
        if (typeof birthday === "string") {
            this.birthday = new Date(birthday);
        } else {
            this.birthday = birthday;
        }
    }

    get getEmail(): string {
        return this.email || "";
    }
    get getFirstName(): string {
        return this.firstName || "";
    }
    get getLastName(): string {
        return this.lastName || "";
    }
    get getBirthday(): Date | null {
        return this.birthday;
    }

    get getPassword(): string | null {
        return this.password;
    }

    get getId(): string {
        return this.id;
    }

    isValidEmail = (): boolean =>
        this.getEmail !== "" &&
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.getEmail);

    isValidName = (): boolean =>
        this.getFirstName !== "" &&
        this.getFirstName !== null &&
        this.getLastName !== "" &&
        this.getLastName !== null;

    isValidPassword = (): boolean =>
        this.getPassword !== null &&
        this.getPassword.length > 7 &&
        this.getPassword.length < 41;

    isValidBirthday = (): boolean =>
        this.getBirthday !== null &&
        calculateAge(this.getBirthday as Date) > 13;

    isValid = (): boolean =>
        this.isValidEmail() &&
        this.isValidName() &&
        this.isValidBirthday() &&
        this.isValidPassword();
}

export default User;
