import { calculateAge } from "../utils";
import ToDoList from "../Models/ToDoList";

class User {
    private email: string | null;
    private firstName: string | null;
    private lastName: string | null;
    private birthday: Date | null;
    private password: string | null;
    private idTodoList: string | null;

    constructor() {
        this.email = null;
        this.firstName = null;
        this.lastName = null;
        this.birthday = null;
        this.password = null;
        this.idTodoList = null;
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

    public setBirthDay(birthday: Date) {
        this.birthday = birthday;
    }
    public setIdTodoList(idTodoList: string) {
        this.idTodoList = idTodoList;
    }

    get getIdTodoList() {
        return this.idTodoList;
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
