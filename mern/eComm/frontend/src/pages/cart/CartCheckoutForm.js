import { Button, Stack, Box, Card, CardActions, CardContent } from "@mui/material";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { cartCheckout } from "../../actions/cartActions";
import AuthContext from "../../contexts/authContext";

const CartCheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const authCtx = useContext(AuthContext);
    const dispatch = useDispatch();
    let getPaymentIntent;

    useEffect(() => {
        if (!stripe && !authCtx?.clientSecret) {
            return;
        }
        const getPaymentIntentFunc = async () => {
            getPaymentIntent = await stripe.retrievePaymentIntent(authCtx?.clientSecret);
            console.log("paymentIntent", getPaymentIntent);
        }
        getPaymentIntentFunc();
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(cartCheckout());
            const paymentSuccess = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    // Make sure to change this to your payment completion page
                    return_url: "http://localhost:3000/stripe/success",
                },
            });
            console.log("paymentSuccess", paymentSuccess);

        } catch (error) {
            console.log("Error", error);
        }
    }

    return (
        <form onSubmit={submitHandler} >
            <Box width='500px' padding={2} display='flex' >
                <Card>
                    <CardContent>
                        <PaymentElement />
                    </CardContent>
                    <CardActions>
                        <Stack spacing={2} direction='row' >
                            <Button size="small" variant='contained' type="submit" > Checkout </Button>
                        </Stack>
                    </CardActions>
                </Card>
            </Box>
        </form>
    )
}

export default CartCheckoutForm