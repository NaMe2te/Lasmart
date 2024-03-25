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

    constructor(container: string, eventManager: EventManager) {
        this._eventManager = eventManager;
        this._mainStage = new Konva.Stage({
            container: container,
            width: window.innerWidth,
            height: window.innerHeight
        });

        this._layer = new Konva.Layer();
        this._mainStage.add(this._layer);
        this._groupManager = new GroupManager(this._layer, eventManager);
        this.addPointFuncToEvent();
    }

    public addPoint(x: number, y: number, radius: number, color: string) {
        this._groupManager.createGroup(x, y, radius, color);
    }

    private addPointFuncToEvent() {
        this._eventManager.createPointEvent(this.addPoint.bind(this));
    }
}


const eventManager = new EventManager();
eventManager.initializeInitialEvents();

const app = new App("app", eventManager);
