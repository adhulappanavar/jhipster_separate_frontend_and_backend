import { Moment } from 'moment';
import { IAddress } from 'app/shared/model/address.model';
import { KYCStatus } from 'app/shared/model/enumerations/kyc-status.model';

export interface ICustomer {
  id?: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  legalName?: string;
  title?: string;
  suffix?: string;
  customerNumber?: string;
  mobilePhone?: string;
  email?: string;
  dateOfBirth?: string;
  relationshipStatus?: string;
  employmentStatus?: string;
  kycStatus?: KYCStatus;
  addresses?: IAddress[];
}

export const defaultValue: Readonly<ICustomer> = {};
