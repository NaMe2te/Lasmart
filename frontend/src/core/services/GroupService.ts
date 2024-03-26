import Konva from "konva";
import { Point } from "../../models/points/Point";
import { PointPrinter } from "./PointPrinter";
import { CommentPrinter } from "./CommentPrinter";
import { CommentClient } from "../clients/CommentClient";
import { CreateComment } from "../../models/comments/CreateComment";
import { CreatePoint } from "../../models/points/CreatePoint";
import { PointClient } from "../clients/PointClient";
import { ICommentPrinterProps } from "../../infrastructure/interfaces/ICommentPrinterProps";
import { PointEventsHandler } from "../utils/PointEventsHandler";
import { CommentEventsHandler } from "../utils/CommentEventsHandler";

export class GroupService {
    private readonly _groups: Map<string, Konva.Group>;
    private readonly _layer: Konva.Layer;

    private readonly _pointPrinter: PointPrinter;
    private readonly _commentPrinter: CommentPrinter;

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

    private printPointAndComments(group: Konva.Group, point: Point): Konva.Shape {
        const shape: Konva.Circle = this._pointPrinter.print(point);
        group.add(shape);

        point.comments.forEach((comment, i) => {
            const resComment = this._commentPrinter.print({
                point: point,
                comment: comment,
                indexComment: i
            } as ICommentPrinterProps);
            group.add(resComment.rect, resComment.text);
        });

        return shape;
    }

    private setupEventHandlers(group: Konva.Group, shape: Konva.Shape, point: Point) {
        this._pointEventsHandler.onRemove(group, async () => await this.removeGroup(group, point.id));
        this._pointEventsHandler.contextMenu__OpenShapeContextMenu(shape);
        this._pointEventsHandler.onClick__OpenUpdateForms(point.radius, point.color);
        this._pointEventsHandler.onUpdate(async (radius: number, color: string) => {
            await this.updateGroup(new Point(point.id, point.x, point.y, radius, color, point.comments));
        });

        this._commentEventsHandler.onAdd(async (text: string, color: string) => {
            await this.addCommentToGroup(text, color, group, point);
        });
    }

    public async createGroup(x: number, y: number, radius: number, color: string) {
        const group = new Konva.Group({ draggable: true });

        const point: Point = await this._pointClient.create(new CreatePoint(x, y, radius, color));

        const shape = this.printPointAndComments(group, point);

        this._layer.add(group);
        this._layer.draw();

        this._groups.set(point.id, group);

        this.setupEventHandlers(group, shape, point);
    }

    public async updateGroup(point: Point) {
        const oldGroup = this._groups.get(point.id);

        if (oldGroup) {
            oldGroup.destroy();
        }

        const group = new Konva.Group({ draggable: true });

        const shape = this.printPointAndComments(group, point);

        this._layer.add(group);
        this._layer.draw();

        this.setupEventHandlers(group, shape, point);
    }

    public async removeGroup(group: Konva.Group, pointId: string) {
        await this._pointClient.remove(pointId);
        this._groups.delete(pointId);
        group.destroy();
    }

    public async addCommentToGroup(text: string, color: string, group: Konva.Group, point: Point) {
        const comment = await this._commentClient.create(new CreateComment(text, color, point.id));
        const commentProps: ICommentPrinterProps = {
            point: point,
            comment: comment,
            indexComment: point.comments.length
        };

        const resComment = this._commentPrinter.print(commentProps);
        point.comments.push(comment);
        group.add(resComment.rect, resComment.text);
    }
}