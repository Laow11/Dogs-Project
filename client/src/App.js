import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import PostDog from "./components/PostDog";
import DogDetail from "./components/DogDetail";
import Err from "./components/ErrorNotFound";
import About from "./components/About";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/create" component={PostDog} />
        <Route path="/dog/:id" component={DogDetail} />
        <Route path="/about" component={About} />
        <Route path="*" component={Err} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
