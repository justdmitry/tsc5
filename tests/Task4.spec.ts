import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano, TupleBuilder } from 'ton-core';
import { Task4 } from '../wrappers/Task4';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('Task4', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Task4');
    });

    let blockchain: Blockchain;
    let task4: SandboxContract<Task4>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        task4 = blockchain.openContract(Task4.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await task4.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: task4.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and task4 are ready to use
    });

    it('should work', async () => {
       const ps: number = 0x53;
       const pe: number = 0x45;
       const px: number = 0x58;
       const pf: number = 0x2E;
       let tb1 = new TupleBuilder();
         tb1.writeNumber(px);
         tb1.writeNumber(px);
       let tb2 = new TupleBuilder();
         tb2.writeNumber(ps);
         tb2.writeNumber(px);
       let tb3 = new TupleBuilder();
         tb3.writeNumber(px);
         tb3.writeNumber(pe);
       let tb = new TupleBuilder();
         tb.writeTuple(tb1.build());
         tb.writeTuple(tb2.build());
         tb.writeTuple(tb3.build());
       let answer = await task4.getSolve(3n, 2n, tb);
       console.log(answer);
    });

});
