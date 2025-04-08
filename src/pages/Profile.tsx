
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, User, Mail, Briefcase, LogOut } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState(user?.name || '');
  const [title, setTitle] = useState(user?.title || '');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || '');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleUpdateProfile = () => {
    // In a real app this would call an API
    // Mock update for now
    localStorage.setItem('linkedinUser', JSON.stringify({
      ...user,
      name,
      title,
      avatar: avatarUrl || undefined
    }));
    
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
    
    setIsEditDialogOpen(false);
    // Force refresh to update user data
    window.location.reload();
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/login');
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen">
        <main className="max-w-7xl mx-auto py-6 px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3">
              <Card className="mb-6">
                <div className="h-32 bg-linkedin-blue rounded-t-lg relative"></div>
                <div className="px-6 pb-6">
                  <div className="flex justify-between items-start">
                    <Avatar className="h-24 w-24 border-4 border-white -mt-12 bg-white">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-linkedin-blue text-white text-xl">
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="mt-4"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit your profile</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="title">Title/Position</Label>
                            <Input
                              id="title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="avatar">Profile Picture URL</Label>
                            <Input
                              id="avatar"
                              value={avatarUrl}
                              onChange={(e) => setAvatarUrl(e.target.value)}
                              placeholder="----------"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bio">About</Label>
                            <Textarea
                              id="bio"
                              value={bio}
                              onChange={(e) => setBio(e.target.value)}
                              placeholder="Tell us about yourself"
                              className="min-h-[100px]"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleUpdateProfile} className="bg-linkedin-blue hover:bg-linkedin-dark">
                            Save Changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="mt-4">
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-gray-600">{user.title}</p>
                    <p className="text-gray-500 text-sm mt-1">Greater New York City Area</p>
                    <div className="flex space-x-2 mt-2">
                      <Button variant="outline" size="sm" className="text-linkedin-blue border-linkedin-blue">
                        Connect
                      </Button>
                      <Button variant="outline" size="sm">
                        Message
                      </Button>
                      <Button variant="outline" size="sm">
                        More
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {bio || "This user hasn't added a bio yet."}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-gray-500" />
                    <span>{user.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-gray-500" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-gray-500" />
                    <span>{user.title}</span>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <Button 
                    variant="outline" 
                    className="w-full text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Profile;
