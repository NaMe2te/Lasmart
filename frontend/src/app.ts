import Konva from "konva";
import {GroupService} from "./core/services/GroupService";
import {WindowEventsHandler} from "./core/utils/WindowEventsHandler";
import {FormEventsHandler} from "./core/utils/FormEventsHandler";

class App {
    private readonly _groupManager: GroupService;
    private readonly _mainStage: Konva.Stage;
    private readonly _windowEventsHandler: WindowEventsHandler;

    private _layer: Konva.Layer;
    private _formEventsHandler: FormEventsHandler;

    constructor(container: string) {
        this._mainStage = new Konva.Stage({
            container: container,
            width: document.body.clientWidth,
            height: window.innerHeight
        });

        this._layer = new Konva.Layer();
        this._mainStage.add(this._layer);
        this._groupManager = new GroupService(this._layer);
        this._windowEventsHandler = new WindowEventsHandler();
        this._formEventsHandler = new FormEventsHandler();
    }
}

const app = new App("app");
