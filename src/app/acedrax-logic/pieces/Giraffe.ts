import { Board } from "../Board";
import { Color, Tile } from "../models";
import { Piece } from "./BasePiece";


export class Giraffe extends Piece {
    public override getAssetPath(): string {
        return this.color == Color.White ? "assets/Chess_Glt45.svg" : "assets/Chess_Gdt45.svg"
    }
    public override getAvailableMoves(board: Board): Tile[] {
        const toReturn: Tile[] = []
        // 3-2 leaper
        // +3+2
        let tempX = this.tile.x + 3
        let tempY = this.tile.y + 2
        if (board.isInBounds(tempX, tempY) && board.tiles[tempY][tempX].piece?.color != this.color) toReturn.push(board.tiles[tempY][tempX])

        // +3-2
        tempX = this.tile.x + 3
        tempY = this.tile.y - 2
        if (board.isInBounds(tempX, tempY) && board.tiles[tempY][tempX].piece?.color != this.color) toReturn.push(board.tiles[tempY][tempX])

        // -3+2
        tempX = this.tile.x - 3
        tempY = this.tile.y + 2
        if (board.isInBounds(tempX, tempY) && board.tiles[tempY][tempX].piece?.color != this.color) toReturn.push(board.tiles[tempY][tempX])

        // -3-2
        tempX = this.tile.x - 3
        tempY = this.tile.y - 2
        if (board.isInBounds(tempX, tempY) && board.tiles[tempY][tempX].piece?.color != this.color) toReturn.push(board.tiles[tempY][tempX])

        // +2+3
        tempX = this.tile.x + 2
        tempY = this.tile.y + 3
        if (board.isInBounds(tempX, tempY) && board.tiles[tempY][tempX].piece?.color != this.color) toReturn.push(board.tiles[tempY][tempX])

        // +2-3
        tempX = this.tile.x + 2
        tempY = this.tile.y - 3
        if (board.isInBounds(tempX, tempY) && board.tiles[tempY][tempX].piece?.color != this.color) toReturn.push(board.tiles[tempY][tempX])

        // -2+3
        tempX = this.tile.x - 2
        tempY = this.tile.y + 3
        if (board.isInBounds(tempX, tempY) && board.tiles[tempY][tempX].piece?.color != this.color) toReturn.push(board.tiles[tempY][tempX])

        // -2-3
        tempX = this.tile.x - 2
        tempY = this.tile.y - 3
        if (board.isInBounds(tempX, tempY) && board.tiles[tempY][tempX].piece?.color != this.color) toReturn.push(board.tiles[tempY][tempX])
        
        return toReturn
    }

}