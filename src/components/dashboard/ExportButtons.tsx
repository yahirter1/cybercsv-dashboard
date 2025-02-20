
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";

const ExportButtons = () => {
  const handleExport = async () => {
    try {
      toast.info("Preparando la exportación...");
      const dashboard = document.getElementById("security-dashboard");
      if (!dashboard) return;

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

      // Creamos el PDF
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("dashboard-seguridad.pdf");
      
      toast.success("Dashboard exportado exitosamente");
    } catch (error) {
      console.error("Error al exportar:", error);
      toast.error("Error al exportar el dashboard");
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      className="flex items-center gap-2"
    >
      <Download className="h-4 w-4" />
      Exportar Dashboard
    </Button>
  );
};

export default ExportButtons;
