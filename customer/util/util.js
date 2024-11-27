export const getEle = (selector) => {
  return document.querySelector(selector);
};
export const updateCartBadge = (total) => {
  getEle("#cartBadge").textContent = total;
};
