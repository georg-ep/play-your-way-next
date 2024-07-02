import useSquare from "@/hooks/useSquare";

export default function PaymentForm({ setProcessingPayment, setLoading, tab, hidden }) {
  useSquare({ setProcessingPayment, setLoading, tab });

  return (
    <div hidden={hidden}>
      <div id="apple-pay-button" />
      <div id="card-container" />
      <div id="payment-status-container" />
    </div>
  );
}
