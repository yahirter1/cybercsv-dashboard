
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface LogEntry {
  timestamp: string;
  type: string;
  source: string;
  message: string;
  severity: string;
}

interface LogsTableProps {
  logs: LogEntry[];
}

const LogsTable = ({ logs }: LogsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = logs.filter(log => 
    Object.values(log).some(value => 
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Card className="p-6 animate-fade-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-heading font-semibold">Registros de Seguridad</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar registros..."
            className="pl-10 w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Origen</TableHead>
              <TableHead>Mensaje</TableHead>
              <TableHead>Severidad</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log, index) => (
              <TableRow key={index}>
                <TableCell>{log.timestamp}</TableCell>
                <TableCell>{log.type}</TableCell>
                <TableCell>{log.source}</TableCell>
                <TableCell>{log.message}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full ${
                    log.severity.toLowerCase() === 'alto' 
                      ? 'bg-danger/10 text-danger' 
                      : 'bg-success/10 text-success'
                  } text-sm`}>
                    {log.severity}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default LogsTable;
