import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { Card, Container, Button, Form, Alert, Spinner } from "react-bootstrap";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchAssignments = async () => {
    try {
      const res = await api.get("/assignments", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setAssignments(res.data);
    } catch (err) {
      alert("Failed to fetch assignments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [user.token]);

  const handleSubmit = async (assignmentId) => {
    const answer = answers[assignmentId];
    if (!answer) return;

    try {
      await api.post(
        "/submissions",
        { assignmentId, answer },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert("Answer submitted!");
      setAnswers((prev) => ({ ...prev, [assignmentId]: "" }));
      fetchAssignments(); // refresh view
    } catch (err) {
      alert(err.response?.data?.message || "Submission failed");
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </div>
    );

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">Student Dashboard</h2>

      {assignments.length === 0 ? (
        <p className="text-muted text-center">No assignments available.</p>
      ) : (
        assignments.map((a) => (
          <Card key={a._id} className="mb-3">
            <Card.Body>
              <Card.Title>{a.title}</Card.Title>
              <Card.Text>{a.description}</Card.Text>

              {a.submission ? (
                <Alert variant="success">
                  <strong>Your Answer:</strong>
                  <p>{a.submission.answer}</p>
                  <small className="text-muted">
                    Submitted at:{" "}
                    {new Date(a.submission.submittedAt).toLocaleString()}
                  </small>
                </Alert>
              ) : (
                a.status === "Published" && (
                  <>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Write your answer..."
                      value={answers[a._id] || ""}
                      onChange={(e) =>
                        setAnswers({ ...answers, [a._id]: e.target.value })
                      }
                    />
                    <Button
                      className="mt-2"
                      onClick={() => handleSubmit(a._id)}
                      disabled={!answers[a._id]}
                    >
                      Submit
                    </Button>
                  </>
                )
              )}
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default StudentDashboard;
