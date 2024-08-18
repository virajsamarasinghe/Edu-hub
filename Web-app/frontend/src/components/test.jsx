import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const SimpleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        textAlign: "center",
        lineHeight: "40px",
        color: "white",
        fontSize: "18px",
      }}
      onClick={onClick}
      aria-label="Next Slide"
    >
      <FaAngleRight />
    </div>
  );
};

const SimplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        textAlign: "center",
        lineHeight: "40px",
        color: "white",
        fontSize: "18px",
      }}
      onClick={onClick}
      aria-label="Previous Slide"
    >
      <FaAngleLeft />
    </div>
  );
};

const SpecialRoles = () => {
  const slider = React.useRef(null);
  const [autoScrollDirection, setAutoScrollDirection] = useState("next");

  useEffect(() => {
    const autoScroll = setInterval(() => {
      if (autoScrollDirection === "next") {
        slider.current.slickNext();
      } else {
        slider.current.slickPrev();
      }

      setAutoScrollDirection((prevDirection) =>
        prevDirection === "next" ? "prev" : "next"
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(autoScroll);
  }, [autoScrollDirection]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <SimpleNextArrow />,
    prevArrow: <SimplePrevArrow />,
  };

  return (
    <Slider ref={slider} {...settings} className="carousel rounded-box">
      <div className="carousel-item">
        <img
          src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
          alt="Burger"
        />
      </div>
      <div className="carousel-item">
        <img
          src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
          alt="Burger"
        />
      </div>
      <div className="carousel-item">
        <img
          src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
          alt="Burger"
        />
      </div>
      <div className="carousel-item">
        <img
          src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
          alt="Burger"
        />
      </div>
      <div className="carousel-item">
        <img
          src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
          alt="Burger"
        />
      </div>
      <div className="carousel-item">
        <img
          src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
          alt="Burger"
        />
      </div>
      <div className="carousel-item">
        <img
          src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
          alt="Burger"
        />
      </div>
    </Slider>
  );
};

export default SpecialRoles;