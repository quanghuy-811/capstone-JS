import Cart from "../models/modelCart.js";
import { productServices } from "../services/ServiceProduct.js";
import { getEle, updateCartBadge } from "../util/util.js";

const cartModel = new Cart();

const renderData = (arrData) => {
  let content = arrData
    .map(
      ({ id, img, name, backCamera, screen, price }) => `
    <div class="item__content">
          <div class="pt-8 pb-11 px-11">
            <img
              class="w-full"
              src="${img}"
              alt=""
            />
          </div>
          <div class="space-y-4">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              ${name}
            </h5>
            <ul
              class="grid grid-cols-2 gap-3 border-t border-gray-200  pt-3"
            >
              <li class="flex items-center gap-2 mt-2">
                <i
                  class="fa-solid fa-camera shrink-0 text-gray-500  text-xs"
                ></i>
                <p
                  class="text-xs font-medium text-gray-500  truncate"
                >
                  ${backCamera}
                </p>
              </li>
              <li class="flex items-center gap-2 mt-2">
                <i
                  class="fa-solid fa-mobile-screen shrink-0 text-gray-500  text-sm"
                ></i>
                <p
                  class="text-xs font-medium text-gray-500  truncate"
                >
                  ${screen}
                </p>
              </li>
            </ul>
            <div class="flex items-center justify-between pt-2">
              <div class="space-y-1">
                <p class="text-sm text-gray-500 ">Price</p>
                <span class="text-2xl font-bold text-gray-900 ">
                  ${price}
                </span>
              </div>
              <button
                onclick="addToCart('${id}')"
                class="btn inline-flex items-center gap-2 border border-gray-300 hover:bg-gray-100 hover:text-black hover:shadow-xl transition-all duration-500">
                <i class="fa-solid fa-cart-shopping"></i>
                Buy Now
              </button>
            </div>
          </div>
        </div>
    `
    )
    .join("");

  getEle("#content").innerHTML = content;
};

const getData = () => {
  productServices
    .getProduct()
    .then((response) => {
      renderData(response.data);
    })
    .catch((err) => {});
};

getData();

updateCartBadge(cartModel.totalQuantity());

const addToCart = (id) => {
  productServices
    .getProductById(id)
    .then((response) => {
      cartModel.addProduct(response.data);

      updateCartBadge(cartModel.totalQuantity());
    })
    .catch((err) => {});
  //
};

window.addToCart = addToCart;

// Search
getEle("#search").onclick = () => {
  let value = getEle("#selectType").value.toLowerCase();

  productServices
    .getProduct()
    .then((response) => {
      const filterProduct = response.data.filter(
        (item) => item.type.toLowerCase() === value
      );

      if (filterProduct.length > 0) {
        renderData(filterProduct);
      } else {
        renderData(response.data);
      }
    })
    .catch((err) => {});
};
