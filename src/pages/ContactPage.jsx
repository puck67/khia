import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import logo from '../assets/logo.svg'
import photo12 from '../assets/photo12.png'
import ScrollReveal from '../components/ScrollReveal.jsx'

const CONTACT_ITEMS = [
  {
    title: 'Điện thoại',
    value: '+1012 3456 789',
    icon: 'phone',
  },
  {
    title: 'Email',
    value: 'demo@gmail.com',
    icon: 'mail',
  },
  {
    title: 'Địa chỉ',
    value: '132 Dartmouth Street Boston, Massachusetts 02156 United States',
    icon: 'location',
  },
]

const SOCIAL_ITEMS = ['f', '◎', '♪']

function ContactIcon({ type }) {
  if (type === 'phone') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-[#E8C547]" aria-hidden="true">
        <path d="M6.6 10.8C8.4 14.3 9.7 15.6 13.2 17.4L15.6 15C15.9 14.7 16.3 14.6 16.7 14.7C17.9 15.1 19.2 15.3 20.5 15.3C21.1 15.3 21.5 15.7 21.5 16.3V20.5C21.5 21.1 21.1 21.5 20.5 21.5C10.8 21.5 2.5 13.2 2.5 3.5C2.5 2.9 2.9 2.5 3.5 2.5H7.7C8.3 2.5 8.7 2.9 8.7 3.5C8.7 4.8 8.9 6.1 9.3 7.3C9.4 7.7 9.3 8.1 9 8.4L6.6 10.8Z" fill="currentColor" />
      </svg>
    )
  }

  if (type === 'mail') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-[#E8C547]" aria-hidden="true">
        <path d="M3 6.75C3 5.7835 3.7835 5 4.75 5H19.25C20.2165 5 21 5.7835 21 6.75V17.25C21 18.2165 20.2165 19 19.25 19H4.75C3.7835 19 3 18.2165 3 17.25V6.75Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 7L12 13L20 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-[#E8C547]" aria-hidden="true">
      <path d="M12 21C15.5 17 18.5 13.9 18.5 10.2C18.5 6.8 15.8 4 12 4C8.2 4 5.5 6.8 5.5 10.2C5.5 13.9 8.5 17 12 21Z" fill="currentColor" />
      <circle cx="12" cy="10" r="2.2" fill="#141414" />
    </svg>
  )
}

