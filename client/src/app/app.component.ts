import { Component, OnInit } from '@angular/core';
import { ProjectContextService } from './services/project-context.service';
import { CONFIG } from '../../config/config.js'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = CONFIG.TITLE
  constructor(
    private projectContextService: ProjectContextService
  ) { }

  ngOnInit(): void {
    this.projectContextService.initProjectContext(() => {
      console.log("init started")
    });
  }

}