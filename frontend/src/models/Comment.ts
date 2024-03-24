import {Guid} from "guid-typescript";

export class Comment {
    public readonly _id: Guid;
    public readonly _pointId: Guid;
    public _text: string;
    public _color: string;

    constructor(id: Guid, text: string, color: string, pointId: Guid) {
        this._id = id;
        this._text = text;
        this._color = color;
        this._pointId = pointId;
    }

    get id(): Guid { return this._id; }
    get pointId(): Guid { return this._pointId; }

    get text(): string { return this._text; }
    set text(value: string) { this._text = value }

    get color(): string { return this._color; }
    set color(value: string) { this._color = value }
}