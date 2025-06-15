import type { ProdutoVendas, ProcessedChartData, ChartDataset } from '../types/chart';

export function processChartData(jsonData: ProdutoVendas[]): ProcessedChartData {
  const labels = jsonData[0].vendas.map(v => v.mes);
  
  const colors = [
    'rgba(255, 99, 132, 0.7)',
    'rgba(54, 162, 235, 0.7)',
    'rgba(255, 206, 86, 0.7)'
  ];

  const datasets: ChartDataset[] = jsonData.map((produto, index) => ({
    label: produto.produto,
    data: produto.vendas.map(v => v.quantidade),
    backgroundColor: colors[index] || 'rgba(201, 203, 207, 0.7)',
    borderColor: colors[index]?.replace('0.7', '1') || 'rgba(201, 203, 207, 1)',
    borderWidth: 1
  }));

  return { labels, datasets };
}