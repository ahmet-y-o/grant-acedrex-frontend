import { Color, PieceType, Tile } from "./models";
import { Aanca } from "./pieces/Aanca";
import { Crocodile } from "./pieces/Crocodile";
import { Giraffe } from "./pieces/Giraffe";
import { King } from "./pieces/King";
import { Lion } from "./pieces/Lion";
import { Pawn } from "./pieces/Pawn";
import { Rook } from "./pieces/Rook";
import { Unicornio } from "./pieces/Unicornio";

export class Board {

    public tiles: Tile[][];
    public _SIZE: number = 12;
    public turn: Color = Color.White;

    public constructor() {
        this.tiles = [];
        // initialize empty board
        for (let i = 0; i < this._SIZE; i++) {
            const row = []
            for (let j = 0; j < this._SIZE; j++) {
                const t = new Tile(j, i, null)
                row.push(t)
            }
            this.tiles.push(row)
        }
        // empty board is initialized. now fill with pieces
        // white pieces
        for (let i = 0; i < this._SIZE; i++) {
            this.tiles[3][i].newPawn(Color.White)
        }
        this.tiles[0][0].newRook(Color.White)
        this.tiles[0][11].newRook(Color.White)
        this.tiles[0][1].newLion(Color.White)
        this.tiles[0][10].newLion(Color.White)
        this.tiles[0][2].newUnicornio(Color.White)
        this.tiles[0][9].newUnicornio(Color.White)
        this.tiles[0][3].newGiraffe(Color.White)
        this.tiles[0][8].newGiraffe(Color.White)
        this.tiles[0][4].newCrocodile(Color.White)
        this.tiles[0][7].newCrocodile(Color.White)
        this.tiles[0][5].newAanca(Color.White)
        this.tiles[0][6].newKing(Color.White)

        // black pieces
        for (let i = 0; i < this._SIZE; i++) {
            this.tiles[8][i].newPawn(Color.Black)
        }
        this.tiles[11][0].newRook(Color.Black)
        this.tiles[11][11].newRook(Color.Black)
        this.tiles[11][1].newLion(Color.Black)
        this.tiles[11][10].newLion(Color.Black)
        this.tiles[11][2].newUnicornio(Color.Black)
        this.tiles[11][9].newUnicornio(Color.Black)
        this.tiles[11][3].newGiraffe(Color.Black)
        this.tiles[11][8].newGiraffe(Color.Black)
        this.tiles[11][4].newCrocodile(Color.Black)
        this.tiles[11][7].newCrocodile(Color.Black)
        this.tiles[11][5].newAanca(Color.Black)
        this.tiles[11][6].newKing(Color.Black)
    }

    public isInCheck(color: Color): boolean {

        const kingTile = this.tiles
            .flat(1) // convert to 1d array
            .find(tile => tile.piece?.getPieceType() == PieceType.King && tile.piece!.color == color)

        const toReturn: boolean = this.tiles
            .flat(1) // convert to 1d array
            .filter(tile => tile.piece && tile.piece.color !== color) //  get opposing color pieces
            .reduce((acc: boolean, tile: Tile) => {
                const moves = tile.piece!.getAvailableMoves(this)
                if (moves.includes(kingTile!)) {
                    return true || acc
                }
                return false || acc
            }, false)

        return toReturn
    }

    public isInBounds(x: number, y: number): boolean {
        if (x < 0 || x >= this._SIZE) return false
        if (y < 0 || y >= this._SIZE) return false
        return true
    }

    public getLegalMovesForPiece(pieceTile: Tile): Tile[] {
        const piece = pieceTile.piece;
        if (piece == null) return [];
        const toReturn = piece!.getAvailableMoves(this)
        return toReturn!.filter((tile) => this.isMoveLegal(pieceTile, tile))
    }

