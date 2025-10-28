import React, { useEffect, useState } from 'react';
import { getAllUsers, PaginatedUsersResponse } from '../../services/adminService';
import { User, Role } from '../../types';
import Card from '../../components/common/Card';
import DataTable, { Column } from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await getAllUsers();
        // Handle both array and paginated response
        const userList = Array.isArray(result) ? result : result.users;
        // Show both regular users and leaders, exclude admins from this list
        setUsers(userList.filter(u => u.role === Role.User || u.role === Role.Leader));
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const columns: Column<User>[] = [
    {
      header: 'Username',
      accessor: 'username',
    },
    {
      header: 'Email',
      accessor: 'email',
    },
    {
      header: 'Role',
      accessor: (user) => <StatusBadge status={user.role} variant="info" />,
    },
    {
      header: 'Joined',
      accessor: (user) => new Date(user.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <Card>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Users</h1>
      <DataTable
        columns={columns}
        data={users}
        loading={loading}
        emptyMessage="No users found"
        keyExtractor={(user) => user.id}
      />
    </Card>
  );
};

export default UsersList;
