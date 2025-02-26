import { Component, SkipSelf } from '@angular/core';
import { Color, Tile } from '../../acedrax-logic/models';
import { OnlineGameService } from '../../services/onlinegame.service';
import { AsyncPipe } from '@angular/common';
import { combineLatest } from 'rxjs';
  // TODO: add last move indicators
  // TODO: add check indicator
  // TODO: add sound effects
  // TODO: add righ click drag arrows and circles
@Component({
  selector: 'app-board',
  imports: [AsyncPipe],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  providers: [OnlineGameService]
})
export class BoardComponent {

  protected side: Color | undefined;
  protected turn : Color | undefined = Color.White;
  protected selectedTile: Tile | null = null;
  protected selectedPieceAvailableSquares: Tile[] = [];
  protected lastMoveFrom: Tile | null = null;
  protected lastMoveTo: Tile | null = null;

  constructor(@SkipSelf() public gameService: OnlineGameService) {
    this.gameService.getSide().subscribe(side => this.side = side);
    this.gameService.getTurn().subscribe(turn => this.turn = turn);
    this.gameService.getLastMoveFrom().subscribe(lastMoveFrom => this.lastMoveFrom = lastMoveFrom);
    this.gameService.getLastMoveTo().subscribe(lastMoveTo => this.lastMoveTo = lastMoveTo);
  }

  public dragStart(e: DragEvent, tile: any) {
    if (tile.piece == null) {
      return
    } else if (tile.piece.color != this.side) {
      e.preventDefault()
      return
    } else if (this.turn != this.side) {
      return
    }
    this.selectedTile = tile
    this.selectedPieceAvailableSquares = this.gameService.getLegalMovesForPiece(tile)
  }

  public dropToTile(e: DragEvent, tile: any) {
    e.preventDefault();
    if (this.selectedTile != null && this.selectedPieceAvailableSquares.includes(tile)) {
      this.gameService.move(this.selectedTile, tile)
      this.selectedTile = null
      this.selectedPieceAvailableSquares = []
    } else {
      this.selectedTile = null
      this.selectedPieceAvailableSquares = []
    }
  }

  public leftClick(e: MouseEvent, tile: any) {

    // TODO: fix when clicking and canceling on king, king counts as moved
    e.preventDefault();    
    
    // clicked on already selected tile
    if (tile == this.selectedTile) {
      this.selectedTile = null
      this.selectedPieceAvailableSquares = []
      return
    }

    if (this.side != this.turn) {
      // not our turn, don't select anything
      return
    }

    // clicked on owned piece
    if (tile.piece?.color == this.side) {
      this.selectedTile = tile
      this.selectedPieceAvailableSquares = this.gameService.getLegalMovesForPiece(tile)
      return
    }

    if (this.selectedTile != null && this.selectedPieceAvailableSquares.includes(tile)) {
      // attempt move
      this.gameService.move(this.selectedTile, tile)
      this.selectedTile = null
      this.selectedPieceAvailableSquares = []
      return
    }

    if (tile.piece == null) {
      // clicked on empty space
      this.selectedTile = null
      this.selectedPieceAvailableSquares = [];
    } else {
      // cannot select opponent pieces
      /*
      if (tile.piece!.color !== this.board.turn) {
        return
      }
        */
      /*
      this.selectedTile = tile
      this.selectedPieceAvailableSquares = this.board().getLegalMovesForPiece(tile)
      */
    }
      
  }
  public rightClick(e: MouseEvent) {
    e.preventDefault();
    
  }
}
