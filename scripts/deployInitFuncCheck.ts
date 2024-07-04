import { Address, toNano } from '@ton/core';
import { InitFuncCheck } from '../wrappers/InitFuncCheck';
import { NetworkProvider } from '@ton/blueprint';

const receiver = Address.parse("EQCB47QNaFJ_Rok3GpoPjf98cKuYY1kQwgqeqdOyYJFrywUK")

export async function run(provider: NetworkProvider) {
    const initFuncCheck = provider.open(await InitFuncCheck.fromInit(receiver));

    await initFuncCheck.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(initFuncCheck.address);

    // run methods on `initFuncCheck`
}
