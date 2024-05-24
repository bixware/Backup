/**
 ** Session Slider
 **/
import React, { useState, useEffect } from "react";
import Slider from "react-slick";

// api
import api from "Api";

function SessionSlider() {
  const [sessionUsersData, setSessionUsersData] = useState(null);

  useEffect(() => {
    getSessionUsersData();
  }, []);

  // session users data
  const getSessionUsersData = () => {
    api
      .get("testimonials.js")
      .then((response) => {
        //console.log(response)
        setSessionUsersData(response.data);
      })
      .catch((error) => {
        // error handling
        console.log(error);
      });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    swipe: true,
    touchMove: true,
    swipeToSlide: true,
    draggable: true,
  };
  return (
    <div className="session-slider">
      <Slider {...settings}>
        {sessionUsersData &&
          sessionUsersData !== null &&
          sessionUsersData.map((data, key) => (
            <div key={key}>
              <img
                //  src={data.profile}
                src={`https://www.kfc.co.at/img/asset/YXNzZXRzL3Byb2R1Y3RzL01lbnVlX0J1cmdlcl9aaW5nZXJfMjAuanBn?fm=png&w=1000&h=1000&s=78998b2a2f42871d6e65d024db7e8881`}
                alt="session-slider"
                className="img-fluid"
                width="377"
                height="588"
              />
              {/* <div className="rct-img-overlay">
                <h5 className="client-name">{data.name}</h5>
                <span>{data.designation}</span>
                <p className="mb-0 fs-14">{data.body}</p>
              </div> */}
            </div>
          ))}
      </Slider>
    </div>
  );
}

export default SessionSlider;
