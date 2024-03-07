import { randomUUID } from 'crypto';
import { Optional } from 'src/helpers/optional';

export type RoleType = 'CUSTOMER' | 'DELIVERYMAN' | 'ADMIN' | 'ALL';

type UserProps = {
  name: string;
  email: string;
  password: string;
  role: RoleType;
};

export class User {
  private _id: string;
  private props: UserProps;

  constructor(props: Optional<UserProps, 'role'>, id?: string) {
    this.props = { ...props, role: props.role ?? 'CUSTOMER' };
    this._id = id ?? randomUUID();
  }

  get id() {
    return this._id;
  }
  get name() {
    return this.props.name;
  }
  get email() {
    return this.props.email;
  }
  get password() {
    return this.props.password;
  }
  get role() {
    return this.props.role;
  }
}
