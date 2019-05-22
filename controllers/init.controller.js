const Treasure = require('../models/treasure.model');

exports.init = (req, res) => {

  const utmu = new Treasure({
    name: 'UTMU',
    longName: 'Unit Tenis Meja Unpad',
    description: `Sarana pengembangan bakat dan minat Tennis Meja. Salah satu unit kegiatan mahasiswa yang kompeten dalam bidang olahraga tenis meja.`,
    url: 'https://id-id.facebook.com/pages/Unit-Tenis-Meja-Unpad/',
    logo: 'utmu-logo.jpg'
  });

  utmu.save((err) => {

    if(err){
      return console.error(err.stack);
    }
    
    console.log('UTMU successfully added');
  });

  const usbu = new Treasure({
    name: 'USBU',
    longName: 'Unit Sepak Bola Unpad',
    description: `Di USBU ada tiga departemen, yakni departemen futsal putra, futsal putri, dan departeman sepakbola.
    Prestasi USBU juga sudah mencapai kancah internasional. Jadwal latihannya pun sudah rutin. Biasanya di Stadion Jati Padjadjaran dan Bale Santika pada pukul 3 sore atau 9 pagi sesuai divisi masing-masing. Salah satu acara yang paling seru adalah saat Student Day alias saat penerimaan anggota baru. Demi menarik perhatian mahasiswa baru, USBU sering bikin demo tentang sepak bola dengan menampilkan trik-trik terbaiknya.`,
    url: 'https://www.facebook.com/pages/Unit-Sepakbola-UNPAD/170110036340931',
  });

  usbu.save((err) => {

    if(err){
      return console.error(err.stack);
    }

    console.log('USBU successfully added');
  });

  const utkd = new Treasure({
    name: `UTKD`,
    longName: 'Unit Taekwondo Unpad',
    description: `Unit Taekwondo Unpad (UTKD) didirikan pada tanggal 16 September 1982. UTKD mengadakan latihan rutin setiap hari Senin & Kamis di Pelataran Taman Fakultas Hukum Unpad (Dipati Ukur Bandung) dan Selasa & Jumat di Bale Santika atau di Stadion Jati Padjadjaran (Jatinangor) mulai pukul 16.00 WIB.`,
    url: `https://www.facebook.com/UnitTaekwondoUnpad/`,
    logo: 'taekwondo-logo.jpg'
  });

  utkd.save(err => {

    if(err){
      return console.error(err.stack);
    }

    console.log('UTKD successfully added!')
  });

  const psm = new Treasure({
    name: `PSM`,
    longName: 'Paduan Suara Mahasiswa Unpad',
    description: `Paduan Suara Mahasiswa Universitas Padjadjaran (PSM Unpad) merupakan sebuah organisasi kemahasiswaan yang terbentuk pada tahun 1978. PSM Unpad beranggotakan 137 mahasiswa aktif dari berbagai disiplin ilmu. PSM Unpad berkembang sebagai salah satu unit kegiatan mahasiswa yang berperan penting dalam kegiatan-kegiatan protokoler dan seremonial di lingkungan Universitas Padjadjaran. Selain itu, PSM Unpad juga dikenal sebagai unit kegiatan mahasiswa terbesar di Universitas Padjadjaran dengan manajemen kemahasiswaan yang kuat. Dengan kata lain, unit kegiatan mahasiswa ini dapat menjadi sarana bagi para anggotanya untuk mengembangkan kemampuan bernyanyi maupun berorganisasi.
    Dalam eksistensinya di dunia paduan suara, PSM Unpad telah berhasil menjuarai berbagai kompetisi, baik nasional maupun internasional. Tidak hanya itu, PSM Unpad juga turut dipercaya untuk tampil dalam beragam acara seremonial dan hiburan besar yang bekerjasama dengan berbagai instansi dan juga musisi, baik nasional maupun internasional, karena reputasi yang dimilikinya. Namun demikian, PSM Unpad pun hingga kini terus meningkatkan prestasinya sebagai salah satu paduan suara terbaik di Indonesia.`,
    url: `https://www.facebook.com/unpadchoir/`,
    logo: 'psm-logo.jpeg'
  });

  psm.save(err => {

    if(err){
      return console.error(err.stack);
    }

    console.log('PSM successfully added!')
  });

  const bridge = new Treasure({
    name: `Bridge`,
    longName: 'Bridge Unpad',
    description: `Bridge Unpad didirikan pada tanggal 21 Maret 1999. Bridge merupakan olah raga otak yang dimainkan dengan satu set kartu. Manfaat olah raga ini antara lain melatih ingatan dan menghindarkan kepikunan, menambah tingkat kecerdasan baik IQ, EQ, maupun SQ, serta membentuk pola pikir yang terstuktur, sistematis, strategis, praktis, dan pragmatis dalam ilmu sains, sosial, dan psikologi secara bersamaan.
    Kegiatan yang dilakukan Bridge Unpad, yaitu:
    Latihan rutin seminggu sekali di sekertariat dengan bimbingan pelatih dan senior.
    Latihan Gabungan dengan Club Bridge di Bandung setiap seminggu sekali.
    Latihan virtual dengan media internet menggunakan softwarebridgebase, masing-masing anggota memiliki account dan ID masing-masing.
    Mengikuti kejuaraan tingkat nasional dan internasional.
    Mengdakan sosialisasi permainan kartu.`,
    url: ``,
    logo: 'bridge-logo.png'
  });

  bridge.save(err => {

    if(err){
      return console.error(err.stack);
    }

    console.log('Bridge successfully added!')
  });

  res.send("Done inserting inital data!");
}