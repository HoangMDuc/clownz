import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';

const GlobalStyles = React.lazy(() => import('./components/GlobalStyles/GlobalStyles'));
const Home = React.lazy(() => import('./pages/Home/Home'));
const Category = React.lazy(() => import('./pages/Category/Category'));
const Search = React.lazy(() => import('./pages/Search/Search'));
const Account = React.lazy(() => import('./pages/Account/Account'));
const NewArrival = React.lazy(() => import('./pages/NewArrival/NewArrival'));
const ProductDetails = React.lazy(() => import('./pages/ProductDetails/ProductDetails'));
const Contact = React.lazy(() => import('./pages/Contact/Contact'));
const Login = React.lazy(() => import('./pages/Login/Login'));
const Logout = React.lazy(() => import('./pages/Logout/Logout'));
const Orders = React.lazy(() => import('./pages/Account/Orders/Orders'));
const OrderDetails = React.lazy(() => import('./pages/Account/Orders/OrderDetails'));
const ChangePassword = React.lazy(() => import('./pages/Account/ChangePassword/ChangePassword'));
const Address = React.lazy(() => import('./pages/Account/Address/Address'));
const Cart = React.lazy(() => import('./pages/Cart/Cart'));
const CheckOut = React.lazy(() => import('./pages/CheckOut/CheckOut'));
const ProductManagement = React.lazy(() => import('./admin/pages/ProductManagement/ProductManagement'));
const UserManagement = React.lazy(() => import('./admin/pages/UserManagement/UserManagement'));
const OrderManagement = React.lazy(() => import('./admin/pages/OrderManagement/OrderManagement'));
const OrderManagementDetails = React.lazy(() => import('./admin/pages/OrderManagement/OrderManagementDetails'));
const CategoryManagement = React.lazy(() => import('./admin/pages/CategoryManagement/CategoryManagement'));
const UserAddressManagement = React.lazy(() => import('./admin/pages/UserAddressManagement/UserAddressManagement'));
const Registration = React.lazy(() => import('./pages/Registration/Registration'));
const ScrollToTheTop = React.lazy(() => import('./components/ScrollToTheTop/ScrollToTheTop'));
const About = React.lazy(() => import('./pages/About/About'));
function App() {
    return (
        <div className="App">
            <ScrollToTheTop>
                <GlobalStyles></GlobalStyles>
                <BrowserRouter>
                    <Suspense>
                        <Routes>
                            <Route path="/" element={<Home></Home>} />
                            <Route path="/registration" element={<Registration></Registration>}></Route>
                            <Route path="/login" element={<Login></Login>}></Route>
                            <Route path="/logout" element={<Logout></Logout>}></Route>
                            <Route path="/about" element={<About></About>} />
                            <Route path="/contact" element={<Contact></Contact>} />
                            <Route path="/search" element={<Search></Search>}></Route>
                            <Route path="/account" element={<Account></Account>}></Route>
                            <Route path="/account/orders" element={<Orders></Orders>}></Route>
                            <Route path="/account/changepassword" element={<ChangePassword></ChangePassword>}></Route>
                            <Route path="/account/address" element={<Address></Address>}></Route>
                            <Route path="/account/orders/:id" element={<OrderDetails></OrderDetails>}></Route>
                            <Route path="/new-arrival" element={<NewArrival></NewArrival>} />
                            <Route path="/collection/:category" element={<Category></Category>} />
                            <Route path="/product_details/:product_name" element={<ProductDetails></ProductDetails>} />
                            <Route path="/shopping_cart" element={<Cart></Cart>}></Route>
                            <Route path="/checkout" element={<CheckOut></CheckOut>}></Route>
                            <Route
                                path="/admin/product_management"
                                element={<ProductManagement></ProductManagement>}
                            ></Route>
                            <Route path="/admin/user_management" element={<UserManagement></UserManagement>}></Route>
                            <Route path="/admin/order_management" element={<OrderManagement></OrderManagement>}></Route>
                            <Route
                                path="/admin/order_management/:order_id"
                                element={<OrderManagementDetails></OrderManagementDetails>}
                            ></Route>
                            <Route
                                path="/admin/category_management"
                                element={<CategoryManagement></CategoryManagement>}
                            ></Route>
                            <Route
                                path="/admin/address_management"
                                element={<UserAddressManagement></UserAddressManagement>}
                            ></Route>
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </ScrollToTheTop>
        </div>
    );
}

export default App;
