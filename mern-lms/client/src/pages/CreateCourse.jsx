import React, { useState } from "react";
import api from "../api.js";

export default function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lessons, setLessons] = useState([{ title: "", content: "", videoUrl: "" }]);
  const [message, setMessage] = useState("");

  const updateLesson = (i, key, value) => {
    setLessons(prev => prev.map((l, idx) => idx === i ? { ...l, [key]: value } : l));
  };

  const addLesson = () => setLessons(prev => [...prev, { title: "", content: "", videoUrl: "" }]);
  const removeLesson = (i) => setLessons(prev => prev.filter((_, idx) => idx !== i));

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const { data } = await api.post("/courses", { title, description, lessons: lessons.filter(l => l.title.trim()) });
      setMessage(`Created: ${data.title}`);
      setTitle(""); setDescription(""); setLessons([{ title: "", content: "", videoUrl: "" }]);
    } catch (err) {
      setMessage(err?.response?.data?.message || "Failed to create course");
    }
  };

  return (
    <div style={{ maxWidth: 720 }}>
      <h2>Create Course</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <h3>Lessons</h3>
        {lessons.map((l, i) => (
          <div key={i} style={{ border: "1px solid #eee", padding: 12, borderRadius: 8 }}>
            <input placeholder="Lesson title" value={l.title} onChange={e => updateLesson(i, "title", e.target.value)} />
            <textarea placeholder="Content" value={l.content} onChange={e => updateLesson(i, "content", e.target.value)} />
            <input placeholder="Video URL" value={l.videoUrl} onChange={e => updateLesson(i, "videoUrl", e.target.value)} />
            <div><button type="button" onClick={() => removeLesson(i)}>Remove</button></div>
          </div>
        ))}
        <button type="button" onClick={addLesson}>+ Add Lesson</button>
        <button type="submit">Create</button>
      </form>
      {message && <p><em>{message}</em></p>}
    </div>
  );
}
