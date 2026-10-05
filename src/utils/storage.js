const STORAGE_KEYS = {
  users: "expense-manager-users",
  currentUser: "expense-manager-current-user",
  categories: "expense-manager-categories",
  transactions: "expense-manager-transactions",
  wallets: "expense-manager-wallets",
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
  setCategories: (categories) => {
    localStorage.setItem(STORAGE_KEYS.categories, JSON.stringify(categories));
  },
  getCategories: () => {
    const categories = localStorage.getItem(STORAGE_KEYS.categories);
    return categories ? JSON.parse(categories) : [];
  },
  setTransactions: (transactions) => {
    localStorage.setItem(
      STORAGE_KEYS.transactions,
      JSON.stringify(transactions),
    );
  },
  getTransactions: () => {
    const transactions = localStorage.getItem(STORAGE_KEYS.transactions);
    return transactions ? JSON.parse(transactions) : [];
  },
  setWallets: (wallets) => {
    localStorage.setItem(STORAGE_KEYS.wallets, JSON.stringify(wallets));
  },
  getWallets: () => {
    const wallets = localStorage.getItem(STORAGE_KEYS.wallets);
    return wallets ? JSON.parse(wallets) : [];
  },
};
