interface AdminUser {
  id: string;
  username: string;
  password: string;
  role: 'admin';
}

export const adminUser: AdminUser = {
  id: 'admin-1',
  username: 'admin',
  password: 'your_secure_password_here',
  role: 'admin',
};

export function verifyUser(username: string, password: string): AdminUser | null {
  if (username === adminUser.username && password === adminUser.password) {
    return adminUser;
  }
  return null;
}
