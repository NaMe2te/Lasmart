import {BaseService} from "./BaseService";
import {Comment} from "../models/comments/Comment";
import {CreateComment} from "../models/comments/CreateComment";

export class CommentService extends BaseService {

    constructor() {
        super();
    }

    async create(createComment: CreateComment): Promise<Comment> {
        try {
            console.log(JSON.stringify(createComment));
            const response = await fetch(`${this.baseUrl}Comment/Create`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(createComment),
            });

            if (!response.ok) {
                throw new Error(`Ошибка при отправке POST-запроса на Comment/Create ${response.status}`);
            }

            const jsonData = await response.json();
            return Comment.fromDto(jsonData);

        } catch (error) {
            console.error('Ошибка:', error);
            throw error;
        }
    }

    /*async update(comment: Comment): Promise<Comment> {
        return new Promise<Comment>();
    }*/
}