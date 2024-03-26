import {Point} from "../../models/points/Point";
import {Comment} from "../../models/comments/Comment";

export interface ICommentPrinterProps {
    point: Point;
    comment: Comment;
    indexComment: number;
}