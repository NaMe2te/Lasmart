import {BaseService} from "./BaseService";
import {Point} from "../models/points/Point";
import {CreatePoint} from "../models/points/CreatePoint";

export class PointService extends BaseService {
    constructor() {
        super();
    }

    async create(createPoint: CreatePoint): Promise<Point> {
        try {
            const response = await fetch(`${this.baseUrl}Point/Create`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(createPoint),
            });

            if (!response.ok) {
                throw new Error(`Ошибка при отправке POST-запроса на Point/Create ${response.status}`);
            }

            const jsonData = await response.json();
            return Point.fromJson(jsonData);

        } catch (error) {
            console.error('Ошибка:', error);
            throw error;
        }
    }

    async remove(id: string): Promise<void> {
        try {
            const response = await fetch(`${this.baseUrl}Point/Remove/${id}`, {
                method: 'DELETE',
                headers: this.headers,
            });

            if (!response.ok) {
                throw new Error(`Ошибка при отправке DELETE-запроса на Point/Remove/${id}`);
            }
        } catch (error) {
            console.error('Ошибка:', error);
            throw error;
        }
    }
}