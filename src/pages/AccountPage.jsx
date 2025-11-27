import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { Paper, Tabs, Tab, Typography, Divider } from "@mui/material";
import { TabPanel } from "../components/TabPanel/TabPanel";
import PersonalInfoForm from "../components/account/PersonalInfoForm.jsx";
import AccountSettingsForm from "../components/account/AccountSettingsForm.jsx";
import OrdersHistory from "../components/account/OrdersHistory.jsx";
import { h3, h5 } from "../styles/typographyStyles.jsx";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const tabPaths = ["personal-info", "account-settings", "orders-history"];

export default function AccountPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const getTabIndexFromPath = () => {
    const path = location.pathname.split("/").pop();
    const index = tabPaths.indexOf(path);
    return index !== -1 ? index : 0;
  };

  const [tab, setTab] = useState(getTabIndexFromPath());

  const handleChange = (e, newValue) => {
    setTab(newValue);
    navigate(`/account/${tabPaths[newValue]}`);
  };

  useEffect(() => {
    setTab(getTabIndexFromPath());
  }, [location.pathname]);

  return (
    <Grid size={12} sx={{ px: 4, py: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography sx={{ ...h3, textAlign: "center", mb: 3, width: "100%" }}>My Account</Typography>
      <Paper elevation={1} sx={{ borderRadius: 3, p: 2, width: "100%", maxWidth: "1400px" }}>
        <Grid container spacing={6} >

          <Grid item xs={12} md={4} sx={{ mt: 2 }}>
            <Tabs orientation="vertical" value={tab} onChange={handleChange} variant="scrollable"
              TabIndicatorProps={{ style: { display: "none" } }}
              sx={{ "& .MuiTab-root": { ...h5, textTransform: "none", alignItems: "flex-start", justifyContent: "flex-start", py: 2}, "& .Mui-selected": { color: "#A4795B !important" }}}>
              <Tab icon={<PersonOutlineIcon />} iconPosition="start" label="Profile"/>
              <Tab icon={<SettingsOutlinedIcon />} iconPosition="start" label="Settings"/>
              <Tab icon={<ShoppingBagOutlinedIcon />} iconPosition="start" label="Orders"/>
              <Divider sx={{ my: 1 }} />
              <Tab icon={<LogoutOutlinedIcon />} iconPosition="start" label="Log out" sx={{ color: "#A63A3A !important", "& .MuiSvgIcon-root": { color: "#A63A3A !important" }, "&.Mui-selected": { color: "#A63A3A !important" }}}/>
            </Tabs>
          </Grid>

          <Grid sx={{ flexGrow: 1 }} item xs={12} md={8}>
            <TabPanel value={tab} index={0} style={{ padding: 0 }}>
              <PersonalInfoForm />
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <AccountSettingsForm />
            </TabPanel>
            <TabPanel value={tab} index={2}>
              <OrdersHistory />
            </TabPanel>
          </Grid>

        </Grid>
      </Paper>
    </Grid>
  );
}

