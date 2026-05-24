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

function StatCard({ label, value, sub, icon, trend, trendType, onClick }) {
  const isUp = trendType === 'up'
  return (
    <div 
      onClick={onClick}
      className={`relative flex flex-col gap-3 rounded-[24px] border border-[#222222] bg-[#141414] px-6 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#E8C547]/30 hover:shadow-[0_12px_30px_rgba(232,197,71,0.05)] ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Top row: Icon and Detail Arrow */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A1A1A] border border-[#2A2A2A] text-white">
            {icon}
          </div>
          <span className="text-xs font-semibold text-[#9CA3AF]" style={{ fontFamily: "'Gowun Batang', serif" }}>
            {label}
          </span>
        </div>
        {onClick && (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1A1A1A] text-[#9CA3AF] transition-colors hover:bg-[#E8C547] hover:text-[#0A0A0A]">
            <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
              <path d="M4.5 11.5l7-7M11.5 11.5v-7h-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        )}
      </div>

      {/* Main stat number & trend */}
      <div className="flex items-baseline gap-2 mt-2">
        <span className="text-[36px] font-bold leading-none text-white" style={{ fontFamily: "'Gowun Batang', serif" }}>
          {value}
        </span>
        {trend && (
          <span className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-bold ${
            isUp ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
          }`}>
            {isUp ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>

      {/* Footer subtext */}
      {sub && (
        <span className="text-xs text-[#6B7280] font-medium mt-1 flex items-center gap-1" style={{ fontFamily: "'Gowun Batang', serif" }}>
          <span className="h-1.5 w-1.5 rounded-full bg-[#E8C547]" /> {sub}
        </span>
      )}
    </div>
  )
}

function TabBtn({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-6 py-2.5 text-sm font-bold rounded-full transition-all duration-300 ${
        active 
          ? 'bg-[#E8C547] text-[#0A0A0A] shadow-[0_4px_12px_rgba(232,197,71,0.25)] scale-[1.03]' 
          : 'text-[#9CA3AF] hover:text-white hover:bg-[#1A1A1A]'
      }`}
      style={{ fontFamily: "'Gowun Batang', serif" }}
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
            style={{ fontFamily: "'Gowun Batang', serif" }}
          >
            {s ? STATUS_LABELS[s] : 'Tất cả'}
          </button>
        ))}
        <span className="ml-auto text-xs text-[#6B7280] self-center" style={{ fontFamily: "'Gowun Batang', serif" }}>
          {total} booking
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-[16px] border border-[#2A2A2A]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2A2A2A] bg-[#141414]">
              {['ID', 'Khách hàng', 'Dịch vụ', 'Ngày', 'Giá', 'Trạng thái', 'Hành động'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.08em] text-[#6B7280]" style={{ fontFamily: "'Gowun Batang', serif" }}>
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
      <span className="text-xs text-[#6B7280] self-end" style={{ fontFamily: "'Gowun Batang', serif" }}>{total} người dùng</span>
      <div className="overflow-x-auto rounded-[16px] border border-[#2A2A2A]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2A2A2A] bg-[#141414]">
              {['ID', 'Họ tên', 'Email', 'SĐT', 'Vai trò', 'Ngày tạo'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.08em] text-[#6B7280]" style={{ fontFamily: "'Gowun Batang', serif" }}>{h}</th>
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
                  <span className="font-semibold text-white text-sm" style={{ fontFamily: "'Gowun Batang', serif" }}>{c.name}</span>
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

// ─── CHARTS & ANALYTICS COMPONENTS ──────────────────────────────────────────
function LineChart({ data }) {
  const [activeIndex, setActiveIndex] = useState(null)
  if (!data || data.length === 0) return null

  const width = 500
  const height = 240
  const padding = { top: 30, right: 30, bottom: 40, left: 40 }

  const maxVal = Math.max(...data.map(d => Math.max(d.bookings, d.users)), 5)
  const xStep = (width - padding.left - padding.right) / (data.length - 1)
  
  const getX = (idx) => padding.left + idx * xStep
  const getY = (val) => height - padding.bottom - (val / maxVal) * (height - padding.top - padding.bottom)

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}`
  }

  const bookingPoints = data.map((d, i) => ({ x: getX(i), y: getY(d.bookings) }))
  const userPoints = data.map((d, i) => ({ x: getX(i), y: getY(d.users) }))

  const createSmoothPath = (points) => {
    if (points.length === 0) return ''
    let path = `M ${points[0].x} ${points[0].y}`
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i]
      const p1 = points[i + 1]
      const cp1x = p0.x + (p1.x - p0.x) / 2
      const cp1y = p0.y
      const cp2x = p0.x + (p1.x - p0.x) / 2
      const cp2y = p1.y
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`
    }
    return path
  }

  const createAreaPath = (points) => {
    if (points.length === 0) return ''
    const baseLineY = height - padding.bottom
    return createSmoothPath(points) + ` L ${points[points.length - 1].x} ${baseLineY} L ${points[0].x} ${baseLineY} Z`
  }

  const bookingLine = createSmoothPath(bookingPoints)
  const bookingArea = createAreaPath(bookingPoints)
  const userLine = createSmoothPath(userPoints)
  const userArea = createAreaPath(userPoints)

  return (
    <div className="relative w-full rounded-[24px] border border-[#222222] bg-[#141414] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.15)] hover:border-[#E8C547]/20 transition-all duration-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="m-0 text-sm font-bold text-white uppercase tracking-[0.05em]" style={{ fontFamily: "'Gowun Batang', serif" }}>
          Lượng Booking & Thành Viên Mới
        </h3>
        <div className="flex gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-[#E8C547]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E8C547]" /> Bookings
          </span>
          <span className="flex items-center gap-1.5 text-[#3B82F6]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#3B82F6]" /> Thành viên
          </span>
        </div>
      </div>

      <div className="relative h-60 w-full">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full overflow-visible">
          <defs>
            <linearGradient id="bookingAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E8C547" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#E8C547" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="userAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((r, i) => {
            const val = Math.round(maxVal * r)
            const yPos = getY(val)
            return (
              <g key={i}>
                <line x1={padding.left} y1={yPos} x2={width - padding.right} y2={yPos} stroke="#2A2A2A" strokeDasharray="3 3" />
                <text x={padding.left - 10} y={yPos + 4} fill="#6B7280" fontSize="10" textAnchor="end">{val}</text>
              </g>
            )
          })}

          {/* Areas */}
          <path d={bookingArea} fill="url(#bookingAreaGrad)" />
          <path d={userArea} fill="url(#userAreaGrad)" />

          {/* Lines */}
          <path d={bookingLine} fill="none" stroke="#E8C547" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d={userLine} fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Hover highlight line */}
          {activeIndex !== null && (
            <line
              x1={getX(activeIndex)}
              y1={padding.top}
              x2={getX(activeIndex)}
              y2={height - padding.bottom}
              stroke="#6B7280"
              strokeWidth="1"
              strokeDasharray="4"
            />
          )}

          {/* Dots & Labels */}
          {data.map((d, i) => {
            const bx = getX(i)
            const by = getY(d.bookings)
            const ux = getX(i)
            const uy = getY(d.users)

            return (
              <g key={i}>
                <text x={bx} y={height - 15} fill="#6B7280" fontSize="10" textAnchor="middle">
                  {formatDate(d.date)}
                </text>
                <circle
                  cx={bx} cy={by}
                  r={activeIndex === i ? 6 : 4}
                  fill="#1A1A1A"
                  stroke="#E8C547"
                  strokeWidth={activeIndex === i ? 3 : 2}
                  className="transition-all duration-150"
                />
                <circle
                  cx={ux} cy={uy}
                  r={activeIndex === i ? 6 : 4}
                  fill="#1A1A1A"
                  stroke="#3B82F6"
                  strokeWidth={activeIndex === i ? 3 : 2}
                  className="transition-all duration-150"
                />
              </g>
            )
          })}

          {/* Invisible interactive hover columns */}
          {data.map((_, i) => {
            const xPos = getX(i)
            const sliceWidth = xStep
            return (
              <rect
                key={i}
                x={xPos - sliceWidth / 2}
                y={padding.top}
                width={sliceWidth}
                height={height - padding.top - padding.bottom}
                fill="transparent"
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                className="cursor-pointer"
              />
            )
          })}
        </svg>
      </div>

      <div className="mt-2 h-10 flex items-center justify-center text-xs text-[#9CA3AF]">
        {activeIndex !== null ? (
          <div className="flex gap-4 rounded-[8px] bg-[#141414] px-4 py-1.5 border border-[#2A2A2A]">
            <span className="font-semibold text-white">{new Date(data[activeIndex].date).toLocaleDateString('vi-VN')}</span>
            <span className="text-[#E8C547]">Bookings: <strong>{data[activeIndex].bookings}</strong></span>
            <span className="text-[#3B82F6]">Thành viên: <strong>{data[activeIndex].users}</strong></span>
          </div>
        ) : (
          <span>Di chuột qua biểu đồ để xem chi tiết</span>
        )}
      </div>
    </div>
  )
}

function RevenueChart({ data }) {
  const [activeIndex, setActiveIndex] = useState(null)
  if (!data || data.length === 0) return null

  const width = 500
  const height = 240
  const padding = { top: 30, right: 20, bottom: 40, left: 55 }

  const maxVal = Math.max(...data.map(d => d.revenue), 100000)
  const xStep = (width - padding.left - padding.right) / data.length
  
  const getX = (idx) => padding.left + idx * xStep
  const getY = (val) => height - padding.bottom - (val / maxVal) * (height - padding.top - padding.bottom)

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}`
  }

  return (
    <div className="relative w-full rounded-[24px] border border-[#222222] bg-[#141414] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.15)] hover:border-[#E8C547]/20 transition-all duration-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="m-0 text-sm font-bold text-white uppercase tracking-[0.05em]" style={{ fontFamily: "'Gowun Batang', serif" }}>
          Doanh Thu Hằng Ngày
        </h3>
        <span className="text-xs text-[#E8C547] font-semibold bg-[#E8C547]/10 px-2 py-0.5 rounded-full">
          VND
        </span>
      </div>

      <div className="relative h-60 w-full">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full overflow-visible">
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E8C547" />
              <stop offset="100%" stopColor="#D4A837" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((r, i) => {
            const val = Math.round(maxVal * r)
            const yPos = getY(val)
            return (
              <g key={i}>
                <line x1={padding.left} y1={yPos} x2={width - padding.right} y2={yPos} stroke="#2A2A2A" strokeDasharray="3 3" />
                <text x={padding.left - 10} y={yPos + 4} fill="#6B7280" fontSize="9" textAnchor="end">
                  {val >= 1000000 ? `${(val / 1000000).toFixed(1)}M` : val.toLocaleString()}
                </text>
              </g>
            )
          })}

          {/* Bars */}
          {data.map((d, i) => {
            const barWidth = Math.max(16, xStep * 0.45)
            const xPos = getX(i) + (xStep - barWidth) / 2
            const yPos = getY(d.revenue)
            const barHeight = height - padding.bottom - yPos

            return (
              <g key={i}>
                <rect
                  x={xPos}
                  y={yPos}
                  width={barWidth}
                  height={barHeight}
                  fill="url(#barGrad)"
                  rx={barWidth / 2}
                  opacity={activeIndex === i ? 1 : 0.85}
                  className="transition-all duration-200"
                />
                <text x={getX(i) + xStep / 2} y={height - 15} fill="#6B7280" fontSize="10" textAnchor="middle">
                  {formatDate(d.date)}
                </text>
              </g>
            )
          })}

          {/* Invisible interactive hover rects */}
          {data.map((d, i) => {
            return (
              <rect
                key={i}
                x={getX(i)}
                y={padding.top}
                width={xStep}
                height={height - padding.top - padding.bottom}
                fill="transparent"
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                className="cursor-pointer"
              />
            )
          })}
        </svg>
      </div>

      <div className="mt-2 h-10 flex items-center justify-center text-xs text-[#9CA3AF]">
        {activeIndex !== null ? (
          <div className="rounded-[8px] bg-[#141414] px-4 py-1.5 border border-[#2A2A2A]">
            <span className="font-semibold text-white mr-2">{new Date(data[activeIndex].date).toLocaleDateString('vi-VN')}:</span>
            <span className="text-[#E8C547] font-bold">{data[activeIndex].revenue.toLocaleString('vi-VN')} ₫</span>
          </div>
        ) : (
          <span>Di chuột qua cột để xem doanh thu</span>
        )}
      </div>
    </div>
  )
}

function TopPackagesChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-[24px] border border-[#222222] bg-[#141414] text-xs text-[#6B7280]">
        Chưa có số liệu gói dịch vụ.
      </div>
    )
  }

  const maxVal = Math.max(...data.map(d => d.count), 1)

  return (
    <div className="flex flex-col gap-4 rounded-[24px] border border-[#222222] bg-[#141414] p-6 h-full shadow-[0_8px_32px_rgba(0,0,0,0.15)] hover:border-[#E8C547]/20 transition-all duration-300">
      <h3 className="m-0 text-sm font-bold text-white uppercase tracking-[0.05em]" style={{ fontFamily: "'Gowun Batang', serif" }}>
        Top Gói Dịch Vụ
      </h3>
      <div className="flex flex-col gap-4 py-2">
        {data.map((pkg, i) => {
          const percent = (pkg.count / maxVal) * 100
          const colors = [
            'bg-[linear-gradient(90deg,#E8C547,#F4D35E)]',
            'bg-[linear-gradient(90deg,#3B82F6,#60A5FA)]',
            'bg-[linear-gradient(90deg,#10B981,#34D399)]',
            'bg-[linear-gradient(90deg,#8B5CF6,#A78BFA)]',
            'bg-[linear-gradient(90deg,#6B7280,#9CA3AF)]'
          ]
          return (
            <div key={pkg.name} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white truncate max-w-[170px]">
                  {i + 1}. {pkg.name}
                </span>
                <span className="text-[#9CA3AF] font-medium shrink-0">{pkg.count} bookings</span>
              </div>
              <div className="h-3 w-full rounded-full bg-[#1A1A1A] overflow-hidden p-0.5 border border-[#262626]">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${colors[i] || colors[4]}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function RecentActivities({ activities }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-[24px] border border-[#222222] bg-[#141414] text-xs text-[#6B7280]">
        Không có hoạt động gần đây.
      </div>
    )
  }

  const formatRelativeTime = (dateStr) => {
    const diffMs = new Date() - new Date(dateStr)
    const diffMins = Math.floor(diffMs / 60000)
    if (diffMins < 1) return 'Vừa xong'
    if (diffMins < 60) return `${diffMins} phút trước`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours} giờ trước`
    return new Date(dateStr).toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit'
    })
  }

  return (
    <div className="flex flex-col gap-4 rounded-[24px] border border-[#222222] bg-[#141414] p-6 h-full shadow-[0_8px_32px_rgba(0,0,0,0.15)] hover:border-[#E8C547]/20 transition-all duration-300">
      <h3 className="m-0 text-sm font-bold text-white uppercase tracking-[0.05em]" style={{ fontFamily: "'Gowun Batang', serif" }}>
        Hoạt động gần đây
      </h3>
      <div className="relative flex flex-col gap-5 py-2">
        {activities.map((act, i) => {
          const isBooking = act.type === 'booking'
          return (
            <div key={i} className="flex gap-4 relative">
              {i < activities.length - 1 && (
                <div className="absolute left-[15px] top-8 bottom-[-20px] w-[2px] bg-[#2A2A2A]" />
              )}
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                isBooking 
                  ? 'border-[#E8C547]/20 bg-[#E8C547]/10 text-[#E8C547]' 
                  : 'border-[#3B82F6]/20 bg-[#3B82F6]/10 text-[#3B82F6]'
              }`}>
                {isBooking ? (
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="3" width="12" height="11" rx="1.5" />
                    <path d="M5 2v2M11 2v2M2 7h12" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="8" cy="5" r="3" />
                    <path d="M3 13c0-2.5 2.239-4.5 5-4.5s5 2 5 4.5" />
                  </svg>
                )}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase font-bold tracking-[0.05em] text-[#6B7280]">
                  {isBooking ? 'Đặt lịch mới' : 'Thành viên mới'}
                </span>
                <span className="text-sm font-bold text-white">
                  {act.title}
                </span>
                <span className="text-xs text-[#9CA3AF]">
                  {act.subtitle}
                </span>
                <span className="text-[10px] text-[#6B7280] mt-0.5">
                  {formatRelativeTime(act.time)}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ConsultationsTab({ token }) {
  const [consults, setConsults] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedConsult, setSelectedConsult] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const qs = new URLSearchParams({ page, limit: 20, ...(filter ? { status: filter } : {}) })
      const res = await fetch(`${API}/api/consultations?${qs}`, { headers: { Authorization: `Bearer ${token}` } })
      const data = await res.json()
      setConsults(data.consultations || [])
      setTotal(data.total || 0)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [token, page, filter])

  useEffect(() => { load() }, [load])

  const updateStatus = async (id, status) => {
    try {
      await fetch(`${API}/api/consultations/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      })
      load()
      if (selectedConsult && selectedConsult.id === id) {
        setSelectedConsult(prev => prev ? { ...prev, status } : null)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const viewDetail = async (id) => {
    try {
      const res = await fetch(`${API}/api/consultations/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      const data = await res.json()
      if (res.ok) {
        setSelectedConsult(data)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const totalPages = Math.ceil(total / 20)

  return (
    <div className="flex flex-col gap-4">
      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {['', 'pending', 'completed'].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => { setFilter(s); setPage(1) }}
            className={`rounded-[8px] px-4 py-1.5 text-xs font-semibold transition-colors ${filter === s ? 'bg-[#E8C547] text-[#0A0A0A]' : 'border border-[#2A2A2A] text-[#9CA3AF] hover:text-white'}`}
            style={{ fontFamily: "'Gowun Batang', serif" }}
          >
            {s === 'pending' ? 'Chờ xử lý' : s === 'completed' ? 'Đã xử lý' : 'Tất cả'}
          </button>
        ))}
        <span className="ml-auto text-xs text-[#6B7280] self-center" style={{ fontFamily: "'Gowun Batang', serif" }}>
          {total} yêu cầu
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-[16px] border border-[#2A2A2A]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2A2A2A] bg-[#141414]">
              {['ID', 'Khách hàng', 'Ngày gửi', 'Trạng thái', 'Hành động'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.08em] text-[#6B7280]" style={{ fontFamily: "'Gowun Batang', serif" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-[#6B7280]">Đang tải...</td></tr>
            ) : consults.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-[#6B7280]">Không có yêu cầu nào.</td></tr>
            ) : consults.map((c) => (
              <tr key={c.id} className="border-b border-[#1E1E1E] bg-[#1A1A1A] hover:bg-[#1E1E1E]">
                <td className="px-4 py-3 text-[#6B7280]">#{c.id}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-white">{c.name}</div>
                  <div className="text-xs text-[#9CA3AF]">{c.email}</div>
                  <div className="text-xs text-[#6B7280]">{c.phone}</div>
                </td>
                <td className="px-4 py-3 text-[#9CA3AF]">
                  {new Date(c.created_at).toLocaleString('vi-VN')}
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${c.status === 'completed' ? 'bg-green-500/15 text-green-400' : 'bg-yellow-500/15 text-yellow-400'}`}>
                    {c.status === 'completed' ? 'Đã xử lý' : 'Chờ xử lý'}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2 items-center">
                  <button
                    type="button"
                    onClick={() => viewDetail(c.id)}
                    className="rounded-[8px] bg-[#1A1A1A] border border-[#2D2D2D] text-xs font-semibold text-white px-3 py-1.5 hover:border-[#E8C547] transition-all"
                  >
                    Chi tiết
                  </button>
                  <select
                    value={c.status}
                    onChange={(e) => updateStatus(c.id, e.target.value)}
                    className="rounded-[8px] border border-[#2A2A2A] bg-[#141414] px-2 py-1.5 text-xs text-white"
                  >
                    <option value="pending">Chờ xử lý</option>
                    <option value="completed">Đã xử lý</option>
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

      {/* Modal chi tiết */}
      {selectedConsult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-[500px] rounded-[24px] border border-[#2D2D2D] bg-[#141414] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <button
              onClick={() => setSelectedConsult(null)}
              className="absolute right-6 top-6 text-[#9CA3AF] hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <h3 className="m-0 text-xl font-bold text-white mb-6 border-b border-[#2D2D2D] pb-3" style={{ fontFamily: "'Gowun Batang', serif" }}>
              Chi tiết yêu cầu #{selectedConsult.id}
            </h3>

            <div className="flex flex-col gap-4 text-sm">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Họ và tên</span>
                <p className="m-0 mt-1 font-semibold text-white text-base">{selectedConsult.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Email</span>
                  <p className="m-0 mt-1 text-white truncate">{selectedConsult.email}</p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Số điện thoại</span>
                  <p className="m-0 mt-1 text-white">{selectedConsult.phone}</p>
                </div>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Ngày gửi</span>
                <p className="m-0 mt-1 text-[#9CA3AF]">{new Date(selectedConsult.created_at).toLocaleString('vi-VN')}</p>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Trạng thái</span>
                <div className="mt-1">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${selectedConsult.status === 'completed' ? 'bg-green-500/15 text-green-400' : 'bg-yellow-500/15 text-yellow-400'}`}>
                    {selectedConsult.status === 'completed' ? 'Đã xử lý' : 'Chờ xử lý'}
                  </span>
                </div>
              </div>
              {selectedConsult.notes && (
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Ghi chú tư vấn</span>
                  <p className="m-0 mt-1 text-[#9CA3AF] whitespace-pre-wrap rounded-[12px] bg-[#1A1A1A] p-4 border border-[#2D2D2D]">{selectedConsult.notes}</p>
                </div>
              )}
            </div>

            <div className="mt-8 flex gap-3">
              {selectedConsult.status === 'pending' ? (
                <button
                  onClick={() => updateStatus(selectedConsult.id, 'completed')}
                  className="flex-1 rounded-full bg-[linear-gradient(135deg,#E8C547_0%,#D4A837_100%)] py-3 text-sm font-bold uppercase tracking-wider text-[#0A0A0A] hover:scale-102 transition-transform shadow-[0_4px_16px_rgba(232,197,71,0.2)]"
                >
                  Đánh dấu đã xử lý
                </button>
              ) : (
                <button
                  onClick={() => updateStatus(selectedConsult.id, 'pending')}
                  className="flex-1 rounded-full border border-[#2D2D2D] bg-[#1A1A1A] py-3 text-sm font-semibold text-white hover:border-[#E8C547]/40 hover:text-[#E8C547] transition-all"
                >
                  Đánh dấu chờ xử lý
                </button>
              )}
              <button
                onClick={() => setSelectedConsult(null)}
                className="rounded-full border border-[#2D2D2D] bg-[#1A1A1A] px-6 py-3 text-sm font-semibold text-[#9CA3AF] hover:text-white hover:border-white transition-all"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
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
  const [chartData, setChartData] = useState(null)
  const [loadingCharts, setLoadingCharts] = useState(true)

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

    setLoadingCharts(true)
    fetch(`${API}/api/admin/chart-stats`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => {
        setChartData(data)
        setLoadingCharts(false)
      })
      .catch((err) => {
        console.error("Error loading charts:", err)
        setLoadingCharts(false)
      })
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
              <p className="mt-1 text-sm text-[#6B7280]" style={{ fontFamily: "'Gowun Batang', serif" }}>
                Xin chào, {user.firstName} {user.lastName}
              </p>
            </div>
          </div>

          {/* Stats */}
          {stats && (
            <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
              <StatCard
                label="Người dùng"
                value={stats.totalUsers.toLocaleString()}
                trend="5%" trendType="up"
                sub="Người dùng đăng ký"
                icon={
                  <svg viewBox="0 0 16 16" fill="none" className="h-5 w-5 text-blue-400" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="8" cy="5" r="3" />
                    <path d="M3 13c0-2.5 2.239-4.5 5-4.5s5 2 5 4.5" />
                  </svg>
                }
                onClick={() => setTab('users')}
              />
              <StatCard
                label="Tổng booking"
                value={stats.totalBookings.toLocaleString()}
                trend="12%" trendType="up"
                sub="Booking trong hệ thống"
                icon={
                  <svg viewBox="0 0 16 16" fill="none" className="h-5 w-5 text-purple-400" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="3" width="12" height="11" rx="1.5" />
                    <path d="M5 2v2M11 2v2M2 7h12" />
                  </svg>
                }
                onClick={() => setTab('bookings')}
              />
              <StatCard
                label="Chờ xác nhận"
                value={stats.pendingBookings.toLocaleString()}
                sub="Cần phê duyệt sớm"
                icon={
                  <svg viewBox="0 0 16 16" fill="none" className="h-5 w-5 text-yellow-400" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="8" cy="8" r="6" />
                    <path d="M8 4v4l3 1.5" />
                  </svg>
                }
                onClick={() => setTab('bookings')}
              />
              <StatCard
                label="Doanh thu"
                value={stats.totalRevenue ? stats.totalRevenue.toLocaleString('vi-VN') + ' ₫' : '0 ₫'}
                trend="8%" trendType="up"
                sub="Đã xác nhận"
                icon={
                  <svg viewBox="0 0 16 16" fill="none" className="h-5 w-5 text-green-400" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="8" cy="8" r="6" />
                    <path d="M5 8h6M8 5v6" />
                  </svg>
                }
              />
            </div>
          )}

          {/* Tabs */}
          <div className="mb-8 flex gap-1.5 rounded-full border border-[#222222] bg-[#141414] p-1.5 w-fit">
            <TabBtn active={tab === 'overview'} onClick={() => setTab('overview')}>Tổng quan</TabBtn>
            <TabBtn active={tab === 'bookings'} onClick={() => setTab('bookings')}>Booking</TabBtn>
            <TabBtn active={tab === 'users'} onClick={() => setTab('users')}>Người dùng</TabBtn>
            <TabBtn active={tab === 'services'} onClick={() => setTab('services')}>Dịch vụ & Giá</TabBtn>
            <TabBtn active={tab === 'consultations'} onClick={() => setTab('consultations')}>Yêu cầu tư vấn</TabBtn>
          </div>

          {/* Tab content */}
          {tab === 'overview' && (
            <div className="flex flex-col gap-6">
              {/* Main Charts Row */}
              <div className="grid gap-6 md:grid-cols-2">
                {loadingCharts ? (
                  <div className="flex h-64 items-center justify-center rounded-[16px] border border-[#2A2A2A] bg-[#1A1A1A] text-xs text-[#6B7280] md:col-span-2">
                    Đang tải dữ liệu biểu đồ...
                  </div>
                ) : (
                  <>
                    <LineChart data={chartData?.dailyStats} />
                    <RevenueChart data={chartData?.dailyStats} />
                  </>
                )}
              </div>

              {/* Bottom stats row */}
              <div className="grid gap-6 md:grid-cols-3">
                {loadingCharts ? (
                  <div className="flex h-64 items-center justify-center rounded-[16px] border border-[#2A2A2A] bg-[#1A1A1A] text-xs text-[#6B7280] md:col-span-3">
                    Đang tải dữ liệu...
                  </div>
                ) : (
                  <>
                    <TopPackagesChart data={chartData?.topPackages} />
                    <div className="md:col-span-2">
                      <RecentActivities activities={chartData?.recentActivities} />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          {tab === 'bookings' && <BookingsTab token={token} />}
          {tab === 'users' && <UsersTab token={token} />}
          {tab === 'services' && <ServicesTab token={token} />}
          {tab === 'consultations' && <ConsultationsTab token={token} />}
        </div>
      </main>
    </div>
  )
}
