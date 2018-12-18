import { sha256 } from 'js-sha256';

export class MerkleRoot {

    static genMerkleRoot(hashes: string[]) : string {
        while(hashes.length > 1) {
            let merkles = this.merkle(hashes);
            hashes = merkles;
            merkles = [];
        }
        return hashes[0];
    }

    private static merkle(hashes: string[]) : string[] {
        // if an odd number, duplicate the last
        if(hashes.length % 2 != 0) {
            let lastIdx = hashes.length - 1;
            let aHash = hashes[lastIdx];
            hashes.push(aHash);
        }
        let merkles = [];
        while(hashes.length > 0) {
            let hash1 = hashes.shift();
            let hash2 = hashes.shift();
            merkles.push(sha256(hash1+hash2));
        }   
        return merkles; 
    }

    constructor() {}
}