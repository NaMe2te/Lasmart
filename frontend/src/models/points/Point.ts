import {Comment} from "../comments/Comment";

export class Point {
    public readonly id: string;
    public x: number;
    public y: number;
    public radius: number;
    public color: string;

    private readonly _comments: Array<Comment>;

    constructor(id: string, x: number, y: number, radius: number, color: string, comments: Array<Comment>) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this._comments = comments;
    }

    get comments(): ReadonlyArray<Comment> {
        return this._comments;
    }

    public addComment(comment: Comment): void {
        this._comments.push(comment);
    }

    public static fromJson(json: any) {
        const id = json.id;
        const x = json.x;
        const y = json.y;
        const radius = json.radius;
        const color = json.color;

        const comments = json.comments ? json.comments.map((commentJson: any) => Comment.fromDto(commentJson)) : [];

        return new Point(id, x, y, radius, color, comments);
    }
}