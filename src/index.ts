import express from 'express';
import { createConnection } from 'typeorm';
import { MyEntity } from './entity/MyEntity';
import { generatePDF } from './pdfGenerator';

const app = express();

createConnection()
  .then(async (connection) => {
    console.log('PostgreSQL ile bağlantı kuruldu.');

    // API endpoint'i oluştur
    app.get('/generate-pdf/:id', async (req, res) => {
      const id = req.params.id;

      try {
        // Veritabanından veriyi al
        const data = await connection.getRepository(MyEntity).findOne(id);

        if (!data) {
          return res.status(404).send('Veri bulunamadı.');
        }

        // PDF oluştur
        const pdfBuffer = await generatePDF(data);

        // PDF'yi kaydet
        const filePath = `/app/PDF/${id}.pdf`;
        require('fs').writeFileSync(filePath, pdfBuffer);

        return res.status(200).send('PDF oluşturuldu ve kaydedildi.');
      } catch (error) {
        console.error('PDF oluşturma hatası:', error);
        return res.status(500).send('PDF oluşturma hatası.');
      }
    });

    // Server'ı başlat
    app.listen(32465, () => {
      console.log('Server çalışıyor. Port: 32465');
    });
  })
  .catch((error) => {
    console.error('PostgreSQL bağlantı hatası:', error);
  });
