import { BaseService } from "data-source";
import { User } from "models/user";
import { UserRepository } from "repositories/user";
import { inject, injectable } from "tsyringe";
import { DeepPartial } from "typeorm";
import { comparePasswords, hashPassword } from "utils/functions";

@injectable()
export class UserService extends BaseService<User, UserRepository> {
  constructor(@inject(UserRepository) userRepository: UserRepository) {
    super(userRepository);
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
