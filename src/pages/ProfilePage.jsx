import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Navbar from '../components/Navbar.jsx'

const ROLE_LABELS = {
  'ca-nhan': 'Cá nhân',
  'thuong-hieu': 'Thương hiệu',
  'doanh-nghiep': 'Doanh nghiệp',
  'doi-tac': 'Đối tác',
}

const STATUS_LABELS = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  completed: 'Hoàn thành',
  cancelled: 'Đã huỷ',
}

const STATUS_COLORS = {
  pending: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30',
  confirmed: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
  completed: 'bg-green-500/15 text-green-400 border border-green-500/30',
  cancelled: 'bg-red-500/15 text-red-400 border border-red-500/30',
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
      <label className="text-sm font-medium text-[#9CA3AF]" style={{ fontFamily: "'Gowun Batang', serif" }}>
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
      style={{ fontFamily: "'Gowun Batang', serif" }}
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

  const [tab, setTab] = useState('info') // 'info' | 'password' | 'bookings'
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ message: '', type: 'success' })
  const [bookings, setBookings] = useState([])
  const [loadingBookings, setLoadingBookings] = useState(false)

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

  useEffect(() => {
    if (tab === 'bookings' && user) {
      setLoadingBookings(true)
      fetch(`${import.meta.env.VITE_API_URL || ''}/api/bookings/my`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
        .then((r) => {
          if (!r.ok) throw new Error('Không thể tải lịch sử đặt lịch')
          return r.json()
        })
        .then((data) => setBookings(Array.isArray(data) ? data : []))
        .catch((err) => {
          console.error(err)
          showToast('Lỗi khi tải lịch sử đặt lịch.', 'error')
        })
        .finally(() => setLoadingBookings(false))
    }
  }, [tab, user])

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
    <div className="mx-auto min-h-screen w-full max-w-[1536px] bg-[#0A0A0A] text-white">
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
                <p className="m-0 text-sm text-[#9CA3AF]" style={{ fontFamily: "'Gowun Batang', serif" }}>
                  {user?.email}
                </p>
                <span className="mt-1 inline-flex w-fit items-center rounded-full border border-[#E8C547]/20 bg-[rgba(232,197,71,0.08)] px-3 py-0.5 text-xs font-medium text-[#E8C547]" style={{ fontFamily: "'Gowun Batang', serif" }}>
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
              { key: 'bookings', label: 'Lịch sử đặt lịch' },
            ].map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`flex-1 rounded-[10px] py-2.5 text-sm font-semibold transition-colors ${tab === t.key ? 'bg-[#E8C547] text-[#0A0A0A]' : 'text-[#9CA3AF] hover:text-white'}`}
                style={{ fontFamily: "'Gowun Batang', serif" }}
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
                  <label className="text-sm font-medium text-[#9CA3AF]" style={{ fontFamily: "'Gowun Batang', serif" }}>
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
                style={{ fontFamily: "'Gowun Batang', serif" }}
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
                style={{ fontFamily: "'Gowun Batang', serif" }}
              >
                {loading ? 'Đang đổi...' : 'Đổi mật khẩu'}
              </button>
            </form>
          )}

          {/* Tab: Bookings */}
          {tab === 'bookings' && (
            <div className="overflow-hidden rounded-[20px] border border-[#2A2A2A] bg-[#1A1A1A] px-8 py-8 md:px-10">
              <h2 className="m-0 mb-6 text-[20px] font-bold text-white" style={{ fontFamily: "'Gowun Batang', serif" }}>
                Lịch sử đặt lịch
              </h2>

              {loadingBookings ? (
                <div className="flex flex-col items-center justify-center py-12 text-[#9CA3AF]">
                  <svg className="animate-spin h-8 w-8 text-[#E8C547] mb-3" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span style={{ fontFamily: "'Gowun Batang', serif" }}>Đang tải lịch sử đặt lịch...</span>
                </div>
              ) : bookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(232,197,71,0.08)] text-[#E8C547]">
                    <svg viewBox="0 0 20 20" fill="none" className="h-8 w-8" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="4" width="14" height="13" rx="2" />
                      <path d="M3 8h14M7 3v2M13 3v2" />
                    </svg>
                  </div>
                  <p className="m-0 mb-6 text-[#9CA3AF] text-[15px]" style={{ fontFamily: "'Gowun Batang', serif" }}>
                    Bạn chưa có yêu cầu đặt lịch nào trong hệ thống.
                  </p>
                  <Link
                    to="/booking"
                    className="inline-flex h-[46px] items-center justify-center rounded-[12px] bg-[linear-gradient(135deg,#E8C547_0%,#D4A837_100%)] px-6 text-sm font-semibold text-[#0A0A0A] hover:opacity-95 transition-opacity"
                    style={{ fontFamily: "'Gowun Batang', serif" }}
                  >
                    Đặt lịch ngay
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {bookings.map((b) => {
                    const code = `#PTV-${b.id.toString(36).toUpperCase().padStart(6, '0')}`;
                    const dateStr = b.booking_date ? new Date(b.booking_date).toLocaleDateString('vi-VN') : '—';
                    const priceLabel = b.price_vnd ? Number(b.price_vnd).toLocaleString('vi-VN') + ' ₫' : 'Liên hệ';
                    return (
                      <div key={b.id} className="rounded-[16px] border border-[#2D2D2D] bg-[#141414] p-6 transition-all hover:border-[#E8C547]/30">
                        {/* Card Top: Code & Status */}
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#222222] pb-4 mb-4">
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono text-sm font-bold text-[#E8C547]">{code}</span>
                            <span className="text-xs text-[#6B7280]">|</span>
                            <span className="text-xs text-[#9CA3AF]">{b.created_at ? new Date(b.created_at).toLocaleDateString('vi-VN') : ''}</span>
                          </div>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLORS[b.status] || 'text-white'}`}>
                            {STATUS_LABELS[b.status] || b.status}
                          </span>
                        </div>

                        {/* Card Body */}
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280]" style={{ fontFamily: "'Gowun Batang', serif" }}>
                              Dịch vụ
                            </span>
                            <span className="text-[15px] font-bold text-white" style={{ fontFamily: "'Gowun Batang', serif" }}>
                              {b.service}
                            </span>
                            <span className="text-xs text-[#9CA3AF]">{b.pkg}</span>
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280]" style={{ fontFamily: "'Gowun Batang', serif" }}>
                              Thời gian hẹn
                            </span>
                            <span className="text-[15px] font-semibold text-white" style={{ fontFamily: "'Gowun Batang', serif" }}>
                              {dateStr}
                            </span>
                            <span className="text-xs text-[#9CA3AF]">{b.booking_slot}</span>
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280]" style={{ fontFamily: "'Gowun Batang', serif" }}>
                              Giá trị
                            </span>
                            <span className="text-[15px] font-bold text-[#E8C547]">
                              {priceLabel}
                            </span>
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280]" style={{ fontFamily: "'Gowun Batang', serif" }}>
                              Địa điểm
                            </span>
                            <span className="text-sm text-[#9CA3AF] truncate" style={{ fontFamily: "'Gowun Batang', serif" }}>
                              {b.location || '—'}
                            </span>
                          </div>
                        </div>

                        {/* Extra Notes if present */}
                        {b.notes && (
                          <div className="mt-4 rounded-[10px] bg-[#1A1A1A] p-3 border border-[#222222]">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block mb-1" style={{ fontFamily: "'Gowun Batang', serif" }}>
                              Ghi chú thêm
                            </span>
                            <p className="m-0 text-xs text-[#9CA3AF] leading-relaxed">{b.notes}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Toast message={toast.message} type={toast.type} />
    </div>
  )
}
