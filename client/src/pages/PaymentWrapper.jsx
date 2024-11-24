import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import TourPackagePayment from "./TourPackagePayment";

const stripePromise = loadStripe("pk_test_51Oh1XhAQEV6haT2dXzi4DvGFvFIesr2qkUXy0K33uFqEe1mqwiz77oz6exboVbh8SLyXDC27ngzVs6un8EZwIvHJ00vTTS67Da");

function PaymentWrapper() {
    return (
        <Elements stripe={stripePromise}>
            <TourPackagePayment />
        </Elements>
    );
}

export default PaymentWrapper;
