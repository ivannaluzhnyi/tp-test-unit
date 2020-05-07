import ItemToDoList from "../../src/Models/ItemTodoList";
import { getRandomString } from "../../src";

describe("ItemToDoList Tests", () => {
    const itemInst = new ItemToDoList();

    it("should render correctly without value", () => {
        expect(itemInst.getName === "" && itemInst.getContent === "").toBe(
            true
        );
    });

    it("should render correctly with value", () => {
        itemInst.setName("test");
        itemInst.setContent("default");
        expect(itemInst.getName !== "" && itemInst.getContent !== "").toBe(
            true
        );
    });

    it("check length content", () => {
        let content = getRandomString(1001);

        itemInst.setContent(content);
        expect(itemInst.getContent.length === content.length).toBeFalsy();
    });

    it("check created time", () => {
        // doesn't use initItem because the time will not be the same, so you have to create the same instance
        const newIt = new ItemToDoList();
        expect(newIt.getCreatedAt === new Date().getTime()).toBe(true);
    });
});
