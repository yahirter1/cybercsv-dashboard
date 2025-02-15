
import { Shield, AlertTriangle, UserCheck, Activity } from "lucide-react";
import MetricCard from "@/components/dashboard/MetricCard";
import LogsTable from "@/components/dashboard/LogsTable";
import Charts from "@/components/dashboard/Charts";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-primary mb-2">Dashboard de Seguridad</h1>
        <p className="text-muted-foreground">Monitoreo y análisis de logs de seguridad</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Alertas"
          value="1,234"
          icon={<Shield className="h-8 w-8 text-success" />}
        />
        <MetricCard
          title="Incidentes Críticos"
          value="23"
          icon={<AlertTriangle className="h-8 w-8 text-danger" />}
        />
        <MetricCard
          title="Usuarios Activos"
          value="156"
          icon={<UserCheck className="h-8 w-8 text-success" />}
        />
        <MetricCard
          title="Tasa de Detección"
          value="98.5%"
          icon={<Activity className="h-8 w-8 text-success" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Charts />
        <Charts />
      </div>

      <LogsTable />
    </div>
  );
};

export default Index;
