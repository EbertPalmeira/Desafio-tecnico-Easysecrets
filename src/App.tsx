import { useState } from "react";
import ChartWrapper from "./components/ChartWrapper";
import "./App.css";
import { FaMoon, FaSun } from "react-icons/fa";

function App() {
  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([
    "Refrigerante",
    "Suco",
    "Salgadinho",
  ]);
  const [darkMode, setDarkMode] = useState(false);

  const toggleProduct = (product: string) => {
    setSelectedProducts((prev) =>
      prev.includes(product)
        ? prev.filter((p) => p !== product)
        : [...prev, product]
    );
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Estilos baseados no tema
  const appStyles: React.CSSProperties = {
    backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
    color: darkMode ? "#ffffff" : "#000000",
    minHeight: "100vh",
    padding: "20px",
    margin: "0 auto",

    boxSizing: "border-box",
  };

  const sectionStyles: React.CSSProperties = {
    backgroundColor: darkMode ? "#2d2d2d" : "#f5f5f5",
    color: darkMode ? "#ffffff" : "#000000",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
  };

  const chartContainerStyles: React.CSSProperties = {
    backgroundColor: darkMode ? "#2d2d2d" : "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    minHeight: "500px",
    height: "60vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  };

  return (
    <div className="app" style={appStyles}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 5vw, 2rem)" }}>
          Análise de Vendas
        </h1>
        <button
          type="submit"
          onClick={toggleDarkMode}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
            color: darkMode ? "#FFD700" : "#6A5ACD",
          }}
          aria-label={darkMode ? "Modo claro" : "Modo escuro"}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </header>

      <section style={sectionStyles}>
        <h3 style={{ marginTop: 0, marginBottom: "15px" }}>
          Selecione os Produtos:
        </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            alignItems: "center",
          }}
        >
          {["Refrigerante", "Suco", "Salgadinho"].map((product) => (
            <label
              key={product}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              <input
                type="checkbox"
                checked={selectedProducts.includes(product)}
                onChange={() => toggleProduct(product)}
                disabled={
                  selectedProducts.length === 1 &&
                  selectedProducts.includes(product)
                }
                style={{
                  marginRight: "8px",
                  minWidth: "16px",
                  width: "16px",
                  height: "16px",
                  cursor: "pointer",
                }}
              />
              {product}
            </label>
          ))}
          <button
            type="submit"
            onClick={() =>
              setSelectedProducts(["Refrigerante", "Suco", "Salgadinho"])
            }
            style={{
              padding: "5px 10px",
              backgroundColor: "#6A5ACD",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              marginLeft: "auto",
              whiteSpace: "nowrap",
            }}
          >
            Selecionar Todos
          </button>
        </div>
      </section>

      <section style={sectionStyles}>
        <h3 style={{ marginTop: 0, marginBottom: "15px" }}>Tipo de Gráfico:</h3>
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <button
            type="submit"
            onClick={() => setChartType("bar")}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor:
                chartType === "bar"
                  ? "#6A5ACD"
                  : darkMode
                  ? "#3d3d3d"
                  : "#e7e7e7",
              color:
                chartType === "bar" ? "white" : darkMode ? "white" : "black",
              fontWeight: "bold",
              flex: "1 1 120px",
            }}
          >
            Barras
          </button>
          <button
            type="submit"
            onClick={() => setChartType("line")}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor:
                chartType === "line"
                  ? "#6A5ACD"
                  : darkMode
                  ? "#3d3d3d"
                  : "#e7e7e7",
              color:
                chartType === "line" ? "white" : darkMode ? "white" : "black",
              fontWeight: "bold",
              flex: "1 1 120px",
            }}
          >
            Linhas
          </button>
        </div>
      </section>

      <section style={chartContainerStyles}>
        {selectedProducts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              color: darkMode ? "#ff6b6b" : "#d32f2f",
            }}
          >
            <p>Selecione pelo menos um produto para visualizar o gráfico</p>
            <button
              type="submit"
              onClick={() =>
                setSelectedProducts(["Refrigerante", "Suco", "Salgadinho"])
              }
              style={{
                padding: "8px 16px",
                backgroundColor: "#6A5ACD",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Selecionar Todos
            </button>
          </div>
        ) : (
          <ChartWrapper
            type={chartType}
            selectedProducts={selectedProducts}
            darkMode={darkMode}
          />
        )}
      </section>
    </div>
  );
}

export default App;
