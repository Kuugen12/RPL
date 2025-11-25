import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);

  // Quick menu options
  const quickMenu = [
    {
      id: 1,
      title: "Monitoring",
      description: "Pantau data sensor real-time",
      link: "/monitoring",
      color: "primary"
    },
    {
      id: 2,
      title: "Controlling",
      description: "Kendali sistem kebun",
      link: "/controlling",
      color: "success"
    },
    {
      id: 3,
      title: "Panduan",
      description: "Baca petunjuk lengkap",
      link: "/panduan",
      color: "warning"
    },
    {
      id: 4,
      title: "Profil",
      description: "Kelola data akun",
      link: "/profil",
      color: "info"
    }
  ];

  // Data berita timun
  const news = [
    {
      id: 1,
      title: "Tips Budidaya Timun untuk Pemula",
      excerpt: "Timun merupakan salah satu tanaman sayuran yang mudah dibudidayakan. Berikut tips untuk memulai budidaya timun di rumah...",
      date: "25 November 2025",
      image: "https://via.placeholder.com/350x200/4CAF50/FFFFFF?text=Budidaya+Timun",
      url: "https://example.com/budidaya-timun"
    },
    {
      id: 2,
      title: "Mengatasi Hama pada Tanaman Timun",
      excerpt: "Hama seperti kutu daun dan ulat sering menyerang tanaman timun. Simak cara pencegahan dan penanganannya...",
      date: "24 November 2025",
      image: "https://via.placeholder.com/350x200/8BC34A/FFFFFF?text=Hama+Timun",
      url: "https://example.com/hama-timun"
    },
    {
      id: 3,
      title: "Manfaat Timun untuk Kesehatan",
      excerpt: "Timun mengandung banyak air dan nutrisi yang baik untuk tubuh. Ketahui manfaat kesehatan dari mengonsumsi timun...",
      date: "23 November 2025",
      image: "https://via.placeholder.com/350x200/66BB6A/FFFFFF?text=Manfaat+Timun",
      url: "https://example.com/manfaat-timun"
    },
    {
      id: 4,
      title: "Teknologi IoT dalam Pertanian Timun",
      excerpt: "Sensor IoT membantu memantau kelembaban, suhu, dan nutrisi tanaman timun secara real-time untuk hasil panen optimal...",
      date: "22 November 2025",
      image: "https://via.placeholder.com/350x200/43A047/FFFFFF?text=IoT+Pertanian",
      url: "https://example.com/iot-pertanian"
    }
  ];

  const handleNewsClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(rgba(255, 255, 255, 0.70), rgba(255, 255, 255, 0.70)), url(/images/home-background.jpg) center/cover no-repeat fixed'
      }}
    >
      <style>{`
        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .welcome-banner {
          animation: fadeInUp 0.6s ease-out;
        }

        .quick-menu-card {
          transition: all 0.3s ease;
          animation: fadeInUp 0.8s ease-out;
        }

        .quick-menu-card:hover {
          transform: translateY(-10px) scale(1.05);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
        }

        .quick-menu-icon {
          font-size: 3rem;
          transition: all 0.3s ease;
        }

        .quick-menu-card:hover .quick-menu-icon {
          animation: pulse 0.5s ease;
        }

        .news-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          animation: fadeInUp 1s ease-out;
        }

        .news-card:hover {
          transform: translateY(-15px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.2) !important;
        }

        .news-card img {
          transition: all 0.4s ease;
        }

        .news-card:hover img {
          transform: scale(1.1);
        }

        .news-card .card-body {
          transition: all 0.3s ease;
        }

        .news-card:hover .card-body {
          background-color: #f8f9fa;
        }

        .btn-read-more {
          transition: all 0.3s ease;
        }

        .btn-read-more:hover {
          transform: translateX(5px);
          box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
        }
      `}</style>

      <div className="container py-5">
        {/* Welcome Section */}
        <div className="row mb-4">
          <div className="col-md-12">
            <div className="card bg-primary text-white shadow-sm welcome-banner">
              <div className="card-body p-4">
                <h2 className="mb-2">Selamat Datang, {user?.username || 'Pengguna'}! 👋</h2>
                <p className="mb-0">Selamat datang di sistem monitoring pertanian TimuNova. Pantau kebun timun Anda dengan mudah!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Menu Section */}
        <div className="row mb-5">
          {quickMenu.map((menu, index) => (
            <div key={menu.id} className="col-md-3 col-sm-6 mb-3" style={{ animationDelay: `${index * 0.1}s` }}>
              <Link to={menu.link} className="text-decoration-none">
                <div className={`card quick-menu-card shadow-sm border-${menu.color}`}>
                  <div className="card-body text-center py-4">
                    <div className="quick-menu-icon">{menu.icon}</div>
                    <h5 className={`card-title mt-3 text-${menu.color}`}>{menu.title}</h5>
                    <p className="text-muted small mb-0">{menu.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* News Section */}
        <div className="row mb-3">
          <div className="col-md-12">
            <h3 className="mb-4">
              <span className="me-2"></span>
              Berita Seputar Timun
            </h3>
          </div>
        </div>

        <div className="row">
          {news.map((item, index) => (
            <div key={item.id} className="col-md-6 col-lg-3 mb-4" style={{ animationDelay: `${index * 0.15}s` }}>
              <div 
                className="card h-100 shadow-sm news-card"
                onClick={() => handleNewsClick(item.url)}
              >
                <div style={{ overflow: 'hidden' }}>
                  <img 
                    src={item.image} 
                    className="card-img-top" 
                    alt={item.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text text-muted small">{item.excerpt}</p>
                  <p className="text-muted small mt-auto mb-2">
                    <i className="bi bi-calendar"></i> {item.date}
                  </p>
                  <button className="btn btn-sm btn-outline-primary btn-read-more">
                    Baca Selengkapnya →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
