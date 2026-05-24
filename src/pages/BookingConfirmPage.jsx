import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'

const MONTH_NAMES = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
]

const DAY_NAMES = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#1E1E1E] text-[#E8C547]">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-medium uppercase tracking-[0.08em] text-[#6B7280]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
          {label}
        </span>
        <span className="text-[15px] font-semibold leading-6 text-white" style={{ fontFamily: "'Gowun Batang', serif" }}>
          {value || <span className="italic text-[#6B7280]">Chưa điền</span>}
        </span>
      </div>
    </div>
  )
}

export default function BookingConfirmPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { form = {}, selectedDate, selectedSlot } = location.state || {}

  const [price, setPrice] = useState(null)

  useEffect(() => {
    if (!form.service || !form.pkg) return
    fetch(`http://localhost:3001/api/services/categories?service=${encodeURIComponent(form.service)}`)
      .then((r) => r.json())
      .then((cats) => {
        const match = cats.find((c) => c.name === form.pkg)
        if (match) setPrice(match.price)
      })
      .catch(() => {})
  }, [form.service, form.pkg])

  const priceLabel = price ? price.toLocaleString('vi-VN') + ' ₫' : null

  const dateLabel = selectedDate
    ? (() => {
        const d = new Date(selectedDate.year, selectedDate.month, selectedDate.day)
        return `${DAY_NAMES[d.getDay()]}, ${selectedDate.day} ${MONTH_NAMES[selectedDate.month]} ${selectedDate.year}`
      })()
    : null

  return (
    <div className="mx-auto min-h-screen w-full max-w-[1536px] bg-[#0A0A0A] text-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-[linear-gradient(180deg,#141414_0%,#0A0A0A_100%)] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto flex max-w-[1496px] flex-col items-center text-center">
          {/* Checkmark circle */}
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(232,197,71,0.1)] ring-1 ring-[#E8C547]/30">
            <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10" aria-hidden="true">
              <circle cx="20" cy="20" r="19" stroke="#E8C547" strokeWidth="1.5" />
              <path d="M12 20.5L17.5 26L28 15" stroke="#E8C547" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1
            className="m-0 bg-[linear-gradient(135deg,#FFFFFF_0%,#E8C547_100%)] bg-clip-text text-[36px] font-bold leading-none tracking-[3px] text-transparent md:text-[48px] lg:text-[56px] lg:tracking-[6px]"
            style={{ fontFamily: "'Gowun Batang', serif" }}
          >
            XÁC NHẬN ĐẶT LỊCH
          </h1>
          <p
            className="mt-5 max-w-[520px] text-base leading-[160%] text-[#9CA3AF] md:text-lg"
            style={{ fontFamily: "'Gowun Batang', serif" }}
          >
            Vui lòng kiểm tra lại thông tin bên dưới trước khi gửi yêu cầu đặt lịch.
          </p>
        </div>
      </section>

      <main className="px-4 pb-24 pt-10 md:px-8 lg:pt-14">
        <div className="mx-auto max-w-[760px]">

          {/* Booking ID badge */}
          <div className="mb-8 flex items-center justify-center">
            <span
              className="rounded-full border border-[#2A2A2A] bg-[#1A1A1A] px-5 py-2 text-sm text-[#6B7280]"
              style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
            >
              Mã đặt lịch tạm thời:{' '}
              <span className="font-bold text-[#E8C547]">
                #PTV-{Math.random().toString(36).slice(2, 8).toUpperCase()}
              </span>
            </span>
          </div>

          {/* Card */}
          <div className="relative overflow-hidden rounded-[24px] border border-[#2A2A2A] bg-[#1A1A1A]">
            {/* Glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(232,197,71,0.06)_0%,transparent_70%)]" />

            {/* Section: Thông tin cá nhân */}
            <div className="relative border-b border-[#2A2A2A] px-8 py-8 md:px-10">
              <h2
                className="mb-6 flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.12em] text-[#E8C547]"
                style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
              >
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                  <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M3 17c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Thông tin cá nhân
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <InfoRow
                  icon={
                    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
                      <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M3 17c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  }
                  label="Họ và tên"
                  value={form.name}
                />
                <InfoRow
                  icon={
                    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
                      <path d="M3 5.5A1.5 1.5 0 014.5 4h11A1.5 1.5 0 0117 5.5v9a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 14.5v-9z" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M3 6l7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  }
                  label="Email"
                  value={form.email}
                />
                <InfoRow
                  icon={
                    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
                      <path d="M4 3h3l1.5 4-2 1.5a11 11 0 005 5L13 11l4 1.5V16a1 1 0 01-1 1C7.163 17 3 12.837 3 7.5A1 1 0 014 6.5V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                  }
                  label="Số điện thoại"
                  value={form.phone}
                />
                <InfoRow
                  icon={
                    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
                      <path d="M10 2C7.239 2 5 4.239 5 7c0 4.418 5 11 5 11s5-6.582 5-11c0-2.761-2.239-5-5-5z" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="10" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  }
                  label="Địa điểm"
                  value={form.location}
                />
              </div>
            </div>

            {/* Section: Dịch vụ */}
            <div className="relative border-b border-[#2A2A2A] px-8 py-8 md:px-10">
              <h2
                className="mb-6 flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.12em] text-[#E8C547]"
                style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
              >
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                  <rect x="3" y="5" width="8" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M11 8.5l4.5-2.5v8L11 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                Dịch vụ đặt
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <InfoRow
                  icon={
                    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
                      <path d="M3 5h14M3 10h14M3 15h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  }
                  label="Dịch vụ"
                  value={form.service}
                />
                <InfoRow
                  icon={
                    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
                      <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                      <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                      <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                      <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  }
                  label="Gói dịch vụ"
                  value={form.pkg}
                />
                {priceLabel && (
                  <InfoRow
                    icon={
                      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
                        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M10 6.5v1M10 12.5v1M7.5 8.5a2.5 1.5 0 015 0c0 1-1 1.5-2.5 1.5s-2.5.5-2.5 1.5a2.5 1.5 0 005 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    }
                    label="Giá dịch vụ"
                    value={priceLabel}
                  />
                )}
              </div>
              {form.notes && (
                <div className="mt-5">
                  <InfoRow
                    icon={
                      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
                        <path d="M4 4h12v10a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M7 8h6M7 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    }
                    label="Yêu cầu thêm"
                    value={form.notes}
                  />
                </div>
              )}
            </div>

            {/* Section: Ngày & Giờ */}
            <div className="relative px-8 py-8 md:px-10">
              <h2
                className="mb-6 flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.12em] text-[#E8C547]"
                style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
              >
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                  <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M3 8h14M7 3v2M13 3v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Thời gian
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <InfoRow
                  icon={
                    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
                      <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M3 8h14M7 3v2M13 3v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  }
                  label="Ngày"
                  value={dateLabel}
                />
                <InfoRow
                  icon={
                    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
                      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M10 6v4.5L13 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  }
                  label="Khung giờ"
                  value={selectedSlot}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate('/booking')}
              className="flex h-[56px] flex-1 items-center justify-center gap-2 rounded-[12px] border border-[#2A2A2A] bg-[#1A1A1A] text-base font-semibold text-[#9CA3AF] transition-colors hover:border-[#E8C547]/40 hover:text-white"
              style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
            >
              ← Chỉnh sửa
            </button>
            <button
              type="button"
              onClick={() => navigate('/payment', { state: { form, selectedDate, selectedSlot } })}
              className="flex h-[56px] flex-1 items-center justify-center gap-2 rounded-[12px] bg-[linear-gradient(135deg,#E8C547_0%,#D4A837_100%)] text-base font-semibold text-[#0A0A0A] transition-opacity hover:opacity-90"
              style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
            >
              Tiến hành thanh toán →
            </button>
          </div>

          <p
            className="mt-6 text-center text-sm leading-[160%] text-[#6B7280]"
            style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
          >
            Sau khi gửi, đội ngũ Phiền TV sẽ liên hệ xác nhận trong vòng 24 giờ.
          </p>
        </div>
      </main>
    </div>
  )
}
