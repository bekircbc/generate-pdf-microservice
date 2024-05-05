import { MyEntity } from '../entity/MyEntity';
import { PDFDocument } from 'pdf-lib';

export async function generatePDF(data: MyEntity): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

page.drawText(`Ad: ${data.firstName}`, {
    x: 50,
    y: height - 50,
  });

  page.drawText(`Soyad: ${data.lastName}`, {
    x: 50,
    y: height - 100,
  });


  return pdfDoc.save();
}
