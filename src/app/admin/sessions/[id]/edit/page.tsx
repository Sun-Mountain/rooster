"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Alert, CircularProgress, Box } from "@mui/material";
import { TextField } from "@/components/_ui/TextField";
import { Button } from "@/components/_ui/Button";
import { Checkbox } from "@/components/_ui/Checkbox";

interface Term {
  id: string;
  name: string;
  description: string | null;
  startDate: string;
  endDate: string;
  live: boolean;
}

export default function EditTermPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

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
    fetchTerm(id);
  }, [id]);

  const fetchTerm = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/term/${id}`);
      if (!response.ok) throw new Error("Failed to fetch term");
      const term: Term = await response.json();
      console.log(term);
      setFormData({
        name: term.name,
        description: term.description || "",
        startDate: term.startDate.split("T")[0],
        endDate: term.endDate.split("T")[0],
        live: term.live,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load term");
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
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...formData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update term");
      }

      router.push("/admin/sessions");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update term");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="form-container">
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h1>Edit Term</h1>

      <section>
        <form onSubmit={handleSubmit} noValidate>
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
          />

          <TextField
            label="End Date"
            name="endDate"
            type="date"
            initialValue={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, my: 2 }}>
            <Checkbox
              checked={formData.live}
              onChange={(e) =>
                setFormData({ ...formData, live: e.target.checked })
              }
            />
            <label htmlFor="live">Live (Active Session)</label>
          </Box>

          {error && (
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <div className="flex-fields-container">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Updating..." : "Update Term"}
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/admin/sessions")}
              disabled={submitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
