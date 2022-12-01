import { Link } from "react-router-dom";
import { tokens } from "../theme/theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import StorefrontIcon from '@mui/icons-material/Storefront';
import InventoryIcon from '@mui/icons-material/Inventory';
import {
    TextField, BottomNavigationAction, BottomNavigation, Button, IconButton, InputAdornment, Box,
    Paper, Grid, Drawer, Typography,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    ListItemIcon,
    Divider,
    ListItemAvatar,
    Avatar,
    useTheme
} from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";



const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const buttonStl = {
        "padding": "1rem",
        "text-decoration": "none",
        "color": `${colors.grey[300]}`,
    }
    return (
        <Drawer
            anchor='left'
            open={true}
            variant="permanent">
            <Box
                p={2} width='250px' role='presentation' textAlign='center'
                sx={{ width: '300px', bgcolor: `${colors.primary[400]} !important` }}
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    ml="15px"
                >
                    <Typography variant="h3" color={colors.grey[100]}>
                        ADMIN
                    </Typography>
                </Box>
                <Box mb="25px">
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <img
                            alt="profile-user"
                            width="100px"
                            height="100px"
                            src={`../../assets/logo192.png`}
                            style={{ cursor: "pointer", borderRadius: "50%" }}
                        />
                    </Box>
                    <Box textAlign="center">
                        <Typography
                            variant="h2"
                            color={colors.grey[100]}
                            fontWeight="bold"
                            sx={{ m: "10px 0 0 0" }}
                        >
                            Nikhil
                        </Typography>
                        <Typography variant="h4" color={colors.greenAccent[500]}>
                            VP Admin
                        </Typography>
                    </Box>
                </Box>

                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeOutlinedIcon />
                            </ListItemIcon>
                            <Link to="/" style={buttonStl} > Dashboard </Link>
                        </ListItemButton>
                    </ListItem>
                </List>

                <Typography
                    variant="h5"
                    color={colors.grey[200]}
                    sx={{ m: "15px 0 5px 20px" }}
                >
                    Data
                </Typography>

                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <PeopleOutlinedIcon />
                            </ListItemIcon>
                            <Link to="/allUsers" style={buttonStl} > Users </Link>
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <LocalShippingIcon />
                            </ListItemIcon>
                            <Link to="/allOrders" style={buttonStl} > Orders </Link>
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ReviewsIcon />
                            </ListItemIcon>
                            <Link to="/allReviews" style={buttonStl} > Reviews </Link>
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ShoppingCartIcon />
                            </ListItemIcon>
                            <Link to="/allCarts" style={buttonStl} > Carts </Link>
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InventoryIcon />
                            </ListItemIcon>
                            <Link to="/allProducts" style={buttonStl} > Manage Products </Link>
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <StorefrontIcon />
                            </ListItemIcon>
                            <Link to="/allStores" style={buttonStl} > Manage Stores </Link>
                        </ListItemButton>
                    </ListItem>
                </List>

                <Typography
                    variant="h5"
                    color={colors.grey[200]}
                    sx={{ m: "15px 0 5px 20px" }}
                >
                    Pages
                </Typography>

                <List>

                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddBusinessIcon />
                            </ListItemIcon>
                            <Link to="/createStore" style={buttonStl} > Create Store </Link>
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InventoryIcon />
                            </ListItemIcon>
                            <Link to="/createProduct" style={buttonStl} > Create Product </Link>
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <CalendarTodayOutlinedIcon />
                            </ListItemIcon>
                            <Link to="/calendar" style={buttonStl} > Calendar </Link>
                        </ListItemButton>
                    </ListItem>
                </List>

                < Typography
                    variant="h5"
                    color={colors.grey[200]}
                    sx={{ m: "15px 0 5px 20px" }
                    }
                >
                    Charts
                </Typography >

                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <BarChartOutlinedIcon />
                            </ListItemIcon>
                            <Link to="/carchart" style={buttonStl} > Bar Chart </Link>
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <PieChartOutlineOutlinedIcon />
                            </ListItemIcon>
                            <Link to="/piechart" style={buttonStl} > Pie Chart </Link>
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <TimelineOutlinedIcon />
                            </ListItemIcon>
                            <Link to="/linechart" style={buttonStl} > Line Chart </Link>
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <MapOutlinedIcon />
                            </ListItemIcon>
                            <Link to="/storeLocation" style={buttonStl} > Store Locations </Link>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
};

export default Sidebar