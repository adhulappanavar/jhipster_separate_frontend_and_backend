import { ICustomer } from 'app/shared/model/customer.model';
import { AddressType } from 'app/shared/model/enumerations/address-type.model';

export interface IAddress {
  id?: number;
  line1?: string;
  line2?: string;
  line3?: string;
  city?: string;
  county?: string;
  countryCode?: string;
  state?: string;
  postCode?: string;
  addressType?: AddressType;
  customer?: ICustomer;
}

export const defaultValue: Readonly<IAddress> = {};
