"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TextField } from "@/components/_ui/TextField";
import { Button } from "@/components/_ui/Button";
import { Alert } from "@/components/_ui/Alert";

interface Term {
  id: string;
  name: string;
  description: string | null;
  startDate: string;
  endDate: string;
  live: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminSessionsPage() {
  const router = useRouter();
  const [terms, setTerms] = useState<Term[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    live: false,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/term");
      if (!response.ok) throw new Error("Failed to fetch terms");
      const data = await response.json();
      setTerms(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load terms");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/term", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create term");
      }

      setFormData({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        live: false,
      });
      await fetchTerms();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create term");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Session Management</h1>

      <section>
        <form onSubmit={handleSubmit} noValidate>
          <h2>Create New Session</h2>
          <TextField
            label="Name"
            name="name"
            initialValue={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <TextField
            label="Description"
            name="description"
            initialValue={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            multiline
            rows={4}
          />

          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            initialValue={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
            InputLabelProps={{
              shrink: true, // Forces the label to move to the top
            }}
          />

          <TextField
            label="End Date"
            name="endDate"
            type="date"
            initialValue={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
            InputLabelProps={{
              shrink: true, // Forces the label to move to the top
            }}
          />

          <input
            type="checkbox"
            id="live"
            name="live"
            checked={formData.live}
            onChange={(e) =>
              setFormData({ ...formData, live: e.target.checked })
            }
          />
          <label htmlFor="live">Live (Active Session)</label>

          {error && <Alert type="error">{error}</Alert>}

          <Button type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Create Session"}
          </Button>
        </form>
      </section>

      <section>
        <h2>Sessions</h2>
        {loading ? (
          <p>loading...</p>
        ) : terms.length === 0 ? (
          <p>No sessions found.</p>
        ) : (
          <section>
            {terms.map((term) => (
              <article key={term.id}>
                <h4>{term.name}</h4>
                {term.description && <p>{term.description}</p>}
                <div>
                  Start: {new Date(term.startDate).toLocaleDateString()} - End:{" "}
                  {new Date(term.endDate).toLocaleDateString()}
                </div>
                <div>Status: {term.live ? "Live" : "Inactive"}</div>
                <div>
                  Created: {new Date(term.createdAt).toLocaleDateString()}
                </div>
                <div>
                  Updated: {new Date(term.updatedAt).toLocaleDateString()}
                </div>
                <Button
                  onClick={() => router.push(`/admin/sessions/${term.id}/edit`)}
                >
                  Edit
                </Button>
              </article>
            ))}
          </section>
        )}
      </section>
    </div>
  );
}
