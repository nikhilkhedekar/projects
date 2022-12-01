import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { tokens } from "../theme/theme";
import Header from "../components/Header";

const Orders = () => {
    const getAllOrdersList = useSelector(state => state?.orders);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    let rows = [];
    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "orderId",
            headerName: "Order ID",
            flex: 1,
        },
        {
            field: "userId",
            headerName: "User ID",
            flex: 1,
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
        },
        {
            field: "cartQty",
            headerName: "Quantity",
            flex: 1,
        },
        {
            field: "subtototal",
            headerName: "User ID",
            flex: 1,
        },
        {
            field: "tax",
            headerName: "Tax",
            flex: 1,
        },
        {
            field: "shippingFee",
            headerName: "Shipping Fee",
            flex: 1,
        },
        {
            field: "total",
            headerName: "Total",
            flex: 1,
        },
        {
            field: "updatedAt",
            headerName: "Last Updated Date",
            flex: 1,
        },
    ];
    const fDateTime = (dateData) => {
        const date = new Date(dateData);
        const year = date.getFullYear();
        const month = date.getMonth();
        const dateDay = date.getDate();
        return `${dateDay}/${month}/${year}`
    }
    console.log("orderList", getAllOrdersList);
    rows = getAllOrdersList && getAllOrdersList.orders && getAllOrdersList.orders.map((order, i) => {
        return {
            id: i + 1,
            orderId: order._id,
            userId: order.user,
            status: order.status,
            cartQty: order.cartQty,
            subtototal: order.subtotal,
            tax: order.tax,
            shippingFee: order.shippingFee,
            total: order.total,
            updatedAt: fDateTime(order.updatedAt)
        }
    })

    return (
        <Box m="20px" width="1080px" >
            <Header title="Orders" subtitle="All Users order list" />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                }}
            >
                <DataGrid checkboxSelection rows={rows} columns={columns} />
            </Box>
        </Box>
    );
};

export default Orders