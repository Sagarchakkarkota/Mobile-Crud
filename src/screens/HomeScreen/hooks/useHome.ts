import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPost } from '../home.types';

const STORAGE_KEY = 'posts';

const useHome = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editPost, setEditPost] = useState<IPost | null>(null);

  // Load posts from AsyncStorage
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const savedPosts = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
      }
    } catch (error) {
      console.log('Load posts error:', error);
    }
  };

  const saveToStorage = async (data: IPost[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.log('Save posts error:', error);
    }
  };

  const handleEdit = (post: IPost) => {
    setEditPost(post);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    setPosts(prev => {
      const updated = prev.filter(post => post.id !== id);
      saveToStorage(updated);
      return updated;
    });
  };

  const handleSave = (post: IPost) => {
    if (editPost) {
      setPosts(prev => {
        const updated = prev.map(p => (p.id === post.id ? post : p));
        saveToStorage(updated);
        return updated;
      });
      setEditPost(null);
    } else {
      setPosts(prev => {
        const updated = [post, ...prev];
        saveToStorage(updated);
        return updated;
      });
    }

    setIsOpen(false);
  };

  const openCreateModal = () => {
    setEditPost(null);
    setIsOpen(true);
  };

  return {
    states: {
      posts,
      isOpen,
      editPost,
      setIsOpen,
    },
    functions: {
      openCreateModal,
      handleEdit,
      handleDelete,
      handleSave,
    },
  };
};

export default useHome;
