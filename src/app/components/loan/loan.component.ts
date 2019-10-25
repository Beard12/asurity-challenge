import { Component, Inject } from '@angular/core';
import { Loan } from '../../models/loan';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { LOAN_DATA } from 'src/app/services/loan.injectiontokens';
import { LoanOverlayRef } from 'src/app/services/loan.overlayref';

@Component({
    selector: 'loan-component',
    templateUrl: './loan.component.html'
})
export class LoanComponent {
    constructor(
        public dialogRef: LoanOverlayRef,
        @Inject(LOAN_DATA) public loan: Loan
      ) { }
}
