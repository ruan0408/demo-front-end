import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";
/**
 * Created by ruan0408 on 13/02/17.
 */

@Injectable()
export class AuthGuard implements CanActivate {

  auth: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    if (this.authService.isLoggedIn())
      return true;
    else
      this.router.navigate(['/login']);
    return false;
  }
}
