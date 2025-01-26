import { Board } from "../Board";
import { Color, Tile } from "../models";
import { Piece } from "./BasePiece";

export class King extends Piece {
    public override getAssetPath(): string {
        return this.color == Color.White ? "assets/Chess_klt26.svg" : "assets/Chess_kdt26.svg"
    }
    public hasMoved = false;
    public override getAvailableMoves(board: Board): Tile[] {
        const toReturn: Tile[] = []
        // up
        let tempX = this.tile.x
        let tempY = this.tile.y + 1
        if (board.isInBounds(tempX, tempY)) {
            if (board.tiles[tempY][tempX].piece?.color != this.color) {
                toReturn.push(board.tiles[tempY][tempX])
            }
        }

        // down
        tempX = this.tile.x
        tempY = this.tile.y - 1
        if (board.isInBounds(tempX, tempY)) {
            if (board.tiles[tempY][tempX].piece?.color != this.color) {
                toReturn.push(board.tiles[tempY][tempX])
            }
        }

        // left
        tempX = this.tile.x - 1
        tempY = this.tile.y
        if (board.isInBounds(tempX, tempY)) {
            if (board.tiles[tempY][tempX].piece?.color != this.color) {
                toReturn.push(board.tiles[tempY][tempX])
            }
        }

        // right
        tempX = this.tile.x + 1
        tempY = this.tile.y
        if (board.isInBounds(tempX, tempY)) {
            if (board.tiles[tempY][tempX].piece?.color != this.color) {
                toReturn.push(board.tiles[tempY][tempX])
            }
        }

        // left-up
        tempX = this.tile.x - 1
        tempY = this.tile.y + 1
        if (board.isInBounds(tempX, tempY)) {
            if (board.tiles[tempY][tempX].piece?.color != this.color) {
                toReturn.push(board.tiles[tempY][tempX])
            }
        }

        // left-down
        tempX = this.tile.x - 1
        tempY = this.tile.y - 1
        if (board.isInBounds(tempX, tempY)) {
            if (board.tiles[tempY][tempX].piece?.color != this.color) {
                toReturn.push(board.tiles[tempY][tempX])
            }
        }

        // right-up
        tempX = this.tile.x + 1
        tempY = this.tile.y + 1
        if (board.isInBounds(tempX, tempY)) {
            if (board.tiles[tempY][tempX].piece?.color != this.color) {
                toReturn.push(board.tiles[tempY][tempX])
            }
        }

        // right-down
        tempX = this.tile.x + 1
        tempY = this.tile.y - 1
        if (board.isInBounds(tempX, tempY)) {
            if (board.tiles[tempY][tempX].piece?.color != this.color) {
                toReturn.push(board.tiles[tempY][tempX])
            }
        }

        // king may move 2 squares in one direction only on its first move
        if (!this.hasMoved) {
            // up
            tempX = this.tile.x
            tempY = this.tile.y + 2
            if (board.isInBounds(tempX, tempY)) {
                if (board.tiles[tempY][tempX].piece?.color != this.color) {
                    toReturn.push(board.tiles[tempY][tempX])
                }
            }

            // down
            tempX = this.tile.x
            tempY = this.tile.y - 2
            if (board.isInBounds(tempX, tempY)) {
                if (board.tiles[tempY][tempX].piece?.color != this.color) {
                    toReturn.push(board.tiles[tempY][tempX])
                }
            }

            // left
            tempX = this.tile.x - 2
            tempY = this.tile.y
            if (board.isInBounds(tempX, tempY)) {
                if (board.tiles[tempY][tempX].piece?.color != this.color) {
                    toReturn.push(board.tiles[tempY][tempX])
                }
            }

            // right
            tempX = this.tile.x + 2
            tempY = this.tile.y
            if (board.isInBounds(tempX, tempY)) {
                if (board.tiles[tempY][tempX].piece?.color != this.color) {
                    toReturn.push(board.tiles[tempY][tempX])
                }
            }

            // left up
            tempX = this.tile.x - 2
            tempY = this.tile.y + 2
            if (board.isInBounds(tempX, tempY)) {
                if (board.tiles[tempY][tempX].piece?.color != this.color) {
                    toReturn.push(board.tiles[tempY][tempX])
                }
            }

            // left down
            tempX = this.tile.x - 2
            tempY = this.tile.y - 2
            if (board.isInBounds(tempX, tempY)) {
                if (board.tiles[tempY][tempX].piece?.color != this.color) {
                    toReturn.push(board.tiles[tempY][tempX])
                }
            }

            // right up
            tempX = this.tile.x + 2
            tempY = this.tile.y + 2
            if (board.isInBounds(tempX, tempY)) {
                if (board.tiles[tempY][tempX].piece?.color != this.color) {
                    toReturn.push(board.tiles[tempY][tempX])
                }
            }

            // right down
            tempX = this.tile.x + 2
            tempY = this.tile.y - 2
            if (board.isInBounds(tempX, tempY)) {
                if (board.tiles[tempY][tempX].piece?.color != this.color) {
                    toReturn.push(board.tiles[tempY][tempX])
                }
            }
        }




        return toReturn;
    }

}