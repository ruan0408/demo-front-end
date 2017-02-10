import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
import {UserService} from "../user.service";

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
  providers: [UserService]
})
export class UserRegistrationComponent implements OnInit {

  user: FormGroup;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });

  }

  onSubmit() {
    console.log(this.user.get('username').value);
    console.log(this.user.get('password').value);
    this.userService.addUser({username: this.user.get('username').value, password: this.user.get('password').value})
      .subscribe(
        json => console.log(json),
        error => console.log(error)
      );
  }

}
