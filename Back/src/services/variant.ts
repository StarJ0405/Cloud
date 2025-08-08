import { BaseService } from "data-source";
import { Variant } from "models/variant";
import { VariantRepository } from "repositories/variant";
import { inject, injectable } from "tsyringe";
import { FindManyOptions, FindOneOptions } from "typeorm";

@injectable()
export class VariantService extends BaseService<Variant, VariantRepository> {
  constructor(@inject(VariantRepository) variantRepository: VariantRepository) {
    super(variantRepository);
  }
  async getPageable(
    pageData: PageData,
    options: FindOneOptions<Variant>
  ): Promise<Pageable<Variant>> {
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
  async getList(options?: FindManyOptions<Variant>): Promise<Variant[]> {
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
