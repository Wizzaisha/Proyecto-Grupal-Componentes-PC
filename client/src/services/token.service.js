
const getLocalRefreshToken = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return user?.refreshToken;
};

const getLocalAccessToken = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  console.log(user);
  return user?.accessToken;
};

const updateLocalAccessToken = (token) => {
  let user = JSON.parse(sessionStorage.getItem("user"));
  user.accessToken = token;
  sessionStorage.setItem("user", JSON.stringify(user));
};

const getUser = () => {
  return JSON.parse(sessionStorage.getItem("user"));
};

const setUser = (user) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};

const removeUser = () => {
  sessionStorage.removeItem("user");
};

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenService;
