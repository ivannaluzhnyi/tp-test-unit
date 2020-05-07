import ToDoList from "../src/Models/ToDoList";
import ItemToDoList from "../src/Models/ItemTodoList";

import { v4 as uuidv4 } from "uuid";

jest.useFakeTimers();

describe("ToDoList Tests", () => {
    const inst = new ToDoList({});

    it("getItems is empty", () => {
        expect(inst.getItems).toEqual([]);
    });

    it("getUserId is null", () => {
        expect(inst.getUserId).toEqual(null);
    });

    it("setUserId if null", () => {
        const id = uuidv4();
        inst.setUserId(id);
        expect(inst.getUserId).toEqual(id);
    });

    it("getId render correectly", () => {
        expect(inst.getId).not.toEqual(null);
    });

    it("setUserId if id existe", () => {
        const id = uuidv4();
        inst.setUserId(id);

        expect(inst.getUserId).toEqual(inst.getUserId);
    });

    it("check  canAddItem function", () => {
        const item = new ItemToDoList("test ppqd", uuidv4());

        expect(inst.canAddItem(item)).toEqual(item);
        expect(inst.canAddItem(item)).not.toEqual(null);
    });

    it("ToDoList with a item ", () => {
        const item = new ItemToDoList("test ppqd", uuidv4());
        inst.setItem(item);
        expect(inst.getItems.length > 0).toBeTruthy();
    });

    it("canAddItem can't add item ", () => {
        const item = new ItemToDoList("test 2", uuidv4());
        expect(inst.canAddItem(item)).toEqual(null);
    });

    it("setInitItems with value ", () => {
        const item = new ItemToDoList("test 2", uuidv4());
        const initTodo = new ToDoList({ items: [item] });

        expect(initTodo.getItems).toEqual([item]);
        expect(initTodo.canAddItem(item)).toEqual(null);
    });

    it("setInitItems with value + lastTimeAdded ", () => {
        const item = new ItemToDoList("test 2", uuidv4());
        const initTodo = new ToDoList({
            lastTimeAdded: new Date().getTime(),
            items: [item],
        });

        expect(initTodo.getItems).toEqual([item]);
        expect(initTodo.canAddItem(item)).toEqual(null);
    });

    it("setItem with value ", () => {
        const item = new ItemToDoList("test 2", uuidv4());
        expect(inst.canAddItem(item)).toEqual(null);
        expect(inst.setItem(item)).toEqual(null);
    });

    it("userId constructor ", () => {
        const id = uuidv4();
        const nInst = new ToDoList({ userId: id });
        expect(nInst.getUserId).toEqual(id);
    });

    it("id constructor ", () => {
        const id = uuidv4();
        const nInst = new ToDoList({ id });
        expect(nInst.getId).toEqual(id);
    });

    it("userId is null constructor ", () => {
        const nInst = new ToDoList({});
        expect(nInst.getUserId).toEqual(null);
    });
});
