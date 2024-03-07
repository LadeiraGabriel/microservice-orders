import { randomUUID } from 'crypto';
import { Optional } from 'src/helpers/optional';

type StatusDelivery = 'finish' | 'on the way';

type OrderProps = {
  userId: string;
  productId: string;
  addressId: string;
  quantity: number;
  totalPrice: number;
  createdAt: Date;
  updateAt: Date;
  status: StatusDelivery | null;
};

export class Order {
  private _id: string;
  private props: OrderProps;

  constructor(
    props: Optional<OrderProps, 'createdAt' | 'status' | 'updateAt'>,
    id?: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updateAt: props.updateAt ?? new Date(),
      status: props.status ?? null,
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

  get status(): StatusDelivery | null {
    return this.props.status;
  }
  set status(status: StatusDelivery) {
    this.props.status = status;
  }
}
