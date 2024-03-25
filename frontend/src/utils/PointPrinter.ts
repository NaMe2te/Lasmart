import Konva from "konva";
import {Point} from "../models/points/Point";
import {IPrinter} from "../infrastructure/interfaces/IPrinter";
import {Guid} from "guid-typescript";

export class PointPrinter implements IPrinter<Point, Konva.Circle> {
    private readonly _layer: Konva.Layer;
    private _shapes: Map<Guid, Konva.Circle> = new Map();

    constructor(layer: Konva.Layer) {
        this._layer = layer;
    }

    print(model: Point): Konva.Circle {
        const circle = new Konva.Circle({
            x: model.x,
            y: model.y,
            height: model.radius,
            radius: model.radius,
            fill: model.color
        });

        this._shapes.set(model.id, circle);
        this._layer.add(circle);

        return circle;
    }

    erase(modelId: Guid): void {
        const shape = this._shapes.get(modelId);
        if (shape) {
            shape.destroy();
            this._shapes.delete(modelId);
            this._layer.draw();
        }
    }
}