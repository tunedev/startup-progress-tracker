# This is the backend of the startup projects tracker

## It helps you track those steps required to get your projects from idea to a billion dollar success

### Steps to run the backend on your local

- Ensure you have the latest node installed on the machine
- Also ensure your npm is up to date
- Clone this repository and cd into the backend folder
- run `npm install' to install all dependencies
- run `npm run setup` to get the db up and running, it uses sqlite for inmemory data persistence
- Then run `npm start` to kick start the graphQL server
- Click on the link generated on the terminal to interact with the graphiql

### Tech used for the backend are:

- graphQl
- prisma
- @graphql-yoga/node
- sqlite
- typescript, ts-node and ts-node-dev
- Nodejs

#### Below are example queries to test the resolvers present

---

```graphql
mutation authenticate {
  signin(username: "tundev", password: "password") {
    id
    token
  }
}

mutation addNewProject {
  createProject(description: "test proj", name: "testing 12") {
    id
  }
}

mutation addNewStage {
  createStage(
    name: "Crave T12"
    description: "testing things out"
    projectId: 1
  ) {
    id
    project {
      id
    }
    prevStage {
      name
      allTaskDone
    }
  }
}

mutation addTask {
  createTask(
    stageId: 2
    name: "test task"
    description: "This is a test task"
  ) {
    id
    done
  }
}

mutation toggleTask {
  toggleTaskStatus(taskId: 4) {
    id
    name
    done
  }
}

query getAllStages {
  getStages {
    name
    id
    allTaskDone
    prevStage {
      id
    }
    tasks {
      id
      name
      done
      stageId
    }
  }
}

mutation signin {
  signin(username: "tundev", password: "password") {
    token
    id
  }
}

mutation createProject {
  createProject(name: "Vekees initial proj", description: "initial project") {
    id
    name
    user {
      id
    }
  }
}

mutation creatingStage {
  createStage(
    name: "initial stage"
    description: "intitial Stage"
    projectId: 2
  ) {
    name
  }
}

query getPojects {
  getProjects {
    id
    name
    userId
  }
}
```
