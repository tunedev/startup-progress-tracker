import { Container } from "react-bootstrap";
import { ProjectProvider } from "context/project-context";
import { useNotificationCtx } from "context/notification-context";
import { ProjectsUnAuth as Projects } from "components/Projects";

function App() {
  const { notification } = useNotificationCtx();
  return (
    <ProjectProvider>
      <Container className="mt-3">
        {notification ? (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>An Error occured: </strong>
            {notification.message}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        ) : null}
        <Projects />
      </Container>
    </ProjectProvider>
  );
}

export default App;
