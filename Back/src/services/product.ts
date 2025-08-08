import { BaseService } from "data-source";
import { Product } from "models/product";
import { ProductRepository } from "repositories/product";
import { inject, injectable } from "tsyringe";
import { FindManyOptions, FindOneOptions } from "typeorm";

@injectable()
export class ProductService extends BaseService<Product, ProductRepository> {
  constructor(@inject(ProductRepository) productRepository: ProductRepository) {
    super(productRepository);
  }
  async getPageable(
    pageData: PageData,
    options: FindOneOptions<Product>
  ): Promise<Pageable<Product>> {
    if (options) {
      let where: any = options.where;
      if (where.q) {
        const q = where.q;
        delete where.q;
        where = this.Search(where, ["title", "id"], q);
        options.where = where;
      }
      if (!options?.order) {
        options.order = {
          created_at: "DESC",
        };
      }
    }
    return super.getPageable(pageData, options);
  }
  async getList(options?: FindManyOptions<Product>): Promise<Product[]> {
    if (options) {
      let where: any = options.where;
      if (where.q) {
        const q = where.q;
        delete where.q;
        where = this.Search(where, ["title", "id"], q);
        options.where = where;
      }
      if (!options?.order) {
        options.order = {
          created_at: "DESC",
        };
      }
    }
    return super.getList(options);
  }
}
