
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface LogEntry {
  timestamp: string;
  type: string;
  source: string;
  message: string;
  severity: string;
}

const FileUpload = () => {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const parseCSV = async (file: File): Promise<LogEntry[]> => {
    const text = await file.text();
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    return lines.slice(1).map(line => {
      const values = line.split(',').map(value => value.trim());
      return {
        timestamp: values[0] || '',
        type: values[1] || '',
        source: values[2] || '',
        message: values[3] || '',
        severity: values[4] || ''
      };
    }).filter(entry => entry.timestamp); // Filtrar líneas vacías
  };

  const handleFiles = async (files: File[]) => {
    const csvFiles = files.filter(file => file.type === "text/csv");
    
    if (csvFiles.length === 0) {
      toast({
        title: "Error",
        description: "Por favor, selecciona un archivo CSV válido.",
        variant: "destructive"
      });
      return;
    }

    try {
      const logs = await parseCSV(csvFiles[0]);
      console.log("Logs procesados:", logs);
      
      // Aquí actualizaríamos el estado global con los logs
      // Por ahora solo mostramos un toast de éxito
      toast({
        title: "Archivo procesado",
        description: `Se procesaron ${logs.length} registros de logs.`,
      });
    } catch (error) {
      console.error("Error al procesar el archivo:", error);
      toast({
        title: "Error",
        description: "Error al procesar el archivo CSV.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card
      className={`p-6 animate-fade-up ${
        isDragging ? "border-2 border-dashed border-primary" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <Upload className="h-12 w-12 text-muted-foreground" />
        <div>
          <h3 className="text-lg font-semibold mb-1">Cargar archivo CSV</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Arrastra y suelta tu archivo aquí o haz clic para seleccionarlo
          </p>
          <p className="text-xs text-muted-foreground">
            Formato esperado: timestamp,type,source,message,severity
          </p>
        </div>
        <label htmlFor="file-upload">
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Seleccionar archivo
          </Button>
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileInput}
        />
      </div>
    </Card>
  );
};

export default FileUpload;
