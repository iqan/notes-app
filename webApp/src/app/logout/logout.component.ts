import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private routerService: RouterService,
              private authService: AuthenticationService,
              private socketService: SocketService) { }

  ngOnInit() {
    setTimeout(() => {
      this.authService.logout();
      this.socketService.disconnect();
      this.routerService.routeToLogin();
    }, 3000);
  }

}
