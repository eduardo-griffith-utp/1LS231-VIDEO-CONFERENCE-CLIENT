class Note {
    constructor(id = null, sender = {}, content = {}) {
        this.id = id;
        this.sender = sender;
        this.content = content;
    }

    toJSON() {
        return {
            id: this.id,
            sender: this.sender,
            content: this.content
        };
    }
}
