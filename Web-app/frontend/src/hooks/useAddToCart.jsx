// src/hooks/useAddToCart.js
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
import useCart from "./useCart";
import { useContext } from 'react';
import { AuthContext } from "../contexts/AuthProvider";

const useAddToCart = () => {
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = item => {
    if (user && user.email) {
      const cartItem = { menuItemId: item._id, name: item.name, quantity: 1, image: item.image, price: item.price, email: user.email };

      axios.post('http://localhost:6001/carts', cartItem)
        .then((response) => {
          console.log(response);
          if (response) {
            refetch(); // refetch cart
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Successfully added to the cart.',
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
        .catch((error) => {
          const errorMessage = error.response.data.message;
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: `${errorMessage}`,
            showConfirmButton: false,
            timer: 1500
          });
        });
    } else {
      Swal.fire({
        title: 'Please login to buy the clothes!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login now!'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } });
        }
      });
    }
  };

  return handleAddToCart;
};

export default useAddToCart;
