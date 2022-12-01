import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { tokens } from "../theme/theme";
import Header from "../components/Header";

const ManageStores = () => {
    const getAllStores = useSelector(state => state?.stores);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    let rows = [];
    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "storeCode",
            headerName: "Store ID",
            flex: 1,
        },
        {
            field: "address",
            headerName: "Address",
            flex: 1,
        },
    ];
    console.log("storesList", getAllStores);
    rows = getAllStores && getAllStores.stores && getAllStores.stores.map((store, i) => {
        return {
            id: i + 1,
            storeCode: store.storeCode,
            address: store.address
        }
    })

    return (
        <Box m="20px" width="1080px" >
            <Header title="Stores" subtitle="Manage Stores" />
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

export default ManageStores;
