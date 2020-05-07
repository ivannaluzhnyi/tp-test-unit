import ToDoList from "../src/Models/ToDoList";
import ItemToDoList from "../src/Models/ItemTodoList";

import { v4 as uuidv4 } from "uuid";

describe("ToDoList Tests", () => {
    const inst = new ToDoList();

    it("ToDoList is empty", () => {
        expect(inst.getItems).toEqual([]);
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
        const initTodo = new ToDoList([item]);

        expect(initTodo.getItems).toEqual([item]);
        expect(initTodo.canAddItem(item)).toEqual(null);
    });

    it("setItem with value ", () => {
        console.log("inst ==> ", inst);
    });
});
