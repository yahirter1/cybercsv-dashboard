
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface LogEntry {
  timestamp: string;
  type: string;
  source: string;
  message: string;
  severity: string;
}

interface ChartsProps {
  logs: LogEntry[];
  type: 'severity' | 'events' | 'timeline';
}

const SEVERITY_COLORS = {
  'alto': '#ea384c',    // Rojo para crítico
  'medio': '#F97316',   // Naranja para warning
  'bajo': '#0EA5E9'     // Azul para info
};

const EVENT_COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#F2FCE2', '#FEF7CD', '#FEC6A1'];

const Charts = ({ logs, type }: ChartsProps) => {
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

  const prepareEventTypeData = () => {
    const counts: { [key: string]: number } = {};
    logs.forEach(log => {
      counts[log.type] = (counts[log.type] || 0) + 1;
    });
    
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  };

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

  const renderSeverityPieChart = () => (
    <Card className="p-6 animate-fade-up">
      <h2 className="text-lg font-heading font-semibold mb-6">Distribución por Severidad</h2>
      <div className="h-[300px] w-full">
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
              {prepareSeverityData().map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={SEVERITY_COLORS[entry.name.toLowerCase()] || EVENT_COLORS[index % EVENT_COLORS.length]} 
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );

  const renderEventTypeChart = () => (
    <Card className="p-6 animate-fade-up">
      <h2 className="text-lg font-heading font-semibold mb-6">Tipos de Eventos</h2>
      <div className="h-[300px] w-full">
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

  const renderTimelineChart = () => (
    <Card className="p-6 animate-fade-up">
      <h2 className="text-lg font-heading font-semibold mb-6">Línea de Tiempo de Eventos</h2>
      <div className="h-[300px] w-full">
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

  switch (type) {
    case 'severity':
      return renderSeverityPieChart();
    case 'events':
      return renderEventTypeChart();
    case 'timeline':
      return renderTimelineChart();
    default:
      return null;
  }
};

export default Charts;
