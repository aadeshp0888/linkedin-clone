
import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Feed from '@/components/Feed';
import RightSidebar from '@/components/RightSidebar';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto py-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-3 hidden md:block">
            <Sidebar />
          </div>
          <div className="md:col-span-6">
            <Feed />
          </div>
          <div className="md:col-span-3 hidden lg:block">
            <RightSidebar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
