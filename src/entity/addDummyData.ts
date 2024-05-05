import { createConnection } from 'typeorm';
import { MyEntity } from '.myEntity';

createConnection().then(async (connection) => {
  const myEntity = new MyEntity();
  myEntity.firstName = 'John';
  myEntity.lastName = 'Doe';

  await connection.manager.save(myEntity);

  console.log('Veri başarıyla eklendi.');
}).catch((error) => {
  console.error('Veri eklerken hata oluştu:', error);
});
