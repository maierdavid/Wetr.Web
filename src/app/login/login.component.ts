import { Component, OnInit } from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import { MessagesModule }from 'primeng/messages'
import { MessageModule }from 'primeng/message'
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Message } from 'primeng/components/common/message';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService : AuthenticationService, private router : Router, private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => this.return = params['returnUrl']);
  }

  return: string = "";

  username: string;
  password: string;
  
  msgs: Message[] = [];
  msg: Message;

  onSubmit = function () {
    if(this.username != "" && this.password != ""){
      this.authenticationService.login(this.username, this.password).then(val => {
        if(val){
          this.router.navigateByUrl(this.return);
        } else {
          this.msgs.push({severity:'error', summary:'Login nicht erfolgreich', detail:'Bitte überprüfen Sie Benutzername und Passwort'});
        }
      });
    } else {
      this.msgs.push({severity:'error', summary:'Login nicht erfolgreich', detail:'Bitte geben Sie Benutzername und Passwort ein'});
    }

  }

}
