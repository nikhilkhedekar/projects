import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { tokens } from "../theme/theme";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Header from "../components/Header";
  
const ManageProducts = () => {
    const getAllProductsList = useSelector(state => state?.products);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    let rows = [];

    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "productId",
            headerName: "Product ID",
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "price",
            headerName: "Price",
            flex: 1,
        },
        {
            field: "category",
            headerName: "Category",
            flex: 1,
        },
        {
            field: "company",
            headerName: "Company",
            flex: 1,
        },
        {
            field: "description",
            headerName: "Description",
            flex: 1,
        },
        {
            field: "numOfReviews",
            headerName: "Reviews",
            flex: 1,
        },
        {
            field: "averageRating",
            headerName: "Rating",
            flex: 1,
        },
    ];
    console.log("productList_tab", getAllProductsList);
    rows = getAllProductsList && getAllProductsList.products && getAllProductsList.products.map((product, i) => {
        return {
            id: i + 1,
            productId: product._id,
            name: product.name,
            price: product.price,
            category: product.category,
            company: product.company,
            description: product.description,
            numOfReviews: product.numOfReviews,
            averageRating: product.averageRating
        }
    })

    return (
        <Box m="20px" width="1080px" >
            <Header title="Products" subtitle="Manage Products" />
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

export default ManageProducts;