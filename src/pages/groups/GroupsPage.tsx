// pages/Groups/GroupsPage.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { fetchGroups } from '../../redux/slices/groupSlice';
import type { RootState, AppDispatch } from '../../redux/store';

const GroupsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const groupStatus = useSelector((state: RootState) => state.groups.listStatus);

  useEffect(() => {
      if (groupStatus === 'idle') {
          dispatch(fetchGroups());
      }
  }, [groupStatus, dispatch]);

  return <Outlet />;
};

export default GroupsPage;
