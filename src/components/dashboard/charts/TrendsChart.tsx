
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { format, parseISO, eachDayOfInterval } from 'date-fns';
import { es } from 'date-fns/locale';
import { SEVERITY_COLORS } from "@/utils/chartUtils";
import type { LogEntry } from "@/utils/chartUtils";

interface TrendsChartProps {
  logs: LogEntry[];
}

const TrendsChart = ({ logs }: TrendsChartProps) => {
  const prepareTrendsData = () => {
    const dates = logs.map(log => new Date(log.timestamp));
    if (dates.length === 0) return [];
    
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
    
    const timeData: { [key: string]: { 
      date: string; 
      critical: number; 
      error: number; 
      warning: number; 
      info: number;
    } } = {};
    
    const dateRange = eachDayOfInterval({ start: minDate, end: maxDate });
    dateRange.forEach(date => {
      const dateStr = format(date, 'yyyy-MM-dd');
      timeData[dateStr] = { 
        date: dateStr, 
        critical: 0,
        error: 0,
        warning: 0,
        info: 0
      };
    });
    
    logs.forEach(log => {
      const date = format(parseISO(log.timestamp), 'yyyy-MM-dd');
      const severity = log.severity.toLowerCase();
      if (timeData[date] && ['critical', 'error', 'warning', 'info'].includes(severity)) {
        timeData[date][severity as keyof typeof SEVERITY_COLORS]++;
      }
    });
    
    return Object.values(timeData)
      .sort((a, b) => a.date.localeCompare(b.date));
  };

  return (
    <Card className="p-6 animate-fade-up">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-heading font-semibold">Tendencias por Severidad</h2>
      </div>
      <div id="trends-chart" className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={prepareTrendsData()}>
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => format(parseISO(date), 'dd MMM', { locale: es })}
              minTickGap={50}
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
            <Legend />
            <Line 
              type="monotone" 
              dataKey="critical" 
              stroke={SEVERITY_COLORS.critical}
              name="Critical"
              strokeWidth={2}
              dot={{ fill: SEVERITY_COLORS.critical, r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
            />
            <Line 
              type="monotone" 
              dataKey="error" 
              stroke={SEVERITY_COLORS.error}
              name="Error"
              strokeWidth={2}
              dot={{ fill: SEVERITY_COLORS.error, r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
            />
            <Line 
              type="monotone" 
              dataKey="warning" 
              stroke={SEVERITY_COLORS.warning}
              name="Warning"
              strokeWidth={2}
              dot={{ fill: SEVERITY_COLORS.warning, r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
            />
            <Line 
              type="monotone" 
              dataKey="info" 
              stroke={SEVERITY_COLORS.info}
              name="Info"
              strokeWidth={2}
              dot={{ fill: SEVERITY_COLORS.info, r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default TrendsChart;
