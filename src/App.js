import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './UserList';
import UserForm from './UserForm';

const App = () => {
    const [users, setUsers] = useState([]);
    const [userToEdit, setUserToEdit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to fetch users.');
                setLoading(false);
            });
    }, []);

    const handleEdit = (user) => setUserToEdit(user);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(user => user.id !== id));
        }
    };

    const handleSave = (user) => {
        if (userToEdit) {
            setUsers(users.map(u => (u.id === user.id ? user : u)));
        } else {
            setUsers([...users, { ...user, id: users.length + 1 }]);
        }
        setUserToEdit(null);
    };

    const handleCancel = () => setUserToEdit(null);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">User Management Dashboard</h1>
            {userToEdit ? (
                <UserForm
                    userToEdit={userToEdit}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            ) : (
                <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
            )}
        </div>
    );
};

export default App;
