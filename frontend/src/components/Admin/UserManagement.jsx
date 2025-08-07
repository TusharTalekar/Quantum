import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, deleteUser, fetchUsers, updateUser } from "../../redux/slices/adminSlice";


const UserManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    const { users, loading, error } = useSelector((state) => state.admin);

    useEffect(() => {
        if (user && user.role !== "admin") {
            navigate("/");
        }
    }, [user, navigate]);

    useEffect(() => {
        if (user && user.role === "admin") {
            dispatch(fetchUsers());
        }
    }, [dispatch, user]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer", // Default role
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addUser(formData))

        // Reset after submission
        setFormData({
            name: "",
            email: "",
            password: "",
            role: "customer", // Default role
        })
    };

    const handleRoleChange = (userId, newRole) => {
        dispatch(updateUser({ id: userId, role: newRole }))
    }

    const handleDeleteUser = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUser(userId));
        }
    }

    return (
        <div className='max-w-7xl mx-auto p-6'>
            <h2 className="text-3xl font-bold mb-8 text-stone-800">User Management</h2>
            {loading && <p>Loading ...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {/* Add new user form  */}
            <div className="p-8 rounded-xl shadow-xl bg-white mb-8">
                <h3 className="text-xl font-bold mb-4 text-stone-800">Add New User</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-stone-700 font-medium mb-2">Name</label>
                        <input
                            type="text"
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            className='w-full p-3 border-2 border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500'
                            required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-stone-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            className='w-full p-3 border-2 border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500'
                            required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-stone-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            className='w-full p-3 border-2 border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500'
                            required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-stone-700 font-medium mb-2">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors">
                        Add User
                    </button>
                </form>
            </div>
            <div className="overflow-x-auto shadow-xl rounded-xl">
                <table className="min-w-full text-left bg-white text-stone-600">
                    <thead className="bg-emerald-100 text-sm uppercase text-emerald-800 font-semibold">
                        <tr>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Role</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-b border-stone-200 hover:bg-emerald-50 transition-colors">
                                <td className="p-4 font-bold text-stone-900 whitespace-nowrap">
                                    {user.name}
                                </td>
                                <td className="p-4 font-medium text-stone-800">{user.email}</td>
                                <td className="p-4 font-medium text-stone-900 whitespace-nowrap">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        className="p-2 border border-stone-300 rounded-lg bg-stone-100 focus:ring-2 focus:ring-emerald-500">
                                        <option value="customer">Customer</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="p-4">
                                    <button
                                        onClick={() => handleDeleteUser(user._id)}
                                        className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserManagement