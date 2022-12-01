import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext, useState } from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";

import {
  Dashboard,
  Users,
  ManageProducts,
  ManageStores,
  Orders,
  Reviews,
  Carts,
  CreateStore,
  CreateProduct,
  Calendar,
  Login
} from "./pages/index";
import Sidebar from "./components/Sidebar";
import { ColorModeContext, useMode } from "./theme/theme";
import Topbar from "./components/Topbar";
import { AdminAuthContext } from "./context/AdminAuthContext";

function App() {
  const [theme, colorMode] = useMode();
  const adminAuthCtx = useContext(AdminAuthContext);
  const isLoggedIn = adminAuthCtx.isLoggedIn;
  return (    
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>          
            <CssBaseline />
            <div className="app">
              <>
                {isLoggedIn ? <main className="sidebar"><Sidebar /></main> : null}
              </>
              <main className="content">
                { isLoggedIn ? <Topbar /> : null }
                <Routes>
                  {
                    isLoggedIn ? (
                      <>
                        <Route path="/" element={<Dashboard />} />
                        {/* admin product route */}
                        <Route path="/allProducts" element={<ManageProducts />} />
                        <Route path='/createProduct' element={<CreateProduct />} />
                        {/* <Route path='/products/:id' element={updateproduct} /> */}
                        {/* <Route path='/products/:id' element={deleteproduct} /> */}

                        {/** admin store route */}
                        <Route path="/createStore" element={<CreateStore />} />
                        <Route path="/allStores" element={<ManageStores />} />

                        {/* admin order routes */}
                        <Route path='/allOrders' element={<Orders />} />

                        {/* admin cart routes */}
                        <Route path="/allCarts" element={<Carts />} />
                        {/* cart count */}

                        {/* user */}
                        {/* user count */}
                        <Route path='/allUsers' element={<Users />} />
                        {/* <Route path='/user-details' element={get other user details} /> */}

                        {/* reviews */}
                        <Route path="/allReviews" element={<Reviews />} />

                        {/* Calendar */}
                        <Route path="/calendar" element={<Calendar />} />
                      </>
                    ) : <Route path="/login" element={<Login />} />
                  }
                </Routes>
              </main>
            </div>          
        </ThemeProvider>
      </ColorModeContext.Provider>    
  );
}

export default App;
