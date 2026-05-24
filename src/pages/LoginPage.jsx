import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Navbar from '../components/Navbar.jsx'

function AuthCard() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      console.log('[Login] status:', res.status, 'data:', data)
      if (!res.ok) { setError(data.message || 'Đăng nhập thất bại.'); return }
      console.log('[Login] calling login(), user:', data.user)
      login(data, remember)
      if (data.user?.isAdmin) {
        console.log('[Login] navigating to /admin')
        navigate('/admin')
      } else {
        console.log('[Login] navigating to /')
        navigate('/')
      }
    } catch {
      setError('Không thể kết nối server. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative w-full max-w-[480px] overflow-hidden rounded-[20px] border border-[#2A2A2A] bg-[#1A1A1A] px-[41px] py-[49px] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[478px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(88.21%_60.69%_at_50%_50%,rgba(232,197,71,0.08)_0%,rgba(0,0,0,0)_70%)]" />

      <div className="relative flex flex-col items-center gap-3 text-center">
        <h1 className="m-0 text-[32px] font-bold leading-[48px] text-white" style={{ fontFamily: "'Gowun Batang', serif" }}>
          Đăng Nhập
        </h1>
        <p className="m-0 text-sm leading-[22px] text-[#9CA3AF]" style={{ fontFamily: "'Gowun Batang', serif" }}>
          Chào mừng trở lại!{' '}
          <Link to="/sign-up" className="text-[#E8C547]">Đăng ký ngay</Link>
        </p>
      </div>

      <form className="relative mt-10 flex flex-col gap-6" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-[10px] border border-[#D62828]/40 bg-[rgba(214,40,40,0.08)] px-4 py-3 text-sm text-[#D62828]" style={{ fontFamily: "'Gowun Batang', serif" }}>
            {error}
          </div>
        )}

        <div className="flex flex-col gap-[10px]">
          <label className="text-sm font-medium leading-[21px] text-[#9CA3AF]" style={{ fontFamily: "'Gowun Batang', serif" }}>Email</label>
          <input
            type="email" placeholder="Nhập email của bạn" value={email}
            onChange={(e) => setEmail(e.target.value)} required
            className="h-[56.5px] rounded-[12px] border border-[#2A2A2A] bg-[#141414] px-5 text-[15px] text-white outline-none placeholder:text-[#6B7280] focus:border-[#E8C547]/50"
            style={{ fontFamily: "'Gowun Batang', serif" }}
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <label className="text-sm font-medium leading-[21px] text-[#9CA3AF]" style={{ fontFamily: "'Gowun Batang', serif" }}>Mật khẩu</label>
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'} placeholder="Nhập mật khẩu" value={password}
              onChange={(e) => setPassword(e.target.value)} required
              className="h-[56.5px] w-full rounded-[12px] border border-[#2A2A2A] bg-[#141414] px-5 pr-14 text-[15px] text-white outline-none placeholder:text-[#6B7280] focus:border-[#E8C547]/50"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            />
            <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-white" aria-label="Hiện mật khẩu">
              <svg viewBox="0 0 18 18" fill="none" className="h-[18px] w-[18px]" aria-hidden="true">
                <path d="M1.5 9C2.93 5.91 5.67 4.13 9 4.13C12.33 4.13 15.07 5.91 16.5 9C15.07 12.09 12.33 13.87 9 13.87C5.67 13.87 2.93 12.09 1.5 9Z" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="9" cy="9" r="2.25" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <label className="flex items-center gap-[10px]">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-[18px] w-[18px] accent-[#E8C547]" />
            <span className="text-base font-medium leading-6 text-[#9CA3AF]" style={{ fontFamily: "'Gowun Batang', serif" }}>Ghi nhớ đăng nhập</span>
          </label>
          <Link to="#" className="text-sm leading-[22px] text-[#E8C547]" style={{ fontFamily: "'Gowun Batang', serif" }}>Quên mật khẩu?</Link>
        </div>

        <button type="submit" disabled={loading}
          className="h-[60px] rounded-[12px] bg-[linear-gradient(135deg,#E8C547_0%,#D4A837_100%)] text-base font-semibold text-[#0A0A0A] transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ fontFamily: "'Gowun Batang', serif" }}
        >
          {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
        </button>
      </form>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1536px] flex-col items-center bg-white">
      <Navbar />
      <main className="flex w-full flex-1 items-start justify-center bg-[#1E1E1E] px-4 py-10 md:px-8 md:py-16">
        <AuthCard />
      </main>
    </div>
  )
}
