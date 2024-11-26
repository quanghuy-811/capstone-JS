export default class Product {
  constructor(
    id,
    name,
    price,
    screen,
    backCamera,
    fontCamera,
    img,
    desc,
    type
  ) {
    (this.id = id),
      (this.name = name),
      (this.price = price),
      (this.screen = screen),
      (this.backCamera = backCamera),
      (this.fontCamera = fontCamera),
      (this.img = img),
      (this.desc = desc),
      (this.type = type);
  }
}
