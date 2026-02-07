// src/components/Rows/RowList/RowList.js
import React from "react";
import Row from "../Row/Row"; // <-- Default import works now
import Requests from "../../Utils/Requests"; // Path to your API requests

function RowList() {
  return (
    <div>
      <Row title="Trending Now" fetchUrl={Requests.fetchTrending} />
      <Row
        title="Netflix Originals"
        fetchUrl={Requests.fetchNetflixOriginals}
      />
      <Row title="Top Rated" fetchUrl={Requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={Requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={Requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={Requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={Requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={Requests.fetchDocumentaries} />
    </div>
  );
}

export default RowList;
