import $ from "jquery";

export class WindowEventsHandler {
    private readonly _pointContextMenu: JQuery<HTMLElement>;
    private readonly _windowContextMenu: JQuery<HTMLElement>;

    constructor() {
        this._pointContextMenu = $('#point-contextMenu');
        this._windowContextMenu = $('#window-contextMenu');

        this.initWindowEvents();
    }

    public initWindowEvents(){
        this.onClick__HideAllContextMenus();
        this.contextMenu__OpenMainContextMenuToAddPoint();
    }

    private onClick__HideAllContextMenus() {
        $(window).on("click", (e) => {
            this._pointContextMenu.hide();
            this._windowContextMenu.hide();
        });
    }

    private contextMenu__OpenMainContextMenuToAddPoint() {
        window.addEventListener("contextmenu", (e) => {
            e.preventDefault();

            $("#point-x").val(e.offsetX);
            $("#point-y").val(e.offsetY);

            this._windowContextMenu.css(WindowEventsHandler.getContextMenuProp(e, this._pointContextMenu));
            this._windowContextMenu.show();
        });
    }

    public static getContextMenuProp(e: MouseEvent, contextMenu: JQuery<HTMLElement>): JQuery.PlainObject {
        return {
            left: (e.x + contextMenu.offsetWidth > window.innerWidth ? window.innerWidth - contextMenu.offsetWidth : e.x) + "px",
            top: (e.y + contextMenu.offsetHeight > window.innerHeight ? window.innerHeight - contextMenu.offsetHeight  : e.y) + "px"
        };
    }
}