import { Optional } from '@helpers/optional';
import { randomUUID } from 'crypto';

type ProductProps = {
  name: string;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

export class Product {
  private _id: string;
  private props: ProductProps;

  constructor(
    props: Optional<ProductProps, 'createdAt' | 'updatedAt'>,
    id?: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
    this._id = id ?? randomUUID();
  }

  get id() {
    return this._id;
  }
  get name() {
    return this.props.name;
  }
  get price() {
    return this.props.price;
  }
  get quantity() {
    return this.props.quantity;
  }

  set quantity(quantity: number) {
    this.props.quantity = quantity;
    this.updatedAt = new Date();
  }
  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set updatedAt(date: Date) {
    this.props.updatedAt = date;
  }
}
