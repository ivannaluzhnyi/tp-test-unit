import { Request, Response } from "express";
import { apiURL } from "../constants/todo.constants";
import axios, { AxiosInstance } from "axios";
import { EErrorCode } from "../constants/enum";
import UserModel from "../Models/User";

export class User {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: apiURL,
        });
    }

    public create = async (req: Request, res: Response) => {
        const user = new UserModel();
        user.setEmail(req.body.email || "");
        user.setFirstName(req.body.firstName || "");
        user.setLastName(req.body.lastName || "");
        user.setPassword(req.body.password || "");
        user.setBirthDay(req.body.birthday || null);

        if (user.isValid()) {
            try {
                const response = await this.axiosInstance({
                    url: `/users`,
                    method: "POST",
                    data: user,
                });

                return res.status(200).json({ id: response.data.id });
            } catch (error) {
                return this.catchServerError(res);
            }
        }

        return res.status(400).json({
            error: {
                code: EErrorCode.NOT_VALIDE,
                description: "User n'est pas valide",
            },
        });
    };

    public getUsers = async (req: Request, res: Response) => {
        try {
            const response = await this.axiosInstance({
                url: `/users`,
                method: "GET",
            });

            if (response.data.length > 0) {
                return res.status(200).json(response.data);
            }

            return res.status(400).json({
                error: {
                    code: EErrorCode.NOT_FOUND,
                    description: "Aucun resultat.",
                },
            });
        } catch (error) {
            return this.catchServerError(res);
        }
    };

    private catchServerError = (res: Response) =>
        res.status(400).json({
            error: {
                code: EErrorCode.SERVER_ERROR,
                description: "Service pas disponible.",
            },
        });
}
