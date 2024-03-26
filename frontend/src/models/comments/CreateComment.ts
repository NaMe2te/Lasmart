export class CreateComment {
    public readonly pointId: string;
    public text: string;
    public color: string;

    constructor(text: string, color: string, pointId: string) {
        this.text = text;
        this.color = color;
        this.pointId = pointId;
    }
}