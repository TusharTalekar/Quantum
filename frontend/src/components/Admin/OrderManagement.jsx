import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllOrders, updateOrderStatus } from "../../redux/slices/adminOrderSlice";

const OrderManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    const { orders, loading, error } = useSelector((state) => state.adminOrders);

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/");
        } else {
            dispatch(fetchAllOrders());
        }
    }, [dispatch, user, navigate]);

    const handleStatusChange = (orderId, status) => {
        dispatch(updateOrderStatus({ id: orderId, status }));
    };

    if (loading) return <p className="text-center">Loading ...</p>
    if (error) return <p className="text-center text-red-500">Error: {error}</p>

    return (
        <div className='max-w-7xl mx-auto p-6'>
            <h2 className="text-3xl font-bold mb-6 text-stone-800">Order Management</h2>
            <div className="overflow-x-auto shadow-xl rounded-xl">
                <table className="min-w-full text-left bg-white text-stone-600">
                    <thead className="text-sm bg-emerald-100 text-emerald-800 font-semibold uppercase">
                        <tr>
                            <th className="py-3 px-4">Order ID</th>
                            <th className="py-3 px-4">Customer</th>
                            <th className="py-3 px-4">Total Price</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr
                                    key={order._id}
                                    className="border-b border-stone-200 hover:bg-emerald-50 transition-colors">
                                    <td className="py-4 px-4 font-bold text-stone-900 whitespace-nowrap">
                                        #{order._id}
                                    </td>
                                    <td className="p-4 font-medium text-stone-800">{order.user.name}</td>
                                    <td className="p-4 font-bold text-stone-800">${order.totalPrice.toFixed(2)}</td>
                                    <td className="p-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) =>
                                                handleStatusChange(order._id, e.target.value)
                                            }
                                            className='bg-stone-100 border border-stone-300 text-stone-900 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 transition-colors'>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => handleStatusChange(order._id, "Delivered")}
                                            className="bg-emerald-600 text-white px-4 py-2 font-semibold rounded-lg hover:bg-emerald-700 transition-colors">
                                            Mark as Delivered
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-stone-600">
                                    No order found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default OrderManagement