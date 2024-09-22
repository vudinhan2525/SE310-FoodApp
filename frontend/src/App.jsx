import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/layouts/DefaultLayout";
import { publicRoutes } from "./routes/routes";
function App() {
  return (
    <Router>
      <div
        spellCheck={false}
        id="appjs"
        className=" font-OpenSans text-base overflow-hidden font-medium bg-white  "
      >
        <Routes>
          {publicRoutes.map((el, idx) => {
            const Layout = el.layout || DefaultLayout;
            return (
              <Route
                key={idx}
                path={el.path}
                element={
                  <Layout>
                    <el.component></el.component>
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
