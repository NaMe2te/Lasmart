import $ from "jquery";
import Konva from "konva";
import {WindowEventsHandler} from "./WindowEventsHandler";

export class CommentEventsHandler {
    private readonly _commentContextMenu: JQuery<HTMLElement>;

    constructor() {
        this._commentContextMenu = $('#comment-contextMenu');
    }
    
    public onAdd(createCommentFunc: Function) {
        $('#form__add-comment-button').on("click", (e) => {
            e.preventDefault();
            const text = $("#comment-text").val() as string;
            const color = $("#comment-color").val() as string;

            createCommentFunc(text, color);
            $('#form__add-comment').hide();
        });
    }

    public onUpdate(updateCommentFunc: Function) {
        $('#edit-form__add-comment-button').on("click", (e) => {
            e.preventDefault();
            const text = $("#edit-comment-text").val() as string;
            const color = $("#edit-comment-color").val() as string;

            updateCommentFunc(text, color);
            $('#form__edit-comment').hide();
        });
    }

    public contextMenu__OpenCommentContextMenu(shape: Konva.Shape) {
        shape.on("contextmenu", (e) => {
            e.evt.preventDefault();
            this._commentContextMenu.css(WindowEventsHandler.getContextMenuProp(e.evt, this._commentContextMenu));
            this._commentContextMenu.show();
        })
    }

    public onClick__OpenUpdateForms(defaultText: string, defaultColor: string) {
        $('#open-edit-comment-form-button').on("click", (e) => {
            e.preventDefault();
            $("#edit-comment-text").val(defaultText);
            $("#edit-comment-color").val(defaultColor);

            $('#form__edit-comment').show();
        });
    }
}