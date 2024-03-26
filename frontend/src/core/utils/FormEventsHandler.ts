import $ from "jquery";

export class FormEventsHandler {
    private readonly _openPointFormButton: JQuery<HTMLElement>;
    private readonly _pointCloseFormButton: JQuery<HTMLElement>;
    private readonly _commentCloseFormButton: JQuery<HTMLElement>;
    private readonly _openCommentFormButton: JQuery<HTMLElement>;
    private readonly _pointForm: JQuery<HTMLElement>;
    private readonly _commentForm: JQuery<HTMLElement>;
    private readonly _formAddPointButton: JQuery<HTMLElement>;

    constructor() {
        this._openPointFormButton = $('#open-point-form-button');
        this._pointCloseFormButton = $('#form__close-point-button');
        this._commentCloseFormButton = $('#form__close-comment-button');
        this._openCommentFormButton = $('#open-comment-form-button');

        this._pointForm = $('#form__add-point');
        this._commentForm = $('#form__add-comment');

        this._formAddPointButton = $('#form__add-point-button');

        this.onClick__OpenAdditionForms();
        this.onClick__CloseAdditionForms();
    }

    private onClick__OpenAdditionForms() {
        this._openPointFormButton.on("click", () => {
            this._pointForm.show();
        });

        this._openCommentFormButton.on("click", () => {
            this._commentForm.show();
        });
    }

    private onClick__CloseAdditionForms() {
        this._pointCloseFormButton.on("click", () => {
            this._pointForm.hide();
        });

        this._commentCloseFormButton.on("click", () => {
            this._commentForm.hide();
        });
    }
}