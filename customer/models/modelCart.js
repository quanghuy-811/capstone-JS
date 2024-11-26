import CarItem from "./modelCartItem.js";

export default class Cart {
  constructor() {
    // vì khi chuyển từ home => cart class Cart sẽ được khỏi tạo lại
    this.arrCart = JSON.parse(localStorage.getItem("ProductCart")) || [];
  }

  saveCart() {
    localStorage.setItem("ProductCart", JSON.stringify(this.arrCart));
  }

  getCart() {
    return this.arrCart;
  }

  // tổng tiền
  tinhTong() {
    let totalAmount = this.arrCart.reduce((total, item) => {
      return (total += item.price * item.quanlity);
    }, 0);

    return totalAmount;
  }

  // thêm sp vào giỏ
  addProduct(newProduct) {
    let findIndex = this.arrCart.findIndex((item) => {
      return item.id === newProduct.id;
    });

    if (findIndex === -1) {
      const { id, name, price, img } = newProduct;
      let newItem = new CarItem(id, name, price, img, 1);
      this.arrCart.push(newItem);
    } else {
      this.arrCart[findIndex].quanlity += 1;
    }

    this.saveCart();
  }
  //Xóa sp trong giở
  delProduct(id) {
    let indexDel = this.arrCart.findIndex((item) => {
      return item.id === id;
    });

    this.arrCart.splice(indexDel, 1);
    this.saveCart();
  }

  // clear giỏ
  clearCart() {
    this.arrCart = []; // Xóa toàn bộ sản phẩm trong giỏ hàng
    localStorage.removeItem("ProductCart"); // Xóa dữ liệu giỏ hàng khỏi Local Storage
  }
}
