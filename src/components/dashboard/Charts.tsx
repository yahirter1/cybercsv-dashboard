import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, ScatterChart, Scatter, Rectangle, Legend } from 'recharts';
import { format, parseISO, startOfWeek, getDay, subDays, eachDayOfInterval } from 'date-fns';
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
  type: 'severity' | 'events' | 'timeline' | 'heatmap' | 'trends';
}

const SEVERITY_COLORS = {
  'alto': '#ea384c',    // Rojo para crítico
  'medio': '#F97316',   // Naranja para warning
  'bajo': '#0EA5E9'     // Azul para info
};

const EVENT_COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#F2FCE2', '#FEF7CD', '#FEC6A1'];

const HEATMAP_COLORS = [
  '#EBEDF0',  // Muy bajo
  '#9BE9A8',  // Bajo
  '#40C463',  // Medio
  '#30A14E',  // Alto
  '#216E39'   // Muy alto
];

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

  const prepareHeatmapData = () => {
    const heatmapData: { hour: number; day: number; value: number }[] = [];
    const hourlyData: { [key: string]: number } = {};

    logs.forEach(log => {
      const date = parseISO(log.timestamp);
      const hour = date.getHours();
      const day = getDay(date);
      const key = `${day}-${hour}`;
      hourlyData[key] = (hourlyData[key] || 0) + 1;
    });

    for (let day = 0; day < 7; day++) {
      for (let hour = 0; hour < 24; hour++) {
        const key = `${day}-${hour}`;
        heatmapData.push({
          hour,
          day,
          value: hourlyData[key] || 0
        });
      }
    }

    return heatmapData;
  };

  const prepareTrendsData = () => {
    const dates = logs.map(log => parseISO(log.timestamp));
    if (dates.length === 0) return [];
    
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
    
    const timeData: { [key: string]: { date: string; alto: number; medio: number; bajo: number } } = {};
    
    const dateRange = eachDayOfInterval({ start: minDate, end: maxDate });
    dateRange.forEach(date => {
      const dateStr = format(date, 'yyyy-MM-dd');
      timeData[dateStr] = { 
        date: dateStr, 
        alto: 0, 
        medio: 0, 
        bajo: 0 
      };
    });
    
    logs.forEach(log => {
      const date = format(parseISO(log.timestamp), 'yyyy-MM-dd');
      const severity = log.severity.toLowerCase();
      if (severity === 'alto' || severity === 'medio' || severity === 'bajo') {
        if (timeData[date]) {
          timeData[date][severity]++;
        }
      }
    });
    
    return Object.values(timeData)
      .sort((a, b) => a.date.localeCompare(b.date));
  };

  const getHeatmapColor = (value: number) => {
    const max = Math.max(...prepareHeatmapData().map(d => d.value));
    const normalized = value / max;
    const colorIndex = Math.min(
      Math.floor(normalized * HEATMAP_COLORS.length),
      HEATMAP_COLORS.length - 1
    );
    return HEATMAP_COLORS[colorIndex];
  };

  const CustomHeatmapCell = (props: any) => {
    const { x, y, value } = props;
    return (
      <Rectangle
        x={x}
        y={y}
        width={20}
        height={20}
        fill={getHeatmapColor(value)}
      />
    );
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

  const renderHeatmapChart = () => {
    const data = prepareHeatmapData();
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    return (
      <Card className="p-6 animate-fade-up">
        <h2 className="text-lg font-heading font-semibold mb-6">Distribución por Hora y Día</h2>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 40 }}
            >
              <XAxis
                type="number"
                dataKey="hour"
                domain={[0, 23]}
                tickCount={24}
                tickFormatter={(hour) => `${hour}h`}
              />
              <YAxis
                type="number"
                dataKey="day"
                domain={[0, 6]}
                tickCount={7}
                tickFormatter={(day) => dayNames[day]}
              />
              <Tooltip
                content={({ payload }) => {
                  if (!payload || !payload[0]) return null;
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 rounded-lg shadow-lg border">
                      <p className="font-medium">{`${dayNames[data.day]} ${data.hour}:00`}</p>
                      <p className="text-sm">{`${data.value} eventos`}</p>
                    </div>
                  );
                }}
              />
              <Scatter
                data={data}
                shape={<CustomHeatmapCell />}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </Card>
    );
  };

  const renderTrendsChart = () => (
    <Card className="p-6 animate-fade-up">
      <h2 className="text-lg font-heading font-semibold mb-6">Tendencias por Severidad</h2>
      <div className="h-[300px] w-full">
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
              dataKey="alto" 
              stroke={SEVERITY_COLORS.alto}
              name="Severidad Alta"
              strokeWidth={2}
              dot={{ fill: SEVERITY_COLORS.alto, r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
            />
            <Line 
              type="monotone" 
              dataKey="medio" 
              stroke={SEVERITY_COLORS.medio}
              name="Severidad Media"
              strokeWidth={2}
              dot={{ fill: SEVERITY_COLORS.medio, r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
            />
            <Line 
              type="monotone" 
              dataKey="bajo" 
              stroke={SEVERITY_COLORS.bajo}
              name="Severidad Baja"
              strokeWidth={2}
              dot={{ fill: SEVERITY_COLORS.bajo, r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
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
    case 'heatmap':
      return renderHeatmapChart();
    case 'trends':
      return renderTrendsChart();
    default:
      return null;
  }
};

export default Charts;
