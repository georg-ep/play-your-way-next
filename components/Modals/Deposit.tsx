import { useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import Head from "next/head";
import { Button, Card, Input, Spinner } from "@nextui-org/react";
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
            <form hidden={loading} id="payment-form">
              <Card className="p-4 mb-4 rounded-sm text-sm border border-1 border-default-400">
                <div className="font-bold">Deposit info for test credits</div>
                <div>Card Number: 5105 1051 0510 5100</div>
                <div>Rest of the details can be random</div>
              </Card>
              <div id="apple-pay-button"></div>
              <div id="card-container"></div>
              <Input
                id={"deposit-amount"}
                key={"password"}
                value={amount}
                onValueChange={setAmount}
                type="number"
                label="Deposit amount"
                isRequired
                className="mb-4"
              />
              <Button
                color="primary"
                id="card-button"
                type="button"
                fullWidth
                isDisabled={!amount || Number(amount) < 1 || processingPayment}
              >
                {processingPayment ? (
                  <Spinner color="white" size="sm" />
                ) : amount || Number(amount) > 0 ? (
                  `Pay £${amount}`
                ) : (
                  "Enter an amount"
                )}
              </Button>
            </form>
            {loading ? <Spinner color="default" /> : null}
            <div id="payment-status-container"></div>
          </>
        }
      />
    </>
  );
}
