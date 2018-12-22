import { Transaction } from './transaction.class';

export class TransactionServer {

    id: number;
    json: string;

    toTransaction(): Transaction {
        let t = JSON.parse(this.json);
        return t;
    }

    static createTransactionServerInstance(t: Transaction): TransactionServer {
        let ts = new TransactionServer();
        ts.id = 0;
        let json = {
            id: t.Id,
            txIns: t.TxIns,
            txOuts: t.TxOuts,
            hash: t.Hash
        };
        ts.json = JSON.stringify(json);
        return ts;
    }

    constructor(ts?: TransactionServer) {
        if(ts != null) {
            this.id = ts.id;
            this.json = ts.json;
        }
    }
}