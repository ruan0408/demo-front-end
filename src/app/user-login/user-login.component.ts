import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  providers: [UserService, AuthService]
})
export class UserLoginComponent implements OnInit {

  user: FormGroup;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.user = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  onSubmit() {
    let userJson = {username: this.user.get('username').value, password: this.user.get('password').value};
    this.userService.login(userJson)
      .subscribe(
        json => {
          console.log(json);
          this.router.navigate([AuthService.getAttemptedURL()])
        },
        error => console.log(error)
      );
  }
}
