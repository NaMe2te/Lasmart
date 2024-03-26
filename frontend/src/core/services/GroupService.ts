import Konva from "konva";
import {Point} from "../../models/points/Point";
import {PointPrinter} from "./PointPrinter";
import {IPrinter} from "../../infrastructure/interfaces/IPrinter";
import {CommentPrinter} from "./CommentPrinter";
import {CommentClient} from "../clients/CommentClient";
import {CreateComment} from "../../models/comments/CreateComment";
import {CreatePoint} from "../../models/points/CreatePoint";
import {PointClient} from "../clients/PointClient";
import {ICommentPrinterProps} from "../../infrastructure/interfaces/ICommentPrinterProps";
import {PointEventsHandler} from "../utils/PointEventsHandler";
import {CommentEventsHandler} from "../utils/CommentEventsHandler";

export class GroupService {
    private readonly _groups: Map<string, Konva.Group>;
    private readonly _layer: Konva.Layer;

    private readonly _pointPrinter: IPrinter<Point>;
    private readonly _commentPrinter: IPrinter<ICommentPrinterProps>;

    private readonly _commentClient: CommentClient;
    private readonly _pointClient: PointClient;

    private readonly _pointEventsHandler: PointEventsHandler;
    private readonly _commentEventsHandler: CommentEventsHandler;

    constructor(layer: Konva.Layer) {
        this._groups = new Map();
        this._layer = layer;

        this._pointPrinter = new PointPrinter(this._layer);
        this._commentPrinter = new CommentPrinter(this._layer);

        this._commentClient = new CommentClient();
        this._pointClient = new PointClient();

        this._pointEventsHandler = new PointEventsHandler();
        this._commentEventsHandler = new CommentEventsHandler();
        this._pointEventsHandler.onAdd(this.createGroup.bind(this));
    }

    public async createGroup(x: number, y: number, radius: number, color: string) {
        const group = new Konva.Group({draggable: true});

        console.log(JSON.stringify(new CreatePoint(x, y, radius, color)));
        const point: Point = await this._pointClient.create(new CreatePoint(x, y, radius, color));

        const shape: Konva.Circle = this._pointPrinter.print(point);
        group.add(shape);

        point.comments.forEach((comment, i) => {
            console.log(i);
            let resComment = this._commentPrinter.print({
                point: point,
                comment: comment,
                indexComment: i});

            group.add(resComment.rect, resComment.text);
        });

        this._layer.add(group);
        this._layer.draw();

        this._groups.set(point.id, group);

        this._pointEventsHandler.onRemove(group, async () => await this.removeGroup(group, point.id));
        this._pointEventsHandler.contextMenu__OpenShapeContextMenu(shape);

        this._commentEventsHandler.onAdd(async (text: string, color: string) => {
            await this.addCommentToGroup(text, color, group, point);
        })
    }

    public async removeGroup(group: Konva.Group, pointId: string) {
        await this._pointClient.remove(pointId);
        group.hide();
    }

    public async addCommentToGroup(text: string, color: string, group: Konva.Group, point: Point) {
        let comment = await this._commentClient.create(new CreateComment(text, color, point.id));
        let commentProps = {
            point: point,
            comment: comment,
            indexComment: point.comments.length
        } as ICommentPrinterProps;

        let resComment = this._commentPrinter.print(commentProps);
        point.addComment(comment);
        group.add(resComment.rect, resComment.text);
    }

    public updateComment() {

    }
}