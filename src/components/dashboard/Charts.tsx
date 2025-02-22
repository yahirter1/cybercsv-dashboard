
import { LogEntry } from "@/utils/chartUtils";
import SeverityPieChart from "./charts/SeverityPieChart";
import EventTypeChart from "./charts/EventTypeChart";
import TimelineChart from "./charts/TimelineChart";
import HeatmapChart from "./charts/HeatmapChart";
import TrendsChart from "./charts/TrendsChart";

interface ChartsProps {
  logs: LogEntry[];
  type: 'severity' | 'events' | 'timeline' | 'heatmap' | 'trends';
}

const Charts = ({ logs, type }: ChartsProps) => {
  switch (type) {
    case 'severity':
      return <SeverityPieChart logs={logs} />;
    case 'events':
      return <EventTypeChart logs={logs} />;
    case 'timeline':
      return <TimelineChart logs={logs} />;
    case 'heatmap':
      return <HeatmapChart logs={logs} />;
    case 'trends':
      return <TrendsChart logs={logs} />;
    default:
      return null;
  }
};

export default Charts;
