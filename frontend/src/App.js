import './App.scss'
import './App.css';
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginScreen from "./container/Login/LoginScreen";
import Register from "./container/Register/Register";
import ServiceScreen from "./container/ServiceScreen/ServiceScreen";
import Footer from "./components/Footer";
import Main from "./container/main/Main";
import BookingScreen from "./screens/BookingScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProfileScreen from "./screens/ProfileScreen";
import BookingDetails from "./screens/BookingDetails";
import PlaceBookingScreen from "./screens/PlaceBookingScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListSCreen from "./screens/UserListSCreen";
import ServiceListScreen from "./screens/ServiceListScreen";
import ServiceEditScreen from "./screens/ServiceEditScreen";
import OrderListSCreen from "./screens/OrderListScreen";
import TestimonialListScreen from "./screens/TestimonialListScreen";
import TestimonialEditScreen from "./screens/TestimonialEditScreen";
import TeamListScreen from "./screens/TeamListScreen";
import TeamEditScreen from "./screens/TeamEditScreen";
import GalleryListScreen from "./screens/GalleryListScreen";
import GalleryEditScreen from "./screens/GalleryEditScreen";



function App() {
  return (
    <Router>
     <Header/>
        {/*<main>*/}
           <Routes>
               <Route path='/' element={<Main/>} exact/>
               <Route path='/service/:id' element={<ServiceScreen/>}/>
               <Route path='/book/:id' element={<BookingScreen/>}/>
               <Route path='/book' element={<BookingScreen/>}/>
               <Route path='/login' element={<LoginScreen/>}/>
               <Route path='/register' element={<Register/>}/>
              <Route path='/profile' element={<ProfileScreen/>} />
               <Route path='/shipping' element={<BookingDetails/>} />
               <Route path='/placeBooking' element={<PlaceBookingScreen/>} />
              <Route path='/booking/:bookingId' element={<OrderScreen/>}/>
               <Route path='/admin/userlist' element={<UserListSCreen/>} />

                <Route path='/admin/user/:userId/edit' element={<UserEditScreen/>} />
               <Route path='/admin/servicelist' element={<ServiceListScreen/>} />
               <Route path='/admin/service/:serviceId/edit' element={<ServiceEditScreen/>} />
               <Route path='/admin/orderlist' element={<OrderListSCreen/>} />
               <Route path='/admin/testimonialList' element={<TestimonialListScreen/>} />
               <Route path='/admin/testimonial/:testimonialId/edit' element={<TestimonialEditScreen/>} />
               <Route path='/admin/teamList' element={<TeamListScreen/>} />
               <Route path='/admin/team/:teamId/edit' element={<TeamEditScreen/>}/>
               <Route path='/admin/galleryList' element={<GalleryListScreen/>} />
               <Route path='/admin/gallery/:galleryId/edit' element={<GalleryEditScreen/>} />

           </Routes>
        {/*</main>*/}
        <Footer/>



    </Router>
  );
}

export default App;
