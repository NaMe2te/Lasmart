import Konva from "konva";
import {Point} from "../../models/points/Point";
import {IPrinter} from "../../infrastructure/interfaces/IPrinter";
import {EventManager} from "../utils/EventManager";

export class PointPrinter implements IPrinter<Point> {
    private readonly _layer: Konva.Layer;

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

        this._layer.add(circle);

        return circle;
    }
}