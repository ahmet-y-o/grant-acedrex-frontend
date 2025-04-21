import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { createRoom, getRoomsList, isRoomFull } from '../../modules/requests/request';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  rooms!: any;
  showDialog = false

  constructor(private router: Router, private http: HttpClient) {
  }

  async ngOnInit() {
    this.rooms = await getRoomsList();
  }

  public async onlineRoomDialog() {
    this.showDialog = !this.showDialog
  }

  public async handleCreateRoom(side: string) {
    createRoom(side)
      .then(roomId => {
        this.router.navigate([roomId], {
          queryParams: {
            s: side
          }
        })
      })
      .catch(err => console.error("error when creating room:\n", err))
  }



  public async handleJoin(roomId: string) {
    isRoomFull(roomId)
      .then(res => {
        if (res.status == 200) {
          this.router.navigate([roomId])
        } else {
          alert("Room is full")
        }
        
      })
      .catch(err => console.error("error when checking if room is full:\n", err))
    // check if the game is full
  }

  public async handleHotSeat() {
    this.router.navigate(['hotseat'])
  }

  public async handleRefreshList() {
    this.rooms = await getRoomsList();
  }


}
