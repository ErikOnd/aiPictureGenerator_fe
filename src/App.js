import "./App.css";
import FormComponent from "./components/FormComponent";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Container>
        <FormComponent></FormComponent>
      </Container>
    </div>
  );
}

export default App;
