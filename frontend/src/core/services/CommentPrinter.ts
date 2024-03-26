import Konva from "konva";
import {IPrinter} from "../../infrastructure/interfaces/IPrinter";
import {ICommentPrinterProps} from "../../infrastructure/interfaces/ICommentPrinterProps";

export class CommentPrinter implements IPrinter<ICommentPrinterProps> {
    private readonly _layer: Konva.Layer;

    private readonly RECT_HEIGHT: number = 20;
    private readonly RECT_HEIGHT_GAP: number = 5;
    private readonly RECT_RIGHT_PADDING: number = 6;

    constructor(layer: Konva.Layer) {
        this._layer = layer;
    }

    print(model: ICommentPrinterProps): { rect: Konva.Rect, text: Konva.Text } {

        let textY = model.point.y + 15 + model.point.radius + (this.RECT_HEIGHT + this.RECT_HEIGHT_GAP) * model.indexComment;
        let rectY = model.point.y + 15 + model.point.radius + (this.RECT_HEIGHT + this.RECT_HEIGHT_GAP) * model.indexComment - this.RECT_HEIGHT / 2 + 3;

        let text = new Konva.Text({
            y: textY,
            text: model.comment.text,
            fontSize: 12,
            fill: 'black',
            align: 'center',
            verticalAlign: 'middle'
        });

        let textX = model.point.x - text.width() / 2 + 3;

        text.x(textX)

        let rectX = model.point.x - text.width() / 2;

        let rect = new Konva.Rect({
            x: rectX,
            y: rectY,
            width: text.width() + this.RECT_RIGHT_PADDING,
            height: this.RECT_HEIGHT,
            fill: model.comment.color,
            stroke: 'black',
            align: 'center',
            strokeWidth: 1
        });

        this._layer.add(rect);
        this._layer.add(text);

        return { rect: rect, text: text };
    }
}