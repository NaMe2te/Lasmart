import Konva from "konva";
import {Point} from "./models/points/Point";
import {CirclePrinter} from "./utils/CirclePrinter";
import {Guid} from "guid-typescript";

class App {
    private _pointPrinter: IPrinter<Point>;
    private points: Point[] = [];

    constructor(private containerId: string) {
        const stage = new Konva.Stage({
            container: this.containerId,
            width: window.innerWidth,
            height: window.innerHeight
        });

        this._pointPrinter = new CirclePrinter(stage);
    }

    public addPoint() {
        const point = new Point(Guid.create(), 100, 200, 20, "red", []);
        this.points.push(point);
        this._pointPrinter.print(point);
    }
}

const app = new App("app");
app.addPoint();
