// import { Link } from "react-router-dom";
import Button from "./components/Button/Button";
import InputLogin from "./components/Input-login/Input-login";

function App() {
  return (
    <div className="app">
      <Button sizeType="small">text</Button>
      <Button sizeType="big">text</Button>
      <InputLogin labelText="test" id="test" placeholder="test"></InputLogin>
    </div>
  );
}

export default App;
