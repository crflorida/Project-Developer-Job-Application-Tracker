import { useEffect, useMemo, useState } from "react";
import JobForm from "../components/JobForm";
import JobList from "../components/JobList";

const STATUS = ["All", "Applied", "Interview", "Offer", "Rejected"];
const STORAGE_KEY = "job-tracker.jobs.v1";

function Dashboard() {
  const [jobs, setJobs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedStatus, setSelectedStatus] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }, [jobs]);

  function addJob(newJob) {
    setJobs((prev) => [newJob, ...prev]);
  }

  function deleteJob(id) {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  }

  function updateJob(updated) {
    setJobs((prev) => prev.map((j) => (j.id === updated.id ? updated : j)));
  }

  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesStatus =
        selectedStatus === "All" ? true : job.status === selectedStatus;

      const matchesQuery =
        q.length === 0
          ? true
          : `${job.company} ${job.title} ${job.status}`.toLowerCase().includes(q);

      return matchesStatus && matchesQuery;
    });
  }, [jobs, selectedStatus, query]);

  const counts = useMemo(() => {
    const base = { All: jobs.length };
    for (const s of STATUS) {
      if (s !== "All") base[s] = jobs.filter((j) => j.status === s).length;
    }
    return base;
  }, [jobs]);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <h1 style={{ marginBottom: 4 }}>Job Application Tracker</h1>
      <p style={{ marginTop: 0, color: "#555" }}>
        Track applications by status, add notes, and keep everything organized.
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
        {STATUS.map((s) => (
          <button
            key={s}
            onClick={() => setSelectedStatus(s)}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #ccc",
              background: selectedStatus === s ? "#eee" : "white",
              cursor: "pointer",
            }}
          >
            {s} ({counts[s] ?? 0})
          </button>
        ))}
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search company, title, status..."
          style={{
            flex: "1 1 260px",
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div style={{ marginTop: 16 }}>
        <JobForm onAddJob={addJob} />
      </div>

      <div style={{ marginTop: 16 }}>
        <JobList jobs={filteredJobs} onDeleteJob={deleteJob} onUpdateJob={updateJob} />
      </div>
    </div>
  );
}

export default Dashboard;
