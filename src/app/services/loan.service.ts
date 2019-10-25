import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Loan } from '../models/loan';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoanService {
    private loanDataLocation : string = 'http://localhost:4200/assets/loans.json';

    constructor(private http: HttpClient) { }

    public getLoans() : Observable<Loan[]> {
        return this.http.get<Loan[]>(this.loanDataLocation);
    }
}