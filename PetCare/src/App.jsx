import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    axios.get("http://localhost:5000/")
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>🐕 Pet Care & Adoption System</h1>
    </div>
  );
}

export default App;
