const BASE_URL = "https://673eeb3aa9bc276ec4b64297.mockapi.io/product";

export const productServices = {
  //get list product
  getAdProductList: () => {
    return axios({
      url: BASE_URL,
      method: "GET",
    });
  },
  //delete product
  delProduct: (id) => {
    return axios({
      url: BASE_URL + "/" + id,
      method: "DELETE",
    });
  },
  //get product by ID
  getAdProductById: (id) => {
    return axios({
      url: BASE_URL + "/" + id,
      method: "GET",
    });
  },
  //add product
  addProduct: (product) => {
    return axios({
      url: BASE_URL,
      method: "POST",
      data: product,
    });
  },
  updateProduct: (id, product) => {
    return axios({
      url: BASE_URL + "/" + id,
      method: "Put",
      data: product,
    });
  },
};
