import { BaseService } from "data-source";
import { User } from "models/user";
import { UserRepository } from "repositories/user";
import { inject, injectable } from "tsyringe";
import { DeepPartial, FindManyOptions, FindOneOptions } from "typeorm";
import { comparePasswords, hashPassword } from "utils/functions";

@injectable()
export class UserService extends BaseService<User, UserRepository> {
  constructor(@inject(UserRepository) userRepository: UserRepository) {
    super(userRepository);
  }
  async getPageable(pageData: PageData, options: FindOneOptions<User>): Promise<Pageable<User>> {
    if (options) {
      let where: any = options.where;
      if (where.q) {
        const q = where.q;
        delete where.q;
        where = this.Search(where, ["username", "id", 'name', 'nickname'], q);
        options.where = where;
      }
      if (!options?.order) {
        options.order = {
          created_at: "DESC",
        };
      }
    }
    return super.getPageable(pageData, options)
  }
  async getList(options?: FindManyOptions<User> | undefined): Promise<User[]> {
     if (options) {
      let where: any = options.where;
      if (where.q) {
        const q = where.q;
        delete where.q;
        where = this.Search(where, ["username", "id", 'name', 'nickname'], q);
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
  async getByPhone(phone: string): Promise<User | null> {
    const find = await this.repository.findOne({ where: { phone } });
    return find;
  }
  async auth(username: string, password: string): Promise<User | null> {
    const find = await this.repository.findOne({ where: { username } });

    return find &&
      find.password_hash &&
      (await comparePasswords(password, find.password_hash))
      ? find
      : null;
  }

  async create(data: DeepPartial<User & { password?: string }>): Promise<User> {
    if (data?.password) {
      data.password_hash = await hashPassword(data.password);
      delete data.password;
    }
    return super.create(data as DeepPartial<User>);
  }
}
