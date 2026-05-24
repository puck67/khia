import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'

const MONTH_NAMES = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
]
const DAY_NAMES = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']

const PAYMENT_METHODS = [
  {
    id: 'bank',
    label: 'Chuyển khoản ngân hàng',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M3 9l9-6 9 6v2H3V9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M5 11v7M9 11v7M15 11v7M19 11v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M2 18h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'momo',
    label: 'Ví MoMo',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 12a4 4 0 108 0 4 4 0 00-8 0z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'cash',
    label: 'Thanh toán tiền mặt',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <rect x="2" y="6" width="20" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 9.5v6M18 9.5v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

function SummaryRow({ label, value, highlight }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span
        className="text-sm text-[#9CA3AF]"
        style={{ fontFamily: "'Gowun Batang', serif" }}
      >
        {label}
      </span>
      <span
        className={`text-sm font-semibold ${highlight ? 'text-[#E8C547]' : 'text-white'}`}
        style={{ fontFamily: "'Gowun Batang', serif" }}
      >
        {value}
      </span>
    </div>
  )
}

export default function PaymentPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { form = {}, selectedDate, selectedSlot } = location.state || {}

  const [selectedMethod, setSelectedMethod] = useState('bank')
  const [price, setPrice] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const dateLabel = selectedDate
    ? (() => {
        const d = new Date(selectedDate.year, selectedDate.month, selectedDate.day)
        return `${DAY_NAMES[d.getDay()]}, ${selectedDate.day} ${MONTH_NAMES[selectedDate.month]} ${selectedDate.year}`
      })()
    : null

  useEffect(() => {
    if (!form.service || !form.pkg) return
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/services/categories?service=${encodeURIComponent(form.service)}`)
      .then((r) => r.json())
      .then((cats) => {
        const match = cats.find((c) => c.name === form.pkg)
        if (match) setPrice(match.price)
      })
      .catch(() => {})
  }, [form.service, form.pkg])

  const priceLabel = price ? price.toLocaleString('vi-VN') + ' ₫' : 'Liên hệ'

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          date: selectedDate
            ? `${selectedDate.year}-${String(selectedDate.month + 1).padStart(2, '0')}-${String(selectedDate.day).padStart(2, '0')}`
            : null,
          slot: selectedSlot,
          paymentMethod: selectedMethod,
        }),
      })
      if (!res.ok) throw new Error('failed')
      navigate('/payment/success', { state: { form, selectedDate, selectedSlot, paymentMethod: selectedMethod, price } })
    } catch {
      alert('Có lỗi xảy ra, vui lòng thử lại.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-[1536px] bg-[#0A0A0A] text-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-[linear-gradient(180deg,#141414_0%,#0A0A0A_100%)] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto flex max-w-[1496px] flex-col items-center text-center">
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(232,197,71,0.1)] ring-1 ring-[#E8C547]/30">
            <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10" aria-hidden="true">
              <rect x="6" y="10" width="28" height="22" rx="3" stroke="#E8C547" strokeWidth="1.5" />
              <path d="M6 17h28" stroke="#E8C547" strokeWidth="1.5" />
              <path d="M12 24h6M12 28h4" stroke="#E8C547" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <h1
            className="m-0 bg-[linear-gradient(135deg,#FFFFFF_0%,#E8C547_100%)] bg-clip-text text-[36px] font-bold leading-none tracking-[3px] text-transparent md:text-[48px] lg:text-[56px] lg:tracking-[6px]"
            style={{ fontFamily: "'Gowun Batang', serif" }}
          >
            THANH TOÁN
          </h1>
          <p
            className="mt-4 max-w-[480px] text-base leading-[160%] text-[#9CA3AF]"
            style={{ fontFamily: "'Gowun Batang', serif" }}
          >
            Chọn phương thức thanh toán và xác nhận đặt lịch của bạn.
          </p>
        </div>
      </section>

      <main className="px-4 pb-20 pt-10 md:px-8">
        <div className="mx-auto grid max-w-[900px] gap-8 lg:grid-cols-[1fr_360px]">

          {/* Left: payment method */}
          <div className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-[20px] border border-[#2A2A2A] bg-[#1A1A1A]">
              <div className="border-b border-[#2A2A2A] px-8 py-6">
                <h2
                  className="m-0 text-[18px] font-bold text-white"
                  style={{ fontFamily: "'Gowun Batang', serif" }}
                >
                  Phương thức thanh toán
                </h2>
              </div>
              <div className="flex flex-col gap-3 px-8 py-6">
                {PAYMENT_METHODS.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedMethod(method.id)}
                    className={`flex items-center gap-4 rounded-[12px] border px-5 py-4 text-left transition-colors ${
                      selectedMethod === method.id
                        ? 'border-[#E8C547] bg-[rgba(232,197,71,0.08)]'
                        : 'border-[#2A2A2A] bg-[#141414] hover:border-[#E8C547]/40'
                    }`}
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] ${selectedMethod === method.id ? 'bg-[rgba(232,197,71,0.15)] text-[#E8C547]' : 'bg-[#1E1E1E] text-[#6B7280]'}`}>
                      {method.icon}
                    </div>
                    <span
                      className={`text-[15px] font-semibold ${selectedMethod === method.id ? 'text-white' : 'text-[#9CA3AF]'}`}
                      style={{ fontFamily: "'Gowun Batang', serif" }}
                    >
                      {method.label}
                    </span>
                    <div className={`ml-auto h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center ${selectedMethod === method.id ? 'border-[#E8C547]' : 'border-[#3A3A3A]'}`}>
                      {selectedMethod === method.id && (
                        <div className="h-2.5 w-2.5 rounded-full bg-[#E8C547]" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Bank transfer details */}
              {selectedMethod === 'bank' && (
                <div className="mx-8 mb-6 rounded-[12px] border border-[#E8C547]/20 bg-[rgba(232,197,71,0.05)] px-6 py-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.1em] text-[#E8C547]" style={{ fontFamily: "'Gowun Batang', serif" }}>
                    Thông tin chuyển khoản
                  </p>
                  <div className="flex flex-col gap-2">
                    {[
                      ['Ngân hàng', 'Vietcombank'],
                      ['Số tài khoản', '1234567890'],
                      ['Chủ tài khoản', 'PHIEN TV MEDIA'],
                      ['Nội dung CK', `Dat lich ${form.name || ''}`],
                    ].map(([label, val]) => (
                      <div key={label} className="flex items-center justify-between gap-4">
                        <span className="text-sm text-[#6B7280]" style={{ fontFamily: "'Gowun Batang', serif" }}>{label}</span>
                        <span className="text-sm font-semibold text-white" style={{ fontFamily: "'Gowun Batang', serif" }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedMethod === 'momo' && (
                <div className="mx-8 mb-6 rounded-[12px] border border-[#E8C547]/20 bg-[rgba(232,197,71,0.05)] px-6 py-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.1em] text-[#E8C547]" style={{ fontFamily: "'Gowun Batang', serif" }}>
                    Thông tin MoMo
                  </p>
                  <div className="flex flex-col gap-2">
                    {[
                      ['Số điện thoại', '0987654321'],
                      ['Tên tài khoản', 'PHIEN TV MEDIA'],
                    ].map(([label, val]) => (
                      <div key={label} className="flex items-center justify-between gap-4">
                        <span className="text-sm text-[#6B7280]" style={{ fontFamily: "'Gowun Batang', serif" }}>{label}</span>
                        <span className="text-sm font-semibold text-white" style={{ fontFamily: "'Gowun Batang', serif" }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedMethod === 'cash' && (
                <div className="mx-8 mb-6 rounded-[12px] border border-[#E8C547]/20 bg-[rgba(232,197,71,0.05)] px-6 py-5">
                  <p className="text-sm leading-[170%] text-[#9CA3AF]" style={{ fontFamily: "'Gowun Batang', serif" }}>
                    Thanh toán tiền mặt trực tiếp tại buổi chụp/quay. Đội ngũ sẽ xác nhận lịch hẹn qua điện thoại trước.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: order summary */}
          <div className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-[20px] border border-[#2A2A2A] bg-[#1A1A1A]">
              <div className="border-b border-[#2A2A2A] px-8 py-6">
                <h2
                  className="m-0 text-[18px] font-bold text-white"
                  style={{ fontFamily: "'Gowun Batang', serif" }}
                >
                  Tóm tắt đơn
                </h2>
              </div>
              <div className="flex flex-col gap-4 px-8 py-6">
                <SummaryRow label="Dịch vụ" value={form.service || '—'} />
                <SummaryRow label="Gói" value={form.pkg || '—'} />
                <SummaryRow label="Ngày" value={dateLabel || 'Chưa chọn'} />
                <SummaryRow label="Khung giờ" value={selectedSlot || 'Chưa chọn'} />
                {form.location && <SummaryRow label="Địa điểm" value={form.location} />}
                <div className="my-1 border-t border-[#2A2A2A]" />
                <SummaryRow label="Tổng cộng" value={priceLabel} highlight />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="flex h-[56px] w-full items-center justify-center gap-2 rounded-[12px] bg-[linear-gradient(135deg,#E8C547_0%,#D4A837_100%)] text-base font-bold text-[#0A0A0A] transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            >
              {submitting ? 'Đang xử lý...' : 'Xác nhận đặt lịch →'}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex h-[48px] w-full items-center justify-center gap-2 rounded-[12px] border border-[#2A2A2A] bg-transparent text-sm font-semibold text-[#9CA3AF] transition-colors hover:border-[#E8C547]/40 hover:text-white"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            >
              ← Quay lại
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
