import express from 'express';
import { createConnection } from 'typeorm';
import { MyEntity } from '../entity/MyEntity';
import { generatePDF } from './pdfGenerator';
import path from 'path';

const app = express();

createConnection()
  .then(async (connection) => {
    console.log('PostgreSQL ile bağlantı kuruldu.');

    // API endpoint'i oluştur
    app.get('/generate-pdf/:id', async (req, res) => {
      const id = req.params.id;

      try {
        const data = await connection.getRepository(MyEntity).findOne(id);

        if (!data) {
          return res.status(404).send('Veri bulunamadı.');
        }

        const pdfBuffer = await generatePDF(data);

        const filePath = `/app/PDF/${id}.pdf`;
        require('fs').writeFileSync(filePath, pdfBuffer);

        return res.status(200).send('PDF oluşturuldu ve kaydedildi.');
      } catch (error) {
        console.error('PDF oluşturma hatası:', error);
        return res.status(500).send('PDF oluşturma hatası.');
      }
    });

    app.get('/data', async (req, res) => {
      try {
        const data = await connection.getRepository(MyEntity).find();
        return res.status(200).json(data);
      } catch (error) {
        console.error('Veri alma hatası:', error);
        return res.status(500).send('Veri alma hatası.');
      }
    });

    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../index.html'));
    });

    app.listen(32465, () => {
      console.log('Server çalışıyor. Port: 32465');
    });
  })
  .catch((error) => {
    console.error('PostgreSQL bağlantı hatası:', error);
  });
