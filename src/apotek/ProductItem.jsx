export default function ProductList() {
    const propsUserCard = {
        nama: "Paracetemol Sirup",
        harga: "Rp15.000",
        tanggal: "2025-01-01",
        image: "img/paracetamol.jpg"
    };

    return (
        <div className="cardProduct">
            <h2>List Produk</h2>

            <Subjudul />
            <UserCard 
                nama="OBH Combi Sirup" 
                harga="Rp18.000"
                image="img/obh.jpg" 
                tanggal={new Date().toLocaleDateString()}
            />
            <UserCard 
                nama="Cetirizine Sirup (Incidal, Rhinos)" 
                harga="Rp30.000"
                image="img/cetir.webp"
                tanggal={new Date().toLocaleDateString()}
            />
            <UserCard 
                nama="Promag Liquid" 
                harga="Rp15.000"
                image="img/promag.jpg"
                tanggal={new Date().toLocaleDateString()}
            />
            <UserCard {...propsUserCard} />
            
            <Text />
            <Note />
        </div>
    );
}

function Subjudul() {
    return <h3>Silakan pilih obat yang kamu butuhkan</h3>;
}

function Text() {
    const text = "Awali hari dengan cara yang sehat";
    const text2 = "Mari Hidup Sehat!!!😤";
    return (
        <div>
            <hr />
            <p>{text.toLowerCase()}</p>
            <p>{text2.toUpperCase()}</p>
        </div>
    );
}

function UserCard(props) {
    return (
        <div className="card">
            <hr />
            <h3>Nama Obat: {props.nama}</h3>
            <p><img src={props.image} alt={props.nama} width="100px" /></p>
            <p>Harga Obat: {props.harga}</p>
            <p>Tanggal Kadaluarsa: {props.tanggal}</p>
        </div>
    );
}

function Note() {
    return <small>Admin-Vetra</small>;
}
