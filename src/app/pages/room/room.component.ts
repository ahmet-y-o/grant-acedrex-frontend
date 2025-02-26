import { Component } from '@angular/core';
import { OnlineGameService } from '../../services/onlinegame.service';
import { Board } from '../../acedrax-logic/Board';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { BoardComponent } from "../../modules/board/board.component";
import { Color, Tile } from '../../acedrax-logic/models';

@Component({
  selector: 'app-room',
  imports: [FormsModule, AsyncPipe, BoardComponent],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss',
  providers: [OnlineGameService]
})
export class RoomComponent {
  chatInput: string = "";
  constructor(
    public gameService: OnlineGameService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    // connect to websocket
    this.gameService.connect(this.route.snapshot.params['id'], this.route.snapshot.queryParams["s"])
  }


  ngOnDestroy() {
    this.gameService.disconnect()
  }

  onMove(event: {from: Tile, to: Tile}) {
    console.log("onMove from parent", event)
    this.gameService.sendMove(event.from.CoordString() + event.to.CoordString())
  }

  chatSubmit() {
    this.gameService.chat(this.chatInput)
    this.chatInput = ""
  }

}
