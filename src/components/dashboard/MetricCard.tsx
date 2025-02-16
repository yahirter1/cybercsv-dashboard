
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  className?: string;
}

const MetricCard = ({ title, value, subtitle, icon, className }: MetricCardProps) => {
  return (
    <Card className={cn("p-6 animate-fade-up", className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold font-heading">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className="text-muted-foreground">{icon}</div>
      </div>
    </Card>
  );
};

export default MetricCard;
