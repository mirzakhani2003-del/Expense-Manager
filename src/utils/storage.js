const STORAGE_KEYS = {
  users: "expense-manager-users",
  currentUser: "expense-manager-current-user",
};

export const storage = {
  setUsers: (users) => {
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
  },
  getUsers: () => {
    const users = localStorage.getItem(STORAGE_KEYS.users);
    return users ? JSON.parse(users) : [];
  },
  setCurrentUser: (user) => {
    localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
  },
  getCurrentUser: () => {
    const user = localStorage.getItem(STORAGE_KEYS.currentUser);
    return user ? JSON.parse(user) : null;
  },
  removeCurrentUser: () => {
    localStorage.removeItem(STORAGE_KEYS.currentUser);
  },
};
