import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from './users.service';

@Component({
  selector: 'users-add',
  template: `
    <h1>Add User</h1>
    <form [formGroup]="addUserForm" (ngSubmit)="onSubmit()">
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              formControlName="username"
              [ngClass]="{ 'is-invalid': submitted && f.username.errors }"
            />
            <div
              class="invalid-feedback"
              *ngIf="submitted && f.username.errors"
            >
              <div *ngIf="f.username.errors.required">
                Username is required
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <input
              class="form-control"
              type="text"
              placeholder="Email"
              formControlName="email"
              [ngClass]="{ 'is-invalid': submitted && f.email.errors }"
            />
            <div class="invalid-feedback" *ngIf="submitted && f.email.errors">
              <div *ngIf="f.email.errors.required">
                Email is required
              </div>
              <div *ngIf="f.email.errors.email">
                Email is invalid
              </div>
            </div>
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-small btn-primary mt-3">
        Add user
      </button>
    </form>
  `,
  styles: [``]
})
export class UsersAddComponent implements OnInit {
  addUserForm: FormGroup;
  submitted = false;
  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  get f() {
    return this.addUserForm.controls;
  }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.addUserForm.invalid) {
      return;
    }

    let formData = new FormData();
    formData.append('username', this.addUserForm.value.username);
    formData.append('email', this.addUserForm.value.email);

    this.usersService.addUser(formData).subscribe((data: any) => {
      this.router.navigateByUrl('/users');
    });
  }
}
