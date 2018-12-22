import { TransactionService } from '../services/transaction.service';
import { Transaction } from './transaction.class';

export class Test {

    createOutTrans(UserKey: string, Amount: number) {
        let tran = new Transaction();
        tran.outTran("Bank", 1000);
        tran.finalize();
    }
    createInOutTrans(InUserKey: string, OutUserKey: string, Amount: number) {
        let tran = new Transaction();
        tran.inOutTran("Bank", "Greg", 200);
        tran.finalize();
    }

    run() {
        console.log("Test.run()");
        this.createOutTrans("Bank", 1000);
        this.createInOutTrans("Bank", "Greg", 200);
        this.createInOutTrans("Bank", "Cindy", 150);
    }

    constructor(private transvc: TransactionService) {}
}