import { Transaction } from './transaction.class';

export class TransactionServer {

    id: number;
    json: string;

    constructor(t: Transaction) {
        this.id = 0;
        let ts = {
            id: t.Id,
            txIns: t.TxIns,
            txOuts: t.TxOuts,
            hash: t.Hash
        };
        this.json = JSON.stringify(ts);
    }
}