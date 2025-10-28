import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyGroups } from '../../services/groupService';
import { Group } from '../../types';
import { useAppSelector } from '../../redux/hooks';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import DataTable, { Column } from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';

const MyGroups: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const fetchGroups = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const groupList = await getMyGroups();
      setGroups(groupList);
    } catch (error) {
      console.error("Failed to fetch groups", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const columns: Column<Group>[] = [
    {
      header: 'Group Name',
      accessor: 'name',
    },
    {
      header: 'Status',
      accessor: (group) => <StatusBadge status={group.status} />,
    },
    {
      header: 'Created At',
      accessor: (group) => new Date(group.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text-primary">My Groups</h1>
        <Button onClick={() => navigate('/create-group')} className="!w-auto">
          Create New Group
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={groups}
        loading={loading}
        emptyMessage="You haven't created or led any groups yet."
        keyExtractor={(group) => group.id}
      />
    </Card>
  );
};

export default MyGroups;
