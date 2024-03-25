import {Guid} from "guid-typescript";

export class CreatePoint {
    public _x: number;
    public _y: number;
    public _radius: number;
    public _color: string;

    constructor(x: number, y: number, radius: number, color: string) {
        this._x = x;
        this._y = y;
        this._radius = radius;
        this._color = color;
    }
}