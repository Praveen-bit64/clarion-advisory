import React, { useState, useMemo } from 'react';
// import { User } from '@/types'; // optional: define a separate type file

export interface User {
    id: number;
    Name: string;
    City: string;
    Email: string;
    Phone: string;
    Profile: string | null;
    role: string;
    JoinedAt: string;
}


interface UserListProps {
    users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = useMemo(() => {
        return users
            .filter(user =>
                user.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.City.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => new Date(b.JoinedAt).getTime() - new Date(a.JoinedAt).getTime());
    }, [users, searchTerm]);

    return (
        <div className="lg:p-6 p-2 bg-white rounded-xl shadow-xl mt-5 lg:px-10 px-5 lg:mr-10 mr-1 ">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-800">👥 User List</h2>
                <div className="relative w-full md:w-64">
                    <input
                        type="text"
                        placeholder="🔍 Search name, city, email..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto rounded-md">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-100 text-left text-xs uppercase tracking-wider text-gray-600">
                        <tr>
                            <th className="p-3">#</th>
                            <th className="p-3">Profile</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">City</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Joined At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length === 0 && (
                            <tr>
                                <td colSpan={8} className="text-center py-8 text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        )}

                        {filteredUsers.map((user, i) => (
                            <tr
                                key={user.id}
                                className="border-b hover:bg-gray-50 transition duration-200"
                            >
                                <td className="p-3">{i + 1}</td>
                                <td className="p-3">
                                    {user.Profile ? (
                                        <img
                                            src={user.Profile}
                                            alt="profile"
                                            className="w-10 h-10 rounded-full object-cover border"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm text-gray-600">
                                            NA
                                        </div>
                                    )}
                                </td>
                                <td className="p-3 font-medium">{user.Name}</td>
                                <td className="p-3">{user.City}</td>
                                <td className="p-3">{user.Email}</td>
                                <td className="p-3">{user.Phone}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'admin'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-blue-100 text-blue-700'
                                            }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-3 text-xs text-gray-500">
                                    {new Date(user.JoinedAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
