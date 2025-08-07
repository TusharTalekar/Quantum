import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails, fetchUserOrders } from "../redux/slices/orderSlice";

const MyOrdersPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchUserOrders());
    }, [dispatch]);

    const handleRowClick = (orderId) => {
        navigate(`/order/${orderId}`);
    };

    if (loading) return <p className="text-center text-stone-600">Loading ...</p>
    if (error) return <p className="text-center text-red-500">Error: {error}</p>

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-lg font-serif">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-stone-800" >My Orders</h2>
            <div className="relative shadow-md sm:rounded-lg overflow-hidden">
                <table className="min-w-full text-left text-stone-600">
                    <thead className="bg-emerald-100 text-xs uppercase text-emerald-800 font-bold">
                        <tr>
                            <th className="py-3 px-4">Image</th>
                            <th className="py-3 px-4">Order Id</th>
                            <th className="py-3 px-4">Created</th>
                            <th className="py-3 px-4">Shipping Address</th>
                            <th className="py-3 px-4">Items</th>
                            <th className="py-3 px-4">Price</th>
                            <th className="py-3 px-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr
                                    key={order._id}
                                    onClick={() => { handleRowClick(order._id) }}
                                    className="border-b border-stone-200 hover:bg-emerald-50 transition-colors cursor-pointer">
                                    <td className="p-4">
                                        <img src={order.orderItems[0].image} alt={order.orderItems[0].name}
                                            className="w-12 h-12 object-cover rounded-lg" />
                                    </td>
                                    <td className="py-4 px-4 font-bold text-stone-900 whitespace-nowrap">
                                        #{order._id}
                                    </td>
                                    <td className="py-4 px-4">
                                        {new Date(order.createdAt).toLocaleDateString()}{" "}
                                        {new Date(order.createdAt).toLocaleTimeString()}
                                    </td>
                                    <td className="py-4 px-4">
                                        {order.shippingAddress ? `${order.shippingAddress.city},${order.shippingAddress.country}` : "N/A"}
                                    </td>
                                    <td className="py-4 px-4">
                                        {order.orderItems.length}
                                    </td>
                                    <td className="py-4 px-4 text-base font-normal text-stone-800">
                                        ${order.totalPrice}
                                    </td>
                                    <td className="py-4 px-4">
                                        <span
                                            className={`${order.isPaid
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-amber-100 text-amber-700"
                                                } py-2 px-4 rounded-full text-sm font-semibold`}>
                                            {order.isPaid ? "Paid" : "Pending"}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="py-4 px-4 text-center text-stone-600">
                                    You have no orders
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyOrdersPage