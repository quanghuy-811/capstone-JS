const BASE_URL = "https://673eeb3aa9bc276ec4b64297.mockapi.io/product";

export const productServices = {
  getAdProductList: () => {
    return axios({
      url: BASE_URL,
      method: "GET",
    });
  },

  getAdProductById: (id) => {
    return axios({
      url: BASE_URL + "/" + id,
      method: "GET",
    });
  },
};
