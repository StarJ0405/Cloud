import { BaseService } from "data-source";
import { Option } from "models/option";
import { OptionRepository } from "repositories/option";
import { inject, injectable } from "tsyringe";
import { FindManyOptions, FindOneOptions } from "typeorm";

@injectable()
export class OptionService extends BaseService<Option, OptionRepository> {
  constructor(@inject(OptionRepository) optionRepository: OptionRepository) {
    super(optionRepository);
  }
  async getPageable(
    pageData: PageData,
    options: FindOneOptions<Option>
  ): Promise<Pageable<Option>> {
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
  async getList(options?: FindManyOptions<Option>): Promise<Option[]> {
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
