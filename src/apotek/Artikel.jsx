export default function Artikel() {
  return (
    <div className="cardArtikel">
      <h2>
      Panduan Lengkap Mengenai Obat Sirup: Manfaat, Jenis, dan Cara Penggunaannya
      </h2>
      <div>
        <h5>Artikel Kesehatan | Obat Sirup </h5>
        <center>
          <img src="img/obat.jpg" alt="logo" width={"500px"} />
        </center>
        <Gambar />
        <Pembahasan />
        <Manfaat/>
        <Jenis/>
        <Penggunaan/>
      </div>
      <div className="nav-buttons">
        <button className="prev">Sebelumnya</button>
        <button className="next">Selanjutnya</button>
      </div>
    </div>
  );
}

function Pembahasan() {
  return (
    <div> 
      <p>
      Obat sirup merupakan salah satu bentuk sediaan obat cair yang banyak digunakan di dunia medis. 
      Biasanya, obat ini diberikan kepada anak-anak atau pasien yang mengalami kesulitan menelan tablet 
      atau kapsul. Selain itu, obat sirup juga sering menjadi pilihan karena lebih mudah dikonsumsi dan 
      memiliki rasa yang lebih enak dibandingkan dengan bentuk obat lainnya. Tidak hanya untuk anak-anak, 
      beberapa jenis obat sirup juga banyak digunakan oleh orang dewasa, terutama yang membutuhkan 
      penyesuaian dosis yang lebih fleksibel.
      </p>
      <p>
      Obat sirup merupakan salah satu bentuk obat yang efektif dan mudah digunakan, terutama bagi 
      mereka yang mengalami kesulitan menelan tablet atau kapsul. Dengan memahami berbagai jenisnya, 
      manfaat, serta cara penggunaannya, obat sirup dapat dikonsumsi secara aman dan efektif sesuai 
      dengan kebutuhan medis. Pemilihan obat sirup yang tepat serta kepatuhan terhadap aturan penggunaan 
      sangat penting untuk memastikan efek yang optimal dan menghindari efek samping yang tidak diinginkan.
      </p>
      <p>
      Selain itu, selalu perhatikan dosis yang dianjurkan oleh dokter atau apoteker, gunakan alat ukur yang 
      sesuai, serta simpan obat dengan cara yang benar agar tidak mengalami penurunan kualitas. Jika muncul 
      efek samping atau reaksi yang tidak biasa setelah mengonsumsi obat sirup, segera konsultasikan dengan 
      tenaga medis untuk mendapatkan saran yang tepat.
      </p>
      <p>
      Dengan pemahaman yang baik mengenai obat sirup, pasien dapat menggunakannya secara lebih bijak dan
      mendapatkan manfaat maksimal untuk kesehatan mereka.
      </p>
      
    </div>
  );
}

function Gambar() {
  return <small>Gambar Obat-Obatan</small>;
}

function Manfaat() {

  return (
    
      <div>
          <h3>Manfaat Obat Sirup </h3> 
      <p>
      Penggunaan obat sirup memiliki beberapa keunggulan, di antaranya:
    Satu Mudah Dikonsumsi - Tekstur cair dan rasa yang lebih 
    enak membuatnya lebih mudah diminum, terutama bagi anak-anak dan lansia. 
    Banyak obat sirup yang diberi pemanis atau perisa tertentu agar lebih 
    dapat diterima oleh pasien, dua Dosis yang Fleksibel - Dapat dengan mudah disesuaikan dengan kebutuhan pasien, 
    terutama bagi anak-anak yang memerlukan dosis spesifik berdasarkan berat badan atau usia,tiga Cepat Diserap oleh Tubuh - Karena berbentuk cair, obat sirup lebih cepat diserap 
    oleh sistem pencernaan dibandingkan dengan obat berbentuk tablet atau kapsul, 
    sehingga efeknya lebih cepat dirasakan oleh pasien dan terakhir Mengurangi Risiko Tersedak - Bagi pasien yang mengalami kesulitan menelan, 
    seperti bayi, anak-anak, lansia, atau penderita gangguan menelan, obat sirup 
    menjadi solusi yang lebih aman dibandingkan tablet atau kapsul.  </p>
</div>
  )
}


function Jenis() {
  return (
      <div>
         
          <h3>Jenis Obat Sirup </h3> 
          
    <p>
    Obat sirup tersedia dalam berbagai jenis berdasarkan komposisi dan sifatnya, 
    antara lain:
    Satu, Sirup Biasa - Mengandung larutan obat yang dilarutkan dalam cairan berbasis gula. 
    Biasanya digunakan untuk meredakan demam dan nyeri, misalnya sirup paracetamol yang sering 
    diresepkan untuk anak-anak, Dua Sirup Kering – Berbentuk bubuk yang harus dilarutkan dalam air sebelum dikonsumsi. 
    Jenis ini banyak digunakan untuk antibiotik seperti amoksisilin, yang harus dikocok terlebih 
    dahulu sebelum dikonsumsi agar zat aktifnya tercampur merata, Tiga Obat sirup yang mengandung alkohol sebagai pelarut untuk meningkatkan stabilitas 
    dan efektivitas obat. Biasanya digunakan dalam obat batuk atau penenang ringan dan empat Suspensi – Mengandung partikel zat aktif yang tidak larut sepenuhnya dalam cairan, 
    sehingga harus dikocok sebelum dikonsumsi. Contohnya adalah obat maag berbentuk suspensi yang 
    membantu melapisi lambung untuk mengurangi iritasi akibat asam lambung.
    </p>
        
</div>
  )
}

function Penggunaan() {

  return (
      <div>
         
          <h3>Cara Penggunaan yang Tepat </h3> 
      Agar obat sirup bekerja secara optimal, penting untuk menggunakannya dengan benar:
    <p>
    1. Gunakan Alat Ukur yang Tepat – Selalu gunakan sendok takar, pipet, atau 
    cup pengukur yang disertakan dalam kemasan untuk memastikan dosis yang akurat. 
    Penggunaan sendok makan biasa tidak disarankan karena dapat menyebabkan kesalahan dosis.
    </p>
    <p>
    2. Kocok Sebelum Digunakan – Untuk jenis obat suspensi atau sirup kering, 
    perlu dikocok terlebih dahulu agar zat aktif tercampur dengan merata. Jika tidak dikocok, 
    dosis yang dikonsumsi mungkin tidak sesuai.
    </p>
    <p>
    3. Ikuti Petunjuk Penyimpanan – Beberapa obat sirup harus disimpan dalam lemari es 
    agar tetap stabil, sementara yang lain cukup disimpan pada suhu ruangan. Penyimpanan yang 
    tidak sesuai dapat mengurangi efektivitas obat atau bahkan menyebabkan perubahan struktur kimianya.
    </p>
    <p>
    4. Periksa Tanggal Kedaluwarsa – Pastikan obat belum melewati tanggal kedaluwarsa untuk menghindari 
    risiko efek samping atau kehilangan efektivitasnya.
    </p>
    <p>
    5. Minum Sesuai Jadwal – Konsumsi obat sesuai dengan aturan dan jadwal yang diberikan oleh 
    dokter atau apoteker untuk hasil yang maksimal. Jangan menghentikan penggunaan obat secara tiba-tiba, 
    terutama untuk antibiotik, kecuali atas saran dokter.
    </p>
</div>
  )
}