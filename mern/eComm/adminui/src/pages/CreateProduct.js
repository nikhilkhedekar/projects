import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { createProduct } from "../actions/productActions";

const CreateProduct = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch = useDispatch();

    const handleFormSubmit = (values) => {
        console.log(values);  
        dispatch(createProduct(values));      
    };

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
                                label="Product Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                name="name"                                
                                error={!!touched.name && !!errors.name}
                                helperText={touched.name && errors.name}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Product Price"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.price}
                                name="price"
                                error={!!touched.price && !!errors.price}
                                helperText={touched.price && errors.price}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Description"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.description}
                                name="description"                                
                                error={!!touched.description && !!errors.description}
                                helperText={touched.description && errors.description}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Category"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.category}
                                name="category"                                
                                error={!!touched.category && !!errors.category}
                                helperText={touched.category && errors.category}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Company"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.company}
                                name="company"                                
                                error={!!touched.company && !!errors.company}
                                helperText={touched.company && errors.company}
                                sx={{ gridColumn: "span 2" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Create New Product
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

const checkoutSchema = yup.object().shape({    
    name: yup.string().required("required"),
    price: yup.number().required("required"),
    description: yup.string().required("required"),
    category: yup.string().required("required"),
    company: yup.string().required("required")
});

const initialValues = {
    name: "",
    price: 0,
    description: "",    
    category: "",
    company: ""    
};

export default CreateProduct;
