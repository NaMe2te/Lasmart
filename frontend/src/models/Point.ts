import {Guid} from "guid-typescript";

export class Point {
    private readonly _id: Guid;
    private _x: number;
    private _y: number;
    private _radius: number;
    private _color: string;
    private _comments: Array<Comment>;


    constructor(id: Guid, x: number, y: number, radius: number, color: string, comments: Array<Comment>) {
        this._id = id;
        this._x = x;
        this._y = y;
        this._radius = radius;
        this._color = color;
        this._comments = comments;
    }

    get id(): Guid { return this._id; }

    get x(): number { return this._x; }
    set x(value: number) { this._x = value; }

    get y(): number { return this._y; }
    set y(value: number) { this._y = value }

    get radius(): number { return this._radius; }
    set radius(value: number) { this._radius = value }

    get color(): string { return this._color; }
    set color(value: string) { this._color = value }

    get comments(): ReadonlyArray<Comment> {
        return this._comments;
    }

    addComment(comment: Comment): void {
        this._comments.push(comment);
    }
}