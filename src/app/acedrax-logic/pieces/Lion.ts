import { Board } from "../Board";
import { Color, Tile } from "../models";
import { Piece } from "./BasePiece";


export class Lion extends Piece {
    public override getAssetPath(): string {
        return this.color == Color.White ? "assets/Chess_zlt45.svg" : "assets/Chess_zdt45.svg"
    }
    public override getAvailableMoves(board: Board): Tile[] {
        const toReturn: Tile[] = []
        // 3-1 or 3-0 leaper
        // +3+1
        let tempX = this.tile.x + 3
        let tempY = this.tile.y + 1
        if (board.isInBounds(tempX, tempY) && board.tiles[tempY][tempX].piece?.color != this.color) toReturn.push(board.tiles[tempY][tempX])

        // +3-1
        tempX = this.tile.x + 3
        tempY = this.tile.y - 1
        if (board.isInBounds(tempX, tempY) && board.tiles[tempY][tempX].piece?.color != this.color) toReturn.push(board.tiles[tempY][tempX])

        // -3+1
        tempX = this.tile.x - 3
        tempY = this.tile.y + 1
        if (board.isInBounds(tempX, tempY) && board.tiles[tempY][tempX].piece?.color != this.color) toReturn.push(board.tiles[tempY][tempX])

        // -3-1
        tempX = this.tile.x - 3
        tempY = this.tile.y - 1
        if (board.isInBounds(tempX, tempY) && board.tiles[tempY][tempX].piece?.color != this.color) toReturn.push(board.tiles[tempY][tempX])

        // +1+3
        tempX = this.tile.x + 1
        tempY = this.tile.y + 3
        if (board.isInBounds(tempX, tempY) && board.tiles[tempY][tempX].piece?.color != this.color) toReturn.push(board.tiles[tempY][tempX])

        // +1-3
        tempX = this.tile.x + 1
        tempY = this.tile.y - 3
        if (board.isInBounds(tempX, tempY) && board.tiles[tempY][tempX].piece?.color != this.color) toReturn.push(board.tiles[tempY][tempX])

        // -1+3
        tempX = this.tile.x - 1
        tempY = this.tile.y + 3
        if (board.isInBounds(tempX, tempY) && board.tiles[tempY][tempX].piece?.color != this.color) toReturn.push(board.tiles[tempY][tempX])

        // -1-3
        tempX = this.tile.x - 1
        tempY = this.tile.y - 3
        if (board.isInBounds(tempX, tempY) && board.tiles[tempY][tempX].piece?.color != this.color) toReturn.push(board.tiles[tempY][tempX])


        // 


        // +3+0
        tempX = this.tile.x + 3
        tempY = this.tile.y + 0
        if (board.isInBounds(tempX, tempY) && board.tiles[tempY][tempX].piece?.color != this.color) toReturn.push(board.tiles[tempY][tempX])

        // +3-0
        tempX = this.tile.x + 3
        tempY = this.tile.y - 0
        if (board.isInBounds(tempX, tempY) && board.tiles[tempY][tempX].piece?.color != this.color) toReturn.push(board.tiles[tempY][tempX])

        // -3+0
        tempX = this.tile.x - 3
        tempY = this.tile.y + 0
        if (board.isInBounds(tempX, tempY) && board.tiles[tempY][tempX].piece?.color != this.color) toReturn.push(board.tiles[tempY][tempX])

        // -3-0
        tempX = this.tile.x - 3
        tempY = this.tile.y - 0
        if (board.isInBounds(tempX, tempY) && board.tiles[tempY][tempX].piece?.color != this.color) toReturn.push(board.tiles[tempY][tempX])

        // +0+3
        tempX = this.tile.x + 0
        tempY = this.tile.y + 3
        if (board.isInBounds(tempX, tempY) && board.tiles[tempY][tempX].piece?.color != this.color) toReturn.push(board.tiles[tempY][tempX])

        // +0-3
        tempX = this.tile.x + 0
        tempY = this.tile.y - 3
        if (board.isInBounds(tempX, tempY) && board.tiles[tempY][tempX].piece?.color != this.color) toReturn.push(board.tiles[tempY][tempX])

        // -0+3
        tempX = this.tile.x - 0
        tempY = this.tile.y + 3
        if (board.isInBounds(tempX, tempY) && board.tiles[tempY][tempX].piece?.color != this.color) toReturn.push(board.tiles[tempY][tempX])

        // -0-3
        tempX = this.tile.x - 0
        tempY = this.tile.y - 3
        if (board.isInBounds(tempX, tempY) && board.tiles[tempY][tempX].piece?.color != this.color) toReturn.push(board.tiles[tempY][tempX])

        return toReturn;
    }

}