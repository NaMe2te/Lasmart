import Konva from "konva";
import {Guid} from "guid-typescript";

export interface IPrinter<T, TShape extends Konva.Shape> {
    print(model: T): TShape;
    erase(modelId: Guid): void;
}