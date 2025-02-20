
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";

interface ExportButtonsProps {
  containerId: string;
  fileName: string;
}

const ExportButtons = ({ containerId, fileName }: ExportButtonsProps) => {
  const handleExportPNG = async () => {
    try {
      const element = document.getElementById(containerId);
      if (!element) return;

      const canvas = await html2canvas(element);
      const link = document.createElement("a");
      link.download = `${fileName}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast.success("Imagen PNG exportada exitosamente");
    } catch (error) {
      console.error("Error al exportar PNG:", error);
      toast.error("Error al exportar la imagen PNG");
    }
  };

  const handleExportPDF = async () => {
    try {
      const element = document.getElementById(containerId);
      if (!element) return;

      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");
      
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`${fileName}.pdf`);
      toast.success("PDF exportado exitosamente");
    } catch (error) {
      console.error("Error al exportar PDF:", error);
      toast.error("Error al exportar el PDF");
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleExportPNG}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        PNG
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleExportPDF}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        PDF
      </Button>
    </div>
  );
};

export default ExportButtons;
