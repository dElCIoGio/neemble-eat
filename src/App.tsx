import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {ROUTES} from "@/lib/routes";
import {AuthVerification} from "@/service/firebase/AuthVerification.tsx";
import HomeLayout from "@/components/wrappers/HomeLayout.tsx";
import {HomePage} from "@/pages/HomePage.tsx";
import ContactPage from "@/pages/Contact.tsx";
import Article from "@/pages/Article.tsx";
import Blog from "@/pages/Blog.tsx";
import {LogIn} from "@/pages/LogIn.tsx";
import {SignUp} from "@/pages/SignUp.tsx";
import {ForgotPassword} from "@/pages/ForgotPassword.tsx";
import ComingSoonPage from "@/pages/ComingSoon.tsx";
import AboutUs from "@/pages/AboutUs.tsx";
import Pricing from "@/pages/Pricing.tsx";
import Demo from "@/pages/Demo.tsx";
import DataAnalysis from "@/pages/DataAnalysis.tsx";
import OrderManagement from "@/pages/OrdersManagement.tsx";
import DigitalMenu from "@/pages/DigitalMenu.tsx";


function App() {

	return (
		<div>
            <Router>
              <Routes>

                  {/*<Route path="/" element={<ComingSoonPage/>}/>*/}
                  <Route path="/" element={<HomeLayout/>}>
                    <Route index element={<HomePage/>}/>
                      <Route path="/login" element={<LogIn/>}/>
                      <Route path="solutions">
                          <Route path="digital-menu" element={<DigitalMenu/>}/>
                          <Route path="orders-management" element={<OrderManagement/>}/>
                          <Route path="analytics" element={<DataAnalysis/>}/>

                      </Route>
                      <Route path="forgot-password" element={<ForgotPassword/>}/>
                      <Route path="demo" element={<Demo/>}/>

                      <Route path="signup" element={<SignUp/>}/>
                      <Route path="contact" element={<ContactPage/>}/>
                      <Route path="about-us" element={<AboutUs/>}/>
                      <Route path="price" element={<Pricing/>}/>
                      <Route path="blog">
                            <Route index element={<Blog/>}/>
                            <Route path="article/:id" element={<Article/>}/>
                      </Route>
                </Route>
	              {
		              ROUTES.map(route => <Route
			              key={route.path}
			              element={
                          route.requiresAuth ?
				              <AuthVerification>
                                  {route.element}
                              </AuthVerification> :
				              route.element}
			              path={route.path}/>
		              )
	              }
              </Routes>
            </Router>
        </div>
	)
}

export default App
