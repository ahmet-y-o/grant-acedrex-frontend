import { Board } from "../Board";
import { Color, PieceType, Tile } from "../models";
import { Piece } from "./BasePiece";

export class Aanca extends Piece {
    public override getPieceType(): PieceType {
        return PieceType.Aanca
    }
    public override getAssetPath(): string {
        return this.color == Color.White ? "assets/Chess_wlt45.svg" : "assets/Chess_wdt45.svg"    
    }

    public override getAvailableMoves(board: Board): Tile[] {
        const toReturn: Tile[] = []
        // up-left-1 then upwards
        let tempX = this.tile.x - 1
        let tempY = this.tile.y + 1
        do {
            if (!board.isInBounds(tempX, tempY)) break;
            const tempTile = board.tiles[tempY][tempX];
            if (tempTile.piece == null) toReturn.push(tempTile)
            else if (tempTile.piece.color == this.color) break
            else {
                toReturn.push(tempTile)
                break
            }
            tempY += 1
        } while (true)

        // up-left-1 then left
        tempX = this.tile.x - 1
        tempY = this.tile.y + 1
        do {
            if (!board.isInBounds(tempX, tempY)) break;
            const tempTile = board.tiles[tempY][tempX];
            if (tempTile.piece == null) toReturn.push(tempTile)
            else if (tempTile.piece.color == this.color) break
            else {
                toReturn.push(tempTile)
                break
            }
            tempX -= 1
        } while (true)

        // up-right-1 then upwards
        tempX = this.tile.x + 1
        tempY = this.tile.y + 1
        do {
            if (!board.isInBounds(tempX, tempY)) break;
            const tempTile = board.tiles[tempY][tempX];
            if (tempTile.piece == null) toReturn.push(tempTile)
            else if (tempTile.piece.color == this.color) break
            else {
                toReturn.push(tempTile)
                break
            }
            tempY += 1
        } while (true)

        // up-right-1 then right
        tempX = this.tile.x + 1
        tempY = this.tile.y + 1
        do {
            if (!board.isInBounds(tempX, tempY)) break;
            const tempTile = board.tiles[tempY][tempX];
            if (tempTile.piece == null) toReturn.push(tempTile)
            else if (tempTile.piece.color == this.color) break
            else {
                toReturn.push(tempTile)
                break
            }
            tempX += 1
        } while (true)

        // down-left-1 then downwards
        tempX = this.tile.x - 1
        tempY = this.tile.y - 1
        do {
            if (!board.isInBounds(tempX, tempY)) break;
            const tempTile = board.tiles[tempY][tempX];
            if (tempTile.piece == null) toReturn.push(tempTile)
            else if (tempTile.piece.color == this.color) break
            else {
                toReturn.push(tempTile)
                break
            }
            tempY -= 1
        } while (true)

        // down-left-1 then left
        tempX = this.tile.x - 1
        tempY = this.tile.y - 1
        do {
            if (!board.isInBounds(tempX, tempY)) break;
            const tempTile = board.tiles[tempY][tempX];
            if (tempTile.piece == null) toReturn.push(tempTile)
            else if (tempTile.piece.color == this.color) break
            else {
                toReturn.push(tempTile)
                break
            }
            tempX -= 1
        } while (true)

        // down-right-1 then downwards
        tempX = this.tile.x + 1
        tempY = this.tile.y - 1
        do {
            if (!board.isInBounds(tempX, tempY)) break;
            const tempTile = board.tiles[tempY][tempX];
            if (tempTile.piece == null) toReturn.push(tempTile)
            else if (tempTile.piece.color == this.color) break
            else {
                toReturn.push(tempTile)
                break
            }
            tempY -= 1
        } while (true)

        // down-right-1 then right
        tempX = this.tile.x + 1
        tempY = this.tile.y - 1
        do {
            if (!board.isInBounds(tempX, tempY)) break;
            const tempTile = board.tiles[tempY][tempX];
            if (tempTile.piece == null) toReturn.push(tempTile)
            else if (tempTile.piece.color == this.color) break
            else {
                toReturn.push(tempTile)
                break
            }
            tempX += 1
        } while (true)

        return toReturn
    }
    
}