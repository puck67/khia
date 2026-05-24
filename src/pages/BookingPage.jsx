import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'

const WEEK_DAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']

const MONTH_NAMES = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
]

const TIME_SLOTS = [
  '08:00 - 10:00',
  '10:00 - 12:00',
  '13:00 - 15:00',
  '15:00 - 17:00',
  '17:00 - 19:00',
  '19:00 - 21:00',
]

function Field({ label, required = false, children }) {
  return (
    <div className="flex flex-col gap-[10px]">
      <label className="text-sm font-medium leading-[21px] text-[#9CA3AF]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
        {label}
        {required && <span className="text-[#D93F3F]"> *</span>}
      </label>
      {children}
    </div>
  )
}

function BookingFormCard({ form, onChange, serviceOptions, pkgOptions }) {
  return (
    <div className="relative overflow-hidden rounded-[24px] border border-[#222222] bg-[#141414] px-[30px] py-[40px] md:px-[40px] shadow-[0_16px_40px_rgba(0,0,0,0.35)] hover:border-[#E8C547]/20 transition-all duration-300 h-full flex flex-col justify-between">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[460px] w-[512px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(99.6%_57.81%_at_50%_50%,rgba(232,197,71,0.06)_0%,rgba(0,0,0,0)_70%)]" />
      
      <div>
        <h2 className="relative m-0 text-[28px] font-bold leading-[42px] text-white" style={{ fontFamily: "'Gowun Batang', serif" }}>
          Thông Tin Đặt Lịch
        </h2>

        <div className="relative mt-8 flex flex-col gap-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Họ và tên" required>
              <input
                type="text"
                placeholder="Nhập họ và tên"
                value={form.name}
                onChange={(e) => onChange('name', e.target.value)}
                className="h-[52px] w-full rounded-[12px] border border-[#2D2D2D] bg-[#1C1C1C] px-5 text-[15px] text-white outline-none placeholder:text-[#6B7280] focus:border-[#E8C547]/50 focus:bg-[#1E1E1E] transition-all"
                style={{ fontFamily: "'Gowun Batang', serif" }}
              />
            </Field>
            <Field label="Số điện thoại" required>
              <input
                type="text"
                placeholder="Nhập số điện thoại"
                value={form.phone}
                onChange={(e) => onChange('phone', e.target.value)}
                className="h-[52px] w-full rounded-[12px] border border-[#2D2D2D] bg-[#1C1C1C] px-5 text-[15px] text-white outline-none placeholder:text-[#6B7280] focus:border-[#E8C547]/50 focus:bg-[#1E1E1E] transition-all"
                style={{ fontFamily: "'Gowun Batang', serif" }}
              />
            </Field>
          </div>

          <Field label="Email" required>
            <input
              type="email"
              placeholder="Nhập email của bạn"
              value={form.email}
              onChange={(e) => onChange('email', e.target.value)}
              className="h-[52px] w-full rounded-[12px] border border-[#2D2D2D] bg-[#1C1C1C] px-5 text-[15px] text-white outline-none placeholder:text-[#6B7280] focus:border-[#E8C547]/50 focus:bg-[#1E1E1E] transition-all"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            />
          </Field>

          <Field label="Dịch vụ" required>
            <div className="relative">
              <select
                value={form.service}
                onChange={(e) => onChange('service', e.target.value)}
                className={`h-[52px] w-full appearance-none rounded-[12px] border border-[#2D2D2D] bg-[#1C1C1C] px-5 text-[15px] outline-none focus:border-[#E8C547]/50 ${form.service ? 'text-white font-medium' : 'text-[#9CA3AF]'}`}
                style={{ fontFamily: "'Gowun Batang', serif" }}
              >
                <option value="">Chọn dịch vụ</option>
                {serviceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </Field>

          <Field label="Gói dịch vụ">
            <div className="relative">
              <select
                value={form.pkg}
                onChange={(e) => onChange('pkg', e.target.value)}
                className={`h-[52px] w-full appearance-none rounded-[12px] border border-[#2D2D2D] bg-[#1C1C1C] px-5 text-[15px] outline-none focus:border-[#E8C547]/50 ${form.pkg ? 'text-white font-medium' : 'text-[#9CA3AF]'}`}
                style={{ fontFamily: "'Gowun Batang', serif" }}
              >
                <option value="">Chọn gói dịch vụ</option>
                {pkgOptions.map((o) => <option key={o.name} value={o.name}>{o.name}</option>)}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </Field>

          <Field label="Địa điểm chụp">
            <input
              type="text"
              placeholder="Nhập địa điểm mong muốn"
              value={form.location}
              onChange={(e) => onChange('location', e.target.value)}
              className="h-[52px] w-full rounded-[12px] border border-[#2D2D2D] bg-[#1C1C1C] px-5 text-[15px] text-white outline-none placeholder:text-[#6B7280] focus:border-[#E8C547]/50 focus:bg-[#1E1E1E] transition-all"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            />
          </Field>

          <Field label="Yêu cầu thêm">
            <textarea
              placeholder="Mô tả chi tiết yêu cầu của bạn..."
              value={form.notes}
              onChange={(e) => onChange('notes', e.target.value)}
              className="min-h-[120px] w-full rounded-[12px] border border-[#2D2D2D] bg-[#1C1C1C] px-5 py-4 text-[15px] text-white outline-none placeholder:text-[#6B7280] focus:border-[#E8C547]/50 focus:bg-[#1E1E1E] transition-all"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            />
          </Field>
        </div>
      </div>
    </div>
  )
}

function CalendarCard({ selectedDate, setSelectedDate, selectedSlot, setSelectedSlot, onConfirm }) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const isPast = (day) => {
    const d = new Date(viewYear, viewMonth, day)
    d.setHours(0, 0, 0, 0)
    const t = new Date()
    t.setHours(0, 0, 0, 0)
    return d < t
  }

  const isToday = (day) =>
    viewYear === today.getFullYear() &&
    viewMonth === today.getMonth() &&
    day === today.getDate()

  const isSel = (day) =>
    selectedDate &&
    selectedDate.year === viewYear &&
    selectedDate.month === viewMonth &&
    selectedDate.day === day

  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth())

  const prevMonth = () => {
    if (!canGoPrev) return
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1) }
    else setViewMonth((m) => m - 1)
  }

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1) }
    else setViewMonth((m) => m + 1)
  }

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-[#222222] bg-[#141414] px-[30px] py-[40px] md:px-[40px] shadow-[0_16px_40px_rgba(0,0,0,0.35)] hover:border-[#E8C547]/20 transition-all duration-300 flex flex-col justify-between h-full">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[460px] w-[512px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(99.6%_57.81%_at_50%_50%,rgba(232,197,71,0.06)_0%,rgba(0,0,0,0)_70%)]" />
      
      <div>
        <h2 className="relative m-0 text-[28px] font-bold leading-[42px] text-white" style={{ fontFamily: "'Gowun Batang', serif" }}>
          Chọn Ngày & Giờ
        </h2>

        {/* Calendar */}
        <div className="relative mt-8">
          <div className="flex items-center justify-between">
            <h3 className="m-0 text-[18px] font-bold leading-[27px] text-white" style={{ fontFamily: "'Gowun Batang', serif" }}>
              {MONTH_NAMES[viewMonth]}, {viewYear}
            </h3>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prevMonth}
                disabled={!canGoPrev}
                className={`flex h-9 w-9 items-center justify-center rounded-full border border-[#2D2D2D] bg-[#1C1C1C] transition-all ${canGoPrev ? 'text-[#9CA3AF] hover:border-[#E8C547] hover:text-[#E8C547]' : 'cursor-not-allowed text-[#9CA3AF]/20 border-[#2D2D2D]/50'}`}
              >
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
                  <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={nextMonth}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2D2D2D] bg-[#1C1C1C] text-[#9CA3AF] transition-all hover:border-[#E8C547] hover:text-[#E8C547]"
              >
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-7 text-center">
            {WEEK_DAYS.map((day) => (
              <span key={day} className="py-2 text-xs font-bold text-[#6B7280]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                {day}
              </span>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-1">
            {cells.map((day, idx) => {
              if (day === null) return <div key={`e-${idx}`} className="h-[42px]" />
              const past = isPast(day)
              const tod = isToday(day)
              const sel = isSel(day)
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => { if (!past) setSelectedDate({ year: viewYear, month: viewMonth, day }) }}
                  disabled={past}
                  className={`flex h-[42px] items-center justify-center rounded-[12px] border text-sm font-medium transition-all
                    ${sel
                      ? 'border-[#E8C547] bg-[#E8C547]/10 font-bold text-[#E8C547] shadow-[0_0_12px_rgba(232,197,71,0.1)]'
                      : past
                      ? 'cursor-not-allowed border-transparent text-[#9CA3AF]/20'
                      : tod
                      ? 'border-[#E8C547]/40 text-[#E8C547] hover:border-[#E8C547] hover:bg-[#E8C547]/5'
                      : 'border-transparent text-[#9CA3AF] hover:border-[#2D2D2D] hover:bg-[#1C1C1C]'}`}
                  style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>

        {/* Time picker */}
        <div className="mt-8">
          <h4
            className="m-0 flex items-center gap-2 text-base font-bold leading-6 text-white"
            style={{ fontFamily: "'Gowun Batang', serif" }}
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5 shrink-0 text-[#E8C547]" aria-hidden="true">
              <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10 5.5V10.5L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Chọn khung giờ
          </h4>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {TIME_SLOTS.map((slot) => {
              const sel = selectedSlot === slot
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`h-[48px] rounded-[12px] border text-sm transition-all ${sel ? 'border-[#E8C547] bg-[#E8C547]/10 font-semibold text-[#E8C547] shadow-[0_0_10px_rgba(232,197,71,0.05)]' : 'border-[#2D2D2D] bg-[#1C1C1C] text-[#9CA3AF] hover:border-[#E8C547]/50 hover:text-white'}`}
                  style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                >
                  {slot}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onConfirm}
        className="mt-10 h-[56px] w-full rounded-full bg-[linear-gradient(135deg,#E8C547_0%,#D4A837_100%)] text-base font-bold uppercase tracking-wider text-[#0A0A0A] shadow-[0_4px_16px_rgba(232,197,71,0.25)] hover:scale-102 hover:shadow-[0_6px_20px_rgba(232,197,71,0.4)] transition-all duration-300"
        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
      >
        Xác Nhận Đặt Lịch
      </button>
    </div>
  )
}

export default function BookingPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()

  const prefill = location.state || {}

  const [form, setForm] = useState({
    name: user ? `${user.firstName} ${user.lastName}`.trim() : '',
    phone: user?.phone || '',
    email: user?.email || '',
    service: prefill.service || '',
    pkg: prefill.pkg || '',
    location: '',
    notes: '',
  })
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [serviceOptions, setServiceOptions] = useState([])
  const [pkgOptions, setPkgOptions] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/services/options`)
      .then((r) => r.json())
      .then(setServiceOptions)
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!form.service) { setPkgOptions([]); return }
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/services/categories?service=${encodeURIComponent(form.service)}`)
      .then((r) => r.json())
      .then(setPkgOptions)
      .catch(() => {})
  }, [form.service])

  const handleChange = (field, value) => {
    setForm((f) => {
      const next = { ...f, [field]: value }
      if (field === 'service') next.pkg = ''
      return next
    })
  }

  const handleConfirm = () => {
    navigate('/booking/confirm', {
      state: { form, selectedDate, selectedSlot },
    })
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-[1536px] bg-[#0A0A0A] text-white">
      <Navbar />

      <section className="bg-[linear-gradient(180deg,#141414_0%,#0A0A0A_100%)] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto flex max-w-[1496px] flex-col items-center text-center">
          <ScrollReveal>
            <h1
              className="m-0 bg-[linear-gradient(135deg,#FFFFFF_0%,#E8C547_100%)] bg-clip-text text-[40px] font-bold leading-none tracking-[4px] text-transparent md:text-[52px] lg:text-[64px] lg:tracking-[8px]"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            >
              ĐẶT LỊCH
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p
              className="mt-6 max-w-[600px] text-base leading-[160%] text-[#9CA3AF] md:text-lg"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            >
              Hãy để chúng tôi lưu giữ những khoảnh khắc đẹp nhất của bạn bằng trải nghiệm đặt lịch rõ ràng và thuận tiện.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <main className="px-4 pb-20 pt-10 md:px-8 lg:pt-14">
        <div className="mx-auto grid max-w-[1068px] gap-10 lg:grid-cols-2 items-stretch">
          <ScrollReveal className="w-full h-full">
            <BookingFormCard form={form} onChange={handleChange} serviceOptions={serviceOptions} pkgOptions={pkgOptions} />
          </ScrollReveal>
          <ScrollReveal delay={150} className="w-full h-full">
            <CalendarCard
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
              onConfirm={handleConfirm}
            />
          </ScrollReveal>
        </div>
      </main>
    </div>
  )
}
