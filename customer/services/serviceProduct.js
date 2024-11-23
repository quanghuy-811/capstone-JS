const BASE_URL = "https://673eeb3aa9bc276ec4b64297.mockapi.io/product";

export const productServices = {
  getProduct: () => {
    return axios({
      url: BASE_URL,
      method: "GET",
    });
  },
  // deleteProduct: (id) => {
  //   return axios({
  //     url: BASE_URL + "/" + id,
  //     method: "DELETE",
  //   });
  // },
  // createProduct: (product) => {
  //   return axios({
  //     url: BASE_URL,
  //     method: "POST",
  //     data: product,
  //   });
  // },

  // getProductById: (id) => {
  //   return axios({
  //     url: BASE_URL + "/" + id,
  //     method: "GET",
  //   });
  // },

  // updateProduct: (id, data) => {
  //   return axios({
  //     url: BASE_URL + "/" + id,
  //     method: "PUT",
  //     data,
  //   });
  // },
};
