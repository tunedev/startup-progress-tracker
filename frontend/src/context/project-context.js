import { useContext, createContext } from "react";
import { project } from "utils/dummyData";
import { useLocalStorage } from "utils/hooks";

const ProjectContext = createContext();
ProjectContext.displayName = "ProjectContext";

function ProjectProvider({ children }) {
  const [projects, setProjects] = useLocalStorage("project-db", project);

  return (
    <ProjectContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectContext.Provider>
  );
}

const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProjectContext must be used within a ProjectProvider");
  }
  return context;
};

export { ProjectProvider, useProjectContext };
