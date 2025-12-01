
export interface Employee {
  id: number;
  firstName: string;
  lastNamePaternal: string;
  lastNameMaternal?: string;
  birthDate?: string;
  email: string;
  phoneNumber?: string;
  ci: string;
  hireDate: string;
  position: string;
  baseSalary?: number;
  createdAt: Date;
  updatedAt: Date;
}

type MessageType = 'error' | 'info' | 'success' | 'warning';

export interface MessageInfo {
  type: MessageType;
  message: string;
}

export interface Customer {
  id: number;
  firstName: string;
  lastNamePaternal: string;
  lastNameMaternal: string | null;
  birthDate: string | null;
  email: string;
  phoneNumber: string | null;
  ci: string;
  addressLine: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface MeasurementUnit {
  id: number;
  code: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  description: string;
  price: number;
  stock: number;
  measurementUnit: MeasurementUnit;
  createdAt: string;
  updatedAt: string;
}
