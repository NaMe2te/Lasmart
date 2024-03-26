import Konva from "konva";
import $ from "jquery";
import {WindowEventsHandler} from "./WindowEventsHandler";

export class PointEventsHandler {
    private readonly _pointContextMenu: JQuery<HTMLElement>;
    private readonly _formAddPointButton: JQuery<HTMLElement>;
    private readonly _pointForm: JQuery<HTMLElement>;

    constructor() {
        this._formAddPointButton = $('#form__add-point-button');
        this._pointContextMenu = $('#point-contextMenu');
        this._pointForm = $('#form__add-point');
    }

    public onAdd(createPointFunc: Function) {
        this._formAddPointButton.on("click", (e) => {
            e.preventDefault();
            const radius = parseInt($("#point-radius").val() as string);
            const color = $("#point-color").val() as string;
            const pointX = parseInt($("#point-x").val() as string);
            const pointY = parseInt($("#point-y").val() as string);

            createPointFunc(pointX, pointY, radius, color);
            this._pointForm.hide();
        });
    }

    public onUpdate(updatePointFunc: Function) {
        $('#edit-form__add-point-button').on("click", (e) => {
            e.preventDefault();
            const radius = parseInt($("#edit-point-radius").val() as string);
            const color = $("#edit-point-color").val();

            updatePointFunc(radius, color);

            $('#form__edit-point').hide();
        });
    }

    public onRemove(group: Konva.Group, removeGroupFunc: Function) {
        group.on("dblclick", (e) => {
            e.evt.preventDefault();
            removeGroupFunc();
        });
    }

    public contextMenu__OpenShapeContextMenu(shape: Konva.Shape) {
        shape.on("contextmenu", (e) => {
            e.evt.preventDefault();
            this._pointContextMenu.css(WindowEventsHandler.getContextMenuProp(e.evt, this._pointContextMenu));
            this._pointContextMenu.show();
        });
    }

    public onClick__OpenUpdateForms(defaultRadius: number, defaultColor: string) {
        $('#edit-point-button').on("click", (e) => {
            e.preventDefault();
            $("#edit-point-radius").val(defaultRadius);
            $("#edit-point-color").val(defaultColor);

            $('#form__edit-point').show();
        });
    }
}