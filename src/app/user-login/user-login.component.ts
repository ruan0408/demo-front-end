import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
import {UserService} from "../user.service";
import {LocalStorageService} from "angular-2-local-storage";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  providers: [UserService]
})
export class UserLoginComponent implements OnInit {

  user: FormGroup;

  constructor(private localStorage: LocalStorageService, private userService: UserService) {}

  ngOnInit() {
    this.user = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  onSubmit() {
    this.userService.login({username: this.user.get('username').value, password: this.user.get('password').value})
      .subscribe(
        json => console.log(json),
        error => console.log(error)
      );
  }
}
