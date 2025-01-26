import { Injectable } from '@angular/core';

@Injectable()
export class GameService {

  constructor() { }

  connect() {
    console.log("connect")
  }

  disconnect() {
    console.log("disconnect")
  }

  reconnect() {
    console.log("reconnect")
  }

  sendMove() {
    console.log("sendmove")
  }

}
