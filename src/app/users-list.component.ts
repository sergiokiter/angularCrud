import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'users-list',
  template: `
    <h1>Users List</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let user of users">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button type="button" class="btn btn-danger" (click)="delete(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [``]
})
export class UsersListComponent implements OnInit {
  users = [];
  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  delete(id) {
    this.usersService.deleteUser(id).subscribe((data: any) => {
      this.getUsers(); 
    });
  }
}
