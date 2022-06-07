import React from "react";
import Home from "../Home/Home";
import Services from "../Services/Services";
import About from "../About/About";
import Team from "../Team/Teams";
import Testimonials from "../Testimonials/Testimonials";
import Carousel from "../Gallery/Carousel";

function Main() {
    return(
        <>
            <Home/>
         <Services/>
        <About/>
        <Testimonials/>
        <Team/>
            <Carousel/>
        </>
)

}
export default Main