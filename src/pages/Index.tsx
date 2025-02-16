
import { Shield, AlertTriangle, UserCheck, Activity, Clock, Server, AlertOctagon, Zap } from "lucide-react";
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

  const calculateMetrics = () => {
    const now = new Date();
    const lastHourLogs = logs.filter(log => {
      const logDate = new Date(log.timestamp);
      return (now.getTime() - logDate.getTime()) <= 3600000; // 1 hora en milisegundos
    });

    const criticalIncidents = logs.filter(log => log.severity.toLowerCase() === 'alto');
    const uniqueSources = new Set(logs.map(log => log.source));
    
    return {
      totalAlerts: logs.length,
      criticalIncidents: criticalIncidents.length,
      alertsLastHour: lastHourLogs.length,
      uniqueSources: uniqueSources.size,
      averageAlertsPerHour: logs.length > 0 ? Math.round(logs.length / 24) : 0,
      criticalPercentage: logs.length > 0 ? Math.round((criticalIncidents.length / logs.length) * 100) : 0,
      systemsAffected: uniqueSources.size,
      responseRate: logs.length > 0 ? "98.5%" : "0%"
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-primary mb-2">Dashboard de Seguridad</h1>
        <p className="text-muted-foreground">Monitoreo y análisis de logs de seguridad en tiempo real</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Alertas Totales"
          value={metrics.totalAlerts.toString()}
          subtitle={`${metrics.alertsLastHour} en la última hora`}
          icon={<Shield className="h-8 w-8 text-success" />}
        />
        <MetricCard
          title="Incidentes Críticos"
          value={metrics.criticalIncidents.toString()}
          subtitle={`${metrics.criticalPercentage}% del total`}
          icon={<AlertTriangle className="h-8 w-8 text-danger" />}
        />
        <MetricCard
          title="Sistemas Afectados"
          value={metrics.systemsAffected.toString()}
          subtitle="Fuentes únicas detectadas"
          icon={<Server className="h-8 w-8 text-primary" />}
        />
        <MetricCard
          title="Tiempo de Respuesta"
          value={metrics.responseRate}
          subtitle="Tasa de detección efectiva"
          icon={<Zap className="h-8 w-8 text-warning" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Promedio por Hora"
          value={metrics.averageAlertsPerHour.toString()}
          subtitle="Alertas/hora"
          icon={<Clock className="h-8 w-8 text-info" />}
        />
        <MetricCard
          title="Severidad Alta"
          value={`${metrics.criticalPercentage}%`}
          subtitle="Del total de alertas"
          icon={<AlertOctagon className="h-8 w-8 text-danger" />}
        />
        <MetricCard
          title="Fuentes Activas"
          value={metrics.uniqueSources.toString()}
          subtitle="Sistemas monitoreados"
          icon={<UserCheck className="h-8 w-8 text-success" />}
        />
        <MetricCard
          title="Eficiencia"
          value={metrics.responseRate}
          subtitle="Tasa de procesamiento"
          icon={<Activity className="h-8 w-8 text-success" />}
        />
      </div>

      <div className="mb-8">
        <FileUpload onLogsUpdate={handleLogsUpdate} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Charts logs={logs} type="severity" />
        <Charts logs={logs} type="events" />
        <Charts logs={logs} type="timeline" />
        <Charts logs={logs} type="heatmap" />
      </div>

      <LogsTable logs={logs} />
    </div>
  );
};

export default Index;
