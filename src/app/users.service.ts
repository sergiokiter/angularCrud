import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get('http://localhost/crud-angular/users.php');
  }

  addUser(formData) {
    return this.http.post('http://localhost/crud-angular/users.php', formData);
  }
  deleteUser(id) {
    return this.http.get('http://localhost/crud-angular/users.php?id=' + id);
  }
}
