import React from "react";
import Header from "../../components/Header/Header";
import { useNetflix } from "../../context/NetflixContext";
import "./MyList.css";

export default function MyList() {
  const { myList, likes } = useNetflix();
  const list = Object.values(myList);

  return (
    <div className="mylist-page">
      <Header />
      <div className="mylist-body">
        <h1>My List</h1>
        <p className="muted">
          Saved: {list.length} • Likes:{" "}
          {Object.values(likes).filter(Boolean).length}
        </p>

        {list.length === 0 ? (
          <p className="muted">
            No saved titles yet. Add movies from the homepage.
          </p>
        ) : (
          <div className="grid">
            {list.map((m) => (
              <div className="card" key={m.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w300/${m.poster_path}`}
                  alt={m.title || m.name}
                />
                <div className="title">{m.title || m.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
