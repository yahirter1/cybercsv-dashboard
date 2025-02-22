
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const ExportButtons = () => {
  const exportToPDF = async () => {
    const dashboard = document.getElementById('security-dashboard');
    if (!dashboard) return;

    const canvas = await html2canvas(dashboard);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('security-dashboard.pdf');
  };

  const exportToCSV = () => {
    // Implementation for CSV export
    console.log('CSV export functionality to be implemented');
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={exportToPDF}
        className="flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        PDF
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={exportToCSV}
        className="flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        CSV
      </Button>
    </div>
  );
};

export default ExportButtons;
