import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import useAddToCart from "../../hooks/useAddToCart";
import SpecialRoles from '../home/SpecialRoles'

const ProductPage = () => {
  const handleAddToCart = useAddToCart();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [animateImage, setAnimateImage] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:6001/menu/${id}`)
      .then(response => {
        setProduct(response.data);
        setSelectedImage(response.data.image); // Set initial selected image
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleThumbnailClick = (image) => {
    setAnimateImage(image); // Trigger animation
    setSelectedImage(image);
    setTimeout(() => setAnimateImage(null), 300); // Remove animation class after animation duration
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      {/* Introductory Section */}
      <div className='section-container bg-yellow-400 mb-8'>
        <div className='py-48 flex flex-col justify-center items-center gap-8'>
          <div className='text-center space-y-7 px-4'>
            <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
              For the love of stunning 
              <span className='text-pink'> {product.name}</span>
            </h2>
            <p className='text-xl text-[#4a4a4a] md:w-4/5 mx-auto'>
              Come with family and experience the joy of our stunning fashion pieces, from classic essentials to rich statement items, refreshing trends, and more all at an affordable price. {product.recipe}
            </p>
            <button onClick={() => handleAddToCart(product)} className='btn bg-pink px-8 py-3 font-semibold text-white rounded-full'>
              <h2 className="text-xl font-semibold">Buy Now</h2>
            </button>
          </div>
        </div>
      </div>
      
      <div className='section-container mb-8'>
        <div className='flex flex-col md:flex-row items-start justify-between gap-12'>
          <div className='md:w-1/2'>
            {/* Large Image */}
            <img src={selectedImage} alt={product.name} className="w-full h-auto" />
            {/* Thumbnails */}
            <div className='flex mt-4 gap-2'>
              {Array(4).fill(product.image).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} thumbnail ${index}`}
                  className={`w-20 h-20 object-cover cursor-pointer ${animateImage === img ? 'animate-scale' : ''}`}
                  onClick={() => handleThumbnailClick(img)}
                />
              ))}
            </div>
          </div>
          <div className='md:w-1/2'>
            <div className='text-left md:w-4/5'>
              <h1 className='text-7xl font-bold mb-4'>{product.name}</h1>
             
              <div className='flex items-center gap-4 mb-4'>
                <h1>description :</h1>
                <p>{product.recipe}</p>
              </div>
              <div className='flex items-center gap-16 mb-4'>
                <h1 className='text-xl font-semibold'>Price: Rs. {product.price} /=</h1>
                <button onClick={() => handleAddToCart(product)} className='btn bg-pink text-white px-4 py-2 rounded-md'>
                  Add to Cart
                </button>
              </div>
              
              <h4 className='title text-xl font-medium mb-3'>What Our Customers Say About Us</h4>
              <blockquote className='my-5 text-secondary leading-[30px]'>
                "ONEXT has the best variety of styles I've ever seen. The service was fantastic, and the ambiance was perfect for a family shopping trip."
              </blockquote>
              <blockquote className='my-5 text-secondary leading-[30px]'>
                "The mix of styles at ONEXT is out of this world! I've never seen anything like it. Highly recommend!"
              </blockquote>

              {/* Avatar and Customer Feedback */}
              <div className='flex items-center gap-4'>
                <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                  <div className="avatar">
                    <div className="w-12">
                      <img src="/images/home/testimonials/testimonial1.png" alt="Customer 1" />
                    </div>
                  </div>
                  <div className="avatar">
                    <div className="w-12">
                      <img src="/images/home/testimonials/testimonial2.png" alt="Customer 2" />
                    </div>
                  </div>
                  <div className="avatar">
                    <div className="w-12">
                      <img src="/images/home/testimonials/testimonial3.png" alt="Customer 3" />
                    </div>
                  </div>
                  <div className="avatar placeholder">
                    <div className="w-12 bg-neutral text-neutral-content">
                      <span>+99</span>
                    </div>
                  </div>
                </div>
                <div className='space-y-1 ml-4'>
                  <h5 className='text-lg font-semibold'>Customer Feedback</h5>
                  <div className='flex items-center gap-2'>
                    <FaStar className="text-yellow-400" />
                    <span className='font-medium'>4.9</span> 
                    <span className='text-[#807e7e]'>(10.5k Reviews)</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        
      </div>
      <SpecialRoles/>
    </div>
  );
};

export default ProductPage;
