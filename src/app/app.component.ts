import { Component, ViewChild, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Loan, AmortizationType } from '../app/models/loan';
import { LoanService } from './services/loan.service';
import { LoanOverlayService } from './services/loan.overlay.service';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private loanService: LoanService,
    private previewDialog: LoanOverlayService
  ) { }
  public displayedColumns: string[] = ['loanTerm', 'actionTakenType', 'lockInDate', 'amortizationType', 'apr', 'reverseMortgage', 'rateSpread'];
  public dataSource = new MatTableDataSource();
  public isLoadingResults = true;
  public resultsLength = 0;
  public selectedSpread: string;
  public rateSpreads: string[] = [
    "1.00 - 1.50",
    "1.51 - 2.00",
    "2.01 - 2.50",
    "2.51 - 3.00",
    "3.00 - 3.50",
    "3.50 or greater"
  ]

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.loanService.getLoans()
      .subscribe(loans => {
        let transformedLoans = this.transformLoans(loans);
        this.isLoadingResults = false;
        this.resultsLength = transformedLoans.length;
        this.dataSource.data = transformedLoans;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = this.filterLoans;
        this.dataSource.sort = this.sort;
      });
  }

  showPreview(loan: Loan) {
    this.previewDialog.open(loan);
  }

  filterTrigger(event: MatRadioChange) {
    this.dataSource.filter = event.value;
  }

  private transformLoans(loans: Loan[]): Loan[] {
    loans.forEach(loan => { loan.amortizationType = AmortizationType[loan.amortizationType] });
    return loans;
  }

  private filterLoans(loan: Loan, rateSpread: string): boolean {
    let loanToFilter: boolean = false;
    switch (rateSpread) {
      case ("1.00 - 1.50"):
        loanToFilter = loan.rateSpread > 1 && loan.rateSpread <= 1.5;
        break;
      case ("1.51 - 2.00"):
        loanToFilter = loan.rateSpread > 1.5 && loan.rateSpread <= 2;
        break;
      case ("2.01 - 2.50"):
        loanToFilter = loan.rateSpread > 2 && loan.rateSpread <= 2.5;
        break;
      case ("2.51 - 3.00"):
        loanToFilter = loan.rateSpread > 2.5 && loan.rateSpread <= 3;
        break;
      case ("3.00 - 3.50"):
        loanToFilter = loan.rateSpread > 3 && loan.rateSpread <= 3.5;
        break;
      case ("3.50 or greater"):
        loanToFilter = loan.rateSpread > 3.5;
        break;
      default:
        loanToFilter = false;
    }
    return loanToFilter;
  }
}