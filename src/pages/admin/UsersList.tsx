import React, { useEffect, useMemo, useState } from 'react';
import { getAllUsers, PaginationMeta } from '../../services/adminService';
import { User, Role } from '../../types';
import Card from '../../components/common/Card';
import DataTable, { Column } from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const result = await getAllUsers(page, limit);
        const filteredUsers = result.users.filter(
          (u) => u.role === Role.User || u.role === Role.Leader
        );
        setUsers(filteredUsers);
        setPagination(result.pagination);
        // Sync page in case backend adjusted it (e.g., out of bounds)
        if (result.pagination.page !== page) {
          setPage(result.pagination.page);
        }
      } catch (err) {
        console.error('Failed to fetch users', err);
        setError('Failed to fetch users. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, limit]);

  const totalPages = pagination?.totalPages ?? 1;
  const totalUsers = pagination?.total ?? users.length;

  const handlePageChange = (direction: 'prev' | 'next') => {
    setPage((current) => {
      const delta = direction === 'prev' ? -1 : 1;
      const nextPage = current + delta;
      if (nextPage < 1 || nextPage > totalPages) {
        return current;
      }
      return nextPage;
    });
  };

  const limitOptions = useMemo(() => [10, 20, 50], []);

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLimit = Number(event.target.value);
    setLimit(selectedLimit);
    setPage(1);
  };

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
      {error && (
        <p className="mb-4 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
      <DataTable
        columns={columns}
        data={users}
        loading={loading}
        emptyMessage="No users found"
        keyExtractor={(user) => user.id}
      />
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-text-secondary">
          Page {pagination?.page ?? 1} of {totalPages} — Showing {users.length}{' '}
          of {totalUsers} users
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <label htmlFor="users-per-page" className="text-text-secondary">
            Rows per page
          </label>
          <select
            id="users-per-page"
            className="rounded-md bg-accent px-2 py-1 text-text-primary focus:outline-none focus:ring-2 focus:ring-highlight"
            value={limit}
            onChange={handleLimitChange}
          >
            {limitOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-md bg-accent px-3 py-1 text-text-primary hover:bg-gray-600 disabled:opacity-50"
              onClick={() => handlePageChange('prev')}
              disabled={page <= 1 || loading}
            >
              Previous
            </button>
            <button
              type="button"
              className="rounded-md bg-accent px-3 py-1 text-text-primary hover:bg-gray-600 disabled:opacity-50"
              onClick={() => handlePageChange('next')}
              disabled={page >= totalPages || loading || totalPages === 0}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UsersList;
