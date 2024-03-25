import $ from "jquery";
import Konva from "konva";

export class EventManager {
    private readonly _pointContextMenu: JQuery<HTMLElement>;
    private readonly _windowContextMenu: JQuery<HTMLElement>;

    private readonly _pointForm: JQuery<HTMLElement>;
    private readonly _pointCloseForm: JQuery<HTMLElement>;
    private readonly _formAddButton: JQuery<HTMLElement>;

    private readonly _openPointFormButton: JQuery<HTMLElement>;

    constructor() {
        this._pointContextMenu = $('#point-contextMenu');
        this._windowContextMenu = $('#window-contextMenu');
        this._pointForm = $('#form__add-point');
        this._openPointFormButton = $('#open-point-form-button');
        this._formAddButton = $('#form__add-button');

        this._pointCloseForm = $('.form__close-button');
    }

    public initializeInitialEvents(): void {
        this.initWindowEvents();
        this.initFormEvents();
    }

    public addEventsToGroup(shape: Konva.Group, remove: Function): void {
        shape.on("contextmenu", (e) => {
            e.evt.preventDefault();
            this._pointContextMenu.css(this.getContextMenuProp(e.evt, this._pointContextMenu));
            this._pointContextMenu.show();
        });

        shape.on("dblclick", (e) => {
            e.evt.preventDefault();
            remove();
        });
    }

    public createPointEvent(createFunc: (x: number, y: number, radius: number, color: string) => void): void {
        this._formAddButton.on("click", (e) => {
            e.preventDefault();
            const radius = parseInt($("#point-radius").val() as string);
            const color = $("#point-color").val() as string;
            const pointX = parseInt($("#point-x").val() as string);
            const pointY = parseInt($("#point-y").val() as string);

            createFunc(pointX, pointY, radius, color);
        });
    }

    private initWindowEvents(){
        $(window).on("click", (e) => {
            this._pointContextMenu.hide();
            this._windowContextMenu.hide();
        });

        window.addEventListener("contextmenu", (e) => {
            e.preventDefault();

            $("#point-x").val(e.offsetX);
            $("#point-y").val(e.offsetY);

            this._windowContextMenu.css(this.getContextMenuProp(e, this._pointContextMenu));
            this._windowContextMenu.show();
        });
    }

    private initFormEvents() {
        this._openPointFormButton.on("click", () => {
            this._pointForm.show();
        });

        this._pointCloseForm.on("click", () => {
            this._pointForm.hide();
        });
    }

    private getContextMenuProp(e: MouseEvent, contextMenu: JQuery<HTMLElement>): JQuery.PlainObject {
        return {
            left: (e.x + contextMenu.offsetWidth > window.innerWidth ? window.innerWidth - contextMenu.offsetWidth : e.x) + "px",
            top: (e.y + contextMenu.offsetHeight > window.innerHeight ? window.innerHeight - contextMenu.offsetHeight  : e.y) + "px"
        };
    }
}