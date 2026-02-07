import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import axiosInstance from "../../components/Utils/Axios";
import "./Search.css";

export default function Search() {
  const [params] = useSearchParams();
  const q = (params.get("q") || "").trim();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      if (!q) return setResults([]);
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/search/multi`, {
          params: { query: q, language: "en-US", include_adult: false },
        });
        setResults(res.data.results || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [q]);

  return (
    <div className="search-page">
      <Header />
      <div className="search-body">
        <h1>Search</h1>
        <p className="search-sub">
          {q ? `Results for “${q}”` : "Type something in the search bar above."}
        </p>

        {loading && <p className="muted">Loading…</p>}

        <div className="grid">
          {results
            .filter((x) => x.poster_path || x.backdrop_path)
            .map((item) => (
              <div key={`${item.media_type}-${item.id}`} className="card">
                <img
                  src={`https://image.tmdb.org/t/p/w300/${item.poster_path || item.backdrop_path}`}
                  alt={item.title || item.name}
                />
                <div className="card-title">{item.title || item.name}</div>
                <div className="card-meta">{item.media_type}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
