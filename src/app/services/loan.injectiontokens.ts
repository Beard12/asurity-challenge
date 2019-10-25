import { InjectionToken } from '@angular/core';
import { Loan } from '../models/loan';

export const LOAN_DATA = new InjectionToken<Loan>('LOAN_DATA')