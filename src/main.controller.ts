import { Application } from "express";
import { TodoList } from "./services/TodoList.service";
import { Auth } from "./services/Auth.service";

export class Controller {
    private todoListService: TodoList;
    private authService: Auth;

    constructor(private app: Application) {
        this.todoListService = new TodoList();
        this.authService = new Auth();
        this.routes();
    }

    public routes() {
        this.app.route("/").get(this.todoListService.welcomeMessage);
        this.app.route("/register").get(this.authService.regisetrUser);
        this.app.route("/register").post(this.authService.regisetrUserPost);
    }
}
