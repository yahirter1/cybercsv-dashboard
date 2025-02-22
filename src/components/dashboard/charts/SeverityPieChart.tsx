
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { SEVERITY_COLORS, EVENT_COLORS } from "@/utils/chartUtils";
import type { LogEntry } from "@/utils/chartUtils";

interface SeverityPieChartProps {
  logs: LogEntry[];
}

const SeverityPieChart = ({ logs }: SeverityPieChartProps) => {
  const prepareSeverityData = () => {
    const counts: { [key: string]: number } = {};
    logs.forEach(log => {
      const severity = log.severity.toLowerCase();
      counts[severity] = (counts[severity] || 0) + 1;
    });
    
    return Object.entries(counts).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value
    }));
  };

  const searchParams = new URLSearchParams(window.location.search);
  const severityFilter = searchParams.get('severity')?.toLowerCase();

  return (
    <Card className="p-6 animate-fade-up">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-heading font-semibold">Distribución por Severidad</h2>
      </div>
      <div id="severity-chart" className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={prepareSeverityData()}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {prepareSeverityData().map((entry, index) => {
                const isHighlighted = severityFilter ? 
                  entry.name.toLowerCase() === severityFilter : 
                  false;
                
                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={SEVERITY_COLORS[entry.name.toLowerCase()] || EVENT_COLORS[index % EVENT_COLORS.length]}
                    opacity={severityFilter ? (isHighlighted ? 1 : 0.3) : 1}
                    className="transition-opacity duration-200"
                  />
                );
              })}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default SeverityPieChart;
