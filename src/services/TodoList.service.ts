import { Request, Response } from "express";

export class TodoList {
    public welcomeMessage(req: Request, res: Response) {
        return res.status(200).send("Welcome to TodoList REST ^^");
    }
}
