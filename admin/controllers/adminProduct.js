import Product from "../models/adModelProduct.js";
import { productServices } from "../services/adServiceProduct.js";
import { getEle } from "../util/adminUtil.js";

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
              <td>${screen}</td>
              <td>${desc}</td>
              <td>${price}</td>
              <td>${type}</td>
              <td>
               <button
                type="submit"
                class="text-white inline-flex items-center bg-amber-500 hover:bg-amber-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onclick="editProduct('${id}')">
                Edit
              </button>
              <button
                type="button"
                data-modal-toggle="crud-modal"
                class="text-white inline-flex items-center font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-500 hover:bg-red-800 mb-1"
              onclick="delProduct('${id}')"
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

const getInfo = () => {
  let id = getEle("#id").value;
  let name = getEle("#name").value;
  let price = getEle("#price").value;
  let img = getEle("#img").value;
  let type = getEle("#category").value;
  let frontCamera = getEle("#frontCamera").value;
  let backCamera = getEle("#backCamera").value;
  let desc = getEle("#description").value;
  let screen = getEle("#screen").value;
  console.log({
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type,
  });

  return new Product(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
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

const delProduct = (id) => {
  productServices
    .delProduct(id)
    .then((response) => {
      console.log("response: ", response);
      fetchProductList();
      const myModal = document.getElementById("#crud-modal");
      myModal.classList.toggle("hidden");
    })
    .catch((err) => {
      console.error("err: ", err);
    });
};
window.delProduct = delProduct;

//add Product
const addProduct = () => {
  //get infor from form
  const product = getInfo();
  console.log("product: ", product);
  productServices
    .addProduct(product)
    .then((response) => {
      console.log("response: ", response);
      fetchProductList();
    })
    .catch((err) => {
      console.error("err: ", err);
    });
};

window.addProduct = addProduct;

//reset form
const resetForm = () => {
  getEle("#id").value = "";
  getEle("#name").value = "";
  getEle("#price").value = "";
  getEle("#img").value = "";
  getEle("#category").value = "";
  getEle("#frontCamera").value = "";
  getEle("#backCamera").value = "";
  getEle("#description").value = "";
  getEle("#screen").value = "";
};
//edit Product
// getEle("#btnAdd").onclick = () => {
//   getEle("#btnUpdate").disabled = true;
// };

const editProduct = (id) => {
  productServices
    .getAdProductById(id)
    .then((response) => {
      console.log("response: ", response.data);
      const sp = response.data;
      //render to modal
      getEle("#id").value = sp.id;
      getEle("#name").value = sp.name;
      getEle("#price").value = sp.price;
      getEle("#img").value = sp.img;
      getEle("#category").value = sp.type;
      getEle("#frontCamera").value = sp.frontCamera;
      getEle("#backCamera").value = sp.backCamera;
      getEle("#description").value = sp.desc;
      getEle("#screen").value = sp.screen;
      const modal = getEle("#myModal");
      modal.classList.toggle("show");
    })
    .catch((err) => {
      console.error("err: ", err);
    });
};
window.editProduct = editProduct;

const updateProduct = () => {
  const sp = getInfo();
  productServices
    .updateProduct(sp.id, sp)
    .then((response) => {
      console.log("response: ", response);
      const modal = document.getElementById("#crud-modal");
      modal.classList.toggle("hidden");
      fetchProductList();
      resetForm();
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};
window.updateProduct = updateProduct;
