import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Footer from './components/ui/Footer';
import useAuthCheck from './hooks/useAuthCheck';
import Login from './pages/Login';
import ProjectTeams from './pages/ProjectTeams';
import Teams from './pages/Teams';

function App() {
    const authAvailable = useAuthCheck();

    return !authAvailable ? (
        <div>Checking Authorization...</div>
    ) : (
        <Router>
            <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
                <Routes>
                    <Route
                        index
                        path="/"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/teams"
                        element={
                            <PrivateRoute>
                                <Teams />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/projects"
                        element={
                            <PrivateRoute>
                                <ProjectTeams />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <main style={{ padding: '1rem' }}>
                                <p>There&apos;s nothing here!</p>
                            </main>
                        }
                    />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
