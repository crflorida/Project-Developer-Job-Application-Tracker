const STATUSES = ["Applied", "Interview", "Offer", "Rejected"];

function JobCard({ job, onDelete, onUpdate }) {
  function changeStatus(e) {
    onUpdate({ ...job, status: e.target.value });
  }

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div>
          <h3 style={{ margin: 0 }}>{job.company}</h3>
          <div style={{ color: "#555" }}>{job.title}</div>

          {job.link ? (
            <div style={{ marginTop: 6 }}>
              <a href={job.link} target="_blank" rel="noreferrer">
                Job posting
              </a>
            </div>
          ) : null}

          {job.dateApplied ? (
            <div style={{ marginTop: 6, color: "#555" }}>
              Applied: {job.dateApplied}
            </div>
          ) : null}

          {job.notes ? (
            <div style={{ marginTop: 6, color: "#333" }}>{job.notes}</div>
          ) : null}
        </div>

        <div style={{ display: "grid", gap: 8, alignContent: "start" }}>
          <select value={job.status} onChange={changeStatus}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <button onClick={onDelete} style={{ padding: "8px 10px" }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
