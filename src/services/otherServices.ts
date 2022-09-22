const getAllAddress = async () => {
  return await fetch("address.json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const foodServices = {
  getAllAddress,
};
