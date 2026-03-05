import JobCard from "./JobCard";

function JobList({ jobs, onDeleteJob, onUpdateJob }) {
  if (!jobs.length) {
    return <p style={{ color: "#555" }}>No jobs yet. Add one above.</p>;
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onDelete={() => onDeleteJob(job.id)}
          onUpdate={onUpdateJob}
        />
      ))}
    </div>
  );
}

export default JobList;
