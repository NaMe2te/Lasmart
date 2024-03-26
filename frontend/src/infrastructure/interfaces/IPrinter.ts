import Konva from "konva";

export interface IPrinter<T> {
    print(model: T): any;
}