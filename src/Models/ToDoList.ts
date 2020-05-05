import ItemToDoList from "./ItemToDoList";

class ToDoList {
    private items: ItemToDoList[];
    private lastTimeAdded: Date | null;

    constructor(items?: ItemToDoList[]) {
        this.lastTimeAdded = null;
        this.items = this.setInitItems(items);
    }

    setInitItems(items?: ItemToDoList[]) {
        if (items && items.length < 11) {
            this.lastTimeAdded = new Date();
            return items;
        }
        return [];
    }

    setLastTimeAdded = () => {
        this.lastTimeAdded = new Date();
    };

    setItem = (itemTodo: ItemToDoList): ItemToDoList | null => {
        const checkedItem = this.canAddItem(itemTodo);

        if (checkedItem !== null) {
            this.setLastTimeAdded();
            this.items.push(itemTodo);
        }

        return checkedItem;
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
        if (this.lastTimeAdded !== null) {
            const lastTime = this.lastTimeAdded.getTime();
            const currentTime = new Date().getTime();

            const msec = currentTime - lastTime;
            const mins = Math.floor(msec / 60000);

            return mins > 30;
        }
        return true;
    };
}

export default ToDoList;
