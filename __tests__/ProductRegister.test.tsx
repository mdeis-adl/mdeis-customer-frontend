import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductRegister from "@/app/products/register/page";
import { getMeasurementUnits, saveProduct } from "@/app/services/products.service";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: jest.fn() }),
}));

jest.mock("@/app/services/products.service", () => ({
  getMeasurementUnits: jest.fn(),
  saveProduct: jest.fn()
}));

describe("ProductRegister Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Carga el formulario y lista unidades de medida", async () => {

    (getMeasurementUnits as jest.Mock).mockResolvedValue([
      { id: 1, code: "KG", name: "Kilogramo" },
      { id: 2, code: "LT", name: "Litro" },
    ]);
    (saveProduct as jest.Mock).mockResolvedValue(null);

    render(<ProductRegister />);

    expect(await screen.findByText("Kilogramo (KG)")).toBeInTheDocument();

    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sku/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descripción/i)).toBeInTheDocument();
  });

  test("Muestra error si el formulario está incompleto", async () => {
    render(<ProductRegister />);

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    expect(await screen.findByText("Debes completar el formulario."))
      .toBeInTheDocument();
  });

  test("Envia el formulario correctamente", async () => {
    render(<ProductRegister />);

    await screen.findByText("Kilogramo (KG)");

    const inputNombre = screen
      .getAllByText("Nombre")[0]
      .closest("div")!
      .querySelector("input") as HTMLInputElement;

    const inputSku = screen
      .getAllByText("Sku")[0]
      .closest("div")!
      .querySelector("input") as HTMLInputElement;

    const inputDescripcion = screen
      .getAllByText("Descripción")[0]
      .closest("div")!
      .querySelector("input") as HTMLInputElement;

    const inputPrecio = screen
      .getAllByText("Precio")[0]
      .closest("div")!
      .querySelector("input") as HTMLInputElement;

    const inputStock = screen
      .getAllByText("Stock")[0]
      .closest("div")!
      .querySelector("input") as HTMLInputElement;

    fireEvent.change(inputNombre, { target: { value: "Producto Test" } });
    fireEvent.change(inputSku, { target: { value: "SKU-123" } });
    fireEvent.change(inputDescripcion, { target: { value: "Descripcion..." } });
    fireEvent.change(inputPrecio, { target: { value: 100 } });
    fireEvent.change(inputStock, { target: { value: 5 } });

    fireEvent.click(screen.getByRole("button", { name: /registrar/i }));

    await waitFor(() => {
      expect(saveProduct).toHaveBeenCalledTimes(1);
    });
  });

});
