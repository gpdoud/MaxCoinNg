import { Component } from '@angular/core';
import { Transaction } from './models/transaction.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MaxCoinNg';

  constructor() {
    let trans: Transaction[] = [];
    let tran1 = new Transaction();
    tran1.outTran("Bank", 1000);
    trans.push(tran1);
    let tran2 = new Transaction();
    tran2.inOutTran("Bank", "Greg", 200);
    tran2.finalize();
    trans.push(tran2);
    console.log(trans);
  }
}
