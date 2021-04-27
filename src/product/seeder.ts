import {seeder} from "nestjs-seeder";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "./product.entity";
import {ProductSeeder} from "./product.seeder";


seeder({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'rootroot',
            database: 'nest_search',
            entities: [Product],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([Product])
    ]
}).run([ProductSeeder])
