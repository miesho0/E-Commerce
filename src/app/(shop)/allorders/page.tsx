

// import { getUserOrder } from '@/apis/userorders'
// import { Order, Orders } from '@/types/orders.type'
// import React from 'react'
// import Image from 'next/image'

// const Allorderspage = async () => {
//   const data: Orders = await getUserOrder()

//   return (
//     <div className='w-full md:w-[80%] mx-auto mt-20 my-10 px-5 md:px-0'>
//       <h2 className='text-2xl font-semibold mb-6'>All Orders</h2>

//       <div className='flex flex-col gap-10'>
//         {data.length === 0 ? (
//           <p>No orders found.</p>
//         ) : (
//           data.map((order: Order) => (
//             <div
//               key={order._id}
//               className='border rounded-lg shadow p-4 hover:shadow-md transition'>
//               <div className='flex justify-between items-center mb-4'>
//                 <p className='hidden'><span className='font-semibold'>Order ID:</span> {order._id}</p>
//                  <p><span className='font-semibold'> User:</span> {order.user.name}</p>
//                    <p><span className='font-semibold'>Payment Method:</span> {order.paymentMethodType}</p>
//                 <p><span className='font-semibold'>Status:</span> {order.isPaid ? 'Paid' : 'Pending'}</p>
//               </div>

//               <div className='flex flex-col gap-6'>
//                 {order.cartItems.map((item) => (
//                   <div
//                     key={item._id}
//                     className='flex items-center gap-4 border-b pb-2' >
//                     <div className='w-20 h-20 relative'>
//                       <Image
//                         src={item.product.imageCover}
//                         alt={item.product.title}
//                         fill
//                         className='object-cover rounded'
//                       />
//                     </div>
//                     <div className='flex-1'>
//                       <p className='font-semibold'>{item.product.title}</p>
//                       <p>Quantity: {item.count}</p>
//                       <p>Price: {item.price} EGP</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

 
//               <div className='flex justify-end mt-3 text-lg font-semibold'>
//                 Total: {order.totalOrderPrice} EGP
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   )
// }

// export default Allorderspage


import { getUserOrder } from '@/apis/userorders'
import { Order, Orders } from '@/types/orders.type'
import React from 'react'
import Image from 'next/image'

const Allorderspage = async () => {
  const data: Orders = await getUserOrder()

  return (
    <div className='w-full md:w-[80%] mx-auto mt-20 my-10 px-5 md:px-0'>
      <h2 className='text-2xl font-semibold mb-6'>All Orders</h2>

      <div className='flex flex-col gap-10'>
        {data.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          data.map((order: Order) => (
            <div
              key={order._id}
              className='border rounded-lg shadow p-4 hover:shadow-md transition'>
              
              <div className='flex justify-between items-center mb-4'>
                <p className='hidden'>
                  <span className='font-semibold'>Order ID:</span> {order._id}
                </p>
                <p><span className='font-semibold'>User:</span> {order.user.name}</p>
                <p><span className='font-semibold'>Payment Method:</span> {order.paymentMethodType}</p>
                <p><span className='font-semibold'>Status:</span> {order.isPaid ? 'Paid' : 'Pending'}</p>
              </div>

              <div className='flex flex-col gap-6'>
                {order.cartItems.map((item) => (
                  <div key={item._id} className='flex items-center gap-4 border-b pb-2'>
                    <div className='w-20 h-20 relative'>
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        fill
                        className='object-cover rounded'
                      />
                    </div>
                    <div className='flex-1'>
                      <p className='font-semibold'>{item.product.title}</p>
                      <p>Quantity: {item.count}</p>
                      <p>Price: {item.price} EGP</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className='flex justify-end mt-3 text-lg font-semibold'>
                Total: {order.totalOrderPrice} EGP
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Allorderspage
