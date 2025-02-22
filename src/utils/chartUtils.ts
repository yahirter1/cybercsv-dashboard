
export const SEVERITY_COLORS = {
  'critical': '#dc2626',
  'error': '#ef4444',
  'warning': '#f59e0b',
  'info': '#3b82f6'
};

export const EVENT_COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#F2FCE2', '#FEF7CD', '#FEC6A1'];

export const HEATMAP_COLORS = [
  '#EBEDF0',
  '#9BE9A8',
  '#40C463',
  '#30A14E',
  '#216E39'
];

export interface LogEntry {
  timestamp: string;
  type: string;
  source: string;
  message: string;
  severity: string;
}

export const getHeatmapColor = (value: number, maxValue: number) => {
  const normalized = value / maxValue;
  const colorIndex = Math.min(
    Math.floor(normalized * HEATMAP_COLORS.length),
    HEATMAP_COLORS.length - 1
  );
  return HEATMAP_COLORS[colorIndex];
};
