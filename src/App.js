import { useEffect, useState } from 'react';
import { FaChevronDown, FaTimes } from 'react-icons/fa';
import './App.css';

const NAV_SECTIONS = [
  { id: 'overview', title: 'Tổng Quan' },
  { id: 'theory', title: 'Lý Luận CNXH' },
  { id: 'conditions', title: 'Điều Kiện Ra Đời' },
  { id: 'features', title: 'Đặc Trưng CNXH' },
  { id: 'timeline', title: 'Liên Xô - Đông Âu' },
  { id: 'debate', title: 'Tranh Luận' },
  { id: 'gallery', title: 'Hình Ảnh' },
  { id: 'about', title: 'Kết Luận' },
];

const TIMELINE_DATA = [
  {
    year: '1985',
    title: 'Mikhail Gorbachev lên nắm quyền ở Liên Xô',
    description:
      'Tháng 3/1985, Mikhail Gorbachev trở thành Tổng Bí thư Đảng Cộng sản Liên Xô. Ông khởi xướng hai chính sách cải tổ nổi tiếng là Perestroika (cải tổ kinh tế) và Glasnost (công khai hóa đời sống chính trị - xã hội). Tuy nhiên, quá trình cải cách thiếu đồng bộ, nóng vội và mất kiểm soát đã làm trầm trọng thêm khủng hoảng toàn diện của Liên Xô.',
    image:
      'https://nghiencuuquocte.org/wp-content/uploads/2017/03/11.jpg',
  },
  {
    year: '1988 - 1989',
    title: 'Khủng hoảng chính trị - xã hội lan rộng ở Đông Âu',
    description:
      'Khủng hoảng kinh tế kéo dài, bộ máy quan liêu trì trệ, niềm tin xã hội suy giảm, cùng với tác động từ cải tổ ở Liên Xô đã làm bùng nổ các phong trào đối lập và đòi cải cách tại nhiều nước Đông Âu. Đây là giai đoạn mở đầu cho sự tan rã dây chuyền của hệ thống xã hội chủ nghĩa ở khu vực này.',
    image:
      'https://cdn-images.vtv.vn/2021/11/14/1000-1-1636869202504695911469.jpeg',
  },
  {
    year: '06/1989',
    title: 'Ba Lan tổ chức bầu cử bán tự do',
    description:
      'Tháng 6/1989, tại Ba Lan, lực lượng đối lập Công đoàn Đoàn kết giành thắng lợi lớn trong cuộc bầu cử bán tự do. Đây là bước ngoặt lịch sử, đánh dấu sự suy yếu nghiêm trọng của mô hình xã hội chủ nghĩa hiện thực ở Đông Âu và mở đầu cho quá trình chuyển đổi chế độ tại khu vực này.',
    image:
      'https://file3.qdnd.vn/data/images/0/2025/06/01/upload_2126/vna_potal_ba_lan_bau_cu_tong_thong_vong_hai_stand.jpg?dpi=150&quality=100&w=870',
  },
  {
    year: '09/11/1989',
    title: 'Bức tường Berlin sụp đổ',
    description:
      'Ngày 09/11/1989, Bức tường Berlin - biểu tượng của sự chia cắt Đông - Tây trong thời kỳ Chiến tranh Lạnh - bị phá bỏ. Đây là sự kiện mang tính biểu tượng cực kỳ lớn, đánh dấu sự sụp đổ của trật tự chính trị cũ ở Đông Đức và mở đầu cho sự tan rã hàng loạt các chính quyền xã hội chủ nghĩa Đông Âu.',
    image:
      'https://nghiencuuquocte.org/wp-content/uploads/2015/11/berlin-wall-down.jpg',
  },
  {
    year: 'Cuối 1989',
    title: 'Hàng loạt chính quyền xã hội chủ nghĩa Đông Âu sụp đổ',
    description:
      'Trong khoảng cuối năm 1989, các chính quyền xã hội chủ nghĩa tại Đông Đức, Hungary, Tiệp Khắc, Bulgaria và Romania lần lượt sụp đổ. Đây là quá trình tan rã mang tính dây chuyền, diễn ra rất nhanh, cho thấy cuộc khủng hoảng toàn diện của mô hình chủ nghĩa xã hội hiện thực tại Đông Âu.',
    image:
      'https://nghiencuulichsu.com/wp-content/uploads/2016/12/08-20a.jpg',
  },
  {
    year: '11/03/1990',
    title: 'Litva tuyên bố độc lập',
    description:
      'Ngày 11/03/1990, Litva trở thành nước cộng hòa đầu tiên trong Liên bang Xô viết tuyên bố tách ra khỏi Liên Xô. Sự kiện này tạo hiệu ứng chính trị rất mạnh, mở đầu làn sóng ly khai của các nước cộng hòa thuộc Liên Xô.',
    image:
      'https://nghiencuuquocte.org/wp-content/uploads/2019/03/litva.jpg',
  },
  {
    year: '03/10/1990',
    title: 'Nước Đức thống nhất',
    description:
      'Ngày 03/10/1990, Cộng hòa Dân chủ Đức (Đông Đức) chính thức sáp nhập vào Cộng hòa Liên bang Đức (Tây Đức), đánh dấu nước Đức thống nhất sau gần 45 năm chia cắt. Đây là kết quả trực tiếp của sự sụp đổ hệ thống chính trị ở Đông Âu.',
    image:
      'https://wirlink.com.vn/wp-content/uploads/2024/10/wirlink-com-vn-pI4KpirEJo.jpg',
  },
  {
    year: '28/06/1991',
    title: 'Khối SEV / COMECON giải thể',
    description:
      'Ngày 28/06/1991, Hội đồng Tương trợ Kinh tế (SEV/COMECON) chính thức giải thể. Đây là tổ chức hợp tác kinh tế quan trọng của hệ thống xã hội chủ nghĩa. Việc giải thể SEV cho thấy sự đổ vỡ không chỉ về chính trị mà còn cả nền tảng liên kết kinh tế giữa các nước xã hội chủ nghĩa.',
    image:
      'https://cdn.luatminhkhue.vn/lmk/articles/71/357441/hoi-dong-tuong-tro-kinh-te--sev--la-gi---357441.jpg',
  },
  {
    year: '01/07/1991',
    title: 'Khối quân sự Vác-sa-va giải thể',
    description:
      'Ngày 01/07/1991, Tổ chức Hiệp ước Vác-sa-va - liên minh quân sự của các nước xã hội chủ nghĩa Đông Âu do Liên Xô đứng đầu - chính thức chấm dứt hoạt động. Điều này đánh dấu sự sụp đổ hoàn toàn của cấu trúc an ninh - quân sự của hệ thống xã hội chủ nghĩa ở châu Âu.',
    image:
      'https://file3.qdnd.vn/data/images/0/2021/08/26/thuthuytv/01_anh-01.jpg?w=400',
  },
  {
    year: '24/08/1991',
    title: 'Ukraine tuyên bố độc lập',
    description:
      'Ngày 24/08/1991, Ukraine tuyên bố độc lập khỏi Liên Xô. Đây là một đòn giáng cực lớn đối với Liên bang Xô viết vì Ukraine là một nước cộng hòa có vị trí chiến lược, dân số lớn, tiềm lực công nghiệp và nông nghiệp rất quan trọng.',
    image:
      'https://media.vov.vn/sites/default/files/styles/large/public/2022-08/Ukraine%20ky%20niem%2030%20nam%20ngay%20doc%20lap%20-afp.jpg',
  },
  {
    year: '08/12/1991',
    title: 'Hiệp định Belavezha được ký kết',
    description:
      'Ngày 08/12/1991, lãnh đạo Nga, Belarus và Ukraine ký Hiệp định Belavezha, tuyên bố Liên bang Xô viết chấm dứt tồn tại và thành lập Cộng đồng các quốc gia độc lập (SNG/CIS). Đây là bước đi pháp lý - chính trị cực kỳ quan trọng dẫn tới sự tan rã chính thức của Liên Xô.',
    image:
      'https://cdn.nhandan.vn/images/1ef398c4e2fb4bf07980a2ded785b3ef6fcbc52807c5d70e46561e229e37bdc108c074945c665a4b82b70aa9c17b7ce3e667d376bf869970b83bd2a9ea12e0ea/anhghep-181.jpg',
  },
  {
    year: '25/12/1991',
    title: 'Gorbachev từ chức Tổng thống Liên Xô',
    description:
      'Ngày 25/12/1991, Mikhail Gorbachev tuyên bố từ chức Tổng thống Liên Xô. Cùng ngày, lá cờ búa liềm trên Điện Kremlin được hạ xuống và quốc kỳ Nga được kéo lên. Đây là biểu tượng rõ ràng cho sự kết thúc của nhà nước Xô viết.',
    image:
      'https://ongvove.wordpress.com/wp-content/uploads/2015/12/gorbachev01.jpg',
  },
  {
    year: '26/12/1991',
    title: 'Liên Xô chính thức tan rã',
    description:
      'Ngày 26/12/1991, Xô viết Tối cao chính thức tuyên bố chấm dứt sự tồn tại của Liên bang Cộng hòa Xã hội Chủ nghĩa Xô viết. Đây là mốc lịch sử đánh dấu sự sụp đổ của nhà nước Liên Xô và sự kết thúc của một mô hình chủ nghĩa xã hội hiện thực ở trung tâm của hệ thống XHCN thế giới.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9VALNcq6fCFMOm1vaNXThq70IFtq-fyL5Pg&s',
  },
];

