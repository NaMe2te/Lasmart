import $ from "jquery";

export class FormEventsHandler {
    private readonly _pointForm: JQuery<HTMLElement>;
    private readonly _commentForm: JQuery<HTMLElement>;
    private readonly _formAddPointButton: JQuery<HTMLElement>;
    private readonly _formEditPoint: JQuery<HTMLElement>;
    private readonly _formEditComment: JQuery<HTMLElement>;


    constructor() {
        this._pointForm = $('#form__add-point');
        this._commentForm = $('#form__add-comment');
        this._formEditPoint = $('#form__edit-point');
        this._formAddPointButton = $('#form__add-point-button');
        this._formEditComment = $('#form__edit-comment');


        this.onClick__OpenAdditionForms();
        this.onClick__CloseAdditionForms();
    }

    private onClick__OpenAdditionForms() {
        $('#open-point-form-button').on("click", () => {
            this._pointForm.show();
        });

        $('#open-comment-form-button').on("click", () => {
            this._commentForm.show();
        });
    }

    private onClick__CloseAdditionForms() {
        $('#form__close-point-button').on("click", () => {
            this._pointForm.hide();
        });

        $('#form__close-comment-button').on("click", () => {
            this._commentForm.hide();
        });

        $('#edit-form__close-point-button').on("click", () => {
            this._formEditPoint.hide();
        });

        $('#edit-form__close-comment-button').on("click", () => {
            this._formEditComment.hide();
        });
    }
}