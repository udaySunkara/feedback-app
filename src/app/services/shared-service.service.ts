import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  tickectDetails = null;
  constructor() { }

  setTicketdetails(res) {
    this.tickectDetails = res;
  }
  getTicketdetails() {
    return this.tickectDetails;
  }
}
