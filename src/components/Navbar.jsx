import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import logo from '../assets/logo.svg'

const NAV_LINKS = [
  { label: 'Trang chủ', to: '/' },
  { label: 'Sản phẩm', to: '/san-pham' },
  { label: 'Dịch vụ', to: '/dich-vu' },
  { label: 'Liên hệ', to: '/lien-he' },
]

function UserDropdown() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = () => {
    logout()
    setOpen(false)
    navigate('/')
  }

  const initials = `${(user.firstName || '')[0] || ''}${(user.lastName || '')[0] || ''}`.toUpperCase() || 'U'
  const fullName = `${user.lastName || ''} ${user.firstName || ''}`.trim()

  return (
    <div className="relative md:ml-auto" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-[8px] border border-[#2A2A2A] bg-[#1A1A1A] px-3 py-1.5 transition-colors hover:border-[#E8C547]/50"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[linear-gradient(135deg,#E8C547_0%,#D4A837_100%)] text-xs font-bold text-[#0A0A0A]">
          {initials}
        </div>
        <span className="hidden max-w-[120px] truncate text-sm font-medium text-white md:block" style={{ fontFamily: "'Gowun Batang', serif" }}>
          {fullName}
        </span>
        <svg viewBox="0 0 16 16" fill="none" className={`h-3.5 w-3.5 text-[#9CA3AF] transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true">
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-[12px] border border-[#2A2A2A] bg-[#1A1A1A] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          {/* User info */}
          <div className="border-b border-[#2A2A2A] px-4 py-3">
            <p className="truncate text-sm font-semibold text-white" style={{ fontFamily: "'Gowun Batang', serif" }}>{fullName}</p>
            <p className="truncate text-xs text-[#6B7280]" style={{ fontFamily: "'Gowun Batang', serif" }}>{user.email}</p>
          </div>

          {/* Menu items */}
          <div className="py-1">
            {user.isAdmin && (
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#E8C547] transition-colors hover:bg-[#141414] hover:text-[#E8C547] font-semibold"
                style={{ fontFamily: "'Gowun Batang', serif" }}
              >
                <svg viewBox="0 0 18 18" fill="none" className="h-4 w-4 shrink-0" aria-hidden="true">
                  <path d="M12 15V9a3 3 0 00-6 0v6M3 15h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  <rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
                </svg>
                Trang quản trị
              </Link>
            )}
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#9CA3AF] transition-colors hover:bg-[#141414] hover:text-white"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            >
              <svg viewBox="0 0 18 18" fill="none" className="h-4 w-4 shrink-0" aria-hidden="true">
                <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.4" />
                <path d="M2.5 15.5c0-3.038 2.91-5.5 6.5-5.5s6.5 2.462 6.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              Xem hồ sơ
            </Link>
            <Link
              to="/booking"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#9CA3AF] transition-colors hover:bg-[#141414] hover:text-white"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            >
              <svg viewBox="0 0 18 18" fill="none" className="h-4 w-4 shrink-0" aria-hidden="true">
                <rect x="2.5" y="3" width="13" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M2.5 7h13M6 2v2M12 2v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              Đặt lịch
            </Link>
          </div>

          <div className="border-t border-[#2A2A2A] py-1">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#D62828] transition-colors hover:bg-[rgba(214,40,40,0.08)]"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            >
              <svg viewBox="0 0 18 18" fill="none" className="h-4 w-4 shrink-0" aria-hidden="true">
                <path d="M7 3H4a1 1 0 00-1 1v10a1 1 0 001 1h3M12 12l3-3-3-3M15 9H7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const { user } = useAuth()
  console.log('[Navbar] user:', user)

  return (
    <nav className="sticky top-0 z-50 flex w-full flex-wrap items-center gap-4 border-b border-[#1E1E1E] bg-[#27272B] px-4 py-1 md:flex-nowrap md:gap-6 md:px-6 backdrop-blur-sm">
      <img src={logo} alt="Phiền TV" className="h-12 w-auto shrink-0 object-contain md:h-[72px]" />

      <div className="flex w-full flex-wrap items-center gap-x-6 gap-y-3 md:ml-10 md:flex-1 md:flex-nowrap md:gap-x-10">
        {NAV_LINKS.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="whitespace-nowrap text-center text-sm leading-[110%] tracking-[-0.03em] text-white md:text-lg"
            style={{ fontFamily: "'Gowun Batang', serif" }}
          >
            {item.label}
          </Link>
        ))}

        {user ? (
          <UserDropdown />
        ) : (
          <Link
            to="/login"
            className="inline-flex h-[38.8px] items-center justify-center rounded-[8px] border border-[#E8C547] bg-[#E8C547] px-5 text-[13px] font-semibold uppercase tracking-[1px] text-[#0A0A0A] transition-opacity duration-200 hover:opacity-85 md:ml-auto"
            style={{ fontFamily: "'Gowun Batang', serif" }}
          >
            Đăng nhập
          </Link>
        )}
      </div>
    </nav>
  )
}
