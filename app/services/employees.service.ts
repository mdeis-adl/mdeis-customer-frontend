
import api from "../api/axiosInstance";
import { AxiosError } from "axios";
import { Employee } from "../types";

export async function getEmployees(): Promise<Employee[]> {
  const res = await api.get("/employees");
  if (!res.data?.length) return [];
  return res.data as Employee[];
}

export async function saveEmployee(
  employee: {
    firstName: string,
    lastNamePaternal: string,
    lastNameMaternal: string,
    birthDate: string
    email: string
    phoneNumber: string
    ci: string
    hireDate: string
    position: string
    baseSalary: number
  }
): Promise<string> {
  try {
    const res = await api.post("/employees", employee);
    if (res.status === 409) return 'Conflicto al crear al empleado';
    return '';
  } catch (error) {
    if (error as AxiosError) {
      if ((error as AxiosError).response?.status === 409) return 'Conflicto al crear al empleado';
    }
  }
  return '';
}