
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Download, Filter } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";

interface FilterSectionProps {
  onSearch: (term: string) => void;
  searchTerm: string;
  logs?: Array<{
    timestamp: string;
    type: string;
    source: string;
    message: string;
    severity: string;
  }>;
}

const FilterSection = ({ onSearch, searchTerm, logs = [] }: FilterSectionProps) => {
  const [date, setDate] = useState<Date>();

  const exportFilteredLogsToCSV = () => {
    if (logs.length === 0) return;

    // Filtrar logs por término de búsqueda si existe
    const filteredLogs = searchTerm
      ? logs.filter(log =>
          Object.values(log).some(value =>
            value.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      : logs;

    // Crear el contenido CSV
    const headers = ["Timestamp", "Tipo", "Origen", "Mensaje", "Severidad"];
    const csvContent = [
      headers.join(","),
      ...filteredLogs.map(log =>
        [
          log.timestamp,
          log.type,
          log.source,
          `"${log.message.replace(/"/g, '""')}"`, // Escapar comillas en mensajes
          log.severity
        ].join(",")
      )
    ].join("\n");

    // Crear y descargar el archivo
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `logs_filtrados_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="p-4 sm:p-6 mb-6">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <h2 className="text-lg font-heading font-semibold">Filtros y Configuración</h2>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <CalendarIcon className="h-4 w-4" />
                  {date ? format(date, 'dd/MM/yyyy', { locale: es }) : 'Seleccionar fecha'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  locale={es}
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setDate(undefined)}
            >
              <Filter className="h-4 w-4" />
              Limpiar
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="w-full sm:w-96">
            <Input
              placeholder="Buscar en todos los registros..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant="default" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={exportFilteredLogsToCSV}
              disabled={logs.length === 0}
            >
              <Download className="h-4 w-4" />
              Exportar Filtrados
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="text-sm">
            Severidad: Todas
          </Button>
          <Button variant="outline" size="sm" className="text-sm">
            Tipo: Todos
          </Button>
          <Button variant="outline" size="sm" className="text-sm">
            Fuente: Todas
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FilterSection;
