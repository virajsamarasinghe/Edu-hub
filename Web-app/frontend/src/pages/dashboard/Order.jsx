import React from 'react'
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const Order = () => {

  const { user } = useAuth();
  // console.log(user.email)
  const token = localStorage.getItem('access-token')

  const { refetch, data: orders = [] } = useQuery({
      queryKey: ['orders', user?.email],
      queryFn: async () => {
          const res = await fetch(`http://localhost:6001/payments?email=${user?.email}`, {
              headers: {
                  authorization: `Bearer ${token}`
              }
          })
          return res.json();
      },
  })

  //console.log(orders)
  const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt)
    return createdAtDate.toLocaleDateString()
  }

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            {/* banner */}
            <div className='section-container bg-yellow-400 mb-8'>
        <div className='py-48 flex flex-col justify-center items-center gap-8'>
          <div className='text-center space-y-7 px-4'>
            <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
             Track all your
              <span className='text-pink'>  Orders!</span>
            </h2>
            <p className='text-xl text-[#4a4a4a] md:w-4/5 mx-auto'>
              Come with family and experience the joy of our stunning fashion pieces, from classic essentials to rich statement items, refreshing trends, and more all at an affordable price.
            </p>
            
          </div>
        </div>
      </div>

      {/* table */}
      <div>
      {
        (orders.length > 0) ? <div>
        <div className="">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-pink text-white rounded-sm">
                <tr>
                  <th>#</th>
                  <th>Order Data</th>
                  <th>Transition Id</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="font-medium">{item.transitionId}</td>
                    <td>
                      Rs.{item.price}
                    </td>
                    <td>{item.status}</td>
                    <td>
                      <Link to='/contact'
                        className="btn btn-sm border-none text-red bg-transparent"
                       
                      >
                        contact
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* foot */}
            </table>
          </div>
        </div>
        <hr />
      </div> : <div className="text-center mt-20">
        <p>Cart is empty. Please add products.</p>
        <Link to="/menu"><button className="btn bg-pink text-white mt-3">Back to Menu</button></Link>
      </div>
      }
      </div>
</div>
  )
}

export default Order