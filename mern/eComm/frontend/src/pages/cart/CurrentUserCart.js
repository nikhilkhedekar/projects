import { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { currentUserCart } from "../../actions/cartActions";
import CheckoutButton from "../../components/Order/CheckoutButton";
import AuthContext from "../../contexts/authContext";
import { StripeProvider } from "../../providers/stripePaymentIntentProvider";

import { Typography, Paper, Divider, CardContent, Card, Grid, Box, Stack } from "@mui/material";

const CurrentUserCart = () => {
    const authCtx = useContext(AuthContext);
    const dispatch = useDispatch();
    const currentUserCartState = useSelector(state => state?.currentUserCart);
    const checkoutButtonRef = useRef(null);

    useEffect(() => {
        if (authCtx?.cartCount != 0) {
            dispatch(currentUserCart());
            console.log("currentUseCart", currentUserCartState?.cart);
        }
    }, [dispatch, currentUserCart])


    return (
        <>
            {
                currentUserCartState?.cart?.[0]?.cartItems.length >= 1 ? (
                    <>
                        <Paper sx={{ padding: '32px' }} elevation={2}>
                            <Typography variant="h4" component="div" >USer Id: {currentUserCartState?.cart?.[0]?.user}</Typography>
                            <Divider />
                            <Grid container spacing={3} margin={3} >
                                {
                                    currentUserCartState && currentUserCartState?.cart?.[0]?.cartItems.map((item, i) => {
                                        return (
                                            <Grid key={i} item xs={12} sm={6} md={3} >
                                                <Box width='300px' >
                                                    <Card>
                                                        <CardContent>
                                                            <Link to={`/cart/${item.product}`} >
                                                                <Typography gutterBottom variant='h5' component='div'>
                                                                    {item.name}
                                                                </Typography>
                                                            </Link>
                                                            <Typography gutterBottom variant='subtitile1' component='div'>
                                                                Quantity: {item.amount}
                                                            </Typography>
                                                            <Typography gutterBottom variant='subtitile1' component='div'>
                                                                ₹{item.price}
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>
                                                </Box>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                            <Divider />
                            <Typography variant="h6" component="div">Status: {currentUserCartState?.cart?.[0]?.status}</Typography>
                            <Divider />
                            <Typography variant="h6" component="div">Total Quantity: {currentUserCartState?.cart?.[0]?.cartQty}</Typography>
                            <Divider />
                            <Typography variant="h6" component="div">Total Shipping Fee: {currentUserCartState?.cart?.[0]?.shippingFee}</Typography>
                            <Divider />
                            <Typography variant="h6" component="div">Tax: {currentUserCartState?.cart?.[0]?.tax}</Typography>
                            <Divider />
                            <Typography variant="h6" component="div">Sutotal: {currentUserCartState?.cart?.[0]?.subtotal}</Typography>
                            <Divider />
                            <Typography variant="h5" component="div">Total: {currentUserCartState?.cart?.[0]?.total}</Typography>
                            <Divider />
                            <Stack spacing={2} direction='row' margin={2} >
                                {
                                    authCtx.isLoggedIn && currentUserCartState?.cart?.[0]?.stripe_client_secret && (
                                        <StripeProvider>
                                            <CheckoutButton ref={checkoutButtonRef} />
                                        </StripeProvider>
                                    )
                                }
                            </Stack>
                        </Paper>
                    </>
                ) : (
                    <Typography>  Cart is Empty  </Typography>
                )
            }

            {/* {
                currentUserCartState?.cart?.[0]?.cartItems.length >= 1 ?
                    (
                        <>
                            <h3>  </h3>
                            <section></section>
                            <hr />

                            <section>Your Cart Items:
                                {
                                    currentUserCartState && currentUserCartState?.cart?.[0]?.cartItems.map((item, i) => {
                                        return (
                                            <div key={i} >
                                                <Link to={`/cart/${item.product}`} >{item.name}</Link><br />
                                                <span>Quantity: {item.amount}</span><br />
                                                <span>Price: {item.price}</span>
                                            </div>
                                        )
                                    })
                                }
                            </section>
                            <hr />

                            <span>Status: {currentUserCartState?.cart?.[0]?.status}</span><br />
                            <span>Total Quantity: {currentUserCartState?.cart?.[0]?.cartQty}</span><br />
                            <span>Total Shipping Fee: {currentUserCartState?.cart?.[0]?.shippingFee}</span><br />
                            <span>Tax: {currentUserCartState?.cart?.[0]?.tax}</span><br />
                            <span>Sutotal: {currentUserCartState?.cart?.[0]?.subtotal}</span><br />
                            <i>Total: {currentUserCartState?.cart?.[0]?.total}</i><br />
                            <>
                                {
                                    authCtx.isLoggedIn && currentUserCartState?.cart?.[0]?.stripe_client_secret && (
                                        <StripeProvider>
                                            <CheckoutButton ref={checkoutButtonRef} />
                                        </StripeProvider>
                                    )
                                }
                            </>
                        </>
                    ) : (
                        <>
                            <h3> Cart is Empty </h3>
                        </>
                    )
            } */}
        </>
    )
}

export default CurrentUserCart