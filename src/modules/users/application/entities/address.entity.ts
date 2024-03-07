import { randomUUID } from 'crypto';

type AddressProps = {
  district: string;
  street: string;
  number: number;
  reference: string | null;
  userId: string;
};

export class Address {
  private _id: string;
  private props: AddressProps;

  constructor(props: AddressProps, id?: string) {
    this.props = props;
    this._id = id ?? randomUUID();
  }

  get id() {
    return this._id;
  }
  get district() {
    return this.props.district;
  }
  get street() {
    return this.props.street;
  }
  get number() {
    return this.props.number;
  }

  get reference(): string | null {
    return this.props.reference;
  }

  get userId(): string {
    return this.props.userId;
  }
}
