import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ userToEdit, onSave, onCancel }) => {
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (userToEdit) setFormData(userToEdit);
    }, [userToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email) {
            setError('Name and Email are required.');
            return;
        }
        setLoading(true);
        const method = userToEdit ? 'put' : 'post';
        const url = userToEdit
            ? `https://jsonplaceholder.typicode.com/users/${userToEdit.id}`
            : 'https://jsonplaceholder.typicode.com/users';
    
        try {
            const response = await axios[method](url, formData);
            onSave(response.data);
        } catch {
            alert('Failed to save user.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="p-4 border rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">{userToEdit ? 'Edit User' : 'Add User'}</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block font-medium">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default UserForm;