class ItemToDoList {
    private name: string | null;
    private content: string | null;
    private created_at: number;

    constructor(name?: string, content?: string) {
        this.name = name || null;
        this.content = content || null;
        this.created_at = new Date().getTime();
    }

    public setContent(content: string) {
        if (content.length < 1001) {
            this.content = content;
        }
    }

    public setName(name: string) {
        this.name = name;
    }

    get getName(): string {
        return this.name || "";
    }

    get getContent(): string {
        return this.content || "";
    }

    get getCreatedAt(): number {
        return this.created_at;
    }
}

export default ItemToDoList;
