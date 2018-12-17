import { TxIn } from './txin.class';
import { TxOut } from './txout.class';

export class Transaction {

    private static nextId = 1;
    static transactions: Transaction[] = [];

    Id: number;
    TxIns: TxIn[];
    TxOuts: TxOut[];

    constructor() {
        this.Id = Transaction.nextId++;
        this.TxIns = [];
        this.TxOuts = [];
        Transaction.transactions.push(this);
    }
    finalize() {
        let totalNeeded = 0;
        for(let txout of this.TxOuts) {
            totalNeeded += txout.Value;
        }
        let InUserKey = this.TxIns[0].UserKey;
        let txout = this.findOutTran(InUserKey, totalNeeded);
        if(txout != null && this.TxIns.length > 0) {
            this.TxIns[0].PrevTxOutId = txout.Id;
            if(txout.Value > totalNeeded) {
                this.outTran(InUserKey, txout.Value - totalNeeded);
            }
        }
    }
    inOutTran(InUserKey: string, OutUserKey: string, Amount: number) {
        this.TxIns.push(new TxIn(InUserKey));
        this.outTran(OutUserKey, Amount);
    }
    inTran(UserKey: string) {
        this.TxIns.push(new TxIn(UserKey));
    }
    outTran(UserKey: string, Value: number) {
        this.TxOuts.push(new TxOut(UserKey, Value));
    }
    findOutTran(UserKey: string, Amount: number): TxOut {
        for(let tran of Transaction.transactions) {
            for(let txout of tran.TxOuts) {
                if(txout.Value >= Amount) {
                    return txout;
                }
            }
        }
        return null;
    }
}