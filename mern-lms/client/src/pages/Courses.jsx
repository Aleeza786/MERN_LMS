import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api.js";

export default function Courses() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const go = async () => {
      const { data } = await api.get("/courses");
      setItems(data);
      setLoading(false);
    };
    go();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Courses</h2>
      <div style={{ display: "grid", gap: 12 }}>
        {items.map(c => (
          <div key={c._id} style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
            <h3 style={{ margin: 0 }}>{c.title}</h3>
            <p style={{ marginTop: 4 }}>{c.description}</p>
            <small>By {c.instructor?.name || "Unknown"}</small><br/>
            <Link to={`/courses/${c._id}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
