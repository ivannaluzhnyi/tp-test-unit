import { Request, Response } from "express";
import Axios, { AxiosInstance } from "axios";
import { apiURL } from "../constants/todo.constants";
import { EErrorCode } from "../constants/enum";
import ToDoListModel, { ToDoListConstructorProps } from "../Models/ToDoList";

export class TodoList {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = Axios.create({
            baseURL: apiURL,
        });
    }

    public create = async (req: Request, res: Response) => {
        if (req.body.userId === undefined || req.body.userId === null) {
            return res.status(400).json({
                error: {
                    code: EErrorCode.REQUEST_ERROR,
                    description: "Id de user n'est pas disponible.",
                },
            });
        }

        if (req.body.items !== undefined && req.body.items.length > 1) {
            return res.status(400).json({
                error: {
                    code: EErrorCode.REQUEST_ERROR,
                    description: `Vous pouvez ajouter qu'un todo a la fois. (Nbr: ${req.body.items.length})`,
                },
            });
        }

        try {
            const response = await this.getTodoListByUserId(req.body.userId);

            if (response) {
                const { data, status } = response;

                if (status === 200 && data.length === 0) {
                    return this.createNewTodosList(req, res);
                }

                if (req.body.items.length === 0) {
                    return res.status(400).json({
                        error: {
                            code: EErrorCode.REQUEST_ERROR,
                            description: `Veuillez ajouter un todo!`,
                        },
                    });
                }

                return this.setNewTodo(req, res, data[0]);
            }

            return this.catchServerError(res);
        } catch (error) {
            return this.catchServerError(res);
        }
    };

    private setNewTodo = async (
        req: Request,
        res: Response,
        data: ToDoListConstructorProps
    ) => {
        console.log("data => ", data);
        const eList = new ToDoListModel({
            ...data,
        });

        console.log("eList => ", eList);

        const newTodosListResponse = await this.axiosInstance({
            url: `/todos/${eList.getId}`,
            method: "POST",
            data: eList,
        });

        console.log("newTodosListResponse => ", newTodosListResponse);

        console.log("eList.getId => ", eList.getId);

        if (eList.setItem(req.body.items[0]) !== null) {
            const newTodosListResponse = await this.axiosInstance({
                url: `/todos?id=${eList.getId}`,
                method: "PUT",
                data: eList,
            });
            return res.status(200).json({ id: newTodosListResponse.data.id });
        }

        return res.status(400).json({
            error: {
                code: EErrorCode.NOT_VALIDE,
                description: `Vous ne pouvez pas encore ajouter des todos! (intervalle: 30 min.)`,
            },
        });
    };

    private createNewTodosList = async (req: Request, res: Response) => {
        const nList = new ToDoListModel({
            userId: req.body.userId,
            items: req.body.items,
        });

        const newTodosListResponse = await this.axiosInstance({
            url: `/todos`,
            method: "POST",
            data: nList,
        });
        return res.status(200).json({ id: newTodosListResponse.data.id });
    };

    public getAllTodos = async (req: Request, res: Response) => {
        try {
            const response = await this.axiosInstance({
                url: `/todos`,
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

    public getTodoListByUserId = async (userId: string) => {
        try {
            return await this.axiosInstance({
                url: `/todos?userId=${userId}`,
                method: "GET",
            });
        } catch (error) {
            return undefined;
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
