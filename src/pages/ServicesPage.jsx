import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import logo from '../assets/logo.svg'

const NAV_LINKS = [
  { label: 'Trang chủ', to: '/' },
  { label: 'Sản phẩm', to: '/san-pham' },
  { label: 'Dịch vụ', to: '/dich-vu' },
  { label: 'Liên hệ', to: '/lien-he' },
]

const ICON_STYLES = {
  camera: {
    iconBg: 'bg-gradient-to-br from-[#E8C547] to-[#D4A837]',
    iconColor: 'text-[#0A0A0A]',
  },
  video: {
    iconBg: 'bg-gradient-to-br from-[#D62828] to-[#B82020]',
    iconColor: 'text-white',
  },
}

const SERVICE_LABEL_MAP = {
  'chup-anh': 'Gói chụp',
  'quay-video': 'Gói video',
}

function PackageIcon({ type, className = '' }) {
  if (type === 'camera') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M4 8.5C4 7.67157 4.67157 7 5.5 7H7.58579C7.851 7 8.10536 6.89464 8.29289 6.70711L9.20711 5.79289C9.39464 5.60536 9.649 5.5 9.91421 5.5H14.0858C14.351 5.5 14.6054 5.60536 14.7929 5.79289L15.7071 6.70711C15.8946 6.89464 16.149 7 16.4142 7H18.5C19.3284 7 20 7.67157 20 8.5V17.5C20 18.3284 19.3284 19 18.5 19H5.5C4.67157 19 4 18.3284 4 17.5V8.5Z" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="13" r="3.25" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4.5" y="7" width="10.5" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15 10.25L18.8584 8.04664C19.525 7.66582 20.35 8.14748 20.35 8.91499V15.085C20.35 15.8525 19.525 16.3342 18.8584 15.9534L15 13.75V10.25Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

function ToggleIcon({ isOpen }) {
  return (
    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8C547] text-sm font-bold text-[#0A0A0A] transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-45'}`}>
      <span className={`text-base leading-none transition-transform duration-300 ${isOpen ? 'rotate-180' : '-rotate-45'}`}>
        {isOpen ? '−' : '+'}
      </span>
    </span>
  )
}

function Tag({ children }) {
  return (
    <span
      className="rounded-full border border-[rgba(232,197,71,0.2)] bg-[rgba(232,197,71,0.1)] px-3 py-1 text-xs leading-4 text-[#E8C547]"
      style={{ fontFamily: "'Gowun Batang', serif" }}
    >
      {children}
    </span>
  )
}

function ServiceCategory({ name, description, tags, price, defaultOpen = false, withDivider = true, serviceLabel }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const priceLabel = price
    ? price.toLocaleString('vi-VN') + ' ₫'
    : 'Liên hệ'

  return (
    <div className={`flex flex-col bg-[rgba(232,197,71,0.05)] ${withDivider ? 'border-b border-[#2A2A2A]' : ''}`}>
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="flex items-center justify-between gap-4 px-6 py-7 text-left md:px-10"
      >
        <div className="flex flex-col gap-1">
          <span
            className="text-lg font-bold leading-7 text-[#E8C547]"
            style={{ fontFamily: "'Gowun Batang', serif" }}
          >
            {name}
          </span>
          <span
            className="text-sm font-semibold text-[#9CA3AF]"
            style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
          >
            {priceLabel}
          </span>
        </div>
        <ToggleIcon isOpen={isOpen} />
      </button>

      <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="flex flex-col gap-4 px-6 pb-7 md:px-10">
            <p
              className="m-0 border-l-2 border-[#E8C547] pl-4 text-sm leading-[180%] text-[#9CA3AF]"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            >
              {description}
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <Link
              to="/booking"
              state={{ service: serviceLabel, pkg: name }}
              className="mt-1 inline-flex items-center justify-center gap-2 self-center rounded-[10px] bg-[linear-gradient(135deg,#E8C547_0%,#D4A837_100%)] px-5 py-2.5 text-sm font-bold tracking-[0.5px] text-[#0A0A0A] transition-opacity hover:opacity-80"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            >
              Đặt dịch vụ ngay →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function ServicePackage({ data }) {
  const { iconBg, iconColor } = ICON_STYLES[data.iconType] || ICON_STYLES.camera

  return (
    <div className="overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A]">
      <div className="relative overflow-hidden border-b border-[#2A2A2A] bg-[linear-gradient(135deg,#1A1A1A_0%,#141414_100%)] px-6 py-10 md:px-10">
        <div className="absolute right-[-15%] top-[-25%] h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle,rgba(232,197,71,0.08)_0%,rgba(0,0,0,0)_70%)]" />
        <div className={`relative mb-8 flex h-20 w-20 items-center justify-center rounded-full ${iconBg} ${iconColor}`}>
          <PackageIcon type={data.iconType} className="h-9 w-9" />
        </div>
        <h2
          className="relative m-0 text-[28px] font-bold leading-[150%] text-white md:text-[32px]"
          style={{ fontFamily: "'Gowun Batang', serif" }}
        >
          {data.title}
        </h2>
        <p
          className="relative mt-3 max-w-[538px] text-base leading-[180%] text-[#9CA3AF]"
          style={{ fontFamily: "'Gowun Batang', serif" }}
        >
          {data.description}
        </p>
        <Link
          to="/booking"
          className="relative mt-6 inline-flex items-center gap-2 rounded-[10px] bg-[linear-gradient(135deg,#E8C547_0%,#D4A837_100%)] px-6 py-3 text-sm font-bold tracking-[0.5px] text-[#0A0A0A] shadow-[0_4px_20px_rgba(232,197,71,0.2)]"
        >
          Đặt lịch ngay
          <span>→</span>
        </Link>
      </div>

      <div className="flex flex-col">
        {data.categories.map((category, index) => (
          <ServiceCategory
            key={category.name}
            {...category}
            serviceLabel={SERVICE_LABEL_MAP[data.slug] || data.title}
            defaultOpen={index === 0}
            withDivider={index !== data.categories.length - 1}
          />
        ))}
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="flex w-full flex-col gap-10 bg-[#545454] px-4 py-8 md:px-8 lg:px-5 lg:py-[30px]">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-[50px]">
        <img src={logo} alt="Phiền TV" className="h-auto w-[220px] object-contain md:w-[260px] lg:w-[297px]" />

        <div className="flex w-full max-w-[489px] flex-col items-center justify-center gap-3 text-center lg:text-left">
          {['hello@phientv.com', 'Hà Nội, Việt Nam', '(+84) 123 456 789'].map((line) => (
            <p
              key={line}
              className="m-0 w-full text-[20px] leading-[130%] tracking-[-0.03em] text-[#FCFAF6] md:text-[24px] lg:text-[30px] lg:leading-[120%]"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1240px] justify-center lg:justify-start">
        <span
          className="text-center text-sm leading-[110%] tracking-[-0.03em] text-[#E4E4E4] md:text-base lg:text-left"
          style={{ fontFamily: "'Rethink Sans', sans-serif" }}
        >
          Phiền TV © 2025 All Rights Reserved
        </span>
      </div>
    </footer>
  )
}

export default function ServicesPage() {
  const [packages, setPackages] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/api/services')
      .then((res) => res.json())
      .then((data) => setPackages(Array.isArray(data) ? data : []))
      .catch((err) => console.error('Failed to load services:', err))
  }, [])

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col items-center bg-white">
      <Navbar />

      <main className="w-full bg-[#1E1E1E] px-4 py-12 md:px-8 md:py-16 lg:px-0 lg:py-20">
        <section className="mx-auto flex w-full max-w-[1536px] flex-col items-center px-4 text-center">
          <h1
            className="m-0 bg-[linear-gradient(135deg,#FFFFFF_0%,#E8C547_100%)] bg-clip-text text-[40px] font-bold leading-none tracking-[4px] text-transparent md:text-[52px] lg:text-[64px] lg:tracking-[8px]"
            style={{ fontFamily: "'Gowun Batang', serif" }}
          >
            DỊCH VỤ
          </h1>
          <p
            className="mt-6 max-w-[600px] text-base leading-[160%] text-[#9CA3AF] md:text-lg"
            style={{ fontFamily: "'Gowun Batang', serif" }}
          >
            Không chỉ là một buổi chụp ảnh hay quay video – đó là hành trình kể câu chuyện thương hiệu bằng hình ảnh, cảm xúc và chiến lược nội dung rõ ràng.
          </p>
        </section>

        <section className="mx-auto mt-16 grid w-full max-w-[1280px] gap-10 lg:grid-cols-2">
          {packages.map((pkg) => (
            <ServicePackage key={pkg.slug} data={pkg} />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  )
}
