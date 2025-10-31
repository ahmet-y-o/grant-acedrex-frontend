import { Board } from "../Board";
import { Color, PieceType, Tile } from "../models";
import { Piece } from "./BasePiece";

export class Unicornio extends Piece {
    public override getPieceType(): PieceType {
        return PieceType.Unicornio
    }
    public override getAssetPath(): string {
        return this.color == Color.White ? "assets/Chess_Ult45.svg" : "assets/Chess_Udt45.svg"
    }
    public override getAvailableMoves(board: Board): Tile[] {
        const toReturn: Tile[] = []
        // first moves like a knight, then optionally moves like a bishop
        // 2 left 1 up then optionally left-up diagonal
        let tempX = this.tile.x - 2
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
            tempX -= 1
            tempY += 1
        } while (true)
        
        // 1 left 2 up then optionally left-up diagonal
        tempX = this.tile.x - 1
        tempY = this.tile.y + 2
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
            tempY += 1
        } while (true)

        // 2 right 1 up then optionally right-up diagonal
        tempX = this.tile.x + 2
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
            tempY += 1
        } while (true)

        // 1 right 2 up then optionally right-up diagonal
        tempX = this.tile.x + 1
        tempY = this.tile.y + 2
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
            tempY += 1
        } while (true)

        // 2 left 1 down then optionally left-down diagonal
        tempX = this.tile.x - 2
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
            tempY -= 1
        } while (true)

        // 1 left 2 down then optionally left-down diagonal
        tempX = this.tile.x - 1
        tempY = this.tile.y - 2
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
            tempY -= 1
        } while (true)

        // 2 right 1 down then optionally right-down diagonal
        tempX = this.tile.x + 2
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
            tempY -= 1
        } while (true)

        // 1 right 2 down then optionally right-down diagonal
        tempX = this.tile.x + 1
        tempY = this.tile.y - 2
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
            tempY -= 1
        } while (true)


        return toReturn;


    }
    
}