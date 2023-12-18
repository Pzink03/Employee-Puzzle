import { Button } from "@/components/ui/button";
import { formartCurrency } from "@/utils/formatters";
import { useElements, useStripe, PaymentElement } from "@stripe/react-stripe-js"
import { FormEvent, useState } from "react";

type JobListingCheckoutFormProps = {
    amount: number
}

export function JobListingCheckoutForm({amount}: JobListingCheckoutFormProps) {
    const stripe = useStripe()
    const elements = useElements()
    const [errorMessage, setErrorMessage] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function onSubmit(e: FormEvent){
        e.preventDefault();

        if (stripe == null || elements == null) return;


        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: `${window.location.origin}/jobs/order-complete`,
          },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
      };


    return (
        <form onSubmit={onSubmit}>
            {errorMessage != null && (
                <p className="text-red-500 dark:text-red-900 text-sm mb-4">
                    {errorMessage}
                </p>
            )}
            <PaymentElement/>
            <Button disabled={isLoading || stripe == null || elements == null} className="mt-4 w-full">Pay {formartCurrency(amount)}</Button>
        </form>
    )
}