const GALLERY = [
  {
    src: 'https://nghiencuuquocte.org/wp-content/uploads/2015/11/berlin-wall-down.jpg',
    caption: 'Bức tường Berlin sụp đổ (09/11/1989)',
  },
  {
    src: 'https://nghiencuuquocte.org/wp-content/uploads/2017/03/11.jpg',
    caption: 'Gorbachev và thời kỳ cải tổ ở Liên Xô',
  },
  {
    src: 'https://media.vov.vn/sites/default/files/styles/large/public/2022-08/Ukraine%20ky%20niem%2030%20nam%20ngay%20doc%20lap%20-afp.jpg',
    caption: 'Ukraine tuyên bố độc lập (24/08/1991)',
  },
  {
    src: 'https://ongvove.wordpress.com/wp-content/uploads/2015/12/gorbachev01.jpg',
    caption: 'Gorbachev từ chức (25/12/1991)',
  },
  {
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9VALNcq6fCFMOm1vaNXThq70IFtq-fyL5Pg&s',
    caption: 'Liên Xô chính thức tan rã (26/12/1991)',
  },
  {
    src: 'https://cdn.luatminhkhue.vn/lmk/articles/71/357441/hoi-dong-tuong-tro-kinh-te--sev--la-gi---357441.jpg',
    caption: 'Khối SEV / COMECON giải thể',
  },
];

