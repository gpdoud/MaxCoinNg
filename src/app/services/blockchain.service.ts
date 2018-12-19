import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Block } from '../models/block.class';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  blocks = [];

  getLastBlock(): Block {
    return this.blocks[this.blocks.length - 1];
  }
  getNextBlockIndex(): number {
    return this.getLastBlock().index + 1;
  }

  createBlockInstance() : Block {
    let blk = new Block();
    blk.index = this.getNextBlockIndex();
    blk.phash = this.getLastBlock().hash;
    return blk;
  }

  addBlock(block: Block) {
    let lastBlock = this.getLastBlock();
    if(block.index != lastBlock.index + 1) {
      throw "Block has the wrong index.";
    }
    block.phash = lastBlock.hash;
    let blockHash = block.genBlockHash();
    if(blockHash !== block.hash) {
      // throw "Invalid block hash.";
    }
    this.blocks.push(block);
  }

  init() {
    let genesisBlock = (new Block()).genesisBlock();
    let index = genesisBlock.index;
    this.blocks.push(genesisBlock);
    this.dump();
  }

  dump() {
    console.log(this.blocks);
  }

  constructor() {
  }
}
