import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import StatBox from "../components/StatBox";
import ProgressCircle from "../components/ProgressCircle";
import Header from "../components/Header"
import { tokens } from "../theme/theme";
import InventoryIcon from '@mui/icons-material/Inventory';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PeopleIcon from '@mui/icons-material/People';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../actions/productActions";
import { getAllReviews } from "../actions/reviewActions";
import { getAllUsers } from "../actions/userActions";
import { getAllCarts } from "../actions/cartActions";
import { getAllOrders } from "../actions/orderActions";
import { getAllStores } from "../actions/storeActions";
import StoreLocations from "../components/StoreLocations";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const dispatch = useDispatch();
    const getAllProductsList = useSelector(state => state.products);
    const getAllReviewList = useSelector(state => state.reviews);
    const getAllUsersList = useSelector(state => state.users);
    const getAllCartsList = useSelector(state => state.carts);
    const getAllOrdersList = useSelector(state => state.orders);
    const getAllStoresList = useSelector(state => state.stores);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    let productCount = "0";
    let reviewCount = "0";
    let userCount = "0";
    let cartsCount = "0";
    let storeCount = "0";

    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getAllReviews());
        dispatch(getAllUsers());
        dispatch(getAllCarts());
        dispatch(getAllOrders());
        dispatch(getAllStores());
    }, []);

    console.log("productList", getAllProductsList);
    console.log("getAllReviewList", getAllReviewList);
    console.log("getAllUsersList", getAllUsersList);
    console.log("getAllCartsList", getAllCartsList);
    console.log("getAllOrdersList", getAllOrdersList);
    console.log("getAllStoresList", getAllStoresList);
    productCount = getAllProductsList?.products?.length.toString();
    reviewCount = getAllReviewList?.reviews?.length.toString();
    userCount = getAllUsersList?.users?.length.toString();
    cartsCount = getAllCartsList?.carts?.length.toString();
    storeCount = getAllStoresList?.stores?.length.toString();

    const fDateTime = (dateData) => {
        const date = new Date(dateData);
        const year = date.getFullYear();
        const month = date.getMonth();
        const dateDay = date.getDate();
        return `${dateDay}/${month}/${year}`
    }
    return (
        <Box m="20px" width="1080px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="ADMIN DASHBOARD" subtitle="Welcome to your dashboard" />
                <Button
                    sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                    }}
                >
                    <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                    Download Reports
                </Button>
            </Box>

            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px">
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center">
                    <StatBox
                        title={productCount}
                        subtitle="Product Count"
                        progress={productCount}
                        expectedCount={10}
                        icon={
                            <InventoryIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center">
                    <StatBox
                        title={reviewCount}
                        subtitle="Review Count"
                        progress={reviewCount}
                        expectedCount={20}
                        icon={
                            <ReviewsIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center">
                    <StatBox
                        title={userCount}
                        subtitle="Users Count"
                        progress={userCount}
                        expectedCount={15}
                        icon={
                            <PeopleIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center">
                    <StatBox
                        title={cartsCount}
                        subtitle="Carts Count"
                        progress={cartsCount}
                        expectedCount={25}
                        icon={
                            <ProductionQuantityLimitsIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
            </Box>

            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
                paddingTop="20px">
                <Box
                    gridColumn="span 8"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}>
                    <Box
                        mt="25px"
                        p="0 30px"
                        display="flex "
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box>
                            <Typography
                                variant="h5"
                                fontWeight="600"
                                color={colors.grey[100]}
                            >
                                Product Sale
                            </Typography>
                        </Box>
                        <Box>
                            <IconButton>
                                <DownloadOutlinedIcon
                                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                                />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box height="250px" m="-20px 0 0 0">
                        <LineChart getAllOrdersList={getAllOrdersList} />
                    </Box>
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    overflow="auto">
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid ${colors.primary[500]}`}
                        colors={colors.grey[100]}
                        p="15px"
                    >
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                            Recent Transactions
                        </Typography>
                    </Box>
                    {getAllOrdersList && getAllOrdersList.orders && getAllOrdersList.orders.map((transaction) => (
                        <Box
                            key={transaction._id}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`4px solid ${colors.primary[500]}`}
                            p="15px"
                        >
                            <Box>
                                <Typography
                                    color={colors.greenAccent[500]}
                                    variant="h5"
                                    fontWeight="600"
                                >
                                    Txn ID: {transaction._id}
                                </Typography>
                                <Typography color={colors.grey[100]}>
                                    User ID: {transaction.user}
                                </Typography>
                                <Box color={colors.grey[100]}>{fDateTime(transaction.updatedAt)}</Box>
                            </Box>
                            <Box
                                backgroundColor={colors.greenAccent[500]}
                                p="5px 10px"
                                borderRadius="4px"
                            >
                                ₹{transaction.total}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
                paddingTop="20px">
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="30px"
                >
                    <Typography variant="h5" fontWeight="600">
                        Stores
                    </Typography>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mt="25px"
                    >
                        <ProgressCircle expectedCount={10} progress={storeCount} size="125" />
                        <Typography
                            variant="h5"
                            color={colors.greenAccent[500]}
                            sx={{ mt: "15px" }}
                        >
                            {`stores established count ${storeCount}`}
                        </Typography>
                        <Typography>All Over The Globe</Typography>
                    </Box>
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}>
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        sx={{ padding: "30px 30px 0 30px" }}
                    >
                        Product Ratings
                    </Typography>
                    <Box height="250px" mt="20px">
                        <BarChart getAllProductsList={getAllProductsList} />
                    </Box>
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    padding="30px">
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        sx={{ marginBottom: "15px" }}
                    >
                        Store Locations
                    </Typography>
                    <Box height="200px">
                        <StoreLocations getAllStoresList={getAllStoresList} />
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}

export default Dashboard