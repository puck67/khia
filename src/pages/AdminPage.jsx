import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const STATUS_LABELS = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  completed: 'Hoàn thành',
  cancelled: 'Đã huỷ',
}
const STATUS_COLORS = {
  pending: 'bg-yellow-500/15 text-yellow-400',
  confirmed: 'bg-blue-500/15 text-blue-400',
  completed: 'bg-green-500/15 text-green-400',
  cancelled: 'bg-red-500/15 text-red-400',
}

function StatCard({ label, value, sub }) {
  return (
    <div className="flex flex-col gap-2 rounded-[16px] border border-[#2A2A2A] bg-[#1A1A1A] px-6 py-5">
      <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#6B7280]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
        {label}
      </span>
      <span className="text-[28px] font-bold leading-none text-white" style={{ fontFamily: "'Gowun Batang', serif" }}>
        {value}
      </span>
      {sub && <span className="text-xs text-[#6B7280]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>{sub}</span>}
    </div>
  )
}

function TabBtn({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-5 py-2.5 text-sm font-semibold rounded-[10px] transition-colors ${active ? 'bg-[#E8C547] text-[#0A0A0A]' : 'text-[#9CA3AF] hover:text-white'}`}
      style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
    >
      {children}
    </button>
  )
}

// ─── BOOKINGS TAB ────────────────────────────────────────────────────────────
function BookingsTab({ token }) {
  const [bookings, setBookings] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const qs = new URLSearchParams({ page, limit: 20, ...(filter ? { status: filter } : {}) })
      const res = await fetch(`${API}/api/admin/bookings?${qs}`, { headers: { Authorization: `Bearer ${token}` } })
      const data = await res.json()
      setBookings(data.bookings || [])
      setTotal(data.total || 0)
    } finally {
      setLoading(false)
    }
  }, [token, page, filter])

  useEffect(() => { load() }, [load])

  const updateStatus = async (id, status) => {
    await fetch(`${API}/api/admin/bookings/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    })
    load()
  }

  const totalPages = Math.ceil(total / 20)

  return (
    <div className="flex flex-col gap-4">
      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {['', 'pending', 'confirmed', 'completed', 'cancelled'].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => { setFilter(s); setPage(1) }}
            className={`rounded-[8px] px-4 py-1.5 text-xs font-semibold transition-colors ${filter === s ? 'bg-[#E8C547] text-[#0A0A0A]' : 'border border-[#2A2A2A] text-[#9CA3AF] hover:text-white'}`}
            style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
          >
            {s ? STATUS_LABELS[s] : 'Tất cả'}
          </button>
        ))}
        <span className="ml-auto text-xs text-[#6B7280] self-center" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
          {total} booking
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-[16px] border border-[#2A2A2A]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2A2A2A] bg-[#141414]">
              {['ID', 'Khách hàng', 'Dịch vụ', 'Ngày', 'Giá', 'Trạng thái', 'Hành động'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.08em] text-[#6B7280]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-[#6B7280]">Đang tải...</td></tr>
            ) : bookings.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-[#6B7280]">Không có booking nào.</td></tr>
            ) : bookings.map((b) => (
              <tr key={b.id} className="border-b border-[#1E1E1E] bg-[#1A1A1A] hover:bg-[#1E1E1E]">
                <td className="px-4 py-3 text-[#6B7280]">#{b.id}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-white">{b.name}</div>
                  <div className="text-xs text-[#6B7280]">{b.phone}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-white">{b.service || '—'}</div>
                  <div className="text-xs text-[#9CA3AF]">{b.pkg || ''}</div>
                </td>
                <td className="px-4 py-3 text-[#9CA3AF]">
                  {b.booking_date ? new Date(b.booking_date).toLocaleDateString('vi-VN') : '—'}
                  {b.booking_slot && <div className="text-xs">{b.booking_slot}</div>}
                </td>
                <td className="px-4 py-3 text-[#E8C547]">
                  {b.price_vnd ? Number(b.price_vnd).toLocaleString('vi-VN') + ' ₫' : '—'}
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_COLORS[b.status] || 'text-white'}`}>
                    {STATUS_LABELS[b.status] || b.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={b.status}
                    onChange={(e) => updateStatus(b.id, e.target.value)}
                    className="rounded-[8px] border border-[#2A2A2A] bg-[#141414] px-2 py-1 text-xs text-white"
                  >
                    {Object.entries(STATUS_LABELS).map(([v, l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="rounded-[8px] border border-[#2A2A2A] px-3 py-1.5 text-xs text-[#9CA3AF] disabled:opacity-40 hover:text-white">←</button>
          <span className="text-xs text-[#6B7280]">{page} / {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="rounded-[8px] border border-[#2A2A2A] px-3 py-1.5 text-xs text-[#9CA3AF] disabled:opacity-40 hover:text-white">→</button>
        </div>
      )}
    </div>
  )
}

// ─── USERS TAB ───────────────────────────────────────────────────────────────
function UsersTab({ token }) {
  const [users, setUsers] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/admin/users?page=${page}&limit=20`, { headers: { Authorization: `Bearer ${token}` } })
      const data = await res.json()
      setUsers(data.users || [])
      setTotal(data.total || 0)
    } finally {
      setLoading(false)
    }
  }, [token, page])

  useEffect(() => { load() }, [load])

  const totalPages = Math.ceil(total / 20)

  return (
    <div className="flex flex-col gap-4">
      <span className="text-xs text-[#6B7280] self-end" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>{total} người dùng</span>
      <div className="overflow-x-auto rounded-[16px] border border-[#2A2A2A]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2A2A2A] bg-[#141414]">
              {['ID', 'Họ tên', 'Email', 'SĐT', 'Vai trò', 'Ngày tạo'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.08em] text-[#6B7280]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-[#6B7280]">Đang tải...</td></tr>
            ) : users.map((u) => (
              <tr key={u.id} className="border-b border-[#1E1E1E] bg-[#1A1A1A] hover:bg-[#1E1E1E]">
                <td className="px-4 py-3 text-[#6B7280]">{u.id}</td>
                <td className="px-4 py-3 font-semibold text-white">
                  {u.firstName} {u.lastName}
                  {u.isAdmin && <span className="ml-2 rounded-full bg-[#E8C547]/15 px-2 py-0.5 text-[10px] font-bold text-[#E8C547]">ADMIN</span>}
                </td>
                <td className="px-4 py-3 text-[#9CA3AF]">{u.email}</td>
                <td className="px-4 py-3 text-[#9CA3AF]">{u.phone}</td>
                <td className="px-4 py-3 text-[#9CA3AF]">{u.role}</td>
                <td className="px-4 py-3 text-[#6B7280]">{new Date(u.createdAt).toLocaleDateString('vi-VN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="rounded-[8px] border border-[#2A2A2A] px-3 py-1.5 text-xs text-[#9CA3AF] disabled:opacity-40 hover:text-white">←</button>
          <span className="text-xs text-[#6B7280]">{page} / {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="rounded-[8px] border border-[#2A2A2A] px-3 py-1.5 text-xs text-[#9CA3AF] disabled:opacity-40 hover:text-white">→</button>
        </div>
      )}
    </div>
  )
}

// ─── SERVICES TAB ────────────────────────────────────────────────────────────
function ServicesTab({ token }) {
  const [services, setServices] = useState([])
  const [editing, setEditing] = useState({})
  const [saving, setSaving] = useState({})

  const load = useCallback(async () => {
    const res = await fetch(`${API}/api/admin/services`, { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    setServices(Array.isArray(data) ? data : [])
  }, [token])

  useEffect(() => { load() }, [load])

  const save = async (id) => {
    setSaving(s => ({ ...s, [id]: true }))
    try {
      await fetch(`${API}/api/admin/services/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ price_vnd: editing[id] === '' ? null : Number(editing[id]) }),
      })
      setEditing(e => { const n = { ...e }; delete n[id]; return n })
      load()
    } finally {
      setSaving(s => ({ ...s, [id]: false }))
    }
  }

  const grouped = services.reduce((acc, s) => {
    if (!acc[s.package_title]) acc[s.package_title] = []
    acc[s.package_title].push(s)
    return acc
  }, {})

  return (
    <div className="flex flex-col gap-6">
      {Object.entries(grouped).map(([pkg, cats]) => (
        <div key={pkg} className="overflow-hidden rounded-[16px] border border-[#2A2A2A]">
          <div className="border-b border-[#2A2A2A] bg-[#141414] px-6 py-4">
            <h3 className="m-0 text-sm font-bold text-[#E8C547]" style={{ fontFamily: "'Gowun Batang', serif" }}>{pkg}</h3>
          </div>
          <div className="divide-y divide-[#1E1E1E] bg-[#1A1A1A]">
            {cats.map((c) => (
              <div key={c.id} className="flex items-center justify-between gap-4 px-6 py-4">
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-white text-sm" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>{c.name}</span>
                  <span className="text-xs text-[#6B7280]">{c.description.slice(0, 80)}…</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <input
                    type="number"
                    value={editing[c.id] !== undefined ? editing[c.id] : (c.price_vnd ?? '')}
                    onChange={(e) => setEditing(ed => ({ ...ed, [c.id]: e.target.value }))}
                    placeholder="Liên hệ"
                    className="w-36 rounded-[8px] border border-[#2A2A2A] bg-[#141414] px-3 py-1.5 text-sm text-white placeholder-[#6B7280] focus:border-[#E8C547] focus:outline-none"
                  />
                  {editing[c.id] !== undefined && (
                    <button
                      type="button"
                      onClick={() => save(c.id)}
                      disabled={saving[c.id]}
                      className="rounded-[8px] bg-[#E8C547] px-3 py-1.5 text-xs font-bold text-[#0A0A0A] disabled:opacity-60"
                    >
                      {saving[c.id] ? '...' : 'Lưu'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const { user, getToken } = useAuth()
  const token = getToken()
  const navigate = useNavigate()
  const [tab, setTab] = useState('overview')
  const [stats, setStats] = useState(null)

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    if (!user.isAdmin) { navigate('/'); return }
  }, [user, navigate])

  useEffect(() => {
    if (!token) return
    fetch(`${API}/api/admin/stats`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(setStats)
      .catch(() => {})
  }, [token])

  if (!user?.isAdmin) return null

  return (
    <div className="mx-auto min-h-screen w-full max-w-[1536px] bg-[#0A0A0A] text-white">
      <Navbar />

      <main className="px-4 pb-20 pt-10 md:px-8">
        <div className="mx-auto max-w-[1200px]">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="m-0 text-[28px] font-bold text-white" style={{ fontFamily: "'Gowun Batang', serif" }}>
                Admin Dashboard
              </h1>
              <p className="mt-1 text-sm text-[#6B7280]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                Xin chào, {user.firstName} {user.lastName}
              </p>
            </div>
          </div>

          {/* Stats */}
          {stats && (
            <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
              <StatCard label="Người dùng" value={stats.totalUsers.toLocaleString()} />
              <StatCard label="Tổng booking" value={stats.totalBookings.toLocaleString()} />
              <StatCard label="Chờ xác nhận" value={stats.pendingBookings.toLocaleString()} sub="cần xử lý" />
              <StatCard
                label="Doanh thu"
                value={stats.totalRevenue ? stats.totalRevenue.toLocaleString('vi-VN') + ' ₫' : '0 ₫'}
                sub="đã xác nhận"
              />
            </div>
          )}

          {/* Tabs */}
          <div className="mb-6 flex gap-1 rounded-[12px] border border-[#2A2A2A] bg-[#141414] p-1 w-fit">
            <TabBtn active={tab === 'overview'} onClick={() => setTab('overview')}>Tổng quan</TabBtn>
            <TabBtn active={tab === 'bookings'} onClick={() => setTab('bookings')}>Booking</TabBtn>
            <TabBtn active={tab === 'users'} onClick={() => setTab('users')}>Người dùng</TabBtn>
            <TabBtn active={tab === 'services'} onClick={() => setTab('services')}>Dịch vụ & Giá</TabBtn>
          </div>

          {/* Tab content */}
          {tab === 'overview' && stats && (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-[16px] border border-[#2A2A2A] bg-[#1A1A1A] px-6 py-6">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.1em] text-[#E8C547]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                  Trạng thái booking
                </h2>
                <div className="flex flex-col gap-3">
                  {Object.entries(STATUS_LABELS).map(([k, l]) => (
                    <div key={k} className="flex items-center justify-between">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_COLORS[k]}`}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[16px] border border-[#2A2A2A] bg-[#1A1A1A] px-6 py-6">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.1em] text-[#E8C547]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                  Thống kê nhanh
                </h2>
                <div className="flex flex-col gap-3">
                  {[
                    ['Tổng người dùng', stats.totalUsers],
                    ['Tổng booking', stats.totalBookings],
                    ['Booking chờ xử lý', stats.pendingBookings],
                    ['Doanh thu xác nhận', stats.totalRevenue ? stats.totalRevenue.toLocaleString('vi-VN') + ' ₫' : '0 ₫'],
                  ].map(([label, val]) => (
                    <div key={label} className="flex items-center justify-between border-b border-[#1E1E1E] pb-3 last:border-0 last:pb-0">
                      <span className="text-sm text-[#9CA3AF]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>{label}</span>
                      <span className="text-sm font-bold text-white" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {tab === 'bookings' && <BookingsTab token={token} />}
          {tab === 'users' && <UsersTab token={token} />}
          {tab === 'services' && <ServicesTab token={token} />}
        </div>
      </main>
    </div>
  )
}
