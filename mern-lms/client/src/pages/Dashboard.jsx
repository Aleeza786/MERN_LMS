import React, { useEffect, useState } from "react";
import api from "../api.js";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const go = async () => {
      const { data } = await api.get("/courses/mine");
      setData(data);
    };
    go();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>My Courses</h2>
      <div style={{ display: "grid", gap: 12 }}>
        <section>
          <h3>As Student</h3>
          <ul>
            {data.asStudent.map(c => <li key={c._id}>{c.title}</li>)}
            {!data.asStudent.length && <p>No enrollments yet.</p>}
          </ul>
        </section>
        <section>
          <h3>As Instructor</h3>
          <ul>
            {data.asInstructor.map(c => <li key={c._id}>{c.title}</li>)}
            {!data.asInstructor.length && <p>No courses created.</p>}
          </ul>
        </section>
      </div>
    </div>
  );
}
