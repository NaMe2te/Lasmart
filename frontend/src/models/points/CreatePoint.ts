import {Guid} from "guid-typescript";
import {Comment} from "../comments/Comment";
import {Point} from "./Point";

export class CreatePoint {
    public x: number;
    public y: number;
    public radius: number;
    public color: string;
    public comments: Comment[] = [];

    constructor(x: number, y: number, radius: number, color: string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
}