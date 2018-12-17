import { TxBase } from './txbase.class';

export class TxOut extends TxBase {

    Value: number;

    constructor(UserKey: string, Value: number) {
        super();
        this.UserKey = UserKey;
        this.Value = Value;
        this.Type = "OUT";
    }
}