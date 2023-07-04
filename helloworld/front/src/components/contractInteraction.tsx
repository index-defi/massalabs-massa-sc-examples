import React, { useState } from "react";
import { helloworld } from "../utils/helloworld";
import { IAccount } from "@massalabs/wallet-provider";

interface ContractInteractionProps {
    account: IAccount;
}

export default function ContractInteraction({
    account,
}: ContractInteractionProps) {
    const [result, setResult] = useState<string>("");

    const handleSubmit = async () => {
        console.log("Handle helloworld contract");
        const response = await helloworld();
        setResult(response);
    };

    return (
        <div className="bg-secondary mas-body flex flex-col justify-center items-center w-full max-w-lg p-8 box-border bg-gray-700 rounded-lg shadow-md mb-12">
            <h3 className="my-4">Display the Event given by smart contract</h3>
            <div>
                <button className="button" onClick={handleSubmit}>
                    Display Event
                </button>
            </div>
            {result !== null && (
                <div className="py-4">
                    <h4>Result: {result}</h4>
                </div>
            )}
        </div>
    );
}