function ContactInfoCard() {
  return (
    <div className="w-full rounded-[24px] border border-[#2D2D2D] bg-[#141414] px-8 py-10 md:px-10 md:py-10 shadow-[0_16px_40px_rgba(0,0,0,0.35)] hover:border-[#E8C547]/20 transition-all duration-300 h-full">
      <h2
        className="m-0 text-[28px] font-bold leading-[41px] text-white"
        style={{ fontFamily: "'Gowun Batang', serif" }}
      >
        Thông tin liên hệ
      </h2>
      <p
        className="mt-2 text-lg leading-[26px] text-[#9CA3AF]"
        style={{ fontFamily: "'Gowun Batang', serif" }}
      >
        Liên hệ để được tư vấn trực tiếp
      </p>

      <div className="mt-16 flex flex-col gap-8">
        {CONTACT_ITEMS.map((item) => (
          <div key={item.title} className="flex items-center gap-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1A1A1A] border border-[#2D2D2D] text-[#E8C547]">
              <ContactIcon type={item.icon} />
            </div>
            <div>
              <p
                className="m-0 text-base leading-[23px] text-[#E4E4E4] font-medium"
                style={{ fontFamily: "'Gowun Batang', serif" }}
              >
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 flex items-center gap-3 text-white">
        {SOCIAL_ITEMS.map((item) => (
          <span
            key={item}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#2D2D2D] bg-[#1A1A1A] text-sm text-[#9CA3AF] hover:bg-[#E8C547] hover:text-[#0A0A0A] hover:border-transparent cursor-pointer transition-all duration-300"
            style={{ fontFamily: "'Gowun Batang', serif" }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function ContactFormCard() {
  return (
    <div className="w-full rounded-[24px] border border-[#2D2D2D] bg-[#141414] px-8 py-10 md:px-10 md:py-10 shadow-[0_16px_40px_rgba(0,0,0,0.35)] hover:border-[#E8C547]/20 transition-all duration-300 h-full">
      <h2
        className="m-0 text-[28px] font-bold leading-[41px] text-white"
        style={{ fontFamily: "'Gowun Batang', serif" }}
      >
        Thông tin khách hàng
      </h2>
      <p
        className="mt-2 text-lg leading-[26px] text-[#9CA3AF]"
        style={{ fontFamily: "'Gowun Batang', serif" }}
      >
        Để lại thông tin để chúng tôi có thể liên hệ tư vấn
      </p>

      <form className="mt-12 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
        {['Họ và tên', 'Email', 'Số điện thoại'].map((label) => (
          <input
            key={label}
            type="text"
            placeholder={label}
            className="h-[52px] rounded-[12px] border border-[#2D2D2D] bg-[#1C1C1C] px-5 text-base text-white outline-none placeholder:text-[#6B7280] focus:border-[#E8C547]/50 transition-colors"
            style={{ fontFamily: "'Gowun Batang', serif" }}
          />
        ))}

        <button
          type="submit"
          className="mt-4 inline-flex h-[52px] w-[160px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#E8C547_0%,#D4A837_100%)] text-sm font-bold uppercase tracking-wider text-[#0A0A0A] shadow-[0_4px_16px_rgba(232,197,71,0.25)] hover:scale-103 hover:shadow-[0_6px_20px_rgba(232,197,71,0.4)] transition-all duration-300"
          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
        >
          Gửi ngay
        </button>
      </form>
    </div>
  )
}

function ContactHero() {
  return (
    <section className="w-full bg-[#1E1E1E] px-4 py-12 md:px-8 md:py-16 lg:px-5 lg:py-[80px] lg:pb-[65px]">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center gap-[50px] text-center">
        <ScrollReveal>
          <h1
            className="m-0 bg-[linear-gradient(135deg,#FFFFFF_0%,#E8C547_100%)] bg-clip-text text-[40px] font-bold leading-none tracking-[4px] text-transparent md:text-[52px] lg:text-[64px] lg:tracking-[8px]"
            style={{ fontFamily: "'Gowun Batang', serif" }}
          >
            LIÊN HỆ
          </h1>
        </ScrollReveal>
      </div>
    </section>
  )
}

function ContactMain() {
  return (
    <main className="w-full bg-[#1E1E1E] px-4 pb-16 md:px-8 lg:px-0">
      <section className="mx-auto grid w-full max-w-[1280px] gap-8 lg:grid-cols-2">
        <ScrollReveal className="w-full">
          <ContactInfoCard />
        </ScrollReveal>
        <ScrollReveal delay={150} className="w-full">
          <ContactFormCard />
        </ScrollReveal>
      </section>
    </main>
  )
}

function ContactCta() {
  return (
    <section
      className="flex w-full items-center justify-center bg-cover bg-center px-4 py-24 md:px-8 md:py-32 lg:px-0"
      style={{ backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${photo12})` }}
    >
      <ScrollReveal className="w-full max-w-[800px] flex justify-center">
        <div className="w-full rounded-[24px] border border-[#2D2D2D]/30 bg-black/65 backdrop-blur-md px-8 py-10 text-center shadow-[0_16px_50px_rgba(0,0,0,0.5)]">
          <h2
            className="m-0 text-center text-[36px] font-bold leading-[120%] tracking-[-0.03em] text-[#E8C547] md:text-[48px] lg:text-[56px]"
            style={{ fontFamily: "'Gowun Batang', serif" }}
          >
            Cảm ơn vì đã liên hệ
          </h2>
          <div className="h-[2px] w-16 bg-white/20 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-sm text-[#9CA3AF] uppercase tracking-wider font-semibold" style={{ fontFamily: "'Rethink Sans', sans-serif" }}>
            Chúng tôi sẽ phản hồi bạn trong vòng 24 giờ làm việc
          </p>
        </div>
      </ScrollReveal>
    </section>
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

export default function ContactPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col items-center bg-[#1E1E1E]">
      <Navbar />
      <ContactHero />
      <ContactMain />
      <ContactCta />
      <Footer />
    </div>
  )
}
