import { processPayment } from "@/api/payments";
import { userServices } from "@/services/user";
import { useUIStore } from "@/stores/ui";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

interface UseSquareProps {
  setLoading: (val: boolean) => void;
  setProcessingPayment: (val: boolean) => void;
}

export default function useSquare({ setProcessingPayment, setLoading }: UseSquareProps) {
  const initialized = useRef<boolean>(false);
  const { fetchUser } = userServices();
  const { closeModal } = useUIStore();

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const loadSquare = async () => {
      const script = document.createElement("script");
      script.src = "https://sandbox.web.squarecdn.com/v1/square.js";
      script.async = true;
      script.onload = () => loadElements();
      document.head.appendChild(script);
    };

    // Add script tag to page so square can be used
    loadSquare();

    const appId = "sandbox-sq0idb-0dUGYC2BXaf2esiBL_LeTw";
    const locationId = "L00BHXGEM80JT";

    async function initializeCard(payments) {
      const card = await payments.card();
      await card.attach("#card-container");
      return card;
    }

    function buildPaymentRequest(payments) {
      return payments.paymentRequest({
        countryCode: "US",
        currencyCode: "USD",
        total: {
          amount: "1.00",
          label: "Total",
        },
      });
    }

    async function initializeApplePay(payments) {
      const paymentRequest = buildPaymentRequest(payments);
      const applePay = await payments.applePay(paymentRequest);
      // Note: You do not need to `attach` applePay.
      return applePay;
    }

    async function createPayment(token: string) {
      const amount = document.getElementById("deposit-amount").value;
      if (!amount) throw new Error("Could not find deposit amount");
      if (amount && amount > 10) {
        toast.error('Amount cannot be greater than £10');
        throw new Error("Amount cannot be greater than £10");
      } 

      const body = JSON.stringify({
        locationId,
        sourceId: token,
        idempotencyKey: window.crypto.randomUUID(),
        amount,
      });

      try {
        await processPayment(body);
        await fetchUser();
        closeModal();
      } catch (e: any) {
        throw new Error(e);
      }
    }

    // Change the parameter to 'paymentMethod'
    async function tokenize(paymentMethod) {
      const tokenResult = await paymentMethod.tokenize();
      if (tokenResult.status === "OK") {
        return tokenResult.token;
      } else {
        let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
        if (tokenResult.errors) {
          errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
        }

        throw new Error(errorMessage);
      }
    }

    // status is either SUCCESS or FAILURE;
    function displayPaymentResults(status: string) {
      const statusContainer = document.getElementById(
        "payment-status-container"
      );
      if (statusContainer) {
        if (status === "SUCCESS") {
          statusContainer.classList.remove("is-failure");
          statusContainer.classList.add("is-success");
        } else {
          statusContainer.classList.remove("is-success");
          statusContainer.classList.add("is-failure");
        }

        statusContainer.style.visibility = "visible";
      }
    }

    async function loadElements() {
      setLoading(true);
      if (!(window as any).Square) {
        setLoading(false);
        throw new Error("Square.js failed to load properly");
      }
      let payments;
      try {
        payments = (window as any).Square.payments(appId, locationId);
      } catch {
        const statusContainer = document.getElementById(
          "payment-status-container"
        );
        if (statusContainer) {
          statusContainer.className = "missing-credentials";
          statusContainer.style.visibility = "visible";
        }
        return;
      }

      let card;
      try {
        card = await initializeCard(payments);
      } catch (e) {
        console.error("Initializing Card failed", e);
        setLoading(false);
        return;
      }

      let applePay;
      try {
        applePay = await initializeApplePay(payments);
      } catch (e) {
        console.error("Initializing Apple Pay failed", e);
      }

      async function handlePaymentMethodSubmission(event, paymentMethod) {
        setProcessingPayment(true);
        event.preventDefault();

        try {
          cardButton.disabled = true;
          const token = await tokenize(paymentMethod);
          await createPayment(token);
          displayPaymentResults("SUCCESS");
          toast.success('Deposit success');
        } catch (e: any) {
          cardButton.disabled = false;
          displayPaymentResults("FAILURE");
          console.error(e.message);
        } finally {
          setProcessingPayment(false);
        }
      }

      const cardButton = document.getElementById("card-button");
      cardButton.addEventListener("click", async function (event) {
        await handlePaymentMethodSubmission(event, card!);
      });

      if (applePay) {
        const applePayButton = document.getElementById("apple-pay-button");
        applePayButton.addEventListener("click", async function (event) {
          await handlePaymentMethodSubmission(event, applePay);
        });
      }
      setLoading(false);
    }
  }, []);
}
