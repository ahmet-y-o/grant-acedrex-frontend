import { Board } from "../Board";
import { Color, PieceType, Tile } from "../models";
import { Pawn } from "./Pawn";

export abstract class Piece {

    public tile: Tile;
    public color: Color;
    

    public constructor (color: Color, tile: Tile) {
        this.color = color;
        this.tile = tile;
    }

    public abstract getAvailableMoves(board: Board): Tile[];
    public abstract getAssetPath(): string;
    public abstract getPieceType(): PieceType;

}