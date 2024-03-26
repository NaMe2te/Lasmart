import {Guid} from "guid-typescript";

export class Comment {
    public readonly id: string;
    public readonly pointId: string;
    public text: string;
    public color: string;

    constructor(id: string, text: string, color: string, pointId: string) {
        this.id = id;
        this.text = text;
        this.color = color;
        this.pointId = pointId;
    }

    public static fromDto(json: any): Comment {
        const id = json.id;
        const text = json.text;
        const color = json.color;
        const pointId = json.pointId;

        return new Comment(id, text, color, pointId);
    }
}