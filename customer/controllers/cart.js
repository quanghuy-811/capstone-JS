import Cart from "../models/modelCart.js";
import { getEle } from "../util/util.js";
const cartModel = new Cart();

const sum = () => {
  getEle("#total").innerHTML = `$${cartModel.tinhTong()}`;
  getEle("#original-price").innerHTML = `$${cartModel.tinhTong()}`;
};

const renderCart = (arrCart) => {
  let content = arrCart
    .map(
      ({ id, name, price, img, quanlity }) => `
      <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
              
      <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                  <a href="#" class="w-24 shrink-0 md:order-1">
                    <img
                      class="h-24 w-24"
                      src="${img}"
                      alt="imac image"
                    />
                  </a>

                  <label for="counter-input" class="sr-only"
                    >Choose quantity:</label
                  >
                  <div
                    class="flex items-center justify-between md:order-3 md:justify-end"
                  >
                    <div class="flex items-center">
                      <button
                      onclick="updateQuatity('${id}', ${-1})"
                      
                        type="button"
                        class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200"
                      >
                        <svg
                          class="h-2.5 w-2.5 text-gray-900"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <input
                        disabled
                        type="text"
                        id="counter-input-5"
                        class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                        placeholder=""
                        value="${quanlity}"
                      />
                      <button
                        onclick="updateQuatity('${id}', ${1})"
                        type="button"
                        class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200"
                      >
                        <svg
                          class="h-2.5 w-2.5 text-gray-900 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                    <div class="text-end md:order-4 md:w-32">
                      <p
                        class="text-base font-bold text-gray-900 dark:text-white"
                      >
                        $${price}
                      </p>
                    </div>
                  </div>

                  <div
                    class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md"
                  >
                    <a
                      href="#"
                      class="text-base font-medium text-gray-900 hover:underline dark:text-white"
                      >${name}</a
                    >

                    <div>
                      <button
                       onclick="deleteProduct('${id}')"
                        type="button"
                        class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                      >
                        <i class="fa fa-trash-alt mr-3"></i>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  `
    )
    .join();
  if (content) {
    getEle("#cart-content").innerHTML = content;
  } else {
    getEle(
      "#cart-content"
    ).innerHTML = `<div class="text-lg font-normal  text-gray-500">Cart is empty</div>`;
  }

  sum();
};

renderCart(cartModel.arrCart);

// Xóa ProductCart
const deleteProduct = (id) => {
  cartModel.delProduct(id);
  renderCart(cartModel.getCart());
};

window.deleteProduct = deleteProduct;

// Tăng giảm số lượng sp
const updateQuatity = (id, quanlity) => {
  const sp = cartModel.getCart().find((item) => item.id === id);

  if (sp) {
    sp.quanlity += quanlity;
    if (sp.quanlity === 0) {
      if (window.confirm("Bạn muốn xóa không?")) {
        cartModel.delProduct(id);
      } else {
        sp.quanlity = 1;
      }
    }
    renderCart(cartModel.arrCart);
    cartModel.saveCart();
  }
};
window.updateQuatity = updateQuatity;

// /Thanh toán'

document.querySelector("#pay").onclick = () => {
  if (cartModel.getCart().length === 0) {
    alert("Your shopping cart is empty");
  } else {
    cartModel.clearCart();
    renderCart(cartModel.getCart());
    alert("Thank You");
  }
};
