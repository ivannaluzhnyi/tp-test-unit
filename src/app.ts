import express, { Application } from "express";

import { Controller } from "./main.controller";
import bodyParser from "body-parser";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import session from "express-session";
import sessionFileStore from "session-file-store";
import passport, { PassportStatic } from "passport";
import { Strategy } from "passport-local";

const FileStore = sessionFileStore(session);

const users = [{ id: "2f24vvg", email: "test@test.com", password: "password" }];

class App {
    public app: Application;
    public passport: PassportStatic;

    public todoController: Controller;

    constructor() {
        this.app = express();
        this.passport = passport;
        this.setConfig();

        this.todoController = new Controller(this.app);
    }

    private setConfig() {
        this.passport.use(
            new Strategy(
                { usernameField: "email" },
                (email, password, done) => {
                    console.log("Inside local strategy callback");
                    // here is where you make a call to the database
                    // to find the user based on their username or email address
                    // for now, we'll just pretend we found that it was users[0]
                    const user = users[0];
                    if (email === user.email && password === user.password) {
                        console.log("Local strategy returned true");
                        return done(null, user);
                    }
                }
            )
        );

        // tell passport how to serialize the user
        this.passport.serializeUser((user, done) => {
            console.log(
                "Inside serializeUser callback. User id is save to the session file store here"
            );
            done(null, (user as any).id);
        });

        this.app.use(
            session({
                genid: (req) => {
                    console.log("Inside the session middleware");
                    console.log(req.sessionID);
                    return uuidv4(); // use UUIDs for session IDs
                },
                store: new FileStore(),
                secret: "keyboard cat",
                resave: false,
                saveUninitialized: true,
            })
        );

        this.app.use(bodyParser.json({ limit: "50mb" }));
        this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
        this.app.use(cors());

        this.app.use(this.passport.initialize());
        this.app.use(this.passport.session());
    }
}

export default new App().app;
