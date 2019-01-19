import { Injectable } from '@angular/core';
import { UserClient, User } from '../restclient/restclient';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private userClient : UserClient) { }

  async login(username: string, password: string): Promise<boolean> {
    let u : User;
    u = await this.userClient.getLogin(username,password).toPromise();
    if(u != null){
      sessionStorage.setItem("User",JSON.stringify(u));
      return true;
    }
    return false;
  }

  getLoggedIn() : User{
    var tmp = JSON.parse(sessionStorage.getItem("User"));
    var u: User = new User();
    u.id = tmp.Id;
    u.username = tmp.Username;

    return u;
  }

  isLoggedIn() {
    return sessionStorage.getItem("User") != null;
  }

  Logout(){
    sessionStorage.removeItem("User");
  }
}
