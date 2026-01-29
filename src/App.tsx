import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NotFound } from "./pages/NotFoundPage";
import { SavedLoc } from "./pages/SavedLocPage";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/preferiti" element={<SavedLoc />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;