/**
 * Clients Slider
 */
import React, { useState, useEffect } from "react";
import Slider from "react-slick";

// api
import api from 'Api';

function Clientslider() {
   const [clients,setClients] = useState(null);

   useEffect(() => {
      getClients();
   },[])

    // get clients
   const getClients = () => {
      api.get('clients.js')
         .then((response) => {
            setClients(response.data);
         })
         .catch(error => {
            // error handling
            console.log(error);
         })
   }
   const settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,
      rtl: false,
      responsive: [
        {
          breakpoint: 1367,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 575,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 400,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    };
   return (
      <div>
         <Slider {...settings}>
            {clients && clients.map((client, key) => (
               <div key={key}>
                  <img src={client.photo_url} alt="client log" className="img-fluid" width="" height="" />
               </div>
            ))}
         </Slider>
      </div>
   );
}

export default Clientslider;