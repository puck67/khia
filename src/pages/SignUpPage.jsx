import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Navbar from '../components/Navbar.jsx'

function EyeIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" className="h-[18px] w-[18px]" aria-hidden="true">
      <path d="M1.5 9C2.93 5.91 5.67 4.13 9 4.13C12.33 4.13 15.07 5.91 16.5 9C15.07 12.09 12.33 13.87 9 13.87C5.67 13.87 2.93 12.09 1.5 9Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9" cy="9" r="2.25" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function Field({ label, required = false, placeholder, type = 'text', value, onChange, rightIcon = null, onToggle = null }) {
  return (
    <div className="flex flex-col gap-[10px]">
      <label className="text-sm font-medium leading-[21px] text-[#9CA3AF]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
        {label}
        {required && <span className="text-[#D93F3F]"> *</span>}
      </label>
      <div className="relative">
        <input
          type={type} placeholder={placeholder} value={value} onChange={onChange} required={required}
          className={`h-[56.5px] w-full rounded-[12px] border border-[#2A2A2A] bg-[#141414] px-5 text-[15px] text-white outline-none placeholder:text-[#6B7280] focus:border-[#E8C547]/50 ${rightIcon ? 'pr-14' : ''}`}
          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
        />
        {rightIcon && (
          <button type="button" onClick={onToggle} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-white" aria-label="Hiện nội dung">
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  )
}

function AuthCard() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '', role: '' })
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) { setError('Mật khẩu xác nhận không khớp.'); return }
    if (!agreed) { setError('Vui lòng đồng ý với điều khoản dịch vụ.'); return }
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone, password: form.password, role: form.role }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.message || 'Đăng ký thất bại.'); return }
      login(data, false)
      navigate('/')
    } catch {
      setError('Không thể kết nối server. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative w-full max-w-[520px] overflow-hidden rounded-[20px] border border-[#2A2A2A] bg-[#1A1A1A] px-[41px] py-[49px] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[580px] w-[518px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(119.66%_55.03%_at_50%_50%,rgba(232,197,71,0.08)_0%,rgba(0,0,0,0)_70%)]" />

      <div className="relative flex flex-col items-center gap-3 text-center">
        <h1 className="m-0 text-[32px] font-bold leading-[48px] text-white" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>Tạo Tài Khoản</h1>
        <p className="m-0 text-sm leading-[22px] text-[#9CA3AF]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-[#E8C547]">Đăng nhập ngay</Link>
        </p>
      </div>

      <form className="relative mt-9 flex flex-col gap-5" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-[10px] border border-[#D62828]/40 bg-[rgba(214,40,40,0.08)] px-4 py-3 text-sm text-[#D62828]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
            {error}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Họ" required placeholder="Nhập họ của bạn" value={form.lastName} onChange={set('lastName')} />
          <Field label="Tên" required placeholder="Nhập tên của bạn" value={form.firstName} onChange={set('firstName')} />
        </div>
        <Field label="Email" required placeholder="Nhập email của bạn" type="email" value={form.email} onChange={set('email')} />
        <Field label="Số điện thoại" required placeholder="Nhập số điện thoại" value={form.phone} onChange={set('phone')} />
        <Field label="Mật khẩu" required placeholder="Tạo mật khẩu" type={showPw ? 'text' : 'password'} value={form.password} onChange={set('password')} rightIcon={<EyeIcon />} onToggle={() => setShowPw((v) => !v)} />
        <Field label="Xác nhận mật khẩu" required placeholder="Nhập lại mật khẩu" type={showConfirm ? 'text' : 'password'} value={form.confirmPassword} onChange={set('confirmPassword')} rightIcon={<EyeIcon />} onToggle={() => setShowConfirm((v) => !v)} />

        <div className="flex flex-col gap-[10px]">
          <label className="text-sm font-medium leading-[21px] text-[#9CA3AF]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>Bạn là</label>
          <div className="relative">
            <select value={form.role} onChange={set('role')}
              className="h-[58px] w-full appearance-none rounded-[12px] border border-[#2A2A2A] bg-[#141414] px-5 text-[15px] text-[#9CA3AF] outline-none focus:border-[#E8C547]/50"
              style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
            >
              <option value="" disabled>Chọn vai trò của bạn</option>
              <option value="ca-nhan">Cá nhân</option>
              <option value="thuong-hieu">Thương hiệu</option>
              <option value="doanh-nghiep">Doanh nghiệp</option>
              <option value="doi-tac">Đối tác</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
              <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 text-[#9CA3AF]" aria-hidden="true">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>

        <label className="mt-1 flex items-start gap-3">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 h-[18px] w-[18px] accent-[#E8C547]" />
          <span className="text-base font-medium leading-6 text-[#9CA3AF]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
            Tôi đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của Phiền TV.
          </span>
        </label>

        <button type="submit" disabled={loading}
          className="mt-1 h-[60px] rounded-[12px] bg-[linear-gradient(135deg,#E8C547_0%,#D4A837_100%)] text-base font-semibold text-[#0A0A0A] transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
        >
          {loading ? 'Đang tạo tài khoản...' : 'Tạo Tài Khoản'}
        </button>
      </form>
    </div>
  )
}

export default function SignUpPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col items-center bg-white">
      <Navbar />
      <main className="flex w-full flex-1 items-start justify-center bg-[#1E1E1E] px-4 py-10 md:px-8 md:py-16">
        <AuthCard />
      </main>
    </div>
  )
}
