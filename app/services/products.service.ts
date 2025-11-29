
import api from "../api/axiosInstance";
import { AxiosError } from "axios";
import { MeasurementUnit, Product } from "../types";

export async function getProducts(): Promise<Product[]> {
  const res = await api.get("/products");
  if (!res.data?.length) return [];
  return res.data as Product[];
}

export async function getMeasurementUnits(): Promise<MeasurementUnit[]> {
  const res = await api.get("/measurement-units");
  if (!res.data?.length) return [];
  return res.data as MeasurementUnit[];
}

export async function saveProduct(
  customer: {
    name: string;
    sku: string;
    description: string;
    price: number;
    stock: number;
    measurementUnitId: number;
  }
): Promise<string> {
  try {
    const res = await api.post("/products", customer);
    if (res.status === 409) return 'Conflicto al crear el producto';
    return '';
  } catch (error) {
    if (error as AxiosError) {
      if ((error as AxiosError).response?.status === 409) return 'Conflicto al crear el producto';
    }
  }
  return '';
}
