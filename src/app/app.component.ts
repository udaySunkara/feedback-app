import { Component } from '@angular/core';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'feedback-app';
  isFeedbackStatus = null;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd ) {
        this.isFeedbackStatus = (event.url === '/feedback-status');
      }
    });
  }
}
