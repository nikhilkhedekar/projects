import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { tokens } from "../theme/theme";
import Header from "../components/Header";

const Reviews = () => {
    const getAllReviewsList = useSelector(state => state?.reviews);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    let rows = [];
    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "reiviewId",
            headerName: "Review ID",
            flex: 1,
        },
        {
            field: "userId",
            headerName: "User ID",
            flex: 1,
        },
        {
            field: "productId",
            headerName: "Product ID",
            flex: 1,
        },
        {
            field: "title",
            headerName: "Title",
            flex: 1,
        },
        {
            field: "rating",
            headerName: "Rating",
            flex: 1,
        },
        {
            field: "updatedAt",
            headerName: "Date",
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
    console.log("userList", getAllReviewsList);
    rows = getAllReviewsList && getAllReviewsList.reviews && getAllReviewsList.reviews.map((review, i) => {
        return {
            id: i + 1,
            reiviewId: review._id,
            userId: review.user,
            productId: review.product._id,
            title: review.title,
            rating: review.rating,
            updatedAt: fDateTime(review.updatedAt)
        }
    })

    return (
        <Box m="20px" width="1080px" >
            <Header title="Reviews" subtitle="Reviews of all Users" />
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

export default Reviews;
