
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Image, MessageSquare, ThumbsUp, SendHorizonal, Share2, MoreHorizontal, Edit, Trash } from 'lucide-react';
import { usePost, Post } from '@/contexts/PostContext';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const Feed = () => {
  const { posts, likePost } = usePost();
  const { isAuthenticated } = useAuth();
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState('');
  const { toast } = useToast();
  const { addPost } = usePost();

  const handleCreatePost = () => {
    if (postContent.trim()) {
      addPost(postContent, postImage || undefined);
      setPostContent('');
      setPostImage('');
      toast({
        title: "Post created",
        description: "Your post has been published!",
      });
    }
  };

  return (
    <div className="space-y-4">
      {isAuthenticated ? (
        <CreatePostCard 
          postContent={postContent}
          setPostContent={setPostContent}
          postImage={postImage}
          setPostImage={setPostImage}
          handleCreatePost={handleCreatePost}
        />
      ) : (
        <Card className="p-4 text-center">
          <p className="mb-2">Sign in to create posts and interact with your network</p>
          <Button 
            variant="default" 
            className="bg-linkedin-blue hover:bg-linkedin-dark"
            onClick={() => window.location.href = '/login'}
          >
            Sign In
          </Button>
        </Card>
      )}
      
      <Separator className="my-4" />
      
      {posts.map((post, index) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

interface CreatePostCardProps {
  postContent: string;
  setPostContent: (value: string) => void;
  postImage: string;
  setPostImage: (value: string) => void;
  handleCreatePost: () => void;
}

const CreatePostCard = ({ 
  postContent, 
  setPostContent, 
  postImage, 
  setPostImage, 
  handleCreatePost 
}: CreatePostCardProps) => {
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!user) return null;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-linkedin-blue text-white">{user.initials}</AvatarFallback>
          </Avatar>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-start text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-full"
              >
                Start a post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create a post</DialogTitle>
              </DialogHeader>
              <div className="flex items-start space-x-3 pt-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-linkedin-blue text-white">{user.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.title}</div>
                </div>
              </div>
              <Textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="What do you want to talk about?"
                className="min-h-[120px] resize-none mt-3"
              />
              {postImage && (
                <div className="relative mt-3">
                  <img src={postImage} alt="Post preview" className="w-full rounded-md max-h-[200px] object-cover" />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 h-auto"
                    onClick={() => setPostImage('')}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="flex space-x-2 mt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 flex items-center"
                  onClick={() => {
                    // In a real app, this would open a file picker
                    const imageUrl = prompt("Enter image URL:");
                    if (imageUrl) setPostImage(imageUrl);
                  }}
                >
                  <Image className="h-5 w-5 mr-2 text-blue-500" />
                  <span>Add Image</span>
                </Button>
              </div>
              <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  disabled={!postContent.trim()} 
                  onClick={() => {
                    handleCreatePost();
                    setIsDialogOpen(false);
                  }}
                  className="bg-linkedin-blue hover:bg-linkedin-dark"
                >
                  Post
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex justify-between mt-3">
          <Button variant="ghost" size="sm" className="text-gray-600 flex items-center">
            <Image className="h-5 w-5 mr-2 text-blue-500" />
            <span>Photo</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 mr-2 text-green-600">
              <path d="M9.555 9.27h4.89a.9.9 0 00.63-.252l3.312-3.312A.9.9 0 0017.901 5H9.555a.9.9 0 00-.9.9v2.469a.9.9 0 00.9.901z"></path>
              <path d="M19.125 9.446h-6.378a1.9 1.9 0 01-1.9-1.9V5.1a1.9 1.9 0 00-1.9-1.9H5.1a1.9 1.9 0 00-1.9 1.9v13.8a1.9 1.9 0 001.9 1.9h14.85a1.9 1.9 0 001.9-1.9v-8.454a1.9 1.9 0 00-1.9-1.9h-.825z"></path>
            </svg>
            <span>Video</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 mr-2 text-orange-500">
              <path d="M18.555 4.198l-2.31-2.121A1.95 1.95 0 0014.95 1.5h-5.9a1.95 1.95 0 00-1.95 1.95v1.95H5.1a1.95 1.95 0 00-1.95 1.95v13.8a1.95 1.95 0 001.95 1.95h13.8a1.95 1.95 0 001.95-1.95V7.177a1.95 1.95 0 00-.577-1.383l-1.718-1.596zM16.74 7.75a.45.45 0 01-.04.59.448.448 0 01-.59.04l-2.327-2.327a.45.45 0 01.04-.59.448.448 0 01.59-.04l2.327 2.327z"></path>
            </svg>
            <span>Event</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 mr-2 text-red-500">
              <path d="M19.714 1.5H4.286C2.152 1.5.5 3.152.5 5.286v8.572c0 2.134 1.652 3.786 3.786 3.786h1.643v4.285c0 .589.673.925 1.146.6l4.285-3.085a1.8 1.8 0 011.073-.315h7.281c2.134 0 3.786-1.652 3.786-3.786V5.286c0-2.134-1.652-3.786-3.786-3.786zM6.857 10.071h2.143a.643.643 0 110 1.286H6.857a.643.643 0 010-1.286zm10.286 2.143h-9a.643.643 0 010-1.286h9a.643.643 0 010 1.286zm0-2.143h-4.286a.643.643 0 010-1.285h4.286a.643.643 0 010 1.285z"></path>
            </svg>
            <span>Article</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const PostCard = ({ post }: { post: Post }) => {
  const { user } = useAuth();
  const { updatePost, deletePost, likePost } = usePost();
  const { toast } = useToast();
  const [editContent, setEditContent] = useState(post.content);
  const [editImage, setEditImage] = useState(post.image || '');

  const isLiked = user && post.likedBy.includes(user.id);
  const isAuthor = user && user.id === post.author.id;

  const handleLike = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to like posts",
        variant: "destructive",
      });
      return;
    }
    likePost(post.id);
  };

  const handleDelete = () => {
    deletePost(post.id);
    toast({
      title: "Post deleted",
      description: "Your post has been removed",
    });
  };

  const handleUpdate = () => {
    updatePost(post.id, editContent, editImage);
    toast({
      title: "Post updated",
      description: "Your post has been updated successfully",
    });
  };
  
  // For mobile view - post actions in a sheet
  const PostActionsSheet = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="md:hidden"
        >
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-auto rounded-t-xl">
        <SheetHeader className="text-left">
          <SheetTitle>Post Actions</SheetTitle>
          <SheetDescription>
            What would you like to do with this post?
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-2">
          {isAuthor && (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Post
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit your post</DialogTitle>
                  </DialogHeader>
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="min-h-[100px]"
                  />
                  {editImage && (
                    <div className="relative mt-3">
                      <img src={editImage} alt="Post preview" className="w-full rounded-md max-h-[200px] object-cover" />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 h-auto"
                        onClick={() => setEditImage('')}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <div className="flex space-x-2 mt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 flex items-center"
                      onClick={() => {
                        const imageUrl = prompt("Enter image URL:");
                        if (imageUrl) setEditImage(imageUrl);
                      }}
                    >
                      <Image className="h-5 w-5 mr-2 text-blue-500" />
                      <span>Change Image</span>
                    </Button>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="ghost">
                      Cancel
                    </Button>
                    <Button 
                      type="button" 
                      onClick={handleUpdate}
                      className="bg-linkedin-blue hover:bg-linkedin-dark"
                    >
                      Save Changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Button 
                variant="outline" 
                className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={handleDelete}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete Post
              </Button>
            </>
          )}
          
          <Button 
            variant="outline" 
            className={`w-full justify-start ${isLiked ? 'text-linkedin-blue' : ''}`}
            onClick={handleLike}
          >
            <ThumbsUp className="mr-2 h-4 w-4" />
            {isLiked ? 'Unlike' : 'Like'}
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <MessageSquare className="mr-2 h-4 w-4" />
            Comment
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <Card>
      <CardHeader className="p-4 pb-0">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2">
            <Avatar>
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback className="bg-linkedin-blue text-white">{post.author.initials}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{post.author.name}</h3>
              <p className="text-xs text-gray-500">{post.author.title}</p>
              <p className="text-xs text-gray-500 flex items-center">
                {post.timestamp} • <span className="ml-1">🌐</span>
              </p>
            </div>
          </div>
          
          {/* Desktop dropdown for post actions */}
          {isAuthor && (
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Dialog>
                    <DialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit your post</DialogTitle>
                      </DialogHeader>
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="min-h-[100px]"
                      />
                      {editImage && (
                        <div className="relative mt-3">
                          <img src={editImage} alt="Post preview" className="w-full rounded-md max-h-[200px] object-cover" />
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 h-auto"
                            onClick={() => setEditImage('')}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      <div className="flex space-x-2 mt-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-600 flex items-center"
                          onClick={() => {
                            const imageUrl = prompt("Enter image URL:");
                            if (imageUrl) setEditImage(imageUrl);
                          }}
                        >
                          <Image className="h-5 w-5 mr-2 text-blue-500" />
                          <span>Change Image</span>
                        </Button>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="ghost">
                          Cancel
                        </Button>
                        <Button 
                          type="button" 
                          onClick={handleUpdate}
                          className="bg-linkedin-blue hover:bg-linkedin-dark"
                        >
                          Save Changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <DropdownMenuItem className="text-red-500 focus:text-red-500" onClick={handleDelete}>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          
          {/* Mobile sheet for post actions */}
          <PostActionsSheet />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm">{post.content}</p>
        {post.image && (
          <div className="mt-3">
            <img 
              src={post.image} 
              alt="Post" 
              className="w-full rounded-md"
            />
          </div>
        )}
        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
          <div className="flex items-center">
            <div className="flex -space-x-1">
              <div className="rounded-full bg-blue-500 p-1">
                <ThumbsUp className="h-2 w-2 text-white" />
              </div>
              <div className="rounded-full bg-red-500 p-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 text-white">
                  <path d="M16 8.414l-4.5 4.5-4.5-4.5L5.586 10 11.5 15.914 17.414 10z"></path>
                </svg>
              </div>
            </div>
            <span className="ml-2">{post.likes}</span>
          </div>
          <div>{post.comments} comments</div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="p-1">
        <div className="flex justify-between w-full">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`text-gray-600 flex-1 ${isLiked ? 'text-linkedin-blue' : ''}`}
            onClick={handleLike}
          >
            <ThumbsUp className="h-5 w-5 mr-1" />
            <span>{isLiked ? 'Liked' : 'Like'}</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600 flex-1">
            <MessageSquare className="h-5 w-5 mr-1" />
            <span>Comment</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600 flex-1">
            <Share2 className="h-5 w-5 mr-1" />
            <span>Share</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600 flex-1">
            <SendHorizonal className="h-5 w-5 mr-1" />
            <span>Send</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Feed;
