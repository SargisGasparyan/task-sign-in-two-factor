import SignInPage from '@pages/sign-in/SignInPage';
import TwoFaPage from '@pages/two-fa/TwoFaPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* По умолчанию редиректим на /signin */}
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/two-fa" element={<TwoFaPage />} />
      </Routes>
    </Router>
  );
}

export default App;
