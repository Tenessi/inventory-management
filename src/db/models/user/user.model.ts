import { Model } from 'objection';
import { UserModelFields } from 'src/common/types/models/user';
import { INVENTORY_MANAGEMENT_TABLES } from 'src/db/constants';
import { UserRole } from 'src/shared/enums/user-role.enum';

export class UserModel extends Model implements UserModelFields {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;

  static get tableName() {
    return INVENTORY_MANAGEMENT_TABLES.USERS;
  }
}
