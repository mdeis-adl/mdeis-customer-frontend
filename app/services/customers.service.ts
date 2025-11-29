
import api from "../api/axiosInstance";
import { AxiosError } from "axios";
import { Customer } from "../types";

export async function getCustomers(): Promise<Customer[]> {
  const res = await api.get("/customers");
  if (!res.data?.length) return [];
  return res.data as Customer[];
}

export async function saveCustomer(
  customer: {
    firstName: string,
    lastNamePaternal: string,
    lastNameMaternal: string,
    birthDate: string,
    email: string,
    phoneNumber: string,
    ci: string,
    addressLine: string,
    city: string,
    state: string,
    postalCode: string,
  }
): Promise<string> {
  try {
    const res = await api.post("/customers", customer);
    if (res.status === 409) return 'Conflicto al crear el cliente';
    return '';
  } catch (error) {
    if (error as AxiosError) {
      if ((error as AxiosError).response?.status === 409) return 'Conflicto al crear el cliente';
    }
  }
  return '';
}
