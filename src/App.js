import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Body></Body>
      <Footer />
    </div>
  );
}

export default App;
