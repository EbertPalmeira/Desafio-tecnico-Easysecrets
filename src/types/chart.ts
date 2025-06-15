export interface VendaMensal {
  mes: string;
  quantidade: number;
}

export interface ProdutoVendas {
  produto: string;
  vendas: VendaMensal[];
}

export interface ChartDataset {
  label: string;
  data: number[];
 backgroundColor: string | string[];
  borderColor?: string;
  borderWidth?: number;
}

export interface ProcessedChartData {
  labels: string[];
  title?: string;
  datasets: ChartDataset[];
}
