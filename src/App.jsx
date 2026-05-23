import { Navigate, Route, Routes } from 'react-router-dom'
import BookingConfirmPage from './pages/BookingConfirmPage.jsx'
import BookingPage from './pages/BookingPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/san-pham" element={<ProductPage />} />
      <Route path="/dich-vu" element={<ServicesPage />} />
      <Route path="/lien-he" element={<ContactPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/booking/confirm" element={<BookingConfirmPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