    public isMoveLegal(start: Tile, end: Tile): boolean {

        // copy the end piece
        const endPiece = end.piece;
        

        // check if the move is legal
        let toReturn : boolean = false;
        const turn = this.turn
        this.unrestrictedMove(start, end);
        if (this.isInCheck(turn)) {
            toReturn = false
        } else {
            toReturn = true;
        }

        // reverse the move
        this.unrestrictedMove(end, start)
        end.piece = endPiece
        return toReturn
    }

    public move(start: Tile, end: Tile): void {
        if (!this.isMoveLegal(start, end)) {
            return
        }
        this.unrestrictedMove(start, end)
        const isKing = start.piece instanceof King
        if (isKing) {
            (start.piece as King).hasMoved = true
        }

        this.turn = this.turn == Color.White ? Color.Black : Color.White
    }

    // move piece from start to end
    // doesn't check for legality of the move
    // doesn't change the turn
    // internal use only
    private unrestrictedMove(start: Tile, end: Tile) {

        // pawns can promote when reaching the last rank
        // the pawn can only promote to their first rank type piece
        // i.e. a column pawn only can become rook
        // g column pawn becomes aanca (it doesn't become another king)

        if (start.piece instanceof Aanca) {
            end.newAanca(start.piece.color)
            start.piece = null
        } else if (start.piece instanceof Crocodile) {
            end.newCrocodile(start.piece.color)
            start.piece = null
        } else if (start.piece instanceof Giraffe) {
            end.newGiraffe(start.piece.color)
            start.piece = null
        } else if (start.piece instanceof King) {
            end.newKing(start.piece.color)
            start.piece = null
        } else if (start.piece instanceof Lion) {
            end.newLion(start.piece.color)
            start.piece = null
        } else if (start.piece instanceof Pawn) {
            if (start.piece.color == Color.White) {
                if (end.y == 11) {
                    if (end.x == 0 || end.x == 11) {
                        end.newRook(Color.White)
                    } else if (end.x == 1 || end.x == 10) {
                        end.newLion(Color.White)
                    } else if (end.x == 2 || end.x == 9) {
                        end.newUnicornio(Color.White)
                    } else if (end.x == 3 || end.x == 8) {
                        end.newGiraffe(Color.White)
                    } else if (end.x == 4 || end.x == 7) {
                        end.newCrocodile(Color.White)
                    } else if (end.x == 5 || end.x == 6) {
                        end.newAanca(Color.White)
                    }
                } else {
                    end.newPawn(start.piece.color)
                }
            } else {
                if (end.y == 0) {
                    if (end.x == 0 || end.x == 11) {
                        end.newRook(Color.Black)
                    } else if (end.x == 1 || end.x == 10) {
                        end.newLion(Color.Black)
                    } else if (end.x == 2 || end.x == 9) {
                        end.newUnicornio(Color.Black)
                    } else if (end.x == 3 || end.x == 8) {
                        end.newGiraffe(Color.Black)
                    } else if (end.x == 4 || end.x == 7) {
                        end.newCrocodile(Color.Black)
                    } else if (end.x == 5 || end.x == 6) {
                        end.newAanca(Color.Black)
                    }
                } else {
                    end.newPawn(start.piece.color)
                }
            }

            start.piece = null
        } else if (start.piece instanceof Rook) {
            end.newRook(start.piece.color)
            start.piece = null
        } else if (start.piece instanceof Unicornio) {
            end.newUnicornio(start.piece.color)
            start.piece = null
        }
    }

    public allAvailbleMoves() {
        let moves = {}
        for (let i = 0; i < this._SIZE; i++) {
            for (let j = 0; j < this._SIZE; j++) {
                const t = this.tiles[i][j]
                if (t.piece != null) {
                    const movesForPiece = this.getLegalMovesForPiece(t)
                    for (let k = 0; k < movesForPiece.length; k++) {
                        
                        //@ts-ignore
                        moves[this.tileToNotation(t)] = movesForPiece.map(tile => this.tileToNotation(tile))
                    }
                }
            }
        }
        return JSON.stringify(moves)
    }

    private tileToNotation(tile: Tile): string {
        return String.fromCharCode(tile.x + 'a'.charCodeAt(0)) + (tile.y + 1);
      }

}
