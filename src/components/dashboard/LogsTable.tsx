
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const LogsTable = () => {
  return (
    <Card className="p-6 animate-fade-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-heading font-semibold">Registros de Seguridad</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar registros..."
            className="pl-10 w-[300px]"
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
            <TableRow>
              <TableCell>2024-03-20 10:15:23</TableCell>
              <TableCell>AUTH</TableCell>
              <TableCell>192.168.1.100</TableCell>
              <TableCell>Failed login attempt</TableCell>
              <TableCell>
                <span className="px-2 py-1 rounded-full bg-danger/10 text-danger text-sm">
                  Alto
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2024-03-20 10:14:55</TableCell>
              <TableCell>SYSTEM</TableCell>
              <TableCell>firewall</TableCell>
              <TableCell>Configuration updated</TableCell>
              <TableCell>
                <span className="px-2 py-1 rounded-full bg-success/10 text-success text-sm">
                  Bajo
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default LogsTable;
