
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Bookmark, Users } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="space-y-4">
      <ProfileCard />
      <ConnectionsCard />
      <ItemsCard />
    </div>
  );
};

const ProfileCard = () => {
  return (
    <Card className="overflow-hidden">
      <div className="h-16 bg-gradient-to-r from-linkedin-blue to-linkedin-dark"></div>
      <CardContent className="pt-0">
        <div className="flex flex-col items-center -mt-8">
          <Avatar className="h-16 w-16 border-4 border-white">
            <AvatarImage src="" alt="User" />
            <AvatarFallback className="-------------------">JD</AvatarFallback>
          </Avatar>
          <h2 className="font-semibold text-lg mt-2">Adesh Pawar</h2>
          <p className="text-sm text-gray-500 text-center">Data Scientist</p>
          
          <div className="w-full border-t border-gray-200 mt-3 pt-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Who's viewed your profile</span>
              <span className="font-semibold text-linkedin-blue">42</span>
            </div>
            <div className="flex justify-between text-sm mt-1.5">
              <span className="text-gray-500">Impressions of your post</span>
              <span className="font-semibold text-linkedin-blue">137</span>
            </div>
          </div>
          
          <div className="w-full border-t border-gray-200 mt-3 pt-3">
            <p className="text-sm">Access exclusive tools & insights</p>
            <Button variant="link" className="text-sm font-semibold p-0 h-auto text-black flex items-center">
              <div className="h-3 w-3 bg-gradient-to-r from-yellow-400 to-yellow-600 mr-2"></div>
              Try Premium for free
            </Button>
          </div>
          
          <div className="w-full border-t border-gray-200 mt-3 pt-3 flex items-center">
            <Bookmark className="h-4 w-4 mr-2" />
            <span className="text-sm">My items</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ConnectionsCard = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Connections</span>
          <span className="text-xs font-semibold text-linkedin-blue">30</span>
        </div>
        <div className="flex items-center mt-1">
          <span className="text-sm font-semibold">Grow your network</span>
          <Users className="h-4 w-4 ml-1 text-gray-600" />
        </div>
      </CardContent>
    </Card>
  );
};

const ItemsCard = () => {
  return (
    <Card className="sticky top-20">
      <CardContent className="p-4">
        <div className="text-sm font-medium">Recent</div>
        {['Frontend Developers Group', 'React Enthusiasts', 'Tech Innovations'].map((item, index) => (
          <div key={index} className="flex items-center mt-2">
            <Users className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-xs text-gray-600">{item}</span>
          </div>
        ))}
        
        <Button variant="link" className="text-linkedin-blue text-sm p-0 h-auto mt-2">
          Groups
        </Button>
        
        <div className="flex justify-between items-center mt-4">
          <Button variant="link" className="text-linkedin-blue text-sm p-0 h-auto">
            Events
          </Button>
          <Plus className="h-4 w-4" />
        </div>
        
        <Button variant="link" className="text-linkedin-blue text-sm p-0 h-auto mt-2 block">
          Followed Hashtags
        </Button>
        
        <div className="border-t border-gray-200 mt-3 pt-3 text-center">
          <Button variant="ghost" className="text-gray-600 text-sm w-full">
            Discover more
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Sidebar;
