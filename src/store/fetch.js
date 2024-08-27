import { create } from 'zustand';

const fetchStore = (set) => (
  {
    posts: [1, 2, 3, 4],
    setPosts: async () => {
      const responseData = await fetch('/posts.json').then((responce) => responce.json());
      set(() => ({ posts: responseData }));
    },
    blogs: [],
    setBlogs: async () => {
      const responseData = await fetch('/blogs.json').then((responce) => responce.json());
      set(() => ({ blogs: responseData }));
    },
    topics: [],
    setTopics: async () => {
      const responseData = await fetch('/topics.json').then((responce) => responce.json());
      set(() => ({ topics: responseData }));
    },
    newUser: [],
    setNewUser: async (name, email, password) => {
      const responseData = await fetch('/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const responseUser = responseData.status === 400 ? await responseData.json() : '';
      set(() => ({ newUser: { status: responseData.status, message: responseUser.message } }));
      return responseData;
    },
    login: [],
    setLogin: async (email, password) => {
      const responseData = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ email, password }),
      });
      const responseUser = responseData.status === 400 ? await responseData.json() : '';
      set(() => ({ login: { status: responseData.status, message: responseUser.message } }));
      return responseData;
    },

  });
const useFetchStore = create(fetchStore);
export default useFetchStore;
