import { UniqueNameValidator } from '../../Domain/Ports/UniqueNameValidator';
import { UserModel } from '../Models/MySQL/User';

export class UniqueNameValidatorService implements UniqueNameValidator {
    async isUnique(name: string): Promise<boolean> {
      const count = await UserModel.count({ where: { name } });
      return count === 0;
    }
  }