export default
function Hello(){ //function harus pascal case
    const propsUserCard = {
        nama: "Neocenta Gel",
        nim: "0293",
        tanggal: "2025-01-01"
    }
    return (
        <div>
            <h2>Hello!</h2>
            <p>Selamat Datang di Apotek</p>
            <Greeting/>
            <QuoteText/>
            <UserCard 
	            nama="Paracetamol" 
	            kode="0012"
	            tanggal={new Date().toLocaleDateString()}
	          />
            
            <UserCard {...propsUserCard}/>
            <img src="img/apotek.jpg" alt="logo" width={'600px'}/>
        </div>
    )
}

function Greeting() {
    return (
        <small>Silakan pilih obat yang kamu butuhkan</small> //hanya bisa nampilin satu text, kalau mau banyak pakai <div>
        //<small>Salam dari Binjai <QuoteText/> </small> ini juga bisa
    )
}

function QuoteText() {
    const text = "Awali hari dengan cara yang sehat";
    const text2 = "Beli gaak???!!!😤";
    return (
        <div>
            <hr/>
            <p>{text.toLowerCase()}</p>
            <p>{text2.toUpperCase()}</p>
        </div>
    )
}

function UserCard(props){
    return (
        <div>
            <hr/>
            <h3>Nama Obat: {props.nama}</h3>
            <p>Kode Obat: {props.kode}</p>
            <p>Tanggal Kadaluarsa: {props.tanggal}</p>
        </div>
    )
}