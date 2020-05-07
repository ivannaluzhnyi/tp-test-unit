import ItemToDoList from "./ItemToDoList";
import { v4 as uuidv4 } from "uuid";

export type ToDoListConstructorProps = {
    items?: ItemToDoList[];
    userId?: string | null;
    lastTimeAdded?: number;
    id?: string;
};

class ToDoList {
    private id: string;
    private items: ItemToDoList[];
    private lastTimeAdded: number | null;
    private userId: string | null;

    constructor({
        id,
        items,
        lastTimeAdded,
        userId,
    }: ToDoListConstructorProps) {
        this.lastTimeAdded = null;
        this.items = this.setInitItems(items, lastTimeAdded);
        this.id = id ? id : uuidv4();
        this.userId = userId ? userId : null;
    }

    setInitItems(items?: ItemToDoList[], lastTimeAdded?: number) {
        if (items && items.length < 11) {
            this.lastTimeAdded = lastTimeAdded
                ? lastTimeAdded
                : new Date().getTime();
            return items;
        }
        return [];
    }

    setLastTimeAdded = () => {
        this.lastTimeAdded = new Date().getTime();
    };

    setItem = (itemTodo: ItemToDoList): ItemToDoList | null => {
        const checkedItem = this.canAddItem(itemTodo);

        if (checkedItem !== null) {
            this.setLastTimeAdded();
            this.items.push(checkedItem);
        }

        return checkedItem;
    };

    setUserId = (uId: string) => {
        if (this.userId === null) {
            this.userId = uId;
            return uId;
        }

        return this.getUserId;
    };

    get getUserId(): string | null {
        return this.userId;
    }

    get getItems(): ItemToDoList[] {
        return this.items;
    }

    get getId(): string {
        return this.id;
    }

    public canAddItem = (itemTodo: ItemToDoList) =>
        !this.isNameExist(itemTodo.getName) &&
        this.items.length < 10 &&
        this.checkTime()
            ? itemTodo
            : null;

    private isNameExist = (name: string) =>
        this.getItems.find((it) => it && it.getName === name) ? true : false;

    private checkTime = () => {
        if (this.lastTimeAdded !== null) {
            const lastTime = this.lastTimeAdded;
            const currentTime = new Date().getTime();

            const msec = currentTime - lastTime;
            const mins = Math.floor(msec / 60000);

            return mins > 30;
        }
        return true;
    };
}

export default ToDoList;
