import { Injectable } from '@angular/core';
import { Observable, scan, Subject } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Color, Tile } from '../acedrax-logic/models';
import { Board } from '../acedrax-logic/Board';

@Injectable()
export class OnlineGameService {

  private board: Board = new Board();
  private tilesObservable$: Observable<Tile[][]> = new Observable<Tile[][]>();
  private lastMoveFrom$: Subject<Tile | null> = new Subject<Tile | null>();
  private lastMoveTo$: Subject<Tile | null> = new Subject<Tile | null>();
  private connection: WebSocket | null = null
  private messagesSubject: Subject<string> = new Subject<string>();
  private movesSubject: Subject<string> = new Subject<string>();
  private messages$: Observable<string[]>;
  private moves$: Observable<string[]>;
  private side$: Subject<Color>;
  private turn$: Subject<Color>;
  public randomId = Math.random().toString(36).slice(2);
  private sound = new Audio("assets/piece_move.mp3");

  constructor() {
    this.messages$ = this.messagesSubject.asObservable().pipe(
      scan((acc: string[], msg: string) => [...acc, msg], []) 
    );
    this.moves$ = this.movesSubject.asObservable().pipe(
      scan((acc: string[], msg: string) => [...acc, msg], []) 
    );
    this.tilesObservable$ = new Observable<Tile[][]>((observer) => {
      observer.next(this.board.tiles)
    })
    this.side$ = new Subject<Color>();
    this.turn$ = new Subject<Color>();
  }

  async connect(roomId: string, side: string) {
    this.connection = new WebSocket("ws://localhost:8080/join-room/" + roomId + "?s=" + side);
    this.connection.onmessage = (event) => {
      const eventJson = JSON.parse(event.data)
      console.log(event.data)
      if (eventJson.type == "chat") {

        this.messagesSubject.next(eventJson.data); // Push incoming messages to the Observable stream  
      } else if (eventJson.type == "move") {
        this.sound.play()
        this.movesSubject.next(eventJson.data);
        const { letter1, number1, letter2, number2 } = this.extractSubstrings(eventJson.data)!
        const from = this.notationToTile(letter1 + number1)
        const to = this.notationToTile(letter2 + number2)
        this.board.move(from, to)
        this.turn$.next(this.board.turn)
        this.lastMoveFrom$.next(from)
        this.lastMoveTo$.next(to)
      } else if (eventJson.type == "side") {
        // should use signals?
        console.log("service recives side", new Date())
        this.side$.next(eventJson.data == "White" ? Color.White : Color.Black)
      } else if (eventJson.type == "error") {
        
      }
    };

    // Handle WebSocket close or errors
    this.connection.onclose = () => {
      console.log('WebSocket connection closed');
      this.messagesSubject.complete();
    };

    this.connection.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.messagesSubject.error(error);
    };

  }

  disconnect() {
    this.connection?.close()
  }

  reconnect() {
    console.log(this.side$)
    console.log("reconnect")
  }

  sendMove(move: string) {
    this.connection?.send(JSON.stringify({
      type: "move",
      data: move
    }))
  }

  chat(message: string) {
    this.connection?.send(JSON.stringify({
      type: "chat",
      data: message
    }))
  }

  async move(from: Tile, to:Tile) {
    this.connection?.send(JSON.stringify({
      type: "move",
      data: this.tileToNotation(from) + this.tileToNotation(to)
    }))
  }

  public messages(): Observable<string[]> {
    return this.messages$;
  }

  public moves(): Observable<string[]> {
    return this.moves$;
  }

  public getSide(): Observable<Color> {
    return this.side$.asObservable();
  }

  public getTurn(): Observable<Color> {
    return this.turn$.asObservable();
  }

  public getTiles(): Observable<Tile[][]> {
    return this.tilesObservable$;
  }

  public getLastMoveFrom(): Observable<Tile | null> {
    return this.lastMoveFrom$.asObservable();
  }

  public getLastMoveTo(): Observable<Tile | null> {
    return this.lastMoveTo$.asObservable();
  }

  public getLegalMovesForPiece(tile: Tile): Tile[] {
    return this.board.getLegalMovesForPiece(tile)
  }

  private extractSubstrings(str: string) {
    const regex = /([a-zA-Z])(\d{1,2})([a-zA-Z])(\d{1,2})/;
    const match = str.match(regex);
  
    if (match) {
      const letter1 = match[1];
      const number1 = parseInt(match[2], 10); // Parse as integer
      const letter2 = match[3];
      const number2 = parseInt(match[4], 10); // Parse as integer
  
      return {
        letter1: letter1,
        number1: number1,
        letter2: letter2,
        number2: number2
      };
    } else {
      return null; // Or throw an error, depending on your needs.
    }
  }

  private notationToTile(notation: string): Tile {
    // first character is always a letter
    const x = notation.charCodeAt(0) - 'a'.charCodeAt(0);
    // second character is a number between 1 and 12
    const y = parseInt(notation.slice(1)) - 1;
    return this.board.tiles[y][x];
  }

  private tileToNotation(tile: Tile): string {
    return String.fromCharCode(tile.x + 'a'.charCodeAt(0)) + (tile.y + 1);
  }
}

type Message = {
  from: Color | "server",
  message: string
}