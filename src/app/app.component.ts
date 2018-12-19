import { Component } from '@angular/core';
import { Test } from './models/test.class';
import { TransactionService } from './services/transaction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MaxCoinNg';

  constructor(private transvc: TransactionService) {}
}
