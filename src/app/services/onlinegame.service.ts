import { Injectable } from '@angular/core';
import { Observable, scan, Subject } from 'rxjs';
import { Color, Tile } from '../acedrax-logic/models';
import { Board } from '../acedrax-logic/Board';
import { BASEURL } from '../modules/requests/request';


@Injectable()
export class OnlineGameService {

  private board: Board = new Board();
  private tilesObservable$: Observable<Tile[][]> = new Observable<Tile[][]>();
  private lastMoveFrom$: Subject<Tile | null> = new Subject<Tile | null>();
  private lastMoveTo$: Subject<Tile | null> = new Subject<Tile | null>();
  private connection: WebSocket | null = null
  private messagesSubject: Subject<Message> = new Subject<Message>();
  private movesSubject: Subject<string> = new Subject<string>();
  private messages$: Observable<Message[]>;
  private moves$: Observable<string[]>;
  private side$: Subject<Color>;
  private turn$: Subject<Color>;
  public randomId = Math.random().toString(36).slice(2);
  private sound = new Audio("assets/piece_move.mp3");

  constructor() {
    this.messages$ = this.messagesSubject.asObservable().pipe(
      scan((acc: Message[], msg: Message) => [...acc, msg], []) 
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
    this.connection = new WebSocket(BASEURL + "join-room/" + roomId + "?s=" + side);
    this.connection.onmessage = (event) => {
      const eventJson = JSON.parse(event.data)
      if (eventJson.type == "chat") {
        const message: Message = {
          from: eventJson.from,
          message: eventJson.data
        }
        this.messagesSubject.next(message); // Push incoming messages to the Observable stream  
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
        this.side$.next(eventJson.data == "White" ? Color.White : Color.Black)
      } else if (eventJson.type == "error") {
        console.log(eventJson)
      } else if (eventJson.type == "debug") {
        //console.log(eventJson.data)
        //console.log(this.board.allAvailbleMoves())

        let server_data = JSON.parse(eventJson.data)
        let client_data = JSON.parse(this.board.allAvailbleMoves())
        let clientKeys = []
        let serverKeys = []
        let all_keys = []
        for (let key in server_data) {
          all_keys.push(key)
          serverKeys.push(key)
        }
        for (let key in client_data) {
          all_keys.push(key)
          clientKeys.push(key)
        }
        serverKeys.sort();
        clientKeys.sort();
        // console.log(serverKeys, clientKeys)
        
        for (let key of all_keys) {
          let server_moves: [] = server_data[key]
          let client_moves: [] = client_data[key]
          server_moves.sort();
          client_moves.sort();
          if (server_moves.toString() != client_moves.toString()) {
            console.log(key, client_moves, server_moves)
          }
        }

      }
    };

    // Handle WebSocket close or errors
    this.connection.onclose = () => {
      // retry connection?
      this.messagesSubject.next({from: "client", message: "Connection closed"});
      this.messagesSubject.complete();
    };

    this.connection.onerror = (error) => {
      this.messagesSubject.next({from: "client", message: "Connection error"});
      console.error('WebSocket error:', error);
    };

  }

  disconnect() {
    this.connection?.close()
  }

  reconnect() {
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

  public messages(): Observable<Message[]> {
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

interface Message {
  from: string,
  message: string
}