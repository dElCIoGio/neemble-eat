import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {ROUTES} from "@/lib/routes";
import {AuthVerification} from "@/service/firebase/AuthVerification.tsx";


function App() {

	return (
		<div>
            <Router>
              <Routes>
	              {
		              ROUTES.map(route => <Route
			              key={route.path}
			              element={route.requiresAuth ?
				              <AuthVerification>{route.element}</AuthVerification> :
				              route.element}
			              path={route.path}/>
		              )
	              }
              </Routes>
            </Router>
        </div>
	)
}

export default App
