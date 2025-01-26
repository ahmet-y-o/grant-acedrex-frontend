import { Component } from '@angular/core';
import { Board } from '../../acedrax-logic/Board';
import { Piece } from '../../acedrax-logic/pieces/BasePiece';
import { Color, Tile } from '../../acedrax-logic/models';
import { Pawn } from '../../acedrax-logic/pieces/Pawn';
import { Rook } from '../../acedrax-logic/pieces/Rook';
import { Aanca } from '../../acedrax-logic/pieces/Aanca';
import { Crocodile } from '../../acedrax-logic/pieces/Crocodile';
import { Giraffe } from '../../acedrax-logic/pieces/Giraffe';
import { King } from '../../acedrax-logic/pieces/King';
import { Lion } from '../../acedrax-logic/pieces/Lion';
import { Unicornio } from '../../acedrax-logic/pieces/Unicornio';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  providers: [GameService]
})
export class BoardComponent {

  protected turn: Color = Color.White;
  protected selectedTile: Tile|null = null;
  protected selectedPieceAvailableSquares: Tile[] = [];
  protected board = new Board();

  constructor(private gameService: GameService) {}

  public leftClick(e: MouseEvent, tile: any) {
    e.preventDefault();
    if (this.selectedTile != null && this.selectedPieceAvailableSquares.includes(tile)) {
      // move
      this.board.move(this.selectedTile, tile);
      this.selectedTile = null
      this.selectedPieceAvailableSquares = []
      this.turn = this.turn == Color.White ? Color.Black : Color.White
      return
    }

    if (tile == this.selectedTile) {
      this.selectedTile = null
      this.selectedPieceAvailableSquares = []
      return 
    }

    if (tile.piece == null ) {
      this.selectedTile = null
      this.selectedPieceAvailableSquares = [];
    } else {
      // cannot select opponent pieces
      if (tile.piece!.color !== this.turn) {
        return
      }
      this.selectedTile = tile
      this.selectedPieceAvailableSquares = this.board.getLegalMovesForPiece(tile)
    }
    
  }
  public rightClick(e: MouseEvent) {
    e.preventDefault();
    this.gameService.reconnect()
  }
}
