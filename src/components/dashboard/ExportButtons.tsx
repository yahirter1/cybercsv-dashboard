
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";

const ExportButtons = () => {
  const captureCanvas = async () => {
    const dashboard = document.getElementById("security-dashboard");
    if (!dashboard) return null;

    // Temporalmente hacemos visible todo el contenido scrolleable
    const originalStyle = dashboard.style.maxHeight;
    dashboard.style.maxHeight = "none";
    
    const canvas = await html2canvas(dashboard, {
      scrollY: -window.scrollY,
      useCORS: true,
      allowTaint: true,
      scale: 1
    });
    
    // Restauramos el estilo original
    dashboard.style.maxHeight = originalStyle;
    
    return canvas;
  };

  const handleExportPNG = async () => {
    try {
      toast.info("Preparando la exportación PNG...");
      const canvas = await captureCanvas();
      if (!canvas) return;

      // Crear y descargar PNG
      const link = document.createElement("a");
      link.download = "dashboard-seguridad.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      
      toast.success("Dashboard exportado como PNG exitosamente");
    } catch (error) {
      console.error("Error al exportar PNG:", error);
      toast.error("Error al exportar el dashboard como PNG");
    }
  };

  const handleExportPDF = async () => {
    try {
      toast.info("Preparando la exportación PDF...");
      const canvas = await captureCanvas();
      if (!canvas) return;

      // Crear y descargar PDF
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("dashboard-seguridad.pdf");
      
      toast.success("Dashboard exportado como PDF exitosamente");
    } catch (error) {
      console.error("Error al exportar PDF:", error);
      toast.error("Error al exportar el dashboard como PDF");
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
        Exportar PNG
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleExportPDF}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        Exportar PDF
      </Button>
    </div>
  );
};

export default ExportButtons;
