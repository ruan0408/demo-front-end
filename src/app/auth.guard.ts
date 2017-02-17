import {Injectable} from "@angular/core";
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
/**
 * Created by ruan0408 on 13/02/17.
 */

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(route.url.toString());
    return this.authService.isLoggedIn()
      .then(isLoggedIn => this.handleIsLoggedIn(isLoggedIn, route.url.toString()))
      .catch(err => console.log(err));
  }

  private handleIsLoggedIn(isLoggedIn, url) {
    if (isLoggedIn) return true;
    else {
      AuthService.setAttemptedURL(url);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
