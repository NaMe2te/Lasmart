import Konva from "konva";
import {IPrinter} from "../../infrastructure/interfaces/IPrinter";
import {ICommentPrinterProps} from "../../infrastructure/interfaces/ICommentPrinterProps";
import {CommentEventsHandler} from "../utils/CommentEventsHandler";
import {CommentClient} from "../clients/CommentClient";

export class CommentPrinter implements IPrinter<ICommentPrinterProps> {
    private readonly _layer: Konva.Layer;
    private readonly _commentEventsHandler: CommentEventsHandler;
    private readonly _commentClient: CommentClient;

    private readonly RECT_HEIGHT: number = 20;
    private readonly RECT_HEIGHT_GAP: number = 5;
    private readonly RECT_RIGHT_PADDING: number = 6;

    constructor(layer: Konva.Layer) {
        this._layer = layer;
        this._commentEventsHandler = new CommentEventsHandler();
        this._commentClient = new CommentClient()
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

        let textX = this.getTextX(model.point.x, text.width());

        text.x(textX)

        let rectX = textX - 3;

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


        this._commentEventsHandler.contextMenu__OpenCommentContextMenu(rect);
        this._commentEventsHandler.contextMenu__OpenCommentContextMenu(text);
        this._commentEventsHandler.onClick__OpenUpdateForms( model.comment.text, model.comment.color);
        this._commentEventsHandler.onUpdate(async (newText: string, newColor: string) => {
            model.comment.text = newText;
            model.comment.color = newColor;
            text.text(newText);
            text.x(this.getTextX(model.point.x, text.width()));
            rect.fill(newColor);
            rect.x(this.getTextX(model.point.x, text.width()) - 3);
            rect.width(text.width() + this.RECT_RIGHT_PADDING);

            model.comment = await this._commentClient.update(model.comment);
        });

        return { rect: rect, text: text };
    }

    private getTextX(pointX: number, textWidth: number): number {
        return pointX - textWidth / 2 + 3;
    }
}