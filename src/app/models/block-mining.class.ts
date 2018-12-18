import { sha256 } from 'js-sha256';
import { Block } from './block.class';

export class BlockMining {

    static difficulty = 4;
    static zeroes = '00000000000000000000'.substr(0, BlockMining.difficulty);

    static mineBlockHash(block: Block): Block {
        block.setBlockHash();
        while(!this.isValidHash(block.hash)) {
            block.nonce++;
            block.setBlockHash();
        }
        return block;
    }

    static isValidHash(hash: string): boolean {
        if(hash.startsWith(BlockMining.zeroes)) {
            return true;
        }
        return false;
    }
    constructor() {}
}