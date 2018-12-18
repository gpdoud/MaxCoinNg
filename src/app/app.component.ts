import { Component } from '@angular/core';
import { Transaction } from './models/transaction.class';
import { Block } from './models/block.class';
import { BlockMining } from './models/block-mining.class'
import { BlockchainService } from './services/blockchain.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MaxCoinNg';

  constructor(private bcsvc: BlockchainService) {
    // initialize blockchain
    this.bcsvc.init();

    let block = new Block();
    block.index = this.bcsvc.getNextBlockIndex();
        
    let tran1 = new Transaction();
    tran1.outTran("Bank", 1000);
    tran1.finalize();
    block.trans.push(tran1);
    
    let tran2 = new Transaction();
    tran2.inOutTran("Bank", "Greg", 200);
    tran2.finalize();
    block.trans.push(tran2);
    
    let tran3 = new Transaction();
    tran3.inOutTran("Bank", "Cindy", 150);
    tran3.finalize();
    block.trans.push(tran3);

    let newBlock = BlockMining.mineBlockHash(block);

    this.bcsvc.addBlock(newBlock);

    console.log("Block to json:", newBlock.toJson());

    console.log("Verify last block:", newBlock.verifyBlock() ? 'Verified' : 'Corrupted');
    // console.log("Intentionally corrupt block by incrementing nonce ...");
    // newBlock.nonce++;
    // console.log("Verify last block:", newBlock.verifyBlock() ? 'Verified' : 'Corrupted');

  }
}
