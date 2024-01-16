
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import { Auth } from "./pages/auth";
import { Expense } from "./pages/expense-tracker";
function App() {
  return (
    <div className="App">
<Router>
  <Routes>
    <Route path="/" exact element={<Auth/>}/>
    <Route path="/expense-tracker" element={<Expense/>}></Route>
  </Routes>
</Router>

    </div>
  );
}

export default App;
