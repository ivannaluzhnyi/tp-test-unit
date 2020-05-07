import { UserService } from "../../src/services/User.service";
import editJsonFile from "edit-json-file";

import dt from "../../database/db.json";
import { EErrorCode } from "../../src/constants/enum";
const allUsersDB = dt.users;

// TEST IF ALL SERICES IS UP
// yarn start & yarn api

describe("User Service Tests", () => {
    const userService = new UserService();

    it("getUsers", async () => {
        const mockResponse = () => {
            let res: any = {};
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);
            return res;
        };

        const res = mockResponse();
        await userService.getUsers({} as any, res as any);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(allUsersDB);
    });

    it("getUsers if users empty", async () => {
        const mockResponse = () => {
            let res: any = {};
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);
            return res;
        };

        const res = mockResponse();
        await userService.getUsers({} as any, res as any);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(allUsersDB);
    });

    it("Should fail create user (data not valide) ", async () => {
        const mockResponse = () => {
            let res: any = {};
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);
            return res;
        };

        const mockRequest = () => ({
            body: {
                email: "test.sqdqsd.com",
                firstName: "Test",
                lastName: "Tesovich",
                password: "qdqsdqsdqsdhhhqsd",
                birthday: "2000-03-13",
            },
        });
        const req = mockRequest();
        const res = mockResponse();
        await userService.create(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({
            error: {
                code: EErrorCode.NOT_VALIDE,
                description: "User n'est pas valide",
            },
        });
    });

    it("Should create user=> ", async () => {
        const mockResponse = () => {
            let res: any = {};
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);
            return res;
        };

        const mockRequest = () => ({
            body: {
                email: "test.qsd@gmail.com",
                firstName: "Test",
                lastName: "Tesovich",
                password: "qdqsdqsdqsdhhhqsd",
                birthday: "2000-03-13",
            },
        });
        const req = mockRequest();
        const res = mockResponse();
        await userService.create(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
        expect(res.json.mock.calls[0][0].id).toBeDefined();
    });
});
