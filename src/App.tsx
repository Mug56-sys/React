import "./index.css";
import Lists from "./Components/Lists";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className=" flex flex-col justify-center text-2xl  items-center pt-50 ">
      <Navbar />
      <Lists/>
      <Footer />
    </div>
  );
}

export default App;
