import { sha256 } from 'js-sha256';
import { Transaction } from './transaction.class';
import { BlockMining } from './block-mining.class';
import { MerkleRoot } from './merkle-root.class';
export class Block {

    hash: string;
    index: number;        
    timestamp: string;
    phash: string;
    trans: Transaction[];
    merkle: string;
    nonce: number;

    static genesisBlock(): Block {
        let genesis = new Block();
        genesis.index = 0;
        let tran = new Transaction();
        tran.outTran("Genesis", 0);
        tran.finalize();
        genesis.trans.push(tran);
        let gblock = BlockMining.mineBlockHash(genesis);
        return gblock;
    }

    constructor() {
        this.index = 0;
        this.timestamp = new Date().toUTCString();
        this.phash = '';
        this.trans = [];
        this.merkle = '';
        this.nonce = 0;
    }

    setMerkleRoot() {
        let hashes = [];
        for(let tran of this.trans) {
            hashes.push(tran.Hash);
        }
        this.merkle = MerkleRoot.genMerkleRoot(hashes);
    }
    
    verifyBlock(): boolean {
        if(this.hash !== this.genBlockHash()) {
            throw "Block is corrupt!";
        }
        return true;
    }

    setBlockHash(): void {
        this.setMerkleRoot();
        this.hash = this.genBlockHash();
    }
    genBlockHash(): string {
        let data = {
            index : this.index,
            timestamp : this.timestamp,
            phash : this.phash,
            trans : this.trans,
            merkle : this.merkle,
            nonce : this.nonce
        };
        return sha256(JSON.stringify(data));
    }

    toJson(): string {
        return JSON.stringify(this);
    }
}