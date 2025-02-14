import { Injectable } from '@angular/core';
import { Observable, scan, Subject } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Color } from '../acedrax-logic/models';
import { Board } from '../acedrax-logic/Board';

@Injectable()
export class OnlineGameService {

  private board: Board = new Board();
  private connection: WebSocket | null = null
  private messageSubject: Subject<string> = new Subject<string>();
  private moveSubject: Subject<string> = new Subject<string>();
  private messages$: Observable<string[]>;
  private moves$: Observable<string[]>;
  private side: Color | undefined = undefined;

  constructor() {
    this.messages$ = this.messageSubject.asObservable().pipe(
      scan((acc: string[], msg: string) => [...acc, msg], []) 
    );
    this.moves$ = this.moveSubject.asObservable().pipe(
      scan((acc: string[], msg: string) => [...acc, msg], []) 
    );
  }

  async connect(roomId: string) {
    this.connection = new WebSocket("ws://localhost:8080/join-room/" + roomId)
    this.connection.onmessage = (event) => {
      const eventJson = JSON.parse(event.data)
      console.log(event.data)
      if (eventJson.type == "chat") {
        this.messageSubject.next(eventJson.data); // Push incoming messages to the Observable stream  
      } else if (eventJson.type == "move") {
        this.moveSubject.next(eventJson.data);
      } else if (eventJson.type == "side") {
        // should use signals?
        console.log("service recives side", new Date())
        this.side = (eventJson.data == "White" ? Color.White : Color.Black)
      }
    };

    // Handle WebSocket close or errors
    this.connection.onclose = () => {
      console.log('WebSocket connection closed');
      this.messageSubject.complete();
    };

    this.connection.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.messageSubject.error(error);
    };

  }

  disconnect() {
    this.connection?.close()
  }

  reconnect() {
    console.log(this.side)
    console.log("reconnect")
  }

  getBoard() {
    return this.board;
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

  public messages(): Observable<string[]> {
    return this.messages$;
  }

  public moves(): Observable<string[]> {
    return this.moves$;
  }

  public getSide(): Color | undefined {
    return this.side;
  }

}
