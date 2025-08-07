import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchOrderDetails } from "../redux/slices/orderSlice";

const OrderDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { orderDetails, loading, error } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchOrderDetails(id));
    }, [dispatch, id]);

    if (loading) return <p className="text-center text-stone-600">Loading ...</p>
    if (error) return <p className="text-center text-red-500">Error: {error}</p>

    return (
        <div className='max-w-7xl mx-auto p-4 sm:p-6 bg-amber-50 font-serif'>
            <h2 className='text-3xl md:text-4xl font-bold mb-8 text-stone-800'>Order Details</h2>
            {!orderDetails ? (
                <p className='text-center text-stone-600'>No order details found</p>
            ) : (
                <div className='p-6 sm:p-8 bg-white rounded-xl shadow-lg'>
                    {/* Order info */}
                    <div className='flex flex-col sm:flex-row mb-8 justify-between'>
                        <div>
                            <h3 className='text-xl md:text-2xl font-bold text-stone-800'>
                                Order ID: #{orderDetails._id}
                            </h3>
                            <p className='text-stone-600 font-medium'>
                                {new Date(orderDetails.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0'>
                            <span
                                className={`${orderDetails.isPaid
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-amber-100 text-amber-700"
                                    } px-4 py-2 rounded-full text-sm font-semibold mb-2`}>
                                {orderDetails.isPaid ? "Approved" : "Pending"}
                            </span>
                            <span
                                className={`${orderDetails.isDelivered
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-amber-100 text-amber-700"
                                    } px-4 py-2 rounded-full text-sm font-semibold mb-2`}>
                                {orderDetails.isDelivered ? "Delivered" : "Pending Delivery"}
                            </span>
                        </div>
                    </div>
                    {/* Customer, Payment, Shipping Info  */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8 text-stone-700'>
                        <div>
                            <h4 className='text-lg font-bold mb-2 text-stone-800'>Payment Info</h4>
                            <p>Payment Method: {orderDetails.paymentMethod}</p>
                            <p>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
                        </div>
                        <div>
                            <h4 className='text-lg font-bold mb-2 text-stone-800'>Shipping Info</h4>
                            <p>Shipping Method: {orderDetails.shippingMethod}</p>
                            <p>Address: {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}</p>
                        </div>
                    </div>
                    {/* Product List  */}
                    <div className='overflow-x-auto'>
                        <h4 className='text-2xl font-bold mb-4 text-stone-800'>Products</h4>
                        <table className='min-w-full text-stone-600 mb-8 bg-white rounded-lg shadow'>
                            <thead className='bg-emerald-100 text-sm uppercase text-emerald-800 font-semibold'>
                                <tr>
                                    <th className='py-3 px-4 text-left'>Product</th>
                                    <th className='py-3 px-4 text-left'>Unit Price</th>
                                    <th className='py-3 px-4 text-left'>Quantity</th>
                                    <th className='py-3 px-4 text-left'>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails.orderItems.map((item) => (
                                    <tr key={item.productId} className='border-b border-stone-200 hover:bg-emerald-50 transition-colors'>
                                        <td className='py-4 px-4 flex items-center'>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className='w-16 h-16 object-cover rounded-lg mr-4' />
                                            <Link
                                                to={`/product/${item.productId}`}
                                                className="text-emerald-800 hover:underline font-semibold">
                                                {item.name}
                                            </Link>
                                        </td>
                                        <td className="py-4 px-4 font-medium text-stone-800">${item.price}</td>
                                        <td className="py-4 px-4 text-stone-700 font-medium">{item.quantity}</td>
                                        <td className="py-4 px-4 font-bold text-stone-900">${item.price * item.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Back to orders link  */}
                    <Link
                        to="/my-orders" className='text-emerald-800 hover:underline font-semibold'>
                        Back to My Orders
                    </Link>
                </div>

            )}
        </div>
    )
}

export default OrderDetailsPage