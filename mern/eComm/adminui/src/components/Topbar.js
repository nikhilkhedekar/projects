import { Box, IconButton, useTheme, Menu, MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../theme/theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { AdminAuthContext } from "../context/AdminAuthContext";

const Topbar = () => {
    const adminAuthCtx = useContext(AdminAuthContext);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [adminBtnEl, setAdminBtnEl] = useState(null);
    const [settingBtnEl, setSettingBtnEl] = useState(null);
    const openAdmin = Boolean(adminBtnEl);
    const openSetting = Boolean(settingBtnEl);

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* SEARCH BAR */}
            <Box
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
            >
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            {/* ICONS */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton
                    color='inherit'
                    id='setting-button'
                    aria-controls={openSetting ? 'setting-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={openSetting ? 'true' : undefined}
                    onClick={(e) => setSettingBtnEl(e.currentTarget)}>
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton
                    color='inherit'
                    id='admin-button'
                    aria-controls={openAdmin ? 'admin-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={openAdmin ? 'true' : undefined}
                    onClick={(e) => setAdminBtnEl(e.currentTarget)}>
                    <PersonOutlinedIcon />
                </IconButton>
            </Box>
            <Menu
                id='admin-menu'
                anchorEl={adminBtnEl}
                open={openAdmin}
                onClose={() => setAdminBtnEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                MenuListProps={{
                    'aria-labelledby': 'admin-button'
                }}>
                <MenuItem onClick={() => {
                    setAdminBtnEl(null);
                }}>Admin Profile</MenuItem>
                <MenuItem onClick={() => {
                    adminAuthCtx.logout();
                    setAdminBtnEl(null);
                }}>Logout</MenuItem>
            </Menu>
            <Menu
                id='setting-menu'
                anchorEl={settingBtnEl}
                open={openSetting}
                onClose={() => setSettingBtnEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                MenuListProps={{
                    'aria-labelledby': 'setting-button'
                }}>
                <MenuItem onClick={() => {
                    setSettingBtnEl(null);
                }}>Update Admin Profile</MenuItem>
                <MenuItem onClick={() => {
                    setSettingBtnEl(null);
                }}>Change Password</MenuItem>
            </Menu>
        </Box>
    )
}

export default Topbar