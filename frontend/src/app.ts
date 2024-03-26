import Konva from "konva";
import {EventManager} from "./utils/EventManager";
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
            width: document.body.clientWidth,
            height: window.innerHeight
        });

        this._layer = new Konva.Layer();
        this._mainStage.add(this._layer);
        this._groupManager = new GroupManager(this._layer, eventManager);
        this.addPointFuncToEvent();
    }

    public async addPoint(x: number, y: number, radius: number, color: string) {
        await this._groupManager.createGroup(x, y, radius, color);
    }

    private addPointFuncToEvent() {
        this._eventManager.createPointEvent(this.addPoint.bind(this));
    }
}


const eventManager = new EventManager();
eventManager.initializeInitialEvents();

const app = new App("app", eventManager);
