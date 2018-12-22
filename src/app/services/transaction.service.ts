import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Transaction } from '../models/transaction.class'
import { TransactionServer } from '../models/transaction-server.class';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  url = 'http://localhost:50129/api/transactions';

  get(): Observable<TransactionServer[]> {
    return this.http.get(this.url) as Observable<TransactionServer[]>;
  }

  post(json): Observable<boolean> {
    return this.http.post(`${this.url}`, json) as Observable<boolean>;
  }

  constructor(private http: HttpClient) { }
}
