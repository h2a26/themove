import './App.css'
import {DefaultLayout} from "./layouts/DefaultLayout.tsx";
import {Home} from "./pages/Home.tsx";

function App() {

  return (
      <>
          <DefaultLayout>
              <Home />
          </DefaultLayout>
      </>
  )
}

export default App
