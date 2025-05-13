import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import JobDescription from './pages/JobDescription';
import Candidates from './pages/Candidates';
import Settings from './pages/Settings';
import { ResumeProvider } from './context/ResumeContext';
import { JobProvider } from './context/JobContext';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ResumeProvider>
          <JobProvider>
            <Router>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/upload" element={<Upload />} />
                  <Route path="/job-description" element={<JobDescription />} />
                  <Route path="/candidates" element={<Candidates />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </Layout>
              <Toaster position="top-right" />
            </Router>
          </JobProvider>
        </ResumeProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;