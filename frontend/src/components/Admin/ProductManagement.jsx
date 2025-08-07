import { deleteProduct, fetchAdminProducts } from '../../redux/slices/adminProductSlice';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

const ProductManagement = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.adminProducts);

    useEffect(() => {
        dispatch(fetchAdminProducts());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete the product?")) {
            dispatch(deleteProduct(id));
        }
    }

    if (loading) return <p className="text-center">Loading ...</p>
    if (error) return <p className="text-center text-red-500">Error: {error}</p>



    return (
        <div className='max-w-7xl mx-auto p-6 '>
            <h2 className="text-3xl font-bold mb-6 text-stone-800">Product Management</h2>
            <div className="overflow-x-auto shadow-xl rounded-xl">
                <table className='min-w-full text-left bg-white text-stone-600'>
                    <thead className='bg-emerald-100 text-sm uppercase text-emerald-800 font-semibold'>
                        <tr>
                            <th className="py-3 px-4">Home</th>
                            <th className="py-3 px-4">Price</th>
                            <th className="py-3 px-4">SKU</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr
                                    key={product._id}
                                    className="border-b border-stone-200 hover:bg-emerald-50 transition-colors">
                                    <td className='p-4 font-bold text-stone-900 whitespace-nowrap'>
                                        {product.name}
                                    </td>
                                    <td className="p-4 font-medium text-stone-800">${product.price.toFixed(2)}</td>
                                    <td className="p-4 font-medium text-stone-800">{product.sku}</td>
                                    <td className="p-4">
                                        <Link
                                            to={`/admin/products/${product._id}/edit`}
                                            className='bg-amber-500 text-white font-semibold px-4 py-2 rounded-lg mr-2 hover:bg-amber-600 transition-colors'>
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className='bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors'>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className='text-center p-4 text-stone-600'>
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductManagement