// Client-side export helper using html2canvas & jsPDF

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface ExportData {
  title: string;
  cgpa?: number;
  percentage?: number;
  formula?: string;
  dateStr: string;
  detailsLines?: string[];
}

/**
 * Capture an HTMLElement by DOM ID and download as PNG
 */
export const exportElementAsPng = async (elementId: string, filename: string): Promise<boolean> => {
  try {
    const el = document.getElementById(elementId);
    if (!el) throw new Error(`Target element #${elementId} not found for PNG export.`);

    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
    });

    const imageUri = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = imageUri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (error) {
    console.error('Failed to export element as PNG image:', error);
    alert('Could not generate image file. Please try again.');
    return false;
  }
};

/**
 * Capture an HTMLElement by DOM ID and download as PDF report
 */
export const exportElementAsPdf = async (elementId: string, filename: string): Promise<boolean> => {
  try {
    const el = document.getElementById(elementId);
    if (!el) throw new Error(`Target element #${elementId} not found for PDF export.`);

    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 190;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 10;

    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${filename}.pdf`);
    return true;
  } catch (error) {
    console.error('Failed to export PDF:', error);
    alert('Could not generate PDF file. Please try again.');
    return false;
  }
};
