import { Component, OnInit } from '@angular/core';
import { ProjectContextService } from '../services/project-context.service';
import { HttpClientService } from '../services/http-client.service';
import { APIUrlConstants } from '../../../api-url-constants';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  friends: any = [];
  user: any = {}
  constructor(
    private projectContextService: ProjectContextService,
    private httpClientService: HttpClientService
  ) {
  }

  ngOnInit(): void {
    this.projectContextService.userContext$.subscribe(user => {
      console.log("dash", user)
      this.user = user;
      if (user && user.id)
        this.getUserFriends(user.id);
    })
  }

  getUserFriends(user_id) {
    const url = APIUrlConstants.getUserFriends.replace("{{user_id}}", user_id)
    this.httpClientService.getByObservable(url).subscribe((result) => {
      console.log("getUserFriends", result);
      let { data }: any = result
      this.friends = data;
    })
  }

}
