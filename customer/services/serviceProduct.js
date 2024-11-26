const BASE_URL = "https://673eeb3aa9bc276ec4b64297.mockapi.io/product";

export const productServices = {
  getProduct: () => {
    return axios({
      url: BASE_URL,
      method: "GET",
    });
  },

  getProductById: (id) => {
    return axios({
      url: BASE_URL + "/" + id,
      method: "GET",
    });
  },
};
