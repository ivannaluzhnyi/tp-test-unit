import { Application } from "express";
import { TodoListService } from "./services/TodoList.service";
import { Auth } from "./services/Auth.service";
import { UserService } from "./services/User.service";

export class Controller {
    private todoListService: TodoListService;
    private authService: Auth;
    private userService: UserService;

    constructor(private app: Application) {
        this.todoListService = new TodoListService();
        this.authService = new Auth();
        this.userService = new UserService();
        this.routes();
    }

    public routes() {
        this.app.route("/register").get(this.authService.regisetrUser);
        this.app.route("/register").post(this.authService.regisetrUserPost);

        this.app.route("/user/create").post(this.userService.create);
        this.app.route("/users").get(this.userService.getUsers);

        this.app.route("/todos").get(this.todoListService.getAllTodos);
        this.app.route("/todo/create").post(this.todoListService.create);
    }
}
