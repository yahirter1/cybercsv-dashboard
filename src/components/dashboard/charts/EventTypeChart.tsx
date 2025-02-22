
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { EVENT_COLORS } from "@/utils/chartUtils";
import type { LogEntry } from "@/utils/chartUtils";

interface EventTypeChartProps {
  logs: LogEntry[];
}

const EventTypeChart = ({ logs }: EventTypeChartProps) => {
  const prepareEventTypeData = () => {
    const counts: { [key: string]: number } = {};
    logs.forEach(log => {
      counts[log.type] = (counts[log.type] || 0) + 1;
    });
    
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  };

  return (
    <Card className="p-6 animate-fade-up">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-heading font-semibold">Tipos de Eventos</h2>
      </div>
      <div id="events-chart" className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={prepareEventTypeData()}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              contentStyle={{ 
                background: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Bar 
              dataKey="value" 
              fill="#4FD1C5"
              radius={[4, 4, 0, 0]}
            >
              {prepareEventTypeData().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={EVENT_COLORS[index % EVENT_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default EventTypeChart;
