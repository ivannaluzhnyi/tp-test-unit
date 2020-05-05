import { calculateAge } from "./utils";

class User {
    private email: string | null;
    private firstName: string | null;
    private lastName: string | null;
    private birthday: Date | null;

    constructor() {
        this.email = null;
        this.firstName = null;
        this.lastName = null;
        this.birthday = null;
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
    public setBirthDay(birthday: Date) {
        this.birthday = birthday;
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
        return this.birthday || null;
    }

    isValid = (): boolean => {
        const emailTest =
            this.getEmail !== "" &&
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.getEmail);

        const nameTest =
            this.getFirstName !== "" &&
            this.getFirstName !== null &&
            this.getLastName !== "" &&
            this.getLastName !== null;

        const birthdayTest =
            this.getBirthday !== null &&
            calculateAge(this.getBirthday as Date) > 13;

        return emailTest && nameTest && birthdayTest;
    };
}

export default User;
