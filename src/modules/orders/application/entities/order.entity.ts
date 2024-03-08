import { Optional } from '@helpers/optional';
import { randomUUID } from 'crypto';

export type Status = 'finish' | 'onTheWay' | 'inPreparation';

type OrderProps = {
  userId: string;
  productId: string;
  addressId: string;
  quantity: number;
  totalPrice: number;
  createdAt: Date;
  updateAt: Date;
  status: Status;
};

export class Order {
  private _id: string;
  private props: OrderProps;

  constructor(
    props: Optional<OrderProps, 'status' | 'createdAt' | 'updateAt'>,
    id?: string,
  ) {
    this.props = {
      ...props,
      status: props.status ?? 'inPreparation',
      createdAt: props.createdAt ?? new Date(),
      updateAt: props.updateAt ?? new Date(),
    };
    this._id = id ?? randomUUID();
  }

  get id() {
    return this._id;
  }

  get userId() {
    return this.props.userId;
  }
  get productId() {
    return this.props.productId;
  }

  get quantity() {
    return this.props.quantity;
  }
  get totalPrice() {
    return this.props.totalPrice;
  }
  get addressId() {
    return this.props.addressId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updateAt() {
    return this.props.updateAt;
  }
  set updateAt(updateAt: Date) {
    this.props.updateAt = updateAt;
  }

  get status(): Status {
    return this.props.status;
  }
  set status(status: Status) {
    this.props.status = status;
  }
}
