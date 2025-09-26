import NotFound from '@pages/not-found/NotFound';
import SignInPage from '@pages/sign-in/SignInPage';
import TwoFaPage from '@pages/two-fa/TwoFaPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* По умолчанию редиректим на /signin */}
        <Route path="/" element={<Navigate to="/sign-in" replace />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/two-fa" element={<TwoFaPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
