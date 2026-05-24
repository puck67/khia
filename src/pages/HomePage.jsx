import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import logo from '../assets/logo.svg'
import heroImg from '../assets/photo1.png'
import imageBreak from '../assets/photo2.png'
import ScrollReveal from '../components/ScrollReveal.jsx'

// Additional project assets
import projectImg1 from '../assets/photo4.png' // Từng Là Của Nhau
import projectImg2 from '../assets/photo7.png' // Tết Sum Vầy
import projectImg3 from '../assets/photo9.png' // Hoàng Hôn Của Chúng Ta

function Hero() {
  return (
    <div className="relative w-full overflow-hidden bg-[#1E1E1E]">
      <div
        className="min-h-[360px] w-full bg-cover bg-center md:min-h-[500px] lg:min-h-[720px] scale-105 animate-zoom-in"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(30,30,30,0.9)), url(${heroImg})`,
        }}
      />
      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 px-4 text-center">
        <div className="animate-fade-in-up flex flex-col items-center gap-4">
          <h1 className="m-0 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl" style={{ fontFamily: "'Gowun Batang', serif" }}>
            PHIỀN <span className="text-[#E8C547]">TV</span>
          </h1>
          <div className="h-[2px] w-20 bg-[#E8C547] rounded-full" />
          <p className="m-0 max-w-xl text-sm font-medium tracking-wide text-gray-200 uppercase md:text-base lg:text-lg" style={{ fontFamily: "'Gowun Batang', serif" }}>
            Nội dung đủ tốt phải đủ "phiền" để không thể lướt qua
          </p>
          <Link
            to="/booking"
            className="mt-6 inline-flex h-[52px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#E8C547_0%,#D4A837_100%)] px-8 text-sm font-bold uppercase tracking-wider text-[#0A0A0A] shadow-[0_4px_20px_rgba(232,197,71,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_24px_rgba(232,197,71,0.5)]"
            style={{ fontFamily: "'Gowun Batang', serif" }}
          >
            Đặt lịch sản xuất
          </Link>
        </div>
      </div>
    </div>
  )
}

function StatsBanner() {
  const stats = [
    { value: '50+', label: 'Kênh đã xây dựng', sub: 'TikTok, Reels, Shorts' },
    { value: '100M+', label: 'Tổng lượt xem', sub: 'Nội dung viral chuyển đổi' },
    { value: '200+', label: 'Dự án hoàn thành', sub: 'MV, TVC & Video ngắn' },
    { value: '98%', label: 'Khách hàng hài lòng', sub: 'Hợp tác tăng trưởng dài hạn' }
  ]

  return (
    <section className="w-full bg-[#181818] border-y border-[#2D2D2D] py-12 md:py-16">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 items-center">
          {stats.map((s, idx) => (
            <ScrollReveal key={idx} delay={idx * 100} className="flex flex-col items-center text-center px-4">
              <span 
                className="text-[44px] font-extrabold md:text-[52px] leading-none bg-[linear-gradient(135deg,#FFFFFF_0%,#E8C547_100%)] bg-clip-text text-transparent"
                style={{ fontFamily: "'Gowun Batang', serif" }}
              >
                {s.value}
              </span>
              <span 
                className="mt-3 text-sm font-bold text-white tracking-wide"
                style={{ fontFamily: "'Gowun Batang', serif" }}
              >
                {s.label}
              </span>
              <span 
                className="mt-1 text-[11px] text-[#6B7280]"
                style={{ fontFamily: "'Gowun Batang', serif" }}
              >
                {s.sub}
              </span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhatWeDoSection() {
  return (
    <section className="w-full bg-[#1E1E1E] px-4 py-20 md:px-8 lg:px-16 border-b border-[#2D2D2D]">
      <div className="mx-auto max-w-[1240px] grid gap-12 lg:grid-cols-12 items-center">
        {/* Left column: Text */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <ScrollReveal>
            <span
              className="text-[#E8C547] text-xs font-bold uppercase tracking-[0.2em] block mb-2"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            >
              Về Chúng Tôi
            </span>
            <h2
              className="m-0 text-[36px] font-bold leading-tight text-white md:text-[50px] lg:text-[56px]"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            >
              GIỚI THIỆU
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={150}>
            <div className="flex flex-col gap-4 text-base leading-[170%] text-[#9CA3AF] md:text-lg" style={{ fontFamily: "'Gowun Batang', serif" }}>
              <p className="m-0 text-white font-semibold">
                Phiền TV là production house chuyên sản xuất nội dung số và xây dựng kênh trên các nền tảng mạng xã hội, đặc biệt là TikTok.
              </p>
              <p className="m-0">
                Chúng tôi đồng hành cùng cá nhân, cửa hàng online và các thương hiệu nhỏ từ bước khởi đầu: lên ý tưởng, định hướng nội dung, sản xuất video ngắn đến phát triển kênh và tối ưu tăng trưởng dài hạn.
              </p>
              <p className="m-0">
                Tên gọi <strong className="text-[#E8C547]">"Phiền"</strong> không mang nghĩa tiêu cực. Chúng tôi tin rằng một nội dung đủ tốt phải đủ "phiền" để người xem không thể lướt qua, phải khiến họ dừng lại, ghi nhớ và hành động. Vì vậy, Phiền TV không chỉ tạo ra những video đẹp mắt hay bắt trend. Chúng tôi tập trung vào nội dung chiến lược, phục vụ mục tiêu bán hàng và xây dựng thương hiệu bền vững.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <Link
              to="/dich-vu"
              className="mt-4 inline-flex items-center gap-2 text-[#E8C547] font-bold text-sm tracking-wider hover:underline uppercase"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            >
              Khám phá các gói dịch vụ <span>→</span>
            </Link>
          </ScrollReveal>
        </div>

        {/* Right column: Image frame */}
        <ScrollReveal delay={300} className="lg:col-span-5 relative">
          <div className="pointer-events-none absolute inset-0 -m-4 bg-[radial-gradient(circle_at_center,rgba(232,197,71,0.12)_0%,transparent_70%)] blur-xl" />
          <div className="relative group overflow-hidden rounded-[24px] border border-[#2D2D2D] bg-[#141414] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all hover:border-[#E8C547]/20">
            <img 
              src={imageBreak} 
              alt="Phiền TV Crew" 
              className="block w-full h-[400px] object-cover rounded-[18px] transition-transform duration-700 ease-out group-hover:scale-105" 
            />
            <div className="absolute inset-2 rounded-[18px] border border-[#E8C547]/0 group-hover:border-[#E8C547]/20 pointer-events-none transition-colors duration-500" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function FeaturedServicesSection() {
  const services = [
    {
      title: 'GÓI CHỤP',
      desc: 'Tư duy điện ảnh thổi hồn vào từng khung hình tĩnh. Chụp ảnh sản phẩm nghệ thuật, chân dung cá nhân, lookbook thương hiệu, couple...',
      color: 'from-[#E8C547] to-[#D4A837]',
      link: '/dich-vu',
      tag: 'Chụp ảnh chuyên nghiệp'
    },
    {
      title: 'GÓI VIDEO',
      desc: 'Từ ý tưởng kịch bản độc đáo đến sản xuất hậu kỳ chỉn chu: Short film, MV ca nhạc, TVC, Phim quảng cáo doanh nghiệp...',
      color: 'from-[#D62828] to-[#B82020]',
      link: '/dich-vu',
      tag: 'Phim ngắn & TVC'
    },
    {
      title: 'XÂY DỰNG KÊNH',
      desc: 'Giải pháp trọn gói từ hoạch định chiến lược, lên kịch bản, quay dựng, quản lý và tối ưu kênh tăng trưởng doanh số thực chiến.',
      color: 'from-[#3B82F6] to-[#2563EB]',
      link: '/dich-vu',
      tag: 'TikTok & Reels'
    }
  ]

  return (
    <section className="w-full bg-[#1E1E1E] px-4 py-20 md:px-8 lg:px-16 border-b border-[#2D2D2D]">
      <div className="mx-auto max-w-[1240px]">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span
              className="text-[#E8C547] text-xs font-bold uppercase tracking-[0.2em] block mb-2"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            >
              Giải Pháp Truyền Thông
            </span>
            <h2
              className="m-0 text-[36px] font-bold leading-tight text-white md:text-[50px]"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            >
              DỊCH VỤ TIÊU BIỂU
            </h2>
          </div>
          <Link
            to="/dich-vu"
            className="h-[46px] shrink-0 inline-flex items-center justify-center rounded-full border border-[#2D2D2D] hover:border-[#E8C547]/50 hover:text-[#E8C547] px-6 text-xs font-bold uppercase tracking-wider text-white transition-all self-center md:self-end"
            style={{ fontFamily: "'Gowun Batang', serif" }}
          >
            Tất cả dịch vụ
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((s, idx) => (
            <ScrollReveal key={idx} delay={idx * 150} className="group flex flex-col justify-between rounded-[24px] border border-[#2D2D2D] bg-[#141414] p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E8C547]/30 hover:shadow-[0_15px_35px_rgba(232,197,71,0.03)]">
              <div>
                <span className={`inline-flex items-center rounded-full bg-gradient-to-r ${s.color} px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white mb-6 shadow-sm`}>
                  {s.tag}
                </span>
                <h3
                  className="m-0 text-2xl font-bold text-white mb-4 group-hover:text-[#E8C547] transition-colors"
                  style={{ fontFamily: "'Gowun Batang', serif" }}
                >
                  {s.title}
                </h3>
                <p
                  className="m-0 text-sm leading-[170%] text-[#9CA3AF]"
                  style={{ fontFamily: "'Gowun Batang', serif" }}
                >
                  {s.desc}
                </p>
              </div>

              <div className="mt-8 border-t border-[#222222] pt-6 flex items-center justify-between">
                <Link
                  to={s.link}
                  className="text-xs font-bold text-[#E8C547] hover:underline uppercase tracking-wider flex items-center gap-1.5"
                  style={{ fontFamily: "'Gowun Batang', serif" }}
                >
                  Chi tiết dịch vụ <span>→</span>
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedProjectsSection() {
  const projects = [
    { title: 'Từng Là Của Nhau', category: 'MV / Phim Ngắn', img: projectImg1, desc: 'Sản phẩm âm nhạc giàu cảm xúc với những phân cảnh điện ảnh sâu sắc.' },
    { title: 'Tết Sum Vầy', category: 'TVC / Thương Mại', img: projectImg2, desc: 'Câu chuyện Tết sum họp đầm ấm, truyền tải trọn vẹn thông điệp thương hiệu.' },
    { title: 'Hoàng Hôn Của Chúng Ta', category: 'Phim Ngắn Nghệ Thuật', img: projectImg3, desc: 'Một dự án đầy chất thơ khai thác nội tâm nhân vật cùng ánh sáng duy mỹ.' }
  ]

  return (
    <section className="w-full bg-[#1E1E1E] px-4 py-20 md:px-8 lg:px-16 border-b border-[#2D2D2D]">
      <div className="mx-auto max-w-[1240px]">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span
              className="text-[#E8C547] text-xs font-bold uppercase tracking-[0.2em] block mb-2"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            >
              Hồ Sơ Năng Lực
            </span>
            <h2
              className="m-0 text-[36px] font-bold leading-tight text-white md:text-[50px]"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            >
              DỰ ÁN TIÊU BIỂU
            </h2>
          </div>
          <Link
            to="/san-pham"
            className="h-[46px] shrink-0 inline-flex items-center justify-center rounded-full border border-[#2D2D2D] hover:border-[#E8C547]/50 hover:text-[#E8C547] px-6 text-xs font-bold uppercase tracking-wider text-white transition-all self-center md:self-end"
            style={{ fontFamily: "'Gowun Batang', serif" }}
          >
            Xem tất cả dự án
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((p, idx) => (
            <ScrollReveal key={idx} delay={idx * 150} className="group relative overflow-hidden rounded-[24px] border border-[#2D2D2D] bg-[#141414] shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:border-[#E8C547]/20">
              <div className="relative overflow-hidden aspect-[4/3] w-full">
                <img 
                  src={p.img} 
                  alt={p.title} 
                  className="block h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-90 transition-opacity duration-300" />
                
                {/* Text overlay on bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-1.5 z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E8C547]">
                    {p.category}
                  </span>
                  <h3 
                    className="m-0 text-xl font-bold text-white group-hover:text-[#E8C547] transition-colors"
                    style={{ fontFamily: "'Gowun Batang', serif" }}
                  >
                    {p.title}
                  </h3>
                  <p className="m-0 text-xs text-[#9CA3AF] leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500 overflow-hidden">
                    {p.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function LatestNewsSection() {
  return (
    <section className="flex w-full flex-col items-center gap-10 bg-[#1E1E1E] px-4 py-20 md:gap-14 md:px-8 lg:gap-[85px] lg:px-12 border-b border-[#2D2D2D]">
      <ScrollReveal className="w-full text-center">
        <span
          className="text-[#E8C547] text-xs font-bold uppercase tracking-[0.2em] block mb-2"
          style={{ fontFamily: "'Gowun Batang', serif" }}
        >
          Định Hướng Hoạt Động
        </span>
        <h2
          className="block w-full max-w-[1184px] mx-auto text-[36px] font-bold leading-tight text-white md:text-[50px]"
          style={{ fontFamily: "'Gowun Batang', serif" }}
        >
          GIÁ TRỊ CỐT LÕI
        </h2>
      </ScrollReveal>

      <div className="flex w-full max-w-[1184px] flex-col gap-6 lg:flex-row lg:items-stretch">
        <ScrollReveal delay={150} className="flex-1 flex flex-col">
          <div className="flex min-h-[320px] flex-1 flex-col items-center justify-center gap-5 rounded-[20px] border border-[#2D2D2D] bg-[#141414] px-6 py-8 md:px-10 lg:min-h-[386px] lg:px-12 lg:py-[50px] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E8C547]/40 hover:shadow-[0_12px_32px_rgba(232,197,71,0.05)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8C547]/10 border border-[#E8C547]/20 text-[#E8C547]">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <span
              className="block w-full text-center text-[28px] font-bold leading-[110%] tracking-[-0.03em] text-white md:text-[32px]"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            >
              Mission
            </span>
            <p
              className="m-0 w-full text-center text-sm leading-[160%] tracking-[-0.03em] text-[#9CA3AF] md:text-base"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            >
              Giúp cá nhân và thương hiệu nhỏ biến content thành một hệ thống bán hàng có chiến lược, nơi mỗi video không chỉ để xem, mà để tạo ra chuyển đổi và doanh thu. Phiền TV tồn tại để đồng hành dài hạn: định hướng, triển khai và tối ưu nội dung theo lộ trình rõ ràng, giúp khách hàng không còn làm content trong cảm tính hay may rủi.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300} className="flex-1 flex flex-col">
          <div className="flex min-h-[320px] flex-1 flex-col items-center justify-center gap-5 rounded-[20px] border border-[#2D2D2D] bg-[#141414] px-6 py-8 md:px-10 lg:min-h-[386px] lg:px-12 lg:py-[50px] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E8C547]/40 hover:shadow-[0_12px_32px_rgba(232,197,71,0.05)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6]">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
            </div>
            <span
              className="block w-full text-center text-[28px] font-bold leading-[110%] tracking-[-0.03em] text-white md:text-[32px]"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            >
              Vision
            </span>
            <p
              className="m-0 w-full text-center text-sm leading-[160%] tracking-[-0.03em] text-[#9CA3AF] md:text-base"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            >
              Trở thành production house social-first hàng đầu cho SMEs tại Việt Nam — nơi nội dung được xây dựng bằng tư duy chiến lược, đo lường bằng kết quả và phát triển bền vững theo thời gian. Phiền TV hướng đến việc thiết lập một tiêu chuẩn mới cho content bán hàng: không viral ngắn hạn, mà tạo ra hệ thống tăng trưởng dài hạn.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={450} className="flex-1 flex flex-col">
          <div className="flex min-h-[320px] flex-1 flex-col items-center justify-center gap-5 rounded-[20px] border border-[#2D2D2D] bg-[#141414] px-6 py-8 md:px-10 lg:min-h-[386px] lg:px-12 lg:py-[50px] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E8C547]/40 hover:shadow-[0_12px_32px_rgba(232,197,71,0.05)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981]">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <span
              className="block w-full text-center text-[28px] font-bold leading-[110%] tracking-[-0.03em] text-white md:text-[32px]"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            >
              Thực Chiến
            </span>
            <p
              className="m-0 w-full text-center text-sm leading-[160%] tracking-[-0.03em] text-[#9CA3AF] md:text-base"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            >
              Chúng tôi tin rằng nội dung đẹp mắt thôi chưa đủ. Mỗi sản phẩm được tạo ra từ Phiền TV phải giải được bài toán kinh doanh, tạo ra chuyển đổi thực tế về doanh số và định vị thương hiệu. Sáng tạo có định hướng, thực thi bền bỉ và cam kết chất lượng dài lâu chính là tôn chỉ hoạt động hàng đầu của chúng tôi.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="flex w-full flex-col gap-10 bg-[#545454] px-4 py-8 md:px-8 lg:px-5 lg:py-[30px]">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-[50px]">
        <img src={logo} alt="Phiền TV" className="h-auto w-[220px] object-contain md:w-[260px] lg:w-[297px]" />

        <div className="flex w-full max-w-[489px] flex-col items-center justify-center gap-3 text-center lg:text-left">
          {[
            'hello@phientv.com',
            'Hà Nội, Việt Nam',
            '(+84) 123 456 789',
          ].map((line) => (
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
          style={{ fontFamily: "'Gowun Batang', serif" }}
        >
          Phiền TV © 2025 All Rights Reserved
        </span>
      </div>
    </footer>
  )
}

export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1536px] flex-col items-center bg-[#1E1E1E]">
      <Navbar />
      <Hero />
      <StatsBanner />
      <WhatWeDoSection />
      <FeaturedServicesSection />
      <FeaturedProjectsSection />
      <LatestNewsSection />
      <Footer />
    </div>
  )
}
