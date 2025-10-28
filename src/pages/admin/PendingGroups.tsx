import React, { useEffect, useState } from 'react';
import { getPendingGroups, approveGroup, rejectGroup } from '../../services/adminService';
import { Group } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import DataTable, { Column } from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';

const PendingGroups: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const groupList = await getPendingGroups();
      setGroups(groupList);
    } catch (error) {
      console.error("Failed to fetch pending groups", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAction = async (action: 'approve' | 'reject', groupId: string) => {
    setActionLoading(prev => ({ ...prev, [groupId]: true }));
    try {
      if (action === 'approve') {
        await approveGroup(groupId);
      } else {
        await rejectGroup(groupId);
      }
      // Refetch the list to show the change
      fetchGroups(); 
    } catch (error) {
      console.error(`Failed to ${action} group`, error);
    } finally {
      // No need to set loading to false, as the item will be removed from the list
    }
  };

  const columns: Column<Group>[] = [
    {
      header: 'Group Name',
      accessor: 'name',
    },
    {
      header: 'Leader',
      accessor: (group) => group.leader?.username || 'N/A',
    },
    {
      header: 'Status',
      accessor: (group) => <StatusBadge status={group.status} />,
    },
    {
      header: 'Created At',
      accessor: (group) => new Date(group.createdAt).toLocaleDateString(),
    },
    {
      header: 'Actions',
      accessor: (group) => (
        <div className="flex space-x-2">
          <Button
            onClick={() => handleAction('approve', group.id)}
            className="!w-auto !py-1 !px-3 text-sm"
            variant="secondary"
            isLoading={actionLoading[group.id]}
            disabled={actionLoading[group.id]}
          >
            Approve
          </Button>
          <Button
            onClick={() => handleAction('reject', group.id)}
            className="!w-auto !py-1 !px-3 text-sm"
            variant="danger"
            isLoading={actionLoading[group.id]}
            disabled={actionLoading[group.id]}
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Pending Group Requests</h1>
      <DataTable
        columns={columns}
        data={groups}
        loading={loading}
        emptyMessage="No pending requests"
        keyExtractor={(group) => group.id}
      />
    </Card>
  );
};

export default PendingGroups;
