import Accordion from "./Accordion";
import data from "./data";

function App() {
  return (
    <div className="app">
      <h1>Accordion Component</h1>
      <Accordion data={data} />
    </div>
  );
}

export default App;
