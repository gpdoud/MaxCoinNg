import { Component, OnInit } from '@angular/core';

import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.class';
import { TransactionServer } from '../../models/transaction-server.class';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactionServers: TransactionServer[];
  transactions: Transaction[];

  constructor(private transvc: TransactionService) { }

  ngOnInit() {
    let t = new Transaction();
    t.outTran("Bank", 1000);
    t.finalize();
    this.transvc.addTransaction(t);

    let ts = new TransactionServer(t);
    
    let t2 = new Transaction();
    t2.inOutTran("Bank", "Greg", 200);
    t2.finalize();
    this.transvc.addTransaction(t2);
    
    let ts2 = new TransactionServer(t2);
    this.transvc.post(ts).subscribe(resp => {
      console.log(resp);
      this.transvc.post(ts2).subscribe(resp => {
        console.log(resp);
      });
    });

    this.transactions = this.transvc.transactions;

    this.transvc.get().subscribe(resp => {
      console.log(resp);
      this.transactionServers = resp;
      let ts1 = this.transactionServers[15];
      console.log("ts1", ts1.json);
      let tsjs = JSON.parse(ts1.json);
      console.log("Ts.Json", tsjs);
    })
    console.log(this.transactions);
  }

}
