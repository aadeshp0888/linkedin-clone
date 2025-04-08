
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Home, Users, BriefcaseBusiness, Bell, MessageSquare, User, LogIn } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-linkedin-blue">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
          </Link>
          <div className="relative hidden md:flex items-center bg-gray-100 rounded-md px-3 py-1.5 w-64">
            <Search className="h-4 w-4 text-gray-500 mr-2" />
            <Input 
              type="text" 
              placeholder="Search" 
              className="bg-transparent border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto" 
            />
          </div>
        </div>

        {/* Navigation for Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavItem icon={<Home className="h-5 w-5" />} text="Home" active to="/" />
          <NavItem icon={<Users className="h-5 w-5" />} text="My Network" to="/network" />
          <NavItem icon={<BriefcaseBusiness className="h-5 w-5" />} text="Jobs" to="/jobs" />
          <NavItem icon={<MessageSquare className="h-5 w-5" />} text="Messaging" to="/messages" />
          <NavItem icon={<Bell className="h-5 w-5" />} text="Notifications" to="/notifications" />
          
          <div className="border-l border-gray-300 h-8"></div>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex flex-col items-center cursor-pointer">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-linkedin-blue text-white">{user?.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs">Me ▼</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>View Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  logout();
                  navigate('/login');
                }}>
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex flex-col items-center"
              onClick={() => navigate('/login')}
            >
              <LogIn className="h-5 w-5" />
              <span className="text-xs mt-1">Sign In</span>
            </Button>
          )}
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              {isAuthenticated && (
                <div className="flex items-center gap-3 mb-6">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-linkedin-blue text-white">{user?.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-sm text-gray-500">{user?.title}</div>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <MobileNavItem icon={<Home className="h-5 w-5" />} text="Home" to="/" />
                <MobileNavItem icon={<Users className="h-5 w-5" />} text="My Network" to="/network" />
                <MobileNavItem icon={<BriefcaseBusiness className="h-5 w-5" />} text="Jobs" to="/jobs" />
                <MobileNavItem icon={<MessageSquare className="h-5 w-5" />} text="Messaging" to="/messages" />
                <MobileNavItem icon={<Bell className="h-5 w-5" />} text="Notifications" to="/notifications" />
                
                {isAuthenticated ? (
                  <>
                    <MobileNavItem icon={<User className="h-5 w-5" />} text="Profile" to="/profile" />
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-red-500"
                      onClick={() => {
                        logout();
                        navigate('/login');
                      }}
                    >
                      <LogIn className="mr-2 h-5 w-5" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="default" 
                    className="w-full bg-linkedin-blue"
                    onClick={() => navigate('/login')}
                  >
                    <LogIn className="mr-2 h-5 w-5" />
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  to: string;
}

const NavItem = ({ icon, text, active, to }: NavItemProps) => {
  return (
    <Link to={to}>
      <Button 
        variant="ghost" 
        size="sm" 
        className={`flex flex-col items-center px-1 py-2 ${active ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
      >
        {icon}
        <span className="text-xs mt-1">{text}</span>
      </Button>
    </Link>
  );
};

const MobileNavItem = ({ icon, text, to }: NavItemProps) => {
  return (
    <Link to={to} className="block">
      <Button 
        variant="ghost" 
        className="w-full justify-start"
      >
        {icon}
        <span className="ml-2">{text}</span>
      </Button>
    </Link>
  );
};

export default Header;
