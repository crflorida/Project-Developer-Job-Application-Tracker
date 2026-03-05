import { useState } from "react";

const STATUSES = ["Applied", "Interview", "Offer", "Rejected"];

function JobForm({ onAddJob }) {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [status, setStatus] = useState("Applied");
  const [dateApplied, setDateApplied] = useState("");
  const [notes, setNotes] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!company.trim() || !title.trim()) return;

    const newJob = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      company: company.trim(),
      title: title.trim(),
      link: link.trim(),
      status,
      dateApplied,
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
    };

    onAddJob(newJob);

    setCompany("");
    setTitle("");
    setLink("");
    setStatus("Applied");
    setDateApplied("");
    setNotes("");
  }

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
      <h2 style={{ marginTop: 0 }}>Add an application</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company (required)"
        />

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Role title (required)"
        />

        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Job link (optional)"
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={dateApplied}
          onChange={(e) => setDateApplied(e.target.value)}
        />

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes (optional)"
          rows={3}
        />

        <button type="submit" style={{ padding: 10, borderRadius: 10 }}>
          Add
        </button>
      </form>
    </div>
  );
}

export default JobForm;
