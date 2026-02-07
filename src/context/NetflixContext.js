import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const NetflixContext = createContext(null);

const LS_KEYS = {
  user: "nf_user",
  likes: "nf_likes",
  mylist: "nf_mylist",
  creds: "nf_credentials",
};

const readLS = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export function NetflixProvider({ children }) {
  const [user, setUser] = useState(() => readLS(LS_KEYS.user, null));
  const [likes, setLikes] = useState(() => readLS(LS_KEYS.likes, {})); // { [id]: true }
  const [myList, setMyList] = useState(() => readLS(LS_KEYS.mylist, {})); // { [id]: movieObj }

  useEffect(
    () => localStorage.setItem(LS_KEYS.user, JSON.stringify(user)),
    [user],
  );
  useEffect(
    () => localStorage.setItem(LS_KEYS.likes, JSON.stringify(likes)),
    [likes],
  );
  useEffect(
    () => localStorage.setItem(LS_KEYS.mylist, JSON.stringify(myList)),
    [myList],
  );

  const toggleLike = (movieId) => {
    setLikes((prev) => ({ ...prev, [movieId]: !prev[movieId] }));
  };

  const toggleMyList = (movie) => {
    setMyList((prev) => {
      const next = { ...prev };
      if (next[movie.id]) delete next[movie.id];
      else next[movie.id] = movie;
      return next;
    });
  };

  const signup = (email, password) => {
    const newUser = {
      email,
      avatar: `https://i.pravatar.cc/40?u=${encodeURIComponent(email)}`,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(LS_KEYS.creds, JSON.stringify({ email, password }));
    setUser(newUser);
  };

  const login = (email, password) => {
    const saved = readLS(LS_KEYS.creds, null);
    if (!saved)
      return { ok: false, message: "No account found. Please sign up first." };
    if (saved.email !== email || saved.password !== password)
      return { ok: false, message: "Invalid email or password." };

    setUser({
      email,
      avatar: `https://i.pravatar.cc/40?u=${encodeURIComponent(email)}`,
      lastLogin: new Date().toISOString(),
    });
    return { ok: true };
  };

  const logout = () => setUser(null);

  const value = useMemo(
    () => ({
      user,
      signup,
      login,
      logout,
      likes,
      toggleLike,
      myList,
      toggleMyList,
    }),
    [user, likes, myList],
  );

  return (
    <NetflixContext.Provider value={value}>{children}</NetflixContext.Provider>
  );
}

export const useNetflix = () => useContext(NetflixContext);
