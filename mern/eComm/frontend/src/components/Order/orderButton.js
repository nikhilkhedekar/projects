import { useDispatch, useSelector } from "react-redux";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { createOrder } from "../../actions/orderActions";

import {
    Button, Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    InputAdornment,
    Grid
} from "@mui/material";

const OrderButton = forwardRef(({ productId }, ref) => {
    const [buttonState, setButtonState] = useState(false);
    const [orderDetails, setOrderDetails] = useState({
        tax: 0,
        shippingFee: 0,
        amount: 0
    });
    const dispatch = useDispatch();
    const stripe = useStripe();
    const payment = useSelector(state => state?.createOrder);

    const clickHandler = () => {
        setButtonState(!buttonState);
    }

    useImperativeHandle(ref, () => {
        return {
            clickHandler: clickHandler,
        }
    })

    const changeHandler = (e) => {
        setOrderDetails({
            ...orderDetails,
            [e.target.name]: e.target.value,
        });
    }

    const submitHandler = () => {
        try {
            let sessionId;
            const order = {
                tax: orderDetails.tax,
                shippingFee: orderDetails.shippingFee,
                orderItems: {
                    amount: orderDetails.amount,
                    product: productId
                }
            }
            dispatch(createOrder(order));
            setOrderDetails({
                tax: 0,
                shippingFee: 0,
                amount: 0
            });            
            sessionId = payment?.order?.session?.id;
            console.log("sessionId", payment?.order?.session?.id);
            clickHandler();
            if (sessionId) {
                stripe.redirectToCheckout({ sessionId });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Button
                size="small"
                variant='contained'
                onClick={clickHandler}>
                Buy Now
            </Button>
            <Dialog
                open={buttonState}
                onClose={clickHandler}
                aria-labelledby='dialog-title'
                aria-describedby='dialog-description'>
                <DialogTitle id='dialog-title'>Buy Now</DialogTitle>
                <DialogContent >
                    {/* <DialogContentText id='dialog-description'>
                        Nice Choice
                    </DialogContentText> */}
                    <Grid rowSpacing={2} columnSpacing={1} container my={4}>
                        <Grid item xs={6}>
                            <TextField
                                label='Tax'
                                required
                                helperText={
                                    !orderDetails.tax && 'Required'
                                }
                                name="tax"
                                type='number'
                                error={!orderDetails.tax}
                                value={orderDetails.tax}
                                onChange={changeHandler}
                                InputProps={{
                                    startAdornment: <InputAdornment position='start'>₹</InputAdornment>
                                }}
                                size='small'
                            /></Grid>
                        <Grid item xs={6}>
                            <TextField
                                label='Shipping Charges'
                                required
                                helperText={
                                    !orderDetails.shippingFee && 'Required'
                                }
                                name="shippingFee"
                                type='number'
                                error={!orderDetails.shippingFee}
                                value={orderDetails.shippingFee}
                                onChange={changeHandler}
                                InputProps={{
                                    startAdornment: <InputAdornment position='start'>₹</InputAdornment>
                                }}
                                size='small'
                            /></Grid>
                        <Grid item xs={6}>
                            <TextField
                                label='Quantity'
                                required
                                helperText={
                                    !orderDetails.amount && 'Required'
                                }
                                name="amount"
                                type='number'
                                error={!orderDetails.amount}
                                value={orderDetails.amount}
                                onChange={changeHandler}
                                size='small'                              
                            /></Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={submitHandler} size="small" type="submit" variant="contained"  >
                        Buy
                    </Button>
                </DialogActions>
            </Dialog>            
        </>
    )
});

export default OrderButton