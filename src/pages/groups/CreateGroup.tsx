import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import ErrorAlert from '../../components/common/ErrorAlert';
import { createGroup } from '../../services/groupService';
import { useAppSelector } from '../../redux/hooks';
import { useFormSubmit } from '../../hooks/useFormSubmit';

const CreateGroup: React.FC = () => {
  const [groupName, setGroupName] = useState('');
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { error, isLoading, handleSubmit } = useFormSubmit(
    (name: string) => createGroup(name)
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    try {
      await handleSubmit(groupName);
      navigate('/my-groups');
    } catch (err) {
      // Error is handled by useFormSubmit hook
    }
  };

  return (
    <div>
        <div className="mb-4">
            <Link to="/my-groups" className="text-sm text-highlight hover:underline">
                &larr; Back to My Groups
            </Link>
        </div>
        <Card>
            <h2 className="text-2xl font-bold text-center text-text-primary mb-6">Create a New Group</h2>
            <p className="text-center text-text-secondary mb-6">Your group will be submitted for admin approval. Once approved, you will become a Group Leader.</p>
            <ErrorAlert message={error} />
            <form onSubmit={onSubmit}>
                <Input
                label="Group Name"
                id="groupName"
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="e.g., The Code Crusaders"
                required
                />
                <div className="mt-6">
                <Button type="submit" isLoading={isLoading}>
                    Submit for Approval
                </Button>
                </div>
            </form>
        </Card>
    </div>
  );
};

export default CreateGroup;
