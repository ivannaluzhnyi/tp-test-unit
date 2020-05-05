import { Request, Response } from "express";

export class Auth {
    public regisetrUser(req: Request, res: Response) {
        console.log(req.sessionID);
        return res.status(200).send("Register user");
    }

    public regisetrUserPost(req: Request, res: Response) {
        console.log("Inside POST /register callback function");
        console.log(req.body);
        return res.status(200).send("Register regisetrUserPost");
    }
}
