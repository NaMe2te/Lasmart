import {BaseClient} from "./BaseClient";
import {Comment} from "../../models/comments/Comment";
import {CreateComment} from "../../models/comments/CreateComment";

export class CommentClient extends BaseClient {
    constructor() {
        super();
    }

    async create(createComment: CreateComment): Promise<Comment> {
        try {
            const response = await fetch(`${this.baseUrl}Comment/Create`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(createComment),
            });

            if (!response.ok) {
                throw new Error(`Ошибка при отправке POST-запроса на Comment/Create ${response.status}`);
            }

            const jsonData = await response.json();
            return Comment.fromJson(jsonData);

        } catch (error) {
            console.error('Ошибка:', error);
            throw error;
        }
    }

    async update(comment: Comment): Promise<Comment> {
        try {
            const response = await fetch(`${this.baseUrl}Comment/Update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(comment)
            });

            if (!response.ok) {
                throw new Error('Ошибка при отправке PUT-запроса на Comment/Update');
            }

            const json = await response.json();
            return Comment.fromJson(json);
        } catch (error) {
            console.error('Ошибка:', error);
            throw error;
        }
    }
}