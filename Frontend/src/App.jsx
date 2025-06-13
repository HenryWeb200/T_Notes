import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import NoteDetail from "./pages/NoteDetail";

const App = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      
      {/* Custom Gradient Background - stays at back */}
      <div
        className="absolute inset-0 z-0 w-full h-full pointer-events-none"
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #000 70%, #009DFF40 100%)"
        }}
      />


      {/* Theme Content Layer */}
      <div
        data-theme="forest"
        className="relative z-10 bg-transparent"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateNote />} />
          <Route path="/note/:id" element={<NoteDetail />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;


