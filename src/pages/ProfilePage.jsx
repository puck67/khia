import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Navbar from '../components/Navbar.jsx'

const ROLE_LABELS = {
  'ca-nhan': 'Cá nhân',
  'thuong-hieu': 'Thương hiệu',
  'doanh-nghiep': 'Doanh nghiệp',
  'doi-tac': 'Đối tác',
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" className="h-[18px] w-[18px]" aria-hidden="true">
      <path d="M1.5 9C2.93 5.91 5.67 4.13 9 4.13C12.33 4.13 15.07 5.91 16.5 9C15.07 12.09 12.33 13.87 9 13.87C5.67 13.87 2.93 12.09 1.5 9Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9" cy="9" r="2.25" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function InputField({ label, value, onChange, type = 'text', placeholder, disabled = false, rightIcon, onToggle }) {
  return (
    <div className="flex flex-col gap-[10px]">
      <label className="text-sm font-medium text-[#9CA3AF]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`h-[52px] w-full rounded-[12px] border border-[#2A2A2A] bg-[#141414] px-5 text-[15px] text-white outline-none placeholder:text-[#6B7280] transition-colors focus:border-[#E8C547]/50 ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${rightIcon ? 'pr-14' : ''}`}
          style={{ fontFamily: "'Gowun Batang', serif" }}
        />
        {rightIcon && (
          <button type="button" onClick={onToggle} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-white">
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  )
}

function Toast({ message, type }) {
  if (!message) return null
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-[12px] border px-5 py-3 shadow-lg transition-all ${type === 'success' ? 'border-[#E8C547]/30 bg-[rgba(232,197,71,0.1)] text-[#E8C547]' : 'border-[#D62828]/30 bg-[rgba(214,40,40,0.1)] text-[#D62828]'}`}
      style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
    >
      {type === 'success'
        ? <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5 shrink-0"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" /><path d="M6.5 10.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        : <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5 shrink-0"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" /><path d="M10 6v4M10 13v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      }
      {message}
    </div>
  )
}

export default function ProfilePage() {
  const { user, getToken, updateUser, logout } = useAuth()
  const navigate = useNavigate()

  const [tab, setTab] = useState('info') // 'info' | 'password'
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ message: '', type: 'success' })

  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    role: user?.role || 'ca-nhan',
  })

  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' })
  const [showPw, setShowPw] = useState({ current: false, next: false, confirm: false })

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    // Fetch fresh profile from server
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/profile`, { headers: { Authorization: `Bearer ${getToken()}` } })
      .then((r) => r.json())
      .then((data) => {
        if (data.id) {
          setForm({ firstName: data.firstName, lastName: data.lastName, phone: data.phone, role: data.role })
        }
      })
      .catch(() => {})
  }, [])

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast({ message: '', type: 'success' }), 3000)
  }

  const handleSaveInfo = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { showToast(data.message, 'error'); return }
      updateUser(data.user)
      showToast('Cập nhật hồ sơ thành công.')
    } catch {
      showToast('Không thể kết nối server.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (pwForm.next !== pwForm.confirm) { showToast('Mật khẩu xác nhận không khớp.', 'error'); return }
    if (pwForm.next.length < 6) { showToast('Mật khẩu mới phải ít nhất 6 ký tự.', 'error'); return }
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.next }),
      })
      const data = await res.json()
      if (!res.ok) { showToast(data.message, 'error'); return }
      setPwForm({ current: '', next: '', confirm: '' })
      showToast('Đổi mật khẩu thành công.')
    } catch {
      showToast('Không thể kết nối server.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const initials = `${(user?.firstName || '')[0] || ''}${(user?.lastName || '')[0] || ''}`.toUpperCase() || 'U'
  const fullName = `${user?.lastName || ''} ${user?.firstName || ''}`.trim()

  return (
    <div className="mx-auto min-h-screen w-full max-w-[1280px] bg-[#0A0A0A] text-white">
      <Navbar />

      <main className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-[860px]">

          {/* Profile header */}
          <div className="relative mb-10 overflow-hidden rounded-[20px] border border-[#2A2A2A] bg-[#1A1A1A] px-8 py-8 md:px-10">
            <div className="pointer-events-none absolute right-0 top-0 h-[200px] w-[300px] bg-[radial-gradient(ellipse_at_top_right,rgba(232,197,71,0.06)_0%,transparent_70%)]" />
            <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#E8C547_0%,#D4A837_100%)] text-2xl font-bold text-[#0A0A0A]">
                {initials}
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="m-0 text-[26px] font-bold text-white" style={{ fontFamily: "'Gowun Batang', serif" }}>
                  {fullName || 'Người dùng'}
                </h1>
                <p className="m-0 text-sm text-[#9CA3AF]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                  {user?.email}
                </p>
                <span className="mt-1 inline-flex w-fit items-center rounded-full border border-[#E8C547]/20 bg-[rgba(232,197,71,0.08)] px-3 py-0.5 text-xs font-medium text-[#E8C547]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                  {ROLE_LABELS[user?.role] || user?.role}
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex gap-1 rounded-[12px] border border-[#2A2A2A] bg-[#1A1A1A] p-1">
            {[
              { key: 'info', label: 'Thông tin cá nhân' },
              { key: 'password', label: 'Đổi mật khẩu' },
            ].map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`flex-1 rounded-[10px] py-2.5 text-sm font-semibold transition-colors ${tab === t.key ? 'bg-[#E8C547] text-[#0A0A0A]' : 'text-[#9CA3AF] hover:text-white'}`}
                style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab: Info */}
          {tab === 'info' && (
            <form onSubmit={handleSaveInfo} className="overflow-hidden rounded-[20px] border border-[#2A2A2A] bg-[#1A1A1A] px-8 py-8 md:px-10">
              <h2 className="m-0 mb-6 text-[20px] font-bold text-white" style={{ fontFamily: "'Gowun Batang', serif" }}>
                Thông tin cá nhân
              </h2>
              <div className="flex flex-col gap-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <InputField
                    label="Họ"
                    value={form.lastName}
                    onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                    placeholder="Nhập họ"
                  />
                  <InputField
                    label="Tên"
                    value={form.firstName}
                    onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                    placeholder="Nhập tên"
                  />
                </div>

                <InputField label="Email" value={user?.email || ''} disabled placeholder="" />

                <InputField
                  label="Số điện thoại"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="Nhập số điện thoại"
                />

                <div className="flex flex-col gap-[10px]">
                  <label className="text-sm font-medium text-[#9CA3AF]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                    Vai trò
                  </label>
                  <div className="relative">
                    <select
                      value={form.role}
                      onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                      className="h-[52px] w-full appearance-none rounded-[12px] border border-[#2A2A2A] bg-[#141414] px-5 text-[15px] text-[#9CA3AF] outline-none focus:border-[#E8C547]/50"
                      style={{ fontFamily: "'Gowun Batang', serif" }}
                    >
                      <option value="ca-nhan">Cá nhân</option>
                      <option value="thuong-hieu">Thương hiệu</option>
                      <option value="doanh-nghiep">Doanh nghiệp</option>
                      <option value="doi-tac">Đối tác</option>
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                      <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-8 h-[52px] w-full rounded-[12px] bg-[linear-gradient(135deg,#E8C547_0%,#D4A837_100%)] text-base font-semibold text-[#0A0A0A] transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
              >
                {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
            </form>
          )}

          {/* Tab: Password */}
          {tab === 'password' && (
            <form onSubmit={handleChangePassword} className="overflow-hidden rounded-[20px] border border-[#2A2A2A] bg-[#1A1A1A] px-8 py-8 md:px-10">
              <h2 className="m-0 mb-6 text-[20px] font-bold text-white" style={{ fontFamily: "'Gowun Batang', serif" }}>
                Đổi mật khẩu
              </h2>
              <div className="flex flex-col gap-5">
                <InputField
                  label="Mật khẩu hiện tại"
                  type={showPw.current ? 'text' : 'password'}
                  value={pwForm.current}
                  onChange={(e) => setPwForm((f) => ({ ...f, current: e.target.value }))}
                  placeholder="Nhập mật khẩu hiện tại"
                  rightIcon={<EyeIcon />}
                  onToggle={() => setShowPw((s) => ({ ...s, current: !s.current }))}
                />
                <InputField
                  label="Mật khẩu mới"
                  type={showPw.next ? 'text' : 'password'}
                  value={pwForm.next}
                  onChange={(e) => setPwForm((f) => ({ ...f, next: e.target.value }))}
                  placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
                  rightIcon={<EyeIcon />}
                  onToggle={() => setShowPw((s) => ({ ...s, next: !s.next }))}
                />
                <InputField
                  label="Xác nhận mật khẩu mới"
                  type={showPw.confirm ? 'text' : 'password'}
                  value={pwForm.confirm}
                  onChange={(e) => setPwForm((f) => ({ ...f, confirm: e.target.value }))}
                  placeholder="Nhập lại mật khẩu mới"
                  rightIcon={<EyeIcon />}
                  onToggle={() => setShowPw((s) => ({ ...s, confirm: !s.confirm }))}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-8 h-[52px] w-full rounded-[12px] bg-[linear-gradient(135deg,#E8C547_0%,#D4A837_100%)] text-base font-semibold text-[#0A0A0A] transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
              >
                {loading ? 'Đang đổi...' : 'Đổi mật khẩu'}
              </button>
            </form>
          )}
        </div>
      </main>

      <Toast message={toast.message} type={toast.type} />
    </div>
  )
}
