import { useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import Head from "next/head";
import { Input, Spinner } from "@nextui-org/react";
import useSquare from "@/hooks/useSquare";
export default function DepositModal() {
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [processingPayment, setProcessingPayment] = useState<boolean>(false);
  useSquare({ setProcessingPayment, setLoading });
  return (
    <>
      <Modal
        title="Deposit"
        showActions={false}
        body={
          <>
            {" "}
            <Input
              id={"deposit-amount"}
              key={"password"}
              value={amount}
              onValueChange={setAmount}
              type="number"
              label="Deposit amount"
              isRequired
            />
            <form hidden={loading} id="payment-form">
              <div id="apple-pay-button"></div>
              <div id="card-container"></div>
              <button
                className={`overflow-hidden h-[40px] flex items-center justify-center border-box transition-all bg-black text-white rounded-md px-4 py-2 w-full`}
                id="card-button"
                type="button"

                disabled={!amount || Number(amount) < 1}
              >
                {processingPayment ? (
                  <Spinner color="white" size="sm" />
                ) : amount || Number(amount) > 0 ? (
                  `Pay £${amount}`
                ) : (
                  "Enter an amount"
                )}
              </button>
            </form>
            {loading ? <Spinner /> : null}
            <div id="payment-status-container"></div>
          </>
        }
      />
    </>
  );
}
