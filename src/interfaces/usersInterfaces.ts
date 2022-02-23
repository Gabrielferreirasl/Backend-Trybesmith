interface Login {
  username: string,
  password: string,
  id?: number,
}

interface User extends Login {
  classe: string,
  level: number,
}

export {
  User,
  Login,
};

export default User;