export default `
import ProductRepository from "../repository/product.repository";
import ProductService from "../service/product.service";

export default class ProductFactory {
  static getInstance() {
    return new ProductService(new ProductRepository());
  }
}
`;
