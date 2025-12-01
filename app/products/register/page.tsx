"use client";
import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { MeasurementUnit, MessageInfo } from "@/app/types";
import { getMeasurementUnits, saveProduct } from "@/app/services/products.service";

export default function ProductRegister() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageInfo, setMessageInfo] = useState<MessageInfo>({
    type: 'info',
    message: '',
  });
  const [measurementUnits, setMeasurementUnits] = useState<MeasurementUnit[]>([]);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    description: "",
    price: 0,
    stock: 0,
    measurementUnitId: 0,
  });

  useEffect(() => {
    listMeasurementsUnits();
  }, []);

  const listMeasurementsUnits = async () => {
    const list = await getMeasurementUnits();
    if (list.length) {
        setForm({
            ...form,
            measurementUnitId: list[0].id
        });
    }
    setMeasurementUnits(list);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validateForm = () => {
    const validStock = form.stock;
    const validPrice = form.price;
    const validateMeasurement = form.measurementUnitId;
    return validPrice && validStock && validateMeasurement;
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
    const result = await saveProduct(form);
    if (!result) {
      router.replace("/products");
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
        Registrar Producto
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
        role="form"
      >
        <Grid size={{ xs: 6, md: 4 }}>
          <TextField
            label="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <TextField
            label="Sku"
            name="sku"
            value={form.sku}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <TextField
            label="Descripción"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <TextField
            label="Precio"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <TextField
            label="Stock    "
            name="stock"
            type="text"
            value={form.stock}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel
              id="measurement-unit-label"
              variant="standard"
              htmlFor="uncontrolled-native"
            >
              Unidad de Medida
            </InputLabel>
            <Select
              id="measurement-unit"
              labelId="measurement-unit-label"
              value={form.measurementUnitId}
              onChange={(e) => {
                setForm({
                  ...form,
                  measurementUnitId: e.target?.value
                });
              }}
              inputProps={{
                name: "age",
                id: "uncontrolled-native",
              }}
            >
              {
                measurementUnits.map((mu, i) => (
                    <MenuItem key={`mu-${i}`} value={mu.id}>
                        {mu.name} {`(${mu.code})`}
                    </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Registrar
        </Button>
      </Grid>
    </Box>
  );
}
