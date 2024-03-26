import Konva from "konva";
import {Point} from "../models/points/Point";
import {PointPrinter} from "./PointPrinter";
import {Guid} from "guid-typescript";
import {Comment} from "../models/comments/Comment";
import {IPrinter} from "../infrastructure/interfaces/IPrinter";
import {EventManager} from "./EventManager";
import {CommentPrinter} from "./CommentPrinter";
import {CommentService} from "../services/CommentService";
import {CreateComment} from "../models/comments/CreateComment";
import {CreatePoint} from "../models/points/CreatePoint";
import {PointService} from "../services/PointService";

export class GroupManager {
    private readonly _groups: Map<string, Konva.Group>;
    private readonly _layer: Konva.Layer;

    private readonly _pointPrinter: IPrinter<Point, Konva.Circle>;
    private readonly _commentPrinter: CommentPrinter;

    private readonly _commentService: CommentService;
    private readonly _pointService: PointService;

    private readonly _eventManager: EventManager;

    constructor(layer: Konva.Layer, eventManager: EventManager) {
        this._groups = new Map();
        this._layer = layer;
        this._eventManager = eventManager;
        this._pointPrinter = new PointPrinter(this._layer, this._eventManager);
        this._commentPrinter = new CommentPrinter(this._layer);
        this._commentService = new CommentService();
        this._pointService = new PointService();
    }

    public async createGroup(x: number, y: number, radius: number, color: string) {
        const group = new Konva.Group({draggable: true});

        const point: Point = await this._pointService.create(new CreatePoint(x, y, radius, color));
        /*const point = new Point(Guid.create(), x, y, radius, color, [new Comment(Guid.create(), "rerewrewrewrewrewrewrwerewrewrewrwerwed", "red", Guid.create()),
            new Comment(Guid.create(), "red", "red", Guid.create()), new Comment(Guid.create(), "red", "red", Guid.create())]);*/


        const shape: Konva.Circle = this._pointPrinter.print(point);
        group.add(shape);

        point.comments.forEach((comment, i) => {
            console.log(i);
            let resComment = this._commentPrinter.print(point, comment, i);
            group.add(resComment.rect, resComment.text);
        });

        this._layer.add(group);
        this._layer.draw();

        this._groups.set(point.id, group);

        this._eventManager.addEventsToGroup(group, async () => await this.removeGroup(group, point.id));
        this._eventManager.addEventsToPoint(shape, async (text: string, color: string) => {
            await this.addComment(text, color, group, point);
        });
    }

    public async removeGroup(group: Konva.Group, pointId: string) {
        await this._pointService.remove(pointId);
        group.hide();
    }

    public async addComment(text: string, color: string, group: Konva.Group, point: Point) {
        let comment = await this._commentService.create(new CreateComment(text, color, point.id));
        console.log(JSON.stringify(comment));
        let resComment = this._commentPrinter.print(point, comment, point.comments.length);
        point.addComment(comment);
        group.add(resComment.rect, resComment.text);
    }
}