import { Board } from "../Board";
import { Color, PieceType, Tile } from "../models";
import { Piece } from "./BasePiece";

export class Pawn extends Piece {
    public override getPieceType(): PieceType {
        return PieceType.Pawn
    }
    public override getAssetPath(): string {
        return this.color == Color.White ? "assets/Chess_plt26.svg" : "assets/Chess_pdt26.svg"
    }
    public override getAvailableMoves(board: Board): Tile[] {
        const toReturn: Tile[] = [];
        const direction = this.color == Color.White ? 1 : -1
        // can move forward
        let tempX = this.tile.x
        let tempY = this.tile.y + direction

        if (board.isInBounds(tempX, tempY) && board.tiles[tempY][tempX].piece == null) {
            toReturn.push(board.tiles[tempY][tempX])
        }

        // can move right and capture diagonally
        tempX = this.tile.x + 1
        tempY = this.tile.y + direction

        if (board.isInBounds(tempX, tempY) && board.tiles[tempY][tempX].piece != null && board.tiles[tempY][tempX].piece!.color != this.color) {
            toReturn.push(board.tiles[tempY][tempX])
        }

        // can move left and capture diagonally
        tempX = this.tile.x - 1
        tempY = this.tile.y + direction

        if (board.isInBounds(tempX, tempY) && board.tiles[tempY][tempX].piece != null && board.tiles[tempY][tempX].piece!.color != this.color) {
            toReturn.push(board.tiles[tempY][tempX])
        }


        return toReturn;
    }

}