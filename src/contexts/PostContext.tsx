
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    title: string;
    avatar?: string;
    initials: string;
  };
  content: string;
  timestamp: string;
  image?: string;
  likes: number;
  comments: number;
  likedBy: string[];
}

interface PostContextType {
  posts: Post[];
  addPost: (content: string, image?: string) => void;
  updatePost: (id: string, content: string, image?: string) => void;
  deletePost: (id: string) => void;
  likePost: (id: string) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePost must be used within a PostProvider');
  }
  return context;
};

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);

  // Load posts from localStorage on init
  useEffect(() => {
    const savedPosts = localStorage.getItem('linkedinPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Initial sample posts
      setPosts([
        {
          id: '1',
          author: {
            id: 'user-1',
            name: "Jane Smith",
            title: "Product Manager at Tech Innovations Inc.",
            initials: "JS"
          },
          content: "Excited to announce that we just launched our new product feature! After months of hard work, our team has delivered something truly revolutionary. #ProductLaunch #Innovation",
          timestamp: "1d",
          image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop&q=60",
          likes: 324,
          comments: 52,
          likedBy: []
        },
        {
          id: '2',
          author: {
            id: 'user-2',
            name: "Alex Johnson",
            title: "Software Engineer at StartupXYZ",
            initials: "AJ"
          },
          content: "Just fixed that pesky bug that's been bothering users for weeks. Small changes can make a big difference in user experience! #DeveloperLife #Coding",
          timestamp: "3d",
          likes: 87,
          comments: 12,
          likedBy: []
        },
        {
          id: '3',
          author: {
            id: 'user-3',
            name: "Michael Brown",
            title: "Marketing Director at Global Brands",
            initials: "MB"
          },
          content: "Our latest marketing campaign has exceeded all expectations. Proud of the team for their creativity and hard work! Looking forward to the next challenge.",
          timestamp: "5d",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60",
          likes: 211,
          comments: 34,
          likedBy: []
        }
      ]);
    }
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('linkedinPosts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (content: string, image?: string) => {
    if (!user) return;
    
    const newPost: Post = {
      id: Date.now().toString(),
      author: {
        id: user.id,
        name: user.name,
        title: user.title,
        avatar: user.avatar,
        initials: user.initials
      },
      content,
      timestamp: 'Just now',
      image,
      likes: 0,
      comments: 0,
      likedBy: []
    };

    setPosts([newPost, ...posts]);
  };

  const updatePost = (id: string, content: string, image?: string) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, content, image: image || post.image } : post
    ));
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const likePost = (id: string) => {
    if (!user) return;
    
    setPosts(posts.map(post => {
      if (post.id === id) {
        const alreadyLiked = post.likedBy.includes(user.id);
        if (alreadyLiked) {
          return {
            ...post,
            likes: post.likes - 1,
            likedBy: post.likedBy.filter(userId => userId !== user.id)
          };
        } else {
          return {
            ...post,
            likes: post.likes + 1,
            likedBy: [...post.likedBy, user.id]
          };
        }
      }
      return post;
    }));
  };

  return (
    <PostContext.Provider value={{ posts, addPost, updatePost, deletePost, likePost }}>
      {children}
    </PostContext.Provider>
  );
};
