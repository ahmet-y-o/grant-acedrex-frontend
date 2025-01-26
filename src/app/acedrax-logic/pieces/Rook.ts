import { Board } from "../Board";
import { Color, Tile } from "../models";
import { Piece } from "./BasePiece";

export class Rook extends Piece {
    public override getAssetPath(): string {
        return this.color == Color.White ? "assets/Chess_rlt26.svg" : "assets/Chess_rdt26.svg"
    }
    public override getAvailableMoves(board: Board): Tile[] {
        const toReturn: Tile[] = []
        // moves horizontally and vertically

        // upwards
        let tempX = this.tile.x
        let tempY = this.tile.y
        while (true) {
            tempY += 1
            if (!board.isInBounds(tempX, tempY)) break;
            const tempTile = board.tiles[tempY][tempX];
            if (tempTile.piece == null) toReturn.push(tempTile)
            else if (tempTile.piece.color == this.color) break
            else {
                toReturn.push(tempTile)
                break
            }
        }

        // downwards
        tempX = this.tile.x
        tempY = this.tile.y
        while (true) {
            tempY -= 1
            if (!board.isInBounds(tempX, tempY)) break;
            const tempTile = board.tiles[tempY][tempX];
            if (tempTile.piece == null) toReturn.push(tempTile)
            else if (tempTile.piece.color == this.color) break
            else {
                toReturn.push(tempTile)
                break
            }
        }

        // left
        tempX = this.tile.x
        tempY = this.tile.y
        while (true) {
            tempX -= 1
            if (!board.isInBounds(tempX, tempY)) break;
            const tempTile = board.tiles[tempY][tempX];
            if (tempTile.piece == null) toReturn.push(tempTile)
            else if (tempTile.piece.color == this.color) break
            else {
                toReturn.push(tempTile)
                break
            }
        }

        // right
        tempX = this.tile.x
        tempY = this.tile.y
        while (true) {
            tempX += 1
            if (!board.isInBounds(tempX, tempY)) break;
            const tempTile = board.tiles[tempY][tempX];
            if (tempTile.piece == null) toReturn.push(tempTile)
            else if (tempTile.piece.color == this.color) break
            else {
                toReturn.push(tempTile)
                break
            }
        }
        return toReturn;
    }

}