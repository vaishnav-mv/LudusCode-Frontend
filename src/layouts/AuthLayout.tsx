
import React from 'react';
import { Outlet } from 'react-router-dom';
import Card from '../components/common/Card';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-highlight">LudusCode</h1>
                <p className="text-text-secondary">Your AI-Powered Coding Arena</p>
            </div>
            <Card>
                <Outlet />
            </Card>
        </div>
    </div>
  );
};

export default AuthLayout;
