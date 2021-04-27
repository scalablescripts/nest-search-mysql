import {Controller, Get, Req} from '@nestjs/common';
import {ProductService} from "./product.service";
import {Request} from "express";

@Controller('api/products')
export class ProductController {

    constructor(private productService: ProductService) {
    }

    @Get('frontend')
    async frontend() {
        return this.productService.all();
    }

    @Get('backend')
    async backend(@Req() req: Request) {
        const builder = await this.productService.queryBuilder('products');

        if (req.query.s) {
            builder.where("products.title LIKE :s OR products.description LIKE :s", {s: `%${req.query.s}%`})
        }

        const sort: any = req.query.sort;

        if (sort) {
            builder.orderBy('products.price', sort.toUpperCase());
        }

        const page: number = parseInt(req.query.page as any) || 1;
        const perPage = 9;
        const total = await builder.getCount();

        builder.offset((page - 1) * perPage).limit(perPage);

        return {
            data: await builder.getMany(),
            total,
            page,
            last_page: Math.ceil(total / perPage)
        };
    }
}
