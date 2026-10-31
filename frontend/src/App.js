import { Container } from "@mui/material";
import { Nav } from "./components/AppBar";
import { TaskManager } from "./components/TaskManager";


import "./App.css";

function App() {
  return (
    <>
      <Nav />

      <Container maxWidth={false} className="App">
        <div className="task-manager">
          <TaskManager />
        </div>
      </Container>
    </>
  );
}

export default App;