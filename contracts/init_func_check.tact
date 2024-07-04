import "@stdlib/deploy";

message Simple{
    queryId: Int;
    myAddr: Address;
}

contract InitFuncCheck with Deployable {
    init(reciever: Address,) {
        send(SendParameters{
                to: reciever,
                value: ton("0.05") + context().readForwardFee(), // int  transfer_val = CONF::MAX_GAS + msg::fwd_fee;
                mode: SendIgnoreErrors | SendPayGasSeparately,
                body: Simple {
                    queryId: 1,
                    myAddr: myAddress()
                }.toCell()
        });
    }
}
