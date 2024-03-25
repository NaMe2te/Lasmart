import {IPrinter} from "../infrastructure/interfaces/IPrinter";
import {Comment} from "../models/comments/Comment";
import Konva from "konva";
import {Guid} from "guid-typescript";
import {Point} from "../models/points/Point";

export class CommentPrinter {
    private readonly _layer: Konva.Layer;

    private readonly RECT_HEIGHT: number = 20;
    private readonly RECT_HEIGHT_GAP: number = 5;
    private readonly RECT_RIGHT_PADDING: number = 6;

    constructor(layer: Konva.Layer) {
        this._layer = layer;
    }

    print(point: Point, comment: Comment, indexComment: number): { rect: Konva.Rect, text: Konva.Text } {

        let textY = point.y + 15 + point.radius + (this.RECT_HEIGHT + this.RECT_HEIGHT_GAP) * indexComment;
        let rectY = point.y + 15 + point.radius + (this.RECT_HEIGHT + this.RECT_HEIGHT_GAP) * indexComment - this.RECT_HEIGHT / 2 + 3;

        let text = new Konva.Text({
            y: textY,
            text: comment.text,
            fontSize: 12,
            fill: 'black',
            align: 'center',
            verticalAlign: 'middle'
        });

        let textX = point.x - text.width() / 2 + 3;

        text.x(textX)

        let rectX = point.x - text.width() / 2;

        let rect = new Konva.Rect({
            x: rectX,
            y: rectY,
            width: text.width() + this.RECT_RIGHT_PADDING,
            height: this.RECT_HEIGHT,
            fill: comment.color,
            stroke: 'black',
            align: 'center',
            strokeWidth: 1
        });



        this._layer.add(rect);
        this._layer.add(text);

        return { rect: rect, text: text };
    }
}