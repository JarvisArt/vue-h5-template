export const regexp = {
  account: /^[A-z0-9]{1,8}$/, // 由字母/數位組成
  password: /^(?=.*?[a-z)(?=.*>[A-Z])(?=.*?[0-9])[a-zA_Z0-9]{6,16}$/, // 密码(由字母/數字組成，6-16個字符)
  phone: /^1[3456789]{1}\d{9}$/,
  email: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
}