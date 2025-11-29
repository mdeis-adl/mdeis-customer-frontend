"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Employee } from "../types";
import { getEmployees } from "../services/employees.service";

export default function EmployeeList() {
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    listEmployees();
  }, []);

  const listEmployees = async () => {
    const employees = await getEmployees();
    setEmployees(employees);
  }

  return (
    <Box>
      <Box py={2} display="flex" justifyContent="space-between">
        <h2>Lista de Empleados</h2>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            router.push("/employees/register");
          }}
        >
          Registrar Empleado
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ fontWeight: 'bold' }}>Nro</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold' }}>Identifiacion</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold' }}>Fecha de Nacimiento</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold' }}>Nro Telefono</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((row, i) => (
              <TableRow
                key={`venta-${i}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  {i + 1}
                </TableCell>
                <TableCell align="center">
                  {row.ci}
                </TableCell>
                <TableCell align="center">
                  {row.firstName + ' ' + row.lastNamePaternal + ' ' + row.lastNameMaternal}
                </TableCell>
                <TableCell align="center">
                  {row.birthDate}
                </TableCell>
                <TableCell align="center">
                  {row.email}
                </TableCell>
                <TableCell align="center">
                  {row.phoneNumber}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
