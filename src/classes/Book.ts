export class Book {
    public title: string;
    public author: string;
    public ISBN: string;
    public num_owned: number;
    constructor(_title: string, _author: string, _ISBN: string, _num_owned: number) {
        this.title = _title;
        this.author = _author;
        this.ISBN = _ISBN;
        this.num_owned = _num_owned;
    }
}
