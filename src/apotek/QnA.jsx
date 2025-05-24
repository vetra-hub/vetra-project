export default function QnASection() {
    return (
        <div className="cardA">
            <h2 className="text-xl font-bold">QnA Kesehatan</h2>
            <center><img src="img/5.jpg" alt="logo" width={"100px"} /></center>
            <Nama/>
            <Jawaban/>
            <VoteButtons/>
            <Note/>
        </div>
    );
}

function Nama() {

    return (
        <div className="card-qna">
        Nama : Ratu Oktaviana 
        <div>
        <p></p>Pertanyaan : Apakah obat sirup lebih baik daripada tablet?
  </div>
  </div>
    )
  }


  function Jawaban() {

    return (
        <div className="card-qna1">
        <p></p>Jawaban : Tidak selalu. Sirup lebih mudah dikonsumsi, sementara tablet lebih stabil dan tahan lama.
  </div>
    )
  }

  function VoteButtons() {
    return (
        <div className="flex gap-2 mt-2">
            <button className="bg-blue-500 text-white px-3 py-1 rounded">👍 Upvote</button>
            <button className="bg-red-500 text-white px-3 py-1 rounded">👎 Downvote</button>
        </div>
    );
}


function Note() {
    return <small>Admin-Vetra</small>;
}

