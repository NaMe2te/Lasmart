import $ from "jquery";

export class CommentEventsHandler {
    private readonly _formAddCommentButton: JQuery<HTMLElement>;
    private readonly _commentForm: JQuery<HTMLElement>;

    constructor() {
        this._formAddCommentButton = $('#form__add-comment-button');
        this._commentForm = $('#form__add-comment');
    }
    
    public onAdd(createCommentFunc: Function) {
        this._formAddCommentButton.on("click", (e) => {
            e.preventDefault();
            const text = $("#comment-text").val() as string;
            const color = $("#comment-color").val() as string;

            createCommentFunc(text, color);
            this._commentForm.hide();
        });
    }
}