import {Guid} from "guid-typescript";

export class CreateComment {
    public readonly _pointId: Guid;
    public _text: string;
    public _color: string;

    constructor(text: string, color: string, pointId: Guid) {
        this._text = text;
        this._color = color;
        this._pointId = pointId;
    }
}