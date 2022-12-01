import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { tokens } from "../theme/theme";
import Header from "../components/Header";

const Carts = () => {
    const getAllCartsList = useSelector(state => state?.carts);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    let rows = [];
    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "userId",
            headerName: "User ID",
            flex: 1,
        },
        {
            field: "cartQty",
            headerName: "Quantity",
            flex: 1,
        },
        {
            field: "subtotal",
            headerName: "Subtotal",
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
            headerName: "Date",
            flex: 1,
        },
    ];
    console.log("cartList", getAllCartsList);
    rows = getAllCartsList && getAllCartsList.carts && getAllCartsList.carts.map((cart, i) => {
        return {
            id: i + 1,
            userId: cart.user,
            cartQty: cart.cartQty,
            subtotal: cart.subtotal,
            tax: cart.tax,
            shippingFee: cart.shippingFee,
            total: cart.total,
            updatedAt: cart.updatedAt
        }
    })

    return (
        <Box m="20px" width="1080px" >
            <Header title="Users" subtitle="Data of users all over the world" />
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

export default Carts;
