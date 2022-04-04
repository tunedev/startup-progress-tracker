/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Container } from "react-bootstrap";
import { useProjectContext } from "context/project-context";
import { useNotificationCtx } from "context/notification-context";
import * as mq from "styles/media-queries";
import * as colors from "styles/colors";
import { ProjectsUnAuth as Projects } from "components/Projects";

function App() {
  const { notification } = useNotificationCtx();
  const { projects } = useProjectContext();
  return (
    <div
      className="wrapper"
      css={{
        margin: "0",
        padding: "20px 0",
        boxSizing: "border-box",
        height: "100vh",
        [mq.small]: {
          padding: "0",
        },
      }}
    >
      <Container
        css={{
          background: "#fff",
          marginTop: "40px",
          height: "95%",
          width: "80%",
          boxSizing: "border-box",
          paddingTop: "30px",
          paddingBottom: "30px",
          borderRadius: "3px",
          display: "grid",
          gridTemplateRows: "auto 50px",
          [mq.small]: {
            height: "100%",
            marginTop: "0",
            paddingTop: "15px",
            paddingBottom: "20px",
          },
        }}
      >
        <div
          css={{
            display: "grid",
            gridTemplateRows: "80px auto",
            width: "90%",
            margin: "20px auto",
            overflow: "hidden",
            [mq.small]: {
              width: "100%",
              margin: "0",
            },
          }}
        >
          {notification ? (
            <div
              className="alert alert-danger fade show text-justify position-absolute"
              role="alert"
            >
              <strong>An Error occured: </strong>
              {notification.message}
            </div>
          ) : null}
          <Projects />
        </div>
        <div
          css={{
            padding: "0",
            paddingLeft: "50px",
            borderTop: `1px solid ${colors.gray2}`,
            [mq.small]: {
              paddingLeft: "10px",
            },
          }}
        >
          {projects.stages.length > 0 ? (
            <button
              className="btn btn-outline-danger mt-3"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete all projects?"
                  )
                ) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
            >
              Reset Project
            </button>
          ) : null}
        </div>
      </Container>
    </div>
  );
}

export default App;
