// 静态用户数据 - 用于纯前端项目的用户管理和权限控制
const staticUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123', // 在实际项目中应该加密存储
    nickname: '超级管理员',
    email: 'admin@example.com',
    role: 'admin',
    permissions: ['*'], // * 表示所有权限
    status: 'active',
    createTime: '2024-01-01',
    lastLogin: null,
  },
  {
    id: 2,
    username: 'manager',
    password: 'manager123',
    nickname: '项目经理',
    email: 'manager@example.com',
    role: 'manager',
    permissions: ['dashboard:read', 'chat:read', 'chat:write', 'ppt:read', 'ppt:write'],
    status: 'active',
    createTime: '2024-01-01',
    lastLogin: null,
  },
  {
    id: 3,
    username: 'zhengshaozhuo',
    password: '123456',
    nickname: '郑少卓',
    email: 'zhengshaozhuo@qq.com',
    role: 'user',
    permissions: ['dashboard:read', 'chat:read', 'chat:write'],
    status: 'active',
    createTime: '2024-01-01',
    lastLogin: null,
  },
  {
    id: 4,
    username: 'user2',
    password: 'user123',
    nickname: '普通用户2',
    email: 'user2@example.com',
    role: 'user',
    permissions: ['dashboard:read', 'ppt:read'],
    status: 'active',
    createTime: '2024-01-01',
    lastLogin: null,
  },
  {
    id: 5,
    username: 'viewer',
    password: 'viewer123',
    nickname: '只读用户',
    email: 'viewer@example.com',
    role: 'viewer',
    permissions: ['dashboard:read', 'chat:read', 'ppt:read'],
    status: 'active',
    createTime: '2024-01-01',
    lastLogin: null,
  },
  {
    id: 6,
    username: 'guosiyu',
    password: '123456',
    nickname: '郭思雨',
    email: 'guosiyu@qq.com',
    role: 'user',
    permissions: ['dashboard:read', 'chat:read', 'chat:write'],
    status: 'active',
    createTime: '2024-01-01',
    lastLogin: null,
  },
]

// 权限定义
const permissions = {
  // 仪表板权限
  'dashboard:read': '查看仪表板',

  // 聊天权限
  'chat:read': '查看聊天记录',
  'chat:write': '发送聊天消息',

  // PPT权限
  'ppt:read': '查看PPT',
  'ppt:write': '生成PPT',
}

// 角色权限映射
const rolePermissions = {
  admin: ['*'], // 所有权限
  manager: ['dashboard:read', 'chat:read', 'chat:write', 'ppt:read', 'ppt:write'],
  user: ['dashboard:read', 'chat:read', 'chat:write'],
  viewer: ['dashboard:read', 'chat:read', 'ppt:read'],
}

// 工具函数
function findUser(username, password) {
  const test = staticUsers.find(
    (user) => user.username === username && user.password === password && user.status === 'active',
  )
  console.log('findUser', username, password, test)
  return staticUsers.find(
    (user) => user.username === username && user.password === password && user.status === 'active',
  )
}

function getUserById(id) {
  return staticUsers.find((user) => user.id === id && user.status === 'active')
}

function findUserByUsername(username) {
  return staticUsers.find((user) => user.username === username && user.status === 'active')
}
function hasPermission(user, permission) {
  if (!user || !user.permissions) return false

  // 如果用户有*权限，表示拥有所有权限
  if (user.permissions.includes('*')) return true

  return user.permissions.includes(permission)
}

function getUserPermissions(user) {
  if (!user) return []

  if (user.permissions.includes('*')) {
    return Object.keys(permissions)
  }

  return user.permissions
}

module.exports = {
  staticUsers,
  permissions,
  rolePermissions,
  findUser,
  getUserById,
  hasPermission,
  getUserPermissions,
  findUserByUsername,
}
