import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { tokens } from "../theme/theme";
import Header from "../components/Header";

const Users = () => {
    const getAllUsersList = useSelector(state => state?.users);
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
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "phone",
            headerName: "Phone Number",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "address",
            headerName: "Address",
            flex: 1,
        }
    ];
    console.log("userList", getAllUsersList);
    rows = getAllUsersList && getAllUsersList.users && getAllUsersList.users.map((users, i) => {
        return {
            id: i + 1,
            userId: users?._id,
            name: users?.name,
            phone: users?.userMobile?.number,
            email: users?.email,
            address: users?.address
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

export default Users;
