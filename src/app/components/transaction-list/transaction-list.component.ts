import { Component, OnInit } from '@angular/core';

import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.class';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions: Transaction[];

  constructor(private transvc: TransactionService) { }

  ngOnInit() {
    let t = new Transaction();
    t.outTran("Bank", 1000);
    t.finalize();
    this.transvc.addTransaction(t);
    let t2 = new Transaction();
    t2.inOutTran("Bank", "Greg", 200);
    t2.finalize();
    this.transvc.addTransaction(t2);

    this.transactions = this.transvc.transactions;
    console.log(this.transactions);
  }

}
