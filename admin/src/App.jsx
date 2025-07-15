import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Education from './pages/Education'
import Experience from './pages/Experience'
import Skills from './pages/Skills'
import Portfolio from './pages/Portfolio'
import Services from './pages/Services'
import Testimonials from './pages/Testimonials'
import Pricing from './pages/Pricing'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

// Public Route Component (redirect to dashboard if authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />
}

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* <div className="App"> */}
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/education" element={<Education />} />
                      <Route path="/experience" element={<Experience />} />
                      <Route path="/skills" element={<Skills />} />
                      <Route path="/portfolio" element={<Portfolio />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/testimonials" element={<Testimonials />} />
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster position="top-right" />
        {/* </div> */}
      </Router>
    </AuthProvider>
  )
}

export default App