export class TxBase {

    private static nextId = 1;

    Id: number;
    UserKey: string;
    Type: string;

    constructor() {
        this.Id = TxBase.nextId++;
    }
}