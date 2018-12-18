import { sha256 } from 'js-sha256';
import { TxIn } from './txin.class';
import { TxOut } from './txout.class';

export class Transaction {

    private static nextId = 1;
    static transactions: Transaction[] = [];

    Id: number;
    TxIns: TxIn[];
    TxOuts: TxOut[];
    Hash: string;

    constructor() {
        this.Id = Transaction.nextId++;
        this.TxIns = [];
        this.TxOuts = [];
        this.Hash = '';
        Transaction.transactions.push(this);
    }
    finalize() {
        let totalNeeded = 0;
        for(let txout of this.TxOuts) {
            totalNeeded += txout.Value;
        }
        // if no txins, just return
        if(this.TxIns.length != 0) {
            let InUserKey = this.TxIns[0].UserKey;
            let txout = this.findOutTran(InUserKey, totalNeeded);
            if(txout != null && this.TxIns.length > 0) {
                this.TxIns[0].PrevTxOutId = txout.Id;
                if(txout.Value > totalNeeded) {
                    this.outTran(InUserKey, txout.Value - totalNeeded);
                }
            }
        }
        let data = {
            id : this.Id,
            txins : this.TxIns,
            txouts : this.TxOuts
        };
        this.Hash = sha256(JSON.stringify(data));
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
    // find the last TxOut transaction for the user
    findOutTran(UserKey: string, Amount: number): TxOut {
        let maxIdx = Transaction.transactions.length - 1;
        if(maxIdx == -1) return null;
        for(let idx = maxIdx; idx >= 0; idx--) {
            let tran = Transaction.transactions[idx];
            for(let txout of tran.TxOuts) {
                if(txout.Value >= Amount && txout.UserKey == UserKey) {
                    return txout;
                }
            }
        }
        return null;
    }
}