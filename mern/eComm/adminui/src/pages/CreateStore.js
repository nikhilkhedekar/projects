import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { createStore } from "../actions/storeActions";

const CreateStore = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch = useDispatch();

    const handleFormSubmit = (values) => {
        console.log(values);
        dispatch(createStore(values));
    };

    // const clickHandler = () => {

    //     fetch("http://localhost:8080/api/v1/stores", {
    //         method: "POST",
    //         body: JSON.stringify({
    //             storeCode: "003",
    //             address: "charkop market, charkop, kandivali, mumbai,  400067, maharashtra, india"
    //         }),
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJuaWtoaWwiLCJ1c2VySWQiOiI2MzNmYmVlNTc5ODhiMTJlNDE3YWM2ODIiLCJyb2xlIjoiYWRtaW4iLCJzdHJpcGVfY3VzdG9tZXJfaWQiOiJjdXNfTVpJNUM2ZnRKTVc4djYifSwiaWF0IjoxNjY5NjM5NjkzfQ.GYEnxrphgt0dmOsvWqs47_lO2rY6zAmXrY0Wmd9JLNs"
    //         }
    //     }).then(resp => console.log("Resp", resp))
    //         .catch(err => {
    //             console.log("Error", err)
    //         })

    // }

    return (
        <Box m="20px" width="1080px" >
            <Header title="CREATE STORE" subtitle="Create a New Store" />

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Store Code"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.storeCode}
                                name="storeCode"
                                error={!!touched.storeCode && !!errors.storeCode}
                                helperText={touched.storeCode && errors.storeCode}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Address"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.address}
                                name="address"
                                error={!!touched.address && !!errors.address}
                                helperText={touched.address && errors.address}
                                sx={{ gridColumn: "span 2" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Create New Store
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
            {/* <button onClick={clickHandler} > create store </button> */}
        </Box>
    );
};

const checkoutSchema = yup.object().shape({
    storeCode: yup.string().required("required").max(3),
    address: yup.string().required("required")
});

const initialValues = {
    storeCode: "",
    address: ""
};

export default CreateStore;
