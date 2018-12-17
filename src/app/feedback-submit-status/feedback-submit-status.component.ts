import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { SharedServiceService } from '../services/shared-service.service';

@Component({
  selector: 'app-feedback-submit-status',
  templateUrl: './feedback-submit-status.component.html'
})
export class FeedbackSubmitStatusComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private sharedService: SharedServiceService) { }
  ticketDetails = {};
  ngOnInit() {


    this.ticketDetails = this.sharedService.getTicketdetails() || {};
    this.ticketDetails['message'] = this.ticketDetails['message'] ? this.ticketDetails['message'] : 'Ticket created succesfully';
  }

  ngOnDestroy() {
  }

}
