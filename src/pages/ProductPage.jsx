import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import logo from '../assets/logo.svg'
import photo3 from '../assets/photo3.png'
import photo4 from '../assets/photo4.png'
import photo5 from '../assets/photo5.png'
import photo6 from '../assets/photo6.png'
import photo7 from '../assets/photo7.png'
import photo8 from '../assets/photo8.png'
import photo9 from '../assets/photo9.png'
import photo10 from '../assets/photo10.png'
import photo11 from '../assets/photo11.png'
import ScrollReveal from '../components/ScrollReveal.jsx'

const FEATURED_PROJECT = {
  title: 'Dự án tiêu biểu',
  linkLabel: 'Xem dự án nổi bật',
  imageSrc: photo3,
}

const PROJECTS = [
  {
    title: 'Từng Là Của Nhau',
    description:
      'Phát triển concept sáng tạo dựa trên insight khách hàng, chuyển hóa thành kịch bản chi tiết và chỉ đạo sản xuất để tối ưu hiệu quả truyền thông.',
    imageSrc: photo4,
  },
  {
    title: 'Những Điều Nhỏ Nhoi',
    description:
      'Định hình câu chuyện thương hiệu từ khâu nội dung đến hình ảnh, đảm bảo mỗi phân cảnh đều phục vụ mục tiêu marketing và định vị sản phẩm.',
    imageSrc: photo5,
  },
  {
    title: 'Mẹ',
    description:
      'Phát triển concept sáng tạo dựa trên insight khách hàng, chuyển hóa thành kịch bản chi tiết và chỉ đạo sản xuất để tối ưu hiệu quả truyền thông.',
    imageSrc: photo6,
  },
  {
    title: 'Tết Sum Vầy',
    description:
      'Phụ trách tổ chức và điều phối sản xuất, đảm bảo tiến độ, ngân sách và chất lượng hình ảnh theo đúng định hướng sáng tạo đã đề ra.',
    imageSrc: photo7,
  },
  {
    title: 'Tết Yêu Thương',
    description:
      'Phát triển concept sáng tạo dựa trên insight khách hàng, chuyển hóa thành kịch bản chi tiết và chỉ đạo sản xuất để tối ưu hiệu quả truyền thông.',
    imageSrc: photo8,
  },
  {
    title: 'Hoàng Hôn Của Chúng Ta',
    description:
      'Đảm bảo quá trình ghi hình và hậu kỳ được triển khai chuyên nghiệp, đáp ứng tiêu chuẩn kỹ thuật và mục tiêu thương mại của dự án.',
    imageSrc: photo9,
    imageClassName: 'md:max-w-[332px] lg:max-w-[332px]',
  },
  {
    title: 'Mây',
    description:
      'Phát triển concept sáng tạo dựa trên insight khách hàng, chuyển hóa thành kịch bản chi tiết và chỉ đạo sản xuất để tối ưu hiệu quả truyền thông.',
    imageSrc: photo10,
    imageClassName: 'md:max-w-[278px] lg:max-w-[278px]',
  },
  {
    title: 'Vết Sẹo',
    description:
      'Phát triển concept sáng tạo dựa trên insight khách hàng, chuyển hóa thành kịch bản chi tiết và chỉ đạo sản xuất để tối ưu hiệu quả truyền thông.',
    imageSrc: photo11,
  },
]

function PortfolioImage({ src, alt, className = '', rounded = 'rounded-[16px]' }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`block w-full object-cover transition-transform duration-700 ease-out group-hover:scale-102 ${rounded} ${className}`}
    />
  )
}

function HeaderSection() {
  return (
    <section className="flex w-full flex-col bg-[#1E1E1E] px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto flex w-full max-w-[1184px] flex-col items-center gap-6 text-center md:gap-[26px]">
        <ScrollReveal>
          <span
            className="text-[40px] font-bold leading-[100%] tracking-[-0.03em] text-[#E4E4E4] md:text-[56px] lg:text-[70px]"
            style={{ fontFamily: "'Gowun Batang', serif" }}
          >
            {FEATURED_PROJECT.title}
          </span>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <a
            href="#"
            className="text-lg font-semibold leading-[100%] tracking-[-0.03em] text-[#E8C547] hover:text-[#F4D35E] underline md:text-[22px] lg:text-[26px] transition-colors"
            style={{ fontFamily: "'Gowun Batang', serif" }}
          >
            {FEATURED_PROJECT.linkLabel}
          </a>
        </ScrollReveal>
      </div>

      <div className="mx-auto mt-10 w-full max-w-[1184px]">
        <ScrollReveal delay={300}>
          <div className="group overflow-hidden rounded-[24px] border border-[#2D2D2D] shadow-[0_20px_50px_rgba(0,0,0,0.4)] bg-[#141414]">
            <img
              src={FEATURED_PROJECT.imageSrc}
              alt={FEATURED_PROJECT.title}
              className="block w-full object-cover min-h-[300px] md:min-h-[480px] lg:min-h-[640px] scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function ProjectCard({ title, description, imageSrc, imageClassName = '' }) {
  return (
    <article className="group flex w-full flex-col gap-8 rounded-[24px] border border-[#2D2D2D] bg-[#141414] px-5 py-5 md:px-8 md:py-8 lg:flex-row lg:items-center lg:gap-12 lg:px-12 lg:py-12 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#E8C547]/40 hover:shadow-[0_20px_50px_rgba(232,197,71,0.06)]">
      <div className="w-full flex-1 overflow-hidden rounded-[16px] border border-[#222222]">
        <img 
          src={imageSrc} 
          alt={title} 
          className={`block w-full object-cover rounded-[16px] scale-105 group-hover:scale-100 transition-transform duration-700 ease-out ${imageClassName}`} 
        />
      </div>

      <div className="flex w-full flex-1 flex-col items-start gap-6 lg:gap-8">
        <h2
          className="m-0 text-[30px] leading-[120%] tracking-[-0.03em] text-white group-hover:text-[#E8C547] transition-colors md:text-[36px] lg:text-[40px]"
          style={{ fontFamily: "'Gowun Batang', serif" }}
        >
          {title}
        </h2>
        <p
          className="m-0 text-base leading-[150%] tracking-[-0.03em] text-[#9CA3AF] md:text-lg lg:text-[20px]"
          style={{ fontFamily: "'Gowun Batang', serif" }}
        >
          {description}
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-[#E8C547] group-hover:translate-x-1.5 transition-transform duration-300">
          Xem chi tiết dự án 
          <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
            <path d="M6 12l4-4-4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </article>
  )
}

function ProjectsSection() {
  return (
    <section className="flex w-full flex-col items-center gap-10 bg-[#1E1E1E] px-4 py-10 md:gap-14 md:px-8 md:py-16 lg:gap-[85px] lg:px-12">
      <ScrollReveal className="w-full text-center">
        <span
          className="block w-full max-w-[1184px] mx-auto text-[40px] leading-[100%] tracking-[-0.03em] text-white md:text-[56px] lg:text-[70px]"
          style={{ fontFamily: "'Gowun Batang', serif" }}
        >
          Những dự án khác
        </span>
      </ScrollReveal>

      <div className="flex w-full max-w-[1184px] flex-col gap-8">
        {PROJECTS.map((project, idx) => (
          <ScrollReveal key={project.title} delay={idx * 100} className="w-full">
            <ProjectCard {...project} />
          </ScrollReveal>
        ))}
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

export default function ProductPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1536px] flex-col items-center bg-[#1E1E1E]">
      <Navbar />
      <HeaderSection />
      <ProjectsSection />
      <Footer />
    </div>
  )
}
