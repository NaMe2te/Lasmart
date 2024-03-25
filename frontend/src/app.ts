import Konva from "konva";
import {Point} from "./models/points/Point";
import {PointPrinter} from "./utils/PointPrinter";
import {Guid} from "guid-typescript";
import {IPrinter} from "./infrastructure/interfaces/IPrinter";
import $ from "jquery";
import {EventManager} from "./utils/EventManager";
import {Comment} from "./models/comments/Comment";
import {GroupManager} from "./utils/GroupManager";

class App {
    private readonly _groupManager: GroupManager;
    private readonly _eventManager: EventManager;
    private readonly _mainStage: Konva.Stage;

    private _layer: Konva.Layer;

    constructor(private containerId: string, eventManager: EventManager) {
        this._eventManager = eventManager;
        this._mainStage = new Konva.Stage({
            container: this.containerId,
            width: window.innerWidth,
            height: window.innerHeight
        });

        this._layer = new Konva.Layer();
        this._mainStage.add(this._layer);
        this._groupManager = new GroupManager(this._layer, eventManager)
    }

    public addPoint(x: number, y: number) {
        this._groupManager.createGroup(x, y);
    }
}


const eventManager = new EventManager();
eventManager.initializeInitialEvents();

const app = new App("app", eventManager);
app.addPoint(100, 200);
app.addPoint(150, 250);
app.addPoint(200, 300);
