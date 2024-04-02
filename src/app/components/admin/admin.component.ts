import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  usersList: User[] = [];
  isUsersOpen: boolean = false;

  constructor(private apiService: ApiService) {
    apiService.getUsers().subscribe(users => {
      this.usersList = users;
    })
  }

  usersOpen() {
    this.isUsersOpen = !this.isUsersOpen
  }

}
