"use client";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MessageInfo } from "@/app/types";
import { saveCustomer } from "@/app/services/customers.service";

export default function CustomerRegister() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageInfo, setMessageInfo] = useState<MessageInfo>({
    type: 'info',
    message: '',
  });

  const [form, setForm] = useState({
    firstName: "",
    lastNamePaternal: "",
    lastNameMaternal: "",
    birthDate: "2025-01-01",
    email: "",
    phoneNumber: "",
    ci: "",
    addressLine: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validateForm = () => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(form.email);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessageInfo({
        type: 'info',
        message: '',
    });
    if (!validateForm()) {
        setMessageInfo({
            type: 'error',
            message: 'Debes completar el formulario.'
        });
        return;
    }
    const result = await saveCustomer(form);
    if (!result) {
      router.replace("/customers");
    } else {
      setMessageInfo({
        type: 'error',
        message: result
      });
    }
  };

  if (isLoading) return <CircularProgress />;

  return (
    <Box
      bgcolor="#f5f5f5"
      // bgcolor="#eef2f6"
      // display="flex"
      // justifyContent="center"
      // alignItems="center"
      height="100vh"
    >
      <Typography variant="h4" align="center">
        Registrar Cliente
      </Typography>
      {
        messageInfo.message &&
        <Box display="flex" justifyContent="center">
            <Box width="70vw">
                <Alert severity={messageInfo.type}>{messageInfo.message}</Alert>
            </Box>
        </Box>
      }
      <Grid
        width="70vw"
        component="form"
        onSubmit={handleSubmit}
        sx={{
          // display: "flex",
          // flexDirection: "column",
          // gap: 2,
          // width: "300px",
          margin: "20px auto",
        }}
        mt={2}
        container
        spacing={2}
      >
        <Grid size={{ xs: 6, md: 4 }}>
          <TextField
            label="Nombre"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <TextField
            label="Apellido Paterno"
            name="lastNamePaternal"
            value={form.lastNamePaternal}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <TextField
            label="Apellido Materno"
            name="lastNameMaternal"
            value={form.lastNameMaternal}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Fecha de cumplueaños"
                defaultValue={dayjs(form.birthDate)}
                onChange={(value) => {
                    setForm({
                        ...form,
                        birthDate: value?.toString() ?? ''
                    });
                }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <TextField
            label="Nro Telefono"
            name="phoneNumber"
            type="number"
            value={form.phoneNumber}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <TextField
            label="CI"
            name="ci"
            type="number"
            value={form.ci}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <TextField
            label="Dirrección"
            name="addressLine"
            type="text"
            value={form.addressLine}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <TextField
            label="Ciudad"
            name="city"
            type="text"
            value={form.city}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <TextField
            label="Departamento"
            name="state"
            type="text"
            value={form.state}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <TextField
            label="Código Postal"
            name="postalCode"
            type="number"
            value={form.postalCode}
            onChange={handleChange}
            required
          />
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Registrar
        </Button>
      </Grid>
    </Box>
  );
}
