export default `
import ProductRepository from "../repository/product.repository";

export default class ProductService {
	constructor(private readonly productRepository: ProductRepository) {}

	async create(data: any) {
		return this.productRepository.create(data);
	}

	async update(id: number, data: any) {
		return this.productRepository.update(id, data);
	}

	async delete(id: number) {
		return this.productRepository.delete(id);
	}

	async read(id: number) {
		return this.productRepository.read(id);
	}
}
`;
