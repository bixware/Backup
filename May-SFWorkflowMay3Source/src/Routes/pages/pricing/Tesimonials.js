/**
 * Testimonial Slider Component
 */
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useSelector } from 'react-redux';

// api
import api from 'Api';

function TestimonialSlider() {
   const [testimonials, setTestimonials] = useState(null);
   const settings = useSelector(state => state.settings);

   useEffect(() => {
      getTestimonials()
   },[])


  // get testimonials
   const getTestimonials = () => {
      api.get('testimonials.js')
         .then((response) => {
            setTestimonials(response.data);
         })
         .catch(error => {
         // error handling
         })
   }

   const { rtlLayout } = settings;
   const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      rtl: rtlLayout
   };
   return (
      <div className="col-sm-12 col-md-10 mx-auto testimonial-slider">
         <Slider {...sliderSettings}>
            {testimonials && testimonials.map((testimonial, key) => (
            <div className="media" key={key}>
               <img src={testimonial.avatar} alt="user profile" className="rounded-circle mr-50 pull-left" width="137" height="137" />
               <div className="media-body">
                  <p>“{testimonial.body}“</p>
                  <div className="user-meta">
                  <span className="fw-bold d-block">{testimonial.name}</span>
                  <span className="small">{testimonial.designation}</span>
                  </div>
               </div>
            </div>
            ))}
         </Slider>
      </div>
   );
}

export default TestimonialSlider;
