import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import './css/app.css'

function App() {
    return (
        <>
            <nav>
                <NavBar/>
            </nav>
                <main className="main-content">
                    <Home/>
                </main>
        </>
    )
}
export default App
