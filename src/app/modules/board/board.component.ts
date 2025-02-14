import { Component, input, output } from '@angular/core';
import { Board } from '../../acedrax-logic/Board';
import { Piece } from '../../acedrax-logic/pieces/BasePiece';
import { Color, Tile, TileCoords } from '../../acedrax-logic/models';
import { Pawn } from '../../acedrax-logic/pieces/Pawn';
import { Rook } from '../../acedrax-logic/pieces/Rook';
import { Aanca } from '../../acedrax-logic/pieces/Aanca';
import { Crocodile } from '../../acedrax-logic/pieces/Crocodile';
import { Giraffe } from '../../acedrax-logic/pieces/Giraffe';
import { King } from '../../acedrax-logic/pieces/King';
import { Lion } from '../../acedrax-logic/pieces/Lion';
import { Unicornio } from '../../acedrax-logic/pieces/Unicornio';
import { OnlineGameService } from '../../services/onlinegame.service';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  providers: [OnlineGameService]
})
export class BoardComponent {


  protected turn: Color = Color.White;
  protected selectedTile: Tile | null = null;
  protected selectedPieceAvailableSquares: Tile[] = [];
  protected lastMoveFrom: Tile | null = null;
  protected lastMoveTo: Tile | null = null;

  board = input<Board>(new Board());
  side = input<Color>(Color.White);
  afterMove = output<{ from: Tile, to: Tile }>();
  // TODO: add last move indicators
  // TODO: add check indicator
  // TODO: add sound effects
  // TODO: add righ click drag arrows and circles

  constructor(private gameService: OnlineGameService) { }

  public leftClick(e: MouseEvent, tile: any) {

    // TODO: fix when clicking and canceling on king, king counts as moved
    e.preventDefault();

    if (tile == this.selectedTile) {
      this.selectedTile = null
      this.selectedPieceAvailableSquares = []
      return
    }

    if (this.selectedTile != null && this.selectedPieceAvailableSquares.includes(tile)) {
      // move
      this.board().move(this.selectedTile, tile);
      this.lastMoveFrom = this.selectedTile
      this.lastMoveTo = tile
      this.afterMove.emit({ from: this.selectedTile!, to: tile })
      this.selectedTile = null
      this.selectedPieceAvailableSquares = []
      this.turn = this.turn == Color.White ? Color.Black : Color.White
      return
    }

    if (tile.piece == null) {
      this.selectedTile = null
      this.selectedPieceAvailableSquares = [];
    } else {
      // cannot select opponent pieces
      if (tile.piece!.color !== this.turn) {
        return
      }
      this.selectedTile = tile
      this.selectedPieceAvailableSquares = this.board().getLegalMovesForPiece(tile)
    }
  }
  public rightClick(e: MouseEvent) {
    console.log(this.lastMoveFrom, this.lastMoveTo)
    e.preventDefault();
    this.gameService.reconnect()
  }
}
