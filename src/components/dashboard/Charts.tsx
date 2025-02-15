
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Lun', value: 24 },
  { name: 'Mar', value: 18 },
  { name: 'Mie', value: 32 },
  { name: 'Jue', value: 27 },
  { name: 'Vie', value: 42 },
  { name: 'Sab', value: 15 },
  { name: 'Dom', value: 8 },
];

const Charts = () => {
  return (
    <Card className="p-6 animate-fade-up">
      <h2 className="text-lg font-heading font-semibold mb-6">Incidentes por Día</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
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
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default Charts;
