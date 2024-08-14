// src/components/Cards.js
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAddToCart from "../hooks/useAddToCart";

const Cards = ({ item }) => {
  const { name, image, price, _id } = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const handleAddToCart = useAddToCart();

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <div className="card shadow-xl relative mr-5 md:my-5">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-pink z-10 ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5 cursor-pointer" />
      </div>
      <Link to={`/menu/${_id}`}>
        <figure>
          <img src={image} alt={name} className="hover:scale-105 transition-all duration-300 md:h-72 mask mask-circle" />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${_id}`}><h2 className="card-title">{name}</h2></Link>
        <p>Description of the item</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">Rs. </span> {price}
          </h5>
          <button onClick={() => handleAddToCart(item)} className="btn bg-pink text-white">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
