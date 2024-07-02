import { Key, useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import { Button, Card, Input, Spinner, Tab, Tabs } from "@nextui-org/react";
import PaymentForm from "../PaymentForm";
import { addTestCredits } from "@/api/payments";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
export default function DepositModal() {
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [processingPayment, setProcessingPayment] = useState<boolean>(false);
  const [tab, setTab] = useState<Key>("sandbox");
  const sParams = useSearchParams();

  const fetchTestCredits = async () => {
    try {
      await addTestCredits();
      toast.success("Credits applied successfully");
    } catch (e) {
      toast.error(e.response?.detail || "Failed to add test credits");
    }
  };

  useEffect(() => {
    console.log("params", sParams);
    if (sParams.get("tab")) {
      setTab(sParams.get("tab") as string);
    }
  }, [sParams]);

  const total = () => {
    let amountInPence = Number(amount) * 100;
    let percentageFee = amountInPence * 0.05;
    let totalFeeInPence = percentageFee + 25;
    let totalFee = totalFeeInPence / 100;
    return (Number(amount) + totalFee).toFixed(2);
  };

  return (
    <>
      <Modal
        title="Deposit"
        showActions={false}
        className="min-h-[564px]"
        body={
          <>
            <Tabs
              onSelectionChange={(e) => setTab(e)}
              selectedKey={tab as string}
              fullWidth
            >
              <Tab key="test" title="Test Credits">
                <Button
                  onClick={() => fetchTestCredits()}
                  color="primary"
                  variant="flat"
                  fullWidth
                  className="mb-4"
                >
                  Click here to add test credits
                </Button>
              </Tab>
              <Tab key="prod" title="Real Credits">
                <form id="payment-form">
                  {loading ? (
                    <div className="w-full flex justify-center">
                      <Spinner color="current" className="my-10" />
                    </div>
                  ) : null}
                  <PaymentForm
                    hidden={loading}
                    setProcessingPayment={setProcessingPayment}
                    setLoading={setLoading}
                    tab={"production"}
                  />
                  <Input
                    id={"deposit-amount"}
                    key={"password"}
                    value={amount}
                    size="lg"
                    onValueChange={setAmount}
                    type="number"
                    label="Deposit amount"
                    placeholder="0.00"
                    isRequired
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small mb-[2px]">
                          £
                        </span>
                      </div>
                    }
                    variant="bordered"
                    className="mb-4"
                  />
                  <div>
                    <span className="text-default-600 text-md w-full border-b border-b-1 border-b-default-300 mb-2">
                      Fees breakdown
                    </span>
                    <div className="text-default-500 text-sm flex items-center justify-between mb-1">
                      <span>Payment Gateway</span>
                      <span className="font-bold text-white">£0.25</span>
                    </div>
                    <div className="text-default-500 text-sm flex items-center justify-between mb-8">
                      <span>Payment Processor</span>
                      <span className="font-bold text-white">
                        5% @ £{(Number(amount) * 0.05).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <Button
                    color="primary"
                    id="card-button"
                    type="button"
                    size="lg"
                    variant="solid"
                    fullWidth
                    isDisabled={
                      !amount || Number(amount) < 1 || processingPayment
                    }
                  >
                    {processingPayment ? (
                      <Spinner color="white" size="sm" />
                    ) : amount || Number(amount) > 0 ? (
                      `Pay £${total()}`
                    ) : (
                      "Enter an amount"
                    )}
                  </Button>
                </form>
              </Tab>
            </Tabs>
          </>
        }
      />
    </>
  );
}
