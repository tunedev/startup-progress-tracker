// TODO: Add An AuthenticatedApp component that interacts with the backend using Apollo Client
import UnAuthenticatedApp from "./Unauthenticated-App";
import { ProjectProvider } from "context/project-context";

function App() {
  // TODO: check if user is authenticated
  // TODO: if user is authenticated, render the AuthenticatedApp
  return (
    <ProjectProvider>
      <UnAuthenticatedApp />
    </ProjectProvider>
  );
}

export default App;
