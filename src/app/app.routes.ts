import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RoomComponent } from './pages/room/room.component';
import { HotseatComponent } from './pages/hotseat/hotseat.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'hotseat', component: HotseatComponent },
    { path: ':id', component: RoomComponent },

];
