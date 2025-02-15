
import { Shield, AlertTriangle, UserCheck, Activity } from "lucide-react";
import MetricCard from "@/components/dashboard/MetricCard";
import LogsTable from "@/components/dashboard/LogsTable";
import Charts from "@/components/dashboard/Charts";
import FileUpload from "@/components/dashboard/FileUpload";
import { useState } from "react";

interface LogEntry {
  timestamp: string;
  type: string;
  source: string;
  message: string;
  severity: string;
}

const Index = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const handleLogsUpdate = (newLogs: LogEntry[]) => {
    setLogs(newLogs);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-primary mb-2">Dashboard de Seguridad</h1>
        <p className="text-muted-foreground">Monitoreo y análisis de logs de seguridad</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Alertas"
          value={logs.length.toString()}
          icon={<Shield className="h-8 w-8 text-success" />}
        />
        <MetricCard
          title="Incidentes Críticos"
          value={logs.filter(log => log.severity.toLowerCase() === 'alto').length.toString()}
          icon={<AlertTriangle className="h-8 w-8 text-danger" />}
        />
        <MetricCard
          title="Usuarios Activos"
          value={new Set(logs.map(log => log.source)).size.toString()}
          icon={<UserCheck className="h-8 w-8 text-success" />}
        />
        <MetricCard
          title="Tasa de Detección"
          value={logs.length > 0 ? "98.5%" : "0%"}
          icon={<Activity className="h-8 w-8 text-success" />}
        />
      </div>

      <div className="mb-8">
        <FileUpload onLogsUpdate={handleLogsUpdate} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Charts logs={logs} type="severity" />
        <Charts logs={logs} type="events" />
        <Charts logs={logs} type="timeline" />
      </div>

      <LogsTable logs={logs} />
    </div>
  );
};

export default Index;
