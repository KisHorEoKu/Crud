import React from 'react'
import { BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import { Dashboard } from '../dashboard/dashboard';

const router = () => {
  return (
    <Router>
        <Routes>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Routes>
    </Router>
  )
}

export default router