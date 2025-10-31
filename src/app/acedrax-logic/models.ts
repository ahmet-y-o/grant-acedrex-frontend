import { Aanca } from "./pieces/Aanca";
import { Piece } from "./pieces/BasePiece";
import { Crocodile } from "./pieces/Crocodile";
import { Giraffe } from "./pieces/Giraffe";
import { King } from "./pieces/King";
import { Lion } from "./pieces/Lion";
import { Pawn } from "./pieces/Pawn";
import { Rook } from "./pieces/Rook";
import { Unicornio } from "./pieces/Unicornio";

export enum Color {
    White,
    Black
}

export class TileCoords {
    public x: number
    public y: number

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}


export class Tile {

    public x: number
    public y: number
    public piece: (Piece | null)
    public isLight: boolean

    public constructor(x: number, y: number, piece: (Piece | null)) {
        this.x = x;
        this.y = y;
        this.piece = piece;
        this.isLight = (this.x + this.y) % 2 == 0
    }

    public newPawn(color: Color) {
        const p = new Pawn(color, this);
        this.piece = p
    }

    public newKing(color: Color) {
        const k = new King(color, this);
        this.piece = k
    }

    public newAanca(color: Color) {
        const a = new Aanca(color, this);
        this.piece = a
    }

    public newCrocodile(color: Color) {
        const c = new Crocodile(color, this);
        this.piece = c
    }

    public newGiraffe(color: Color) {
        const g = new Giraffe(color, this);
        this.piece = g
    }

    public newLion(color: Color) {
        const l = new Lion(color, this);
        this.piece = l
    }

    public newRook(color: Color) {
        const r = new Rook(color, this);
        this.piece = r
    }

    public newUnicornio(color: Color) {
        const u = new Unicornio(color, this);
        this.piece = u;
    }

    public getLightDarkCSS(): string {
        return this.isLight ? "tile-light" : "tile-dark";
    }

    public tileCoords(): TileCoords {
        return new TileCoords(this.x, this.y)
    }

    public isCoordsSameAs(tile: Tile | null): boolean {
        if (tile == null) return false
        return this.x == tile.x && this.y == tile.y;
    }

    public CoordString(): string {
        return String.fromCharCode(this.x + 97) + String(this.y + 1)
    }

}

// enum type for all objects
export enum PieceType {
    Pawn,
    Rook,
    Unicornio,
    Lion,
    Giraffe,
    Crocodile,
    Aanca,
    King
}
