import Konva from "konva";
import {Point} from "../models/points/Point";

export class CirclePrinter implements IPrinter<Point> {
    private readonly stage: Konva.Stage;
    private readonly layer: Konva.Layer;

    constructor(stage: Konva.Stage, layer?: Konva.Layer) {
        this.layer = layer ?? new Konva.Layer();
        this.stage = stage;
        this.stage.add(this.layer);
    }

    print(model: Point): void {
        const circle = new Konva.Circle({
            x: model.x,
            y: model.y,
            radius: model.radius,
            fill: "#000000",
            draggable: true
        });

        this.layer.add(circle);
        this.layer.draw();
    }
}