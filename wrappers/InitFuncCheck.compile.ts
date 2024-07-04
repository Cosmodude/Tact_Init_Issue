import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/init_func_check.tact',
    options: {
        debug: true,
    },
};
