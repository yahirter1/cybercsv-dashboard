
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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

  const handleFiles = (files: File[]) => {
    const csvFiles = files.filter(file => file.type === "text/csv");
    
    if (csvFiles.length === 0) {
      toast({
        title: "Error",
        description: "Por favor, selecciona un archivo CSV válido.",
        variant: "destructive"
      });
      return;
    }

    // Aquí puedes procesar el archivo CSV
    toast({
      title: "Archivo cargado",
      description: `Se cargó el archivo: ${csvFiles[0].name}`,
    });
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
