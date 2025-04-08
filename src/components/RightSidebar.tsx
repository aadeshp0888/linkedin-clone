
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Info, Plus } from 'lucide-react';

const RightSidebar = () => {
  return (
    <div className="space-y-4">
      <AddToFeedCard />
      <PremiumCard />
    </div>
  );
};

const AddToFeedCard = () => {
  const suggestions = [
    {
      name: "Tech Insider",
      description: "Company • Computer Software",
      avatar: "",
      initials: "TI"
    },
    {
      name: "Web Developer Network",
      description: "Group • 78,354 members",
      avatar: "",
      initials: "WD"
    },
    {
      name: "Startup Founders",
      description: "Group • 42,112 members",
      avatar: "",
      initials: "SF"
    }
  ];

  return (
    <Card>
      <CardHeader className="p-4 pb-2 flex flex-row justify-between items-start">
        <h3 className="font-medium text-base">Add to your feed</h3>
        <Info className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="flex items-start mt-4">
            <Avatar className="h-12 w-12 mr-3">
              <AvatarImage src={suggestion.avatar} alt={suggestion.name} />
              <AvatarFallback className="bg-gray-200 text-gray-600">{suggestion.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="font-semibold text-sm">{suggestion.name}</h4>
              <p className="text-xs text-gray-500 mt-0.5">{suggestion.description}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2 rounded-full border-gray-400"
              >
                <Plus className="h-4 w-4 mr-1" />
                Follow
              </Button>
            </div>
          </div>
        ))}
        <Button variant="link" className="text-gray-500 text-sm mt-3 px-0">
          View all recommendations
        </Button>
      </CardContent>
    </Card>
  );
};

const PremiumCard = () => {
  return (
    <Card className="sticky top-20">
      <CardContent className="p-4">
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Get the latest jobs and industry news
          </p>
          <div className="flex justify-center my-3">
            <Avatar className="h-16 w-16">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="bg-linkedin-blue text-white">JD</AvatarFallback>
            </Avatar>
          </div>
          <h4 className="font-medium text-sm">John, explore tools to help you navigate your career</h4>
          <Button 
            variant="outline" 
            className="mt-3 rounded-full border-linkedin-blue text-linkedin-blue hover:bg-blue-50 w-full"
          >
            Try Premium for free
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RightSidebar;
