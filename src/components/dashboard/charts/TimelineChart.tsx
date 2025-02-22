
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import type { LogEntry } from "@/utils/chartUtils";

interface TimelineChartProps {
  logs: LogEntry[];
}

const TimelineChart = ({ logs }: TimelineChartProps) => {
  const prepareTimelineData = () => {
    const timeData: { [key: string]: number } = {};
    logs.forEach(log => {
      const date = format(parseISO(log.timestamp), 'yyyy-MM-dd', { locale: es });
      timeData[date] = (timeData[date] || 0) + 1;
    });
    
    return Object.entries(timeData)
      .map(([date, count]) => ({
        date,
        count
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  };

  return (
    <Card className="p-6 animate-fade-up">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-heading font-semibold">Línea de Tiempo de Eventos</h2>
      </div>
      <div id="timeline-chart" className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={prepareTimelineData()}>
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => format(parseISO(date), 'dd MMM', { locale: es })}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(date) => format(parseISO(date as string), 'dd MMM yyyy', { locale: es })}
              contentStyle={{ 
                background: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke="#8E9196" 
              strokeWidth={2}
              dot={{ fill: '#8E9196', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default TimelineChart;
