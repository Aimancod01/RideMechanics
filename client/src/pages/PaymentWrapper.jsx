import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import TourPackagePayment from "./TourPackagePayment";
import { useSearchParams } from "react-router-dom";
useSearchParams
const stripePromise = loadStripe("pk_test_51Oh1XhAQEV6haT2dXzi4DvGFvFIesr2qkUXy0K33uFqEe1mqwiz77oz6exboVbh8SLyXDC27ngzVs6un8EZwIvHJ00vTTS67Da");

function PaymentWrapper() {
      const [searchParams]=useSearchParams();
    const packageId=searchParams.get("packageId");
    const customerId=searchParams.get("customerId")
    return (
        <Elements stripe={stripePromise}>
            <TourPackagePayment packageId={packageId} customerId={customerId}  />
        </Elements>
    );
}

export default PaymentWrapper;
