import { useCallback, useEffect, useState } from "react";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";
import AssignmentForm from "./AssignmentForm";
import { Button, Card, Container, Spinner, ListGroup } from "react-bootstrap";

const TeacherDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchAssignments = useCallback(async () => {
    try {
      const { data } = await api.get("/assignments", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setAssignments(data);
    } catch (err) {
      console.error("Failed to load assignments", err);
    } finally {
      setLoading(false);
    }
  }, [user.token]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(
        `/assignments/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchAssignments();
    } catch (err) {
      console.error("Failed to update status", err);
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
      <h2 className="mb-4 text-center fw-bold">Teacher Dashboard</h2>

      <AssignmentForm onCreated={fetchAssignments} />

      <div className="mt-4">
        {assignments.length === 0 ? (
          <p className="text-center text-muted">No assignments yet.</p>
        ) : (
          assignments.map((assignment) => (
            <Card key={assignment._id} className="mb-3 shadow-sm">
              <Card.Body>
                <Card.Title>{assignment.title}</Card.Title>
                <Card.Text>{assignment.description}</Card.Text>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted">
                    Status:{" "}
                    <strong
                      className={
                        assignment.status === "Published"
                          ? "text-success"
                          : assignment.status === "Completed"
                          ? "text-primary"
                          : "text-warning"
                      }
                    >
                      {assignment.status}
                    </strong>
                  </span>

                  <div className="d-flex gap-2">
                    {assignment.status === "Draft" && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() =>
                          handleStatusChange(assignment._id, "Published")
                        }
                      >
                        Publish
                      </Button>
                    )}

                    {assignment.status === "Published" && (
                      <>
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() =>
                            handleStatusChange(assignment._id, "Completed")
                          }
                        >
                          Mark as Completed
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            handleStatusChange(assignment._id, "Draft")
                          }
                        >
                          Unpublish
                        </Button>
                      </>
                    )}

                    {assignment.status === "Completed" && (
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() =>
                          handleStatusChange(assignment._id, "Published")
                        }
                      >
                        Reopen Assignment
                      </Button>
                    )}
                  </div>
                </div>

                {/* Student Submissions */}
                {assignment.submissions && assignment.submissions.length > 0 ? (
                  <>
                    <h6 className="fw-bold">Student Submissions:</h6>
                    <ListGroup variant="flush">
                      {assignment.submissions.map((submission, index) => (
                        <ListGroup.Item key={index}>
                          <strong>{submission.student.name}:</strong>{" "}
                          <span>{submission.answer}</span>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </>
                ) : (
                  <p className="text-muted">No submissions yet.</p>
                )}
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </Container>
  );
};

export default TeacherDashboard;
