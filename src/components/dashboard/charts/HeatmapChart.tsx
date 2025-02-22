
import { Card } from "@/components/ui/card";
import { ScatterChart, Scatter, XAxis, YAxis, ResponsiveContainer, Tooltip, Rectangle } from 'recharts';
import { getHeatmapColor } from "@/utils/chartUtils";
import type { LogEntry } from "@/utils/chartUtils";
import { getDay } from 'date-fns';

interface HeatmapChartProps {
  logs: LogEntry[];
}

const HeatmapChart = ({ logs }: HeatmapChartProps) => {
  const prepareHeatmapData = () => {
    const heatmapData: { hour: number; day: number; value: number }[] = [];
    const hourlyData: { [key: string]: number } = {};

    logs.forEach(log => {
      const date = new Date(log.timestamp);
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

  const CustomHeatmapCell = (props: any) => {
    const { x, y, value } = props;
    const cellSize = window.innerWidth < 768 ? 15 : 20;
    const cellHeight = window.innerWidth < 768 ? 10 : 12;
    const maxValue = Math.max(...prepareHeatmapData().map(d => d.value));
    
    return (
      <Rectangle
        x={x}
        y={y}
        width={cellSize}
        height={cellHeight}
        fill={getHeatmapColor(value, maxValue)}
        className="transition-colors duration-200"
      />
    );
  };

  return (
    <Card className="p-4 md:p-6 animate-fade-up">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h2 className="text-base md:text-lg font-heading font-semibold">Distribución por Hora y Día</h2>
      </div>
      <div id="heatmap-chart" className="h-[300px] md:h-[350px] w-full overflow-x-auto">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart 
            margin={{ 
              top: 20, 
              right: 20, 
              bottom: 30, 
              left: 60 
            }}
          >
            <XAxis
              type="number"
              dataKey="hour"
              domain={[0, 23]}
              tickCount={12}
              tickFormatter={(hour) => `${hour}h`}
              interval={window.innerWidth < 768 ? 1 : 0}
              fontSize={12}
            />
            <YAxis
              type="number"
              dataKey="day"
              domain={[0, 6]}
              tickCount={7}
              tickFormatter={(day) => ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][day]}
              fontSize={12}
              width={50}
            />
            <Tooltip
              content={({ payload }) => {
                if (!payload || !payload[0]) return null;
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-3 rounded-lg shadow-lg border">
                    <p className="font-medium text-sm md:text-base">
                      {`${['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][data.day]}`}
                    </p>
                    <p className="text-sm text-gray-600">{`${data.hour}:00 - ${data.hour + 1}:00`}</p>
                    <p className="text-sm font-semibold mt-1">{`${data.value} evento${data.value !== 1 ? 's' : ''}`}</p>
                  </div>
                );
              }}
            />
            <Scatter
              data={prepareHeatmapData()}
              shape={<CustomHeatmapCell />}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default HeatmapChart;
