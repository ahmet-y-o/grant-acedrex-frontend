import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { createRoom, getRoomsList } from '../../modules/requests/request';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  rooms!: any;

  constructor(private router: Router, private http: HttpClient) {
  }

  async ngOnInit() {
    this.rooms = await getRoomsList();
  }

  public async handleCreateRoom() {
    console.log("Create room button")
    // make a request to backend server and create a room
    // get the room id and redirect to the url
    const roomId = await createRoom()
    this.router.navigate([roomId])
  }

  public async handleJoin(roomId: string) {
    console.log("Join button ", roomId)
  }

  public async handleHotSeat() {
    console.log("Hot Seat button")
    this.router.navigate(['hotseat'])
  }


}
