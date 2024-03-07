export type AddressUserType = {
  district: string;
  street: string;
  houseNumber: number;
  reference: string | null;
};

export type SendOrderToDelivery = {
  orderId: string;
  address: AddressUserType;
  productId: string;
  quantityProduct: number;
  userId: string;
};

export abstract class MessagerDeliveryProviderInterface {
  abstract sendOrderToDelivery(payload: SendOrderToDelivery): Promise<void>;
}
