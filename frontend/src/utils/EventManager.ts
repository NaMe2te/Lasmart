import $ from "jquery";
import Konva from "konva";

export class EventManager {
    private readonly _pointContextMenu: JQuery<HTMLElement>;
    private readonly _windowContextMenu: JQuery<HTMLElement>;

    constructor() {
        this._pointContextMenu = $('#point-contextMenu');
        this._windowContextMenu = $('#window-contextMenu');
    }

    public initializeInitialEvents(): void {
        $(window).on("click", (e) => {
            this._pointContextMenu.hide();
            this._windowContextMenu.hide();
        });

        window.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            this._windowContextMenu.css(this.getContextMenuProp(e, this._pointContextMenu));
            this._windowContextMenu.show();
        })
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

    private getContextMenuProp(e: MouseEvent, contextMenu: JQuery<HTMLElement>): JQuery.PlainObject {
        return {
            left: (e.x + contextMenu.offsetWidth > window.innerWidth ? window.innerWidth - contextMenu.offsetWidth : e.x) + "px",
            top: (e.y + contextMenu.offsetHeight > window.innerHeight ? window.innerHeight - contextMenu.offsetHeight  : e.y) + "px"
        };
    }
}