function joinClasses(...values) {
  return values.filter(Boolean).join(' ');
}

export default function App() {
  const [activeNav, setActiveNav] = useState('overview');
  const [navSolid, setNavSolid] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      setNavSolid(window.scrollY > 28);

      const sections = Array.from(document.querySelectorAll('section[data-id]'));
      const current = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom > 120;
      });
      setActiveNav(current?.dataset.id ?? 'overview');
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.querySelector(`section[data-id="${id}"]`);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
  };

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  return (
    <div className="app">
      <header className={joinClasses('topbar', navSolid && 'topbar--solid')}>
        <div className="container topbar__inner">
          <button className="brand" type="button" onClick={() => scrollToSection('overview')}>
            <span className="brand__text">CHỦ NGHĨA XÃ HỘI</span>
          </button>

          <nav className="nav">
            {NAV_SECTIONS.map((section) => (
              <button
                key={section.id}
                type="button"
                className={joinClasses('nav__link', activeNav === section.id && 'nav__link--active')}
                onClick={() => scrollToSection(section.id)}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero" data-id="overview">
          <div className="hero__overlay" aria-hidden="true" />
          <div className="container hero__content">
            <h1 className="hero__title">CHỦ NGHĨA XÃ HỘI VÀ SỰ KIỆN LIÊN XÔ - ĐÔNG ÂU SỤP ĐỔ</h1>
            <p className="hero__text">
              Chủ nghĩa xã hội (CNXH) là một giai đoạn phát triển cao hơn chủ nghĩa tư bản trong tiến trình phát triển
              lịch sử của xã hội loài người. Đây là hình thái kinh tế - xã hội được xây dựng trên cơ sở chế độ công hữu
              về những tư liệu sản xuất chủ yếu, quyền làm chủ của nhân dân lao động, nền sản xuất hiện đại và mục tiêu
              xóa bỏ áp bức, bóc lột, bất công; hướng tới một xã hội dân giàu, nước mạnh, dân chủ, công bằng, văn minh.
              Sự tan rã của Liên Xô và các nước xã hội chủ nghĩa Đông Âu là một biến cố chính trị đặc biệt lớn của thế kỷ XX,
              nhưng không đồng nghĩa với sự sụp đổ của toàn bộ lý tưởng và bản chất khoa học của chủ nghĩa xã hội.
            </p>
            <button className="hero__cta" type="button" onClick={() => scrollToSection('theory')}>
              Khám phá nội dung <FaChevronDown aria-hidden />
            </button>
          </div>
        </section>

        {/* LÝ LUẬN CNXH */}
        <section className="section" data-id="theory">
          <div className="container">
            <h2 className="section__title">1. Chủ nghĩa xã hội là gì? Khái niệm và vị trí trong lý thuyết hình thái KT-XH</h2>
            <p className="section__lead">Phần lý luận nền tảng của chủ nghĩa xã hội khoa học.</p>

            <div className="bento">
              <article className="bento__card" style={{ gridColumn: 'span 2' }}>
                <h3 className="bento__title">1.1. Chủ nghĩa xã hội là gì?</h3>
                <p className="bento__text">
                  Chủ nghĩa xã hội là một hình thái kinh tế - xã hội phát triển cao hơn chủ nghĩa tư bản, là giai đoạn đầu
                  của hình thái cộng sản chủ nghĩa. Trong chủ nghĩa xã hội, tư liệu sản xuất chủ yếu thuộc sở hữu toàn dân
                  hoặc sở hữu tập thể; giai cấp công nhân cùng nhân dân lao động giữ vai trò làm chủ xã hội; nhà nước mang
                  bản chất của nhân dân lao động; nền sản xuất được tổ chức trên cơ sở khoa học - công nghệ hiện đại; mục tiêu
                  là xóa bỏ chế độ người bóc lột người, từng bước thực hiện công bằng xã hội và tạo điều kiện cho con người
                  phát triển toàn diện.
                </p>
              </article>

              <article className="bento__card" style={{ gridColumn: 'span 2' }}>
                <h3 className="bento__title">1.2. Khái niệm và vị trí của CNXH trong lý thuyết hình thái KT-XH</h3>
                <p className="bento__text">
                  Theo học thuyết hình thái kinh tế - xã hội của chủ nghĩa Mác - Lênin, lịch sử loài người phát triển thông qua
                  các hình thái kinh tế - xã hội cơ bản: cộng sản nguyên thủy, chiếm hữu nô lệ, phong kiến, tư bản chủ nghĩa và
                  cộng sản chủ nghĩa. Trong đó, chủ nghĩa xã hội là giai đoạn thấp (giai đoạn đầu) của hình thái cộng sản chủ nghĩa.
                  Nó giữ vị trí là bước chuyển tiếp tất yếu từ chủ nghĩa tư bản lên chủ nghĩa cộng sản hoàn chỉnh, nơi vẫn còn dấu vết
                  của xã hội cũ nhưng đã hình thành những nền tảng căn bản của xã hội mới.
                </p>
              </article>

              <article className="bento__card" style={{ gridColumn: 'span 4' }}>
                <h3 className="bento__title">1.3. Quá trình lịch sử tự nhiên</h3>
                <p className="bento__text">
                  Chủ nghĩa Mác - Lênin khẳng định sự phát triển của xã hội loài người là một quá trình lịch sử tự nhiên.
                  Nghĩa là sự thay thế từ hình thái kinh tế - xã hội này sang hình thái khác không phải do ý muốn chủ quan của cá nhân
                  hay giai cấp nào, mà do sự vận động khách quan của mâu thuẫn giữa lực lượng sản xuất và quan hệ sản xuất.
                  Khi lực lượng sản xuất phát triển đến mức quan hệ sản xuất cũ trở nên lỗi thời, kìm hãm sự phát triển,
                  thì tất yếu nảy sinh yêu cầu cải biến cách mạng để xác lập quan hệ sản xuất mới phù hợp hơn. Trong bối cảnh đó,
                  chủ nghĩa xã hội ra đời như một tất yếu lịch sử sau chủ nghĩa tư bản, xuất phát từ chính những mâu thuẫn nội tại
                  của chủ nghĩa tư bản hiện đại.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ĐIỀU KIỆN RA ĐỜI */}
        <section className="section section--soft" data-id="conditions">
          <div className="container">
            <h2 className="section__title">2. Điều kiện ra đời của chủ nghĩa xã hội</h2>
            <p className="section__lead">Bao gồm điều kiện kinh tế và điều kiện chính trị - xã hội.</p>

            <div className="bento">
              <article className="bento__card" style={{ gridColumn: 'span 2' }}>
                <h3 className="bento__title">2.1. Điều kiện kinh tế</h3>
                <p className="bento__text">
                  Điều kiện kinh tế cho sự ra đời của chủ nghĩa xã hội trước hết là sự phát triển cao của lực lượng sản xuất trong
                  lòng xã hội tư bản chủ nghĩa. Chủ nghĩa tư bản đã tạo ra nền đại công nghiệp, phân công lao động xã hội sâu sắc,
                  trình độ xã hội hóa sản xuất ngày càng cao, ứng dụng mạnh mẽ khoa học - công nghệ vào sản xuất. Tuy nhiên,
                  quan hệ sản xuất tư bản chủ nghĩa dựa trên chế độ chiếm hữu tư nhân tư bản chủ nghĩa về tư liệu sản xuất lại làm
                  nảy sinh mâu thuẫn cơ bản giữa tính chất xã hội hóa cao của sản xuất với chế độ chiếm hữu tư nhân về kết quả lao động.
                  Mâu thuẫn này biểu hiện qua khủng hoảng kinh tế chu kỳ, thất nghiệp, phân hóa giàu nghèo, bóc lột lao động làm thuê
                  và bất công xã hội. Chính mâu thuẫn đó đặt ra yêu cầu khách quan phải xây dựng một phương thức sản xuất mới tiến bộ hơn,
                  đó là chủ nghĩa xã hội.
                </p>
              </article>

              <article className="bento__card" style={{ gridColumn: 'span 2' }}>
                <h3 className="bento__title">2.2. Điều kiện chính trị - xã hội</h3>
                <p className="bento__text">
                  Về chính trị - xã hội, điều kiện ra đời của chủ nghĩa xã hội là sự trưởng thành của giai cấp công nhân hiện đại -
                  lực lượng xã hội gắn liền với nền đại công nghiệp và đại diện cho phương thức sản xuất tiên tiến. Trong quá trình
                  phát triển của chủ nghĩa tư bản, giai cấp công nhân ngày càng đông đảo, có tính tổ chức, tính kỷ luật và tinh thần
                  đoàn kết cao. Đồng thời, mâu thuẫn giữa giai cấp công nhân với giai cấp tư sản ngày càng gay gắt, thúc đẩy phong trào
                  đấu tranh của giai cấp công nhân từ tự phát đến tự giác. Khi được soi sáng bởi chủ nghĩa Mác - Lênin và được tổ chức
                  dưới sự lãnh đạo của Đảng Cộng sản, giai cấp công nhân trở thành lực lượng chính trị có khả năng lãnh đạo nhân dân lao động
                  tiến hành cách mạng xã hội chủ nghĩa, lật đổ chế độ tư bản chủ nghĩa và xây dựng xã hội mới.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ĐẶC TRƯNG CNXH */}
        <section className="section" data-id="features">
          <div className="container">
            <h2 className="section__title">3. Những đặc trưng bản chất của chủ nghĩa xã hội</h2>
            <p className="section__lead">Những dấu hiệu cơ bản phản ánh bản chất của xã hội xã hội chủ nghĩa.</p>

            <div className="bento">
              <article className="bento__card">
                <h3 className="bento__title">Chế độ công hữu về TLSX chủ yếu</h3>
                <p className="bento__text">
                  Những tư liệu sản xuất quan trọng của nền kinh tế thuộc sở hữu toàn dân hoặc sở hữu tập thể, tạo nền tảng xóa bỏ
                  chế độ người bóc lột người.
                </p>
              </article>

              <article className="bento__card">
                <h3 className="bento__title">Nhân dân lao động làm chủ</h3>
                <p className="bento__text">
                  Quyền lực nhà nước thuộc về nhân dân lao động; nhà nước mang bản chất của giai cấp công nhân và đại diện cho lợi ích
                  của đông đảo quần chúng nhân dân.
                </p>
              </article>

              <article className="bento__card">
                <h3 className="bento__title">Nền sản xuất hiện đại, phát triển cao</h3>
                <p className="bento__text">
                  Sản xuất phát triển dựa trên khoa học - công nghệ, năng suất lao động cao, tổ chức lao động hợp lý, tạo cơ sở vật chất
                  cho tiến bộ xã hội.
                </p>
              </article>

              <article className="bento__card">
                <h3 className="bento__title">Phân phối chủ yếu theo lao động</h3>
                <p className="bento__text">
                  Trong giai đoạn đầu của xã hội cộng sản chủ nghĩa, nguyên tắc phân phối chủ yếu là theo kết quả lao động, đồng thời kết hợp
                  với phúc lợi xã hội để bảo đảm công bằng.
                </p>
              </article>

              <article className="bento__card" style={{ gridColumn: 'span 2' }}>
                <h3 className="bento__title">Xóa bỏ áp bức, bóc lột, bất công</h3>
                <p className="bento__text">
                  Mục tiêu căn bản của CNXH là từng bước khắc phục bất bình đẳng xã hội, xóa bỏ sự đối kháng giai cấp, giải phóng con người
                  khỏi mọi hình thức áp bức và tha hóa.
                </p>
              </article>

              <article className="bento__card" style={{ gridColumn: 'span 2' }}>
                <h3 className="bento__title">Con người phát triển toàn diện</h3>
                <p className="bento__text">
                  CNXH không chỉ hướng tới tăng trưởng kinh tế mà còn hướng tới phát triển con người toàn diện về trí tuệ, đạo đức, thể chất,
                  văn hóa và tinh thần; xây dựng xã hội dân chủ, công bằng, văn minh.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="section section--soft" data-id="timeline">
          <div className="container">
            <h2 className="section__title">4. Sự kiện Liên Xô - Đông Âu sụp đổ: Dòng thời gian lịch sử</h2>
            <p className="section__lead">Các mốc thời gian quan trọng từ khủng hoảng đến tan rã chính thức.</p>

            <div className="timeline">
              {TIMELINE_DATA.map((item, index) => (
                <article
                  key={item.year + item.title}
                  className={joinClasses(
                    'timeline__item',
                    index % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'
                  )}
                >
                  <div className="timeline__dot" aria-hidden="true" />
                  <div className="timeline__card">
                    <div className="timeline__year">{item.year}</div>
                    <h3 className="timeline__heading">{item.title}</h3>
                    <p className="timeline__copy">{item.description}</p>
                    <div className="timeline__image-wrapper">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="timeline__image"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* TRANH LUẬN */}
        <section className="section" data-id="debate">
          <div className="container">
            <h2 className="section__title">5. Tranh luận: Liên Xô - Đông Âu tan rã có phải là sự sụp đổ của CNXH?</h2>
            <p className="section__lead">Phân tích quan điểm và đưa ra lập luận phản bác một cách khoa học.</p>

            <div className="bento">
              <article className="bento__card" style={{ gridColumn: 'span 4' }}>
                <h3 className="bento__title">5.1. Ý kiến đang được đặt ra</h3>
                <p className="bento__text">
                  Có ý kiến cho rằng: “Sự tan rã của Liên Xô và các nước Đông Âu là sự sụp đổ hoàn toàn của chủ nghĩa xã hội”.
                  Đây là một nhận định phổ biến sau biến cố cuối thế kỷ XX, bởi Liên Xô là thành trì lớn nhất của hệ thống xã hội chủ nghĩa thế giới.
                </p>
              </article>

              <article className="bento__card" style={{ gridColumn: 'span 4' }}>
                <h3 className="bento__title">5.2. Quan điểm của em: Phản bác / không đồng tình hoàn toàn với ý kiến trên</h3>
                <p className="bento__text">
                  Em không đồng tình với nhận định cho rằng sự tan rã của Liên Xô và Đông Âu là sự sụp đổ của toàn bộ chủ nghĩa xã hội.
                  Bởi lẽ, sự sụp đổ đó trước hết là sự đổ vỡ của một mô hình chủ nghĩa xã hội hiện thực cụ thể trong điều kiện lịch sử nhất định,
                  chứ không phải là sự phủ định hoàn toàn bản chất khoa học, cách mạng và giá trị nhân văn của lý luận chủ nghĩa xã hội.
                </p>
              </article>

              <article className="bento__card" style={{ gridColumn: 'span 2' }}>
                <h3 className="bento__title">5.3.1. Phân biệt giữa lý luận và mô hình hiện thực</h3>
                <p className="bento__text">
                  Chủ nghĩa xã hội khoa học là một học thuyết phản ánh quy luật khách quan của sự phát triển xã hội.
                  Trong khi đó, Liên Xô và Đông Âu chỉ là những mô hình xây dựng CNXH cụ thể. Một mô hình thất bại không đồng nghĩa
                  với việc phủ nhận toàn bộ lý luận, giống như một chính sách sai không thể phủ nhận hoàn toàn một học thuyết khoa học.
                </p>
              </article>

              <article className="bento__card" style={{ gridColumn: 'span 2' }}>
                <h3 className="bento__title">5.3.2. Nguyên nhân sụp đổ chủ yếu là sai lầm trong mô hình</h3>
                <p className="bento__text">
                  Nguyên nhân quan trọng dẫn đến tan rã gồm: mô hình quản lý tập trung quan liêu bao cấp kéo dài; cải cách chậm đổi mới nhưng khi đổi mới lại nóng vội;
                  xa rời nguyên tắc xây dựng Đảng; suy thoái tư tưởng chính trị; mất dân chủ; khủng hoảng kinh tế - xã hội kéo dài;
                  và tác động chống phá từ các thế lực thù địch bên ngoài.
                </p>
              </article>

              <article className="bento__card" style={{ gridColumn: 'span 2' }}>
                <h3 className="bento__title">5.3.3. CNXH vẫn tiếp tục tồn tại và phát triển</h3>
                <p className="bento__text">
                  Sau sự kiện Liên Xô - Đông Âu, chủ nghĩa xã hội không biến mất khỏi đời sống chính trị thế giới.
                  Nhiều quốc gia như Việt Nam, Trung Quốc, Cuba, Lào vẫn kiên định con đường xã hội chủ nghĩa và tiến hành cải cách,
                  đổi mới phù hợp với điều kiện thực tiễn, đạt nhiều thành tựu quan trọng.
                </p>
              </article>

              <article className="bento__card" style={{ gridColumn: 'span 2' }}>
                <h3 className="bento__title">5.3.4. Giá trị của CNXH vẫn còn tính thời sự</h3>
                <p className="bento__text">
                  Trong bối cảnh thế giới hiện nay, những vấn đề như phân hóa giàu nghèo, khủng hoảng môi trường, bất bình đẳng xã hội,
                  xung đột lợi ích và khủng hoảng kinh tế toàn cầu vẫn cho thấy những hạn chế của chủ nghĩa tư bản.
                  Vì vậy, khát vọng về một xã hội công bằng, dân chủ, nhân văn - tức giá trị cốt lõi của CNXH - vẫn còn nguyên ý nghĩa.
                </p>
              </article>

              <article className="bento__card" style={{ gridColumn: 'span 4' }}>
                <h3 className="bento__title">5.4. Luận giải tổng hợp</h3>
                <p className="bento__text">
                  Sự tan rã của Liên Xô và các nước Đông Âu là một tổn thất lớn của phong trào cộng sản và công nhân quốc tế,
                  là sự thất bại của một mô hình chủ nghĩa xã hội hiện thực đã bộc lộ nhiều hạn chế và sai lầm trong tổ chức,
                  quản lý, cải cách và lãnh đạo. Tuy nhiên, không thể từ đó kết luận rằng chủ nghĩa xã hội với tư cách là một học thuyết khoa học,
                  một xu hướng phát triển khách quan của lịch sử và một lý tưởng giải phóng con người đã hoàn toàn sụp đổ.
                  Bản chất của CNXH là hướng tới giải phóng lực lượng sản xuất, giải phóng giai cấp, giải phóng con người khỏi áp bức bóc lột,
                  xây dựng một xã hội công bằng hơn. Những giá trị đó vẫn có sức sống lâu dài và tiếp tục được kiểm nghiệm trong thực tiễn đổi mới,
                  cải cách của nhiều quốc gia xã hội chủ nghĩa hiện nay. Vì vậy, cần nhìn nhận sự kiện Liên Xô - Đông Âu tan rã một cách biện chứng,
                  khách quan và khoa học: đó là sự sụp đổ của một mô hình cụ thể, chứ không phải là sự cáo chung của toàn bộ chủ nghĩa xã hội.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="section section--soft" data-id="gallery">
          <div className="container">
            <h2 className="section__title">6. Bộ sưu tập hình ảnh tư liệu</h2>

            <div className="masonry">
              {GALLERY.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  className="masonry__item"
                  onClick={() => openLightbox(index)}
                >
                  <img src={item.src} alt={item.caption} loading="lazy" />
                  <span className="masonry__caption">{item.caption}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* KẾT LUẬN */}
        <section className="section" data-id="about">
          <div className="container">
            <h2 className="section__title">7. Kết luận chung</h2>
            <p className="section__lead">
              Tóm lược toàn bộ nội dung về chủ nghĩa xã hội và sự kiện Liên Xô - Đông Âu.
            </p>

            <ul className="about__list">
              <li>
                <strong>Về lý luận:</strong> Chủ nghĩa xã hội là giai đoạn đầu của hình thái cộng sản chủ nghĩa, ra đời như một tất yếu
                lịch sử từ mâu thuẫn nội tại của chủ nghĩa tư bản.
              </li>
              <li>
                <strong>Về điều kiện ra đời:</strong> CNXH xuất hiện trên cơ sở phát triển của lực lượng sản xuất và sự trưởng thành
                về chính trị của giai cấp công nhân cùng nhân dân lao động.
              </li>
              <li>
                <strong>Về bản chất:</strong> CNXH hướng tới công hữu về tư liệu sản xuất chủ yếu, nhân dân làm chủ, công bằng xã hội,
                xóa bỏ bóc lột và phát triển con người toàn diện.
              </li>
              <li>
                <strong>Về Liên Xô - Đông Âu:</strong> Sự sụp đổ là biến cố lớn của thế kỷ XX, phản ánh sự thất bại của một mô hình cụ thể,
                không đồng nghĩa với sự sụp đổ hoàn toàn của lý tưởng và bản chất khoa học của chủ nghĩa xã hội.
              </li>
              <li>
                <strong>Quan điểm đánh giá:</strong> Cần nhìn nhận lịch sử một cách khách quan, biện chứng, khoa học; rút ra bài học về
                đổi mới, giữ vững nguyên tắc, phát huy dân chủ và gắn lý luận với thực tiễn.
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <p>
            © {new Date().getFullYear()} — Website học tập về Chủ nghĩa xã hội và sự kiện Liên Xô - Đông Âu sụp đổ.
          </p>
        </div>
      </footer>

      {lightboxIndex !== null && (
        <div className="lightbox" role="dialog" aria-modal="true">
          <button className="lightbox__close" type="button" onClick={closeLightbox}>
            <FaTimes aria-hidden />
            <span className="visually-hidden">Đóng</span>
          </button>
          <div className="lightbox__frame">
            <img src={GALLERY[lightboxIndex].src} alt={GALLERY[lightboxIndex].caption} />
            <p className="lightbox__caption">{GALLERY[lightboxIndex].caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}