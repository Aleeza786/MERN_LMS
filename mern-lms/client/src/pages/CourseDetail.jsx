import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api.js";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [mine, setMine] = useState({ asStudent: [], asInstructor: [] });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      const [{ data: c }, { data: m }] = await Promise.all([
        api.get(`/courses/${id}`),
        api.get("/courses/mine").catch(() => ({ data: { asStudent: [], asInstructor: [] } }))
      ]);
      setCourse(c);
      setMine(m);
    };
    load();
  }, [id]);

  if (!course) return <p>Loading...</p>;

  const isInstructor = mine?.asInstructor?.some(x => x._id === course._id);
  const isStudent = mine?.asStudent?.some(x => x._id === course._id);

  const handleEnroll = async () => {
    try {
      const { data } = await api.post(`/courses/${course._id}/enroll`);
      setMessage(data.message || "Enrolled");
      const { data: m } = await api.get("/courses/mine");
      setMine(m);
    } catch (err) {
      setMessage(err?.response?.data?.message || "Failed to enroll");
    }
  };

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p><small>Instructor: {course.instructor?.name}</small></p>

      {!isInstructor && !isStudent && (
        <button onClick={handleEnroll}>Enroll</button>
      )}
      {message && <p><em>{message}</em></p>}

      <h3>Lessons</h3>
      <ol>
        {course.lessons?.length ? course.lessons.map((l, idx) => (
          <li key={idx}>
            <strong>{l.title}</strong>
            {l.content && <p>{l.content}</p>}
            {l.videoUrl && <p><a href={l.videoUrl} target="_blank" rel="noreferrer">Video</a></p>}
          </li>
        )) : <p>No lessons yet.</p>}
      </ol>
    </div>
  );
}
