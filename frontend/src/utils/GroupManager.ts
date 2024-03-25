import Konva from "konva";
import {Point} from "../models/points/Point";
import {PointPrinter} from "./PointPrinter";
import {Guid} from "guid-typescript";
import {Comment} from "../models/comments/Comment";
import {IPrinter} from "../infrastructure/interfaces/IPrinter";
import {EventManager} from "./EventManager";
import {CommentPrinter} from "./CommentPrinter";

export class GroupManager {
    private readonly _groups: Map<Guid, Konva.Group>;
    private readonly _layer: Konva.Layer;
    private readonly _pointPrinter: IPrinter<Point, Konva.Circle>;
    private readonly _commentPrinter: CommentPrinter;

    private readonly _eventManager: EventManager;

    constructor(layer: Konva.Layer, eventManager: EventManager) {
        this._groups = new Map();
        this._layer = layer;
        this._eventManager = eventManager;
        this._pointPrinter = new PointPrinter(this._layer);
        this._commentPrinter = new CommentPrinter(this._layer);
    }

    public createGroup(x: number, y: number, radius: number, color: string) {
        const group = new Konva.Group({draggable: true});

        // const point = new CreatePoint(x, y, radius, color);
        const point = new Point(Guid.create(), x, y, radius, color, [new Comment(Guid.create(), "rerewrewrewrewrewrewrwerewrewrewrwerwed", "red", Guid.create()),
            new Comment(Guid.create(), "red", "red", Guid.create()), new Comment(Guid.create(), "red", "red", Guid.create())]);
        // TODO: Передать на вызов api

        const shape: Konva.Circle = this._pointPrinter.print(point);
        group.add(shape);

        point.comments.forEach((comment, i) => {
            let resComment = this._commentPrinter.print(point, comment, i);
            group.add(resComment.rect, resComment.text);
        });

        this._layer.add(group);
        this._layer.draw();

        this._groups.set(point.id, group);

        this._eventManager.addEventsToGroup(group, () => this.removeGroup(group));
    }

    public removeGroup(group: Konva.Group) {
        group.hide();
    }
}