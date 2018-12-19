import { TxBase } from './txbase.class';
import { TxOut } from './txout.class';

export class TxIn extends TxBase {

    PrevTxOutId: number;
    TxOut: TxOut; // is this used???

    constructor(UserKey: string) {
        super();
        this.UserKey = UserKey;
        this.Type = "IN";
    }
}