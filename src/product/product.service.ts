import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "./product.entity";
import {Repository} from "typeorm";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>
    ) {
    }

    async all(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async queryBuilder(alias: string) {
        return this.productRepository.createQueryBuilder(alias);
    }
}
