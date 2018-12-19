import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Transaction } from '../models/transaction.class'

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  transactions: Transaction[] = [];

  addTransaction(tran: Transaction): void {
    this.transactions.push(tran);
  }

  dump() {
    console.log("Transactions:", this.transactions);
  }

  constructor() { }
}
