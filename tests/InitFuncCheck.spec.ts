import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { InitFuncCheck } from '../wrappers/InitFuncCheck';
import '@ton/test-utils';
import { randomAddress } from '@ton/test-utils';

describe('InitFuncCheck', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let initFuncCheck: SandboxContract<InitFuncCheck>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        const receiver = randomAddress();
        initFuncCheck = blockchain.openContract(await InitFuncCheck.fromInit(receiver));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await initFuncCheck.send(
            deployer.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: initFuncCheck.address,
            deploy: true,
            success: true,
        });

        expect(deployResult.transactions).toHaveTransaction({
            from: initFuncCheck.address,
            to: receiver,
        });

        console.log(deployResult.events);
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and initFuncCheck are ready to use
    });
});
