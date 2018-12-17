import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { Subject, Observable } from 'rxjs';
import { map, takeUntil, switchMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { SharedServiceService } from '../services/shared-service.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit, OnDestroy {
  feedbackData: any = null;
  $destroy: Subject<any> = new Subject();
  supportText = 'Select an option below. We\'ll get support out to fix the issue as soon as possible';
  questionText = 'What\'s happening with the ';
  showLoader = false;

  constructor(private http: HttpClient, private router: ActivatedRoute,
     private route: Router, private sharedService: SharedServiceService) { }

  ngOnInit() {
    this.router.paramMap.pipe(
      takeUntil(this.$destroy),
      map(params => params.get('assetId')),
      switchMap(
        (assetId) => {
          if (assetId) {
            return this.http.get(environment.endPoints.getAssetInfo.replace('{##}', assetId));
          } else {
            return Observable.create(false);
          }
        }
      )
    )
    .subscribe(
      (res) => {
        if (res) {
          this.feedbackData = res;
        }
      }
    );
  }

  selectOption(option) {
    this.feedbackData.assetIssues.forEach(_option => {
      if (option.issueDescription !== _option.issueDescription) {
        _option.isSelected = false;
      }
    });
    option.isSelected = !option.isSelected;
  }

  createTicket() {
    // const payload = {
    //   description: 'Ticket created from risk vision.',
    //   group: 'IT OPS VC3 GLOBAL',
    //   priority: 'P4',
    //   service: 'Risk Vision',
    //   caller_id: 'jprateek',
    //   due_date: '2019-05-02T06:26:49Z'
    // };
    const payload = {};
    this.showLoader = true;
    this.http.post(environment.endPoints.setAssetInfo, payload).pipe(
      takeUntil(this.$destroy)
    ).subscribe((res) => {
      this.showLoader = false;
      this.sharedService.setTicketdetails(res);
      this.route.navigate(['/feedback-status']);
    }, (err) => {
      this.showLoader = false;
    });
  }


  ngOnDestroy() {
    this.$destroy.next(true);
  }
}
