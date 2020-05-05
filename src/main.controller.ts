import { Application } from "express";
import { TodoList } from "./services/TodoList.service";

export class Controller {
    private pokeService: TodoList;

    constructor(private app: Application) {
        this.pokeService = new TodoList();
        this.routes();
    }

    public routes() {
        this.app.route("/").get(this.pokeService.welcomeMessage);
    }
}
