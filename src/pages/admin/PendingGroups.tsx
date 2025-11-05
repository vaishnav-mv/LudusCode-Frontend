import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getPendingGroups, approveGroup, rejectGroup } from '../../services/adminService';
import { Group } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import DataTable, { Column } from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import type { AppDispatch } from '../../redux/store';
import { fetchGroups as fetchApprovedGroups, fetchPendingGroups as fetchUserPendingGroups } from '../../redux/slices/groupSlice';

const PendingGroups: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});
  const [rejectionTarget, setRejectionTarget] = useState<Group | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectError, setRejectError] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);

  const loadPendingGroups = async () => {
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

  const refreshUserFacingLists = useCallback(() => {
    dispatch(fetchApprovedGroups());
    dispatch(fetchUserPendingGroups());
  }, [dispatch]);

  useEffect(() => {
    loadPendingGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApprove = async (groupId: string) => {
    setActionLoading(prev => ({ ...prev, [groupId]: true }));
    try {
      await approveGroup(groupId);
      setGroups(prev => prev.filter(group => group.id !== groupId));
      refreshUserFacingLists();
    } catch (error) {
      console.error('Failed to approve group', error);
    } finally {
      setActionLoading(prev => ({ ...prev, [groupId]: false }));
    }
  };

  const openRejectModal = (group: Group) => {
    setRejectionTarget(group);
    setRejectionReason('');
    setRejectError('');
  };

  const closeRejectModal = () => {
    if (isRejecting) return;
    setRejectionTarget(null);
    setRejectionReason('');
    setRejectError('');
  };

  const submitRejection = async () => {
    if (!rejectionTarget) return;
    const trimmedReason = rejectionReason.trim();
    if (!trimmedReason) {
      setRejectError('Rejection reason is required');
      return;
    }

    const groupId = rejectionTarget.id;
    setActionLoading(prev => ({ ...prev, [groupId]: true }));
    setIsRejecting(true);
    try {
      await rejectGroup(groupId, trimmedReason);
      setGroups(prev => prev.filter(group => group.id !== groupId));
      closeRejectModal();
      refreshUserFacingLists();
    } catch (error) {
      console.error('Failed to reject group', error);
    } finally {
      setIsRejecting(false);
      setActionLoading(prev => ({ ...prev, [groupId]: false }));
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
            onClick={() => handleApprove(group.id)}
            className="!w-auto !py-1 !px-3 text-sm"
            variant="secondary"
            isLoading={actionLoading[group.id]}
            disabled={actionLoading[group.id]}
          >
            Approve
          </Button>
          <Button
            onClick={() => openRejectModal(group)}
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
      {rejectionTarget && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold text-white mb-2">Reject "{rejectionTarget.name}"</h2>
            <p className="text-sm text-gray-400 mb-4">Please provide a brief reason to share with the group creator.</p>
            <textarea
              className="w-full h-32 bg-gray-800 border border-gray-700 rounded-md p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              value={rejectionReason}
              onChange={(e) => {
                setRejectionReason(e.target.value);
                if (rejectError) setRejectError('');
              }}
              placeholder="Enter rejection reason..."
            />
            {rejectError && <p className="text-red-400 text-sm mt-2">{rejectError}</p>}
            <div className="flex justify-end gap-3 mt-5">
              <Button
                variant="secondary"
                onClick={closeRejectModal}
                disabled={isRejecting}
                className="!py-2 !px-4"
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={submitRejection}
                isLoading={isRejecting}
                className="!py-2 !px-4"
              >
                Submit Rejection
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PendingGroups;
