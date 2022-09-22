const getLogin = async () => {
  return await fetch("https://dev-api.mstars.mn/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const userService = {
  getLogin,
};
