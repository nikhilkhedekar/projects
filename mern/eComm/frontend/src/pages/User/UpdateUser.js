import { useContext, useState } from "react"
import { useDispatch } from "react-redux";
import { updateUser } from "../../actions/userActions";
import AxiosInstance from "../../axiosinstance";
import AuthContext from "../../contexts/authContext";

import {
    TextField, BottomNavigationAction, BottomNavigation, Button, IconButton, InputAdornment, Box,
    Paper, Grid
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { LoadingButton } from '@mui/lab';

const UpdateUser = () => {
    const authCtx = useContext(AuthContext);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        name: "",
        email: ""
    });
    const changeHandler = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser(userData))
        setUserData({
            name: "",
            email: ""
        })
    }
    return (
        <form onSubmit={submitHandler} >
            <Paper sx={{ padding: '32px' }} elevation={2}>
                <Grid rowSpacing={2} columnSpacing={1} container my={4}>
                    <Grid item xs={6}>
                        <TextField
                            label='Name'
                            required
                            helperText={
                                !userData.name && 'Required'
                            }
                            fullWidth
                            type='text'
                            error={!userData.name}
                            name="name"
                            value={userData.name}
                            onChange={changeHandler}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            label='Email'
                            required
                            helperText={
                                !userData.email ? 'Required' : 'We will not share your email with anyone'
                            }
                            fullWidth
                            type='email'
                            error={!userData.email}
                            name="email"
                            value={userData.email}
                            onChange={changeHandler}
                        />
                    </Grid>

                    <LoadingButton fullWidth size="large" type="submit" variant="contained"
                        // onClick={ }
                        startIcon={<EditIcon />}>
                        Update User Info
                    </LoadingButton>
                </Grid>
            </Paper>
        </form>
    )
}

export default UpdateUser