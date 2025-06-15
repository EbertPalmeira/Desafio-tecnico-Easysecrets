import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { processChartData } from "../utils/processData";
import type { ProdutoVendas } from "../types/chart";
import dados from "../data/vendas.json";
import type { ChartEvent } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

type ChartType = "bar" | "line" | "pie" | "radar";

interface ChartWrapperProps {
  type: ChartType;
  data?: ProdutoVendas[];
  selectedProducts?: string[];
  darkMode?: boolean;
}

export default function ChartWrapper({
  type,
  selectedProducts,
  darkMode = false,
}: ChartWrapperProps) {
  const hasSelectedProducts = selectedProducts && selectedProducts.length > 0;

  // Se não houver produtos selecionados, mostra todos
  const productsToDisplay = hasSelectedProducts
    ? selectedProducts
    : dados.map((p) => p.produto);
  // Processa os dados
  const chartData = processChartData(
    dados.filter((produto) => productsToDisplay.includes(produto.produto))
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        onHover: (event: ChartEvent) => {
          const target = event.native?.target as HTMLElement;
          if (target) {
            target.style.cursor = "pointer";
          }
        },
        onLeave: (event: ChartEvent) => {
          const target = event.native?.target as HTMLElement;
          if (target) {
            target.style.cursor = "default";
          }
        },
        labels: {
          boxWidth: 70,
          boxHeight: 30,
          color: darkMode ? "#ffffff" : "#666",
        },
      },

      title: {
        display: true,
        text: "Vendas Mensais por Produto",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Quantidade Vendida",
        },
      },
      x: {
        title: {
          display: true,
          text: "Meses",
        },
      },
    },
  };

  const chartContainerStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    height: "500px",
  };

  return (
    <div style={chartContainerStyle}>
      {type === "bar" ? (
        <Bar data={chartData} options={options} />
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
}
