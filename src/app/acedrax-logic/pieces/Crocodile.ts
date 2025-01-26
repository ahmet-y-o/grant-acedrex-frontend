import { Board } from "../Board";
import { Color, Tile } from "../models";
import { Piece } from "./BasePiece";

export class Crocodile extends Piece {
    public override getAssetPath(): string {
        return this.color == Color.White ? "assets/Chess_blt26.svg" : "assets/Chess_bdt26.svg"
    }
    public override getAvailableMoves(board: Board): Tile[] {
        const toReturn: Tile[] = []
        // moves like a bishop
        let tempX = this.tile.x
        let tempY = this.tile.y
        // left up diagonal
        while (true) {
            tempY += 1
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
        tempX = this.tile.x
        tempY = this.tile.y
        // right up diagonal
        while (true) {
            tempY += 1
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
        tempX = this.tile.x
        tempY = this.tile.y
        // left down diagonal
        while (true) {
            tempY -= 1
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
        tempX = this.tile.x
        tempY = this.tile.y
        // right down diagonal
        while (true) {
            tempY -= 1
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