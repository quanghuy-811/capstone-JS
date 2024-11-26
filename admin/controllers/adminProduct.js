import { productServices } from "../services/adServiceProduct.js";

const renderProdcutList = (arrProduct) => {
  console.log("arrProduct: ", arrProduct);
  let content = "";
  for (let index = 0; index < arrProduct.length; index++) {
    let product = arrProduct[index];
    const {
      id,
      name,
      price,
      screen,
      backCamera,
      frontCamera,
      img,
      desc,
      type,
    } = product;
    let contentTr = `
     <tr>
              <td>${id}</td>
              <td>${name}</td>
              <td>
              <img
              class="w-16 h-16"
              src="${img}"
              alt=""
            />
              </td>
              <td>${frontCamera}</td>
              <td>${backCamera}</td>
              <td>${desc}</td>
              <td>${price}</td>
              <td>${type}</td>
              <td>
               <button
                type="submit"
                class="text-white inline-flex items-center bg-amber-500 hover:bg-amber-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onclick"editProduct('${id}')">
                Edit
              </button>
              <button
                type="button"
                data-modal-toggle="crud-modal"
                class="text-white inline-flex items-center font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-500 hover:bg-red-800 mb-1"
              onclick"delProduct('${id}')"
                > 
                Delete
              </button>
              </td>
        </tr>
    `;
    content += contentTr;
    document.querySelector("#tblProductList").innerHTML = content;
  }
};

const fetchProductList = () => {
  productServices
    .getAdProductList()
    .then((response) => {
      console.log("response: ", response);
      renderProdcutList(response.data);
    })
    .catch((err) => {
      console.error("err: ", err);
    });
};
fetchProductList();
