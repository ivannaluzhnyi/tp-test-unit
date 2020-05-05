import ItemToDoList from "./ItemToDoList";

class ToDoList {
    private items: ItemToDoList[];
    private lastTimeAdded: Date;

    constructor(items?: ItemToDoList[]) {
        this.items = this.setInitItems(items);
        this.lastTimeAdded = new Date();
    }

    setInitItems(items?: ItemToDoList[]) {
        if (items && items.length < 11) {
            return items;
        }
        return [];
    }

    setLastTimeAdded = () => {
        this.lastTimeAdded = new Date();
    };

    setItem = (itemTodo: ItemToDoList) => {
        const checkedItem = this.canAddItem(itemTodo);

        if (checkedItem !== null) {
            this.setLastTimeAdded();
            this.items.push(itemTodo);
        }
    };

    get getItems(): ItemToDoList[] {
        return this.items;
    }

    public canAddItem = (itemTodo: ItemToDoList) =>
        !this.isNameExist(itemTodo.getName) &&
        this.items.length < 10 &&
        this.checkTime()
            ? itemTodo
            : null;

    private isNameExist = (name: string) =>
        this.getItems.find((it) => it.getName === name) ? true : false;

    private checkTime = () => {
        const lastTime = this.lastTimeAdded.getTime();
        const currentTime = new Date().getTime();

        const msec = currentTime - lastTime;
        const mins = Math.floor(msec / 60000);

        return mins > 30;
    };
}

export default ToDoList;
