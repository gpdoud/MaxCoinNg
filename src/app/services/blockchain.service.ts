import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Block } from '../models/block.class';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  blockchain = [];

  getLastBlock(): Block {
    return this.blockchain[this.blockchain.length - 1];
  }
  getNextBlockIndex(): number {
    return this.getLastBlock().index + 1;
  }

  addBlock(block: Block) {
    let lastBlock = this.getLastBlock();
    if(block.index != lastBlock.index + 1) {
      throw "Block has the wrong index.";
    }
    let blockHash = block.genBlockHash();
    if(blockHash !== block.hash) {
      throw "Invalid block hash.";
    }
    this.blockchain.push(block);
  }

  init() {
    let genesisBlock = Block.genesisBlock();
    let index = genesisBlock.index;
    this.blockchain.push(genesisBlock);
    this.dump();
  }

  dump() {
    console.log(this.blockchain);
  }

  constructor() {
  }
}
