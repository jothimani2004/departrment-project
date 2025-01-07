import { Routes, Route } from "react-router-dom";

export const RouterPath = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<h1>Testing</h1>} />
      </Routes>
    </div>
  );
};
