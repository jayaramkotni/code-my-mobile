import { Component, OnInit } from '@angular/core';
import { ProjectContextService } from '../services/project-context.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  users: Array<any> = []
  selectedUser: any = {
    first_name: "users",
    avatar: ""
  };
  constructor(private projectContextService: ProjectContextService) {
  }

  ngOnInit(): void {
    this.projectContextService.userDataSource$.subscribe(users => {
      this.users = users;
      this.selectedUser = users.length > 0 ? users[0] : this.selectedUser;
      this.projectContextService.userContext$.next(this.selectedUser);
    })
  }

  onClick(user) {
    this.selectedUser = user;
    this.projectContextService.userContext$.next(user);
  }

}
