import React, { useState } from 'react';
import { useEffect } from 'react';

const removeFloating = () => { 
  document.querySelectorAll('[style*="position: fixed"][style*="bottom: 1rem"][style*="right: 1rem"][style*="z-index: 2147483647"]').forEach(el => el.remove());
};

// executa já no load
removeFloating();

// observa mudanças no DOM
const observer = new MutationObserver(removeFloating);
observer.observe(document.body, { childList: true, subtree: true });



import { ChevronLeft, ChevronRight, Instagram, Facebook, Menu, X } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import MusicPlayer, { MusicPlayerRef } from './components/MusicPlayer';
import { useRef } from 'react';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const musicPlayerRef = useRef<MusicPlayerRef>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all elements with animate-slide-up class
    const animatedElements = document.querySelectorAll('.animate-slide-up');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const heroSlides = [
    {
      image: 'https://i.ibb.co/4g8LDJBp/490448561-3191648090975273-6466619685511415125-n.jpg',
      title: ''
    },
    {
      image: 'https://i.ibb.co/9HS82qyM/489927333-3186066831533399-8602430560923160726-n.jpg',
      title: 'Domine os segredos do universo'
    },
    {
      image: 'https://i.ibb.co/S48LJXDs/271724099-614490419560015-3535097475649327233-n.jpg',
      title: 'Transforme sua realidade com magia'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', formData);
    setFormData({ name: '', email: '' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const scrollToNextSection = () => {
    const element = document.getElementById('produtos-destaque');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 scroll-smooth">
      {/* Header */}
      <header className="w-full z-50 bg-neutral-900/95 backdrop-blur-sm border-b border-amber-600/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-amber-400 tracking-wider">
                MESTRE DOS MAGOS
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('mestre')} className="text-gray-300 hover:text-amber-400 transition-colors duration-300">O Mestre</button>
              <button onClick={() => scrollToSection('produtos')} className="text-gray-300 hover:text-amber-400 transition-colors duration-300">Produtos Mágicos</button>
              <button onClick={() => scrollToSection('fale-com-mestre')} className="text-gray-300 hover:text-amber-400 transition-colors duration-300">Contato</button>
            </nav>

            <div className="flex items-center space-x-4">
              <a href="https://instagram.com/_mestredosmagos1_" target="_blank" rel="noopener noreferrer" className="hidden sm:block text-gray-300 hover:text-amber-400 transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/moisesdejesusmarques.marques.9" target="_blank" rel="noopener noreferrer" className="hidden sm:block text-gray-300 hover:text-amber-400 transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-gray-300 hover:text-amber-400 transition-colors duration-300"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-neutral-900 border-t border-amber-600/20">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => scrollToSection('mestre')}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-amber-400 transition-colors duration-300"
                >
                  O Mestre
                </button>
                <button
                  onClick={() => scrollToSection('produtos')}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-amber-400 transition-colors duration-300"
                >
                  Produtos Mágicos
                </button>
                <button
                  onClick={() => scrollToSection('fale-com-mestre')}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-amber-400 transition-colors duration-300"
                >
                  Contato
                </button>
                
                {/* Mobile social links */}
                <div className="flex items-center space-x-4 px-3 py-2">
                  <a href="https://instagram.com/_mestredosmagos1_" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="https://www.facebook.com/moisesdejesusmarques.marques.9" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                    <Facebook className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="relative h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            </div>
          ))}
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center animate-fade-in px-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 md:mb-8 max-w-4xl mx-auto leading-tight tracking-wider drop-shadow-2xl text-shadow-mystical font-serif">
                {heroSlides[currentSlide].title}
              </h2>
              <button
                onClick={() => {
                  scrollToSection('grid-section');
                  musicPlayerRef.current?.play();
                }}
                className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black px-8 py-4 rounded-lg text-lg font-bold transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-lg backdrop-blur-sm border border-amber-400/30 animate-pulse z-10 relative"
              >
                Mestre dos Magos
              </button>
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-amber-400 transition-colors duration-300"
          >
            <ChevronLeft className="h-8 w-8 md:h-12 md:w-12" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-amber-400 transition-colors duration-300"
          >
            <ChevronRight className="h-8 w-8 md:h-12 md:w-12" />
          </button>
        </div>
      </section>

      {/* 4 Blocos em Grade */}
      <section id="grid-section" className="py-20 bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                image: 'https://i.ibb.co/PGyh2Nqj/491941389-3191648010975281-7697153996359758336-n.jpg',
                title: 'ARTEFATOS MÁGICOS',
                subtitle: 'Instrumentos únicos para canalizar energia.'
              },
              {
                image: 'https://i.ibb.co/fz2fjmBK/490448784-3191648200975262-2180016959362343194-n.jpg',
                title: 'POÇÕES & ELIXIRES',
                subtitle: 'Força, clareza e vitalidade em frascos mágicos.'
              },
              {
                image: 'https://i.ibb.co/ymLR7rcs/490747374-3191648207641928-5658032763868867031-n.jpg',
                title: 'ACADEMIA ARCANA',
                subtitle: 'Aprenda os segredos guardados por séculos.'
              },
              {
                image: 'https://i.ibb.co/0jJxbCR1/491922232-3191648350975247-6073388817285449038-n.jpg',
                title: 'SANTUÁRIO MÁGICO',
                subtitle: 'O espaço sagrado onde a magia acontece.'
              }
            ].map((item, index) => (
              <div key={index} className="group transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-slide-up">
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105 border border-amber-600/10 rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/50 group-hover:via-black/15 transition-all duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 transform transition-transform duration-300 group-hover:translate-y-[-2px]">{item.title}</h3>
                    <p className="text-gray-300 text-sm md:text-base transform transition-transform duration-300 group-hover:translate-y-[-1px]">{item.subtitle}</p>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <a
                    href="https://wa.me/5575991289033?text=Ol%C3%A1%20Mestre%2C%20vim%20pelo%20site%2C%20quero%20comprar.%20Como%20fa%C3%A7o%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-500 transform hover:scale-105 hover:shadow-lg shadow-md border border-red-600/15 text-sm md:text-base"
                  >
                    Comprar agora
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Missão */}
      <section id="produtos" className="py-24 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight animate-slide-up">
            Contribuímos para a transformação e poder pessoal dos nossos clientes
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Nosso propósito é oferecer sabedoria e artefatos encantados que trazem proteção, clareza e poder para quem ousa acessar o extraordinário.
            Cada produto é criado com a magia ancestral transmitida pelo Mestre dos Magos, representando a essência do artesanato em Cachoeira que conecta tradição e transformação pessoal.
          </p>
          <button
            onClick={scrollToNextSection}
            className="bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-lg border border-red-600/30 animate-slide-up"
          >
            Conheça agora
          </button>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section id="produtos-destaque" className="py-20 bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: 'https://i.ibb.co/ZzCywHcL/490209267-3191648144308601-8649224761911029015-n.jpg',
                title: 'ABAJUR DA SABEDORIA',
                subtitle: 'Concentre energia mística e desbloqueie novos poderes.'
              },
              {
                image: 'https://i.ibb.co/v4hBJrHW/491743194-3191648190975263-7266604297437834366-n.jpg',
                title: 'POÇÃO DA CLAREZA',
                subtitle: 'Restaure sua energia vital e amplifique sua visão interior.'
              },
              {
                image: 'https://i.ibb.co/LDn4R13R/490736189-3191647980975284-3407902226850599112-n.jpg',
                title: 'CRISTAIS ENCANTADOS',
                subtitle: 'Equilibre corpo, mente e espírito com poder arcano.'
              }
            ].map((product, index) => (
              <div key={index} className="group transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-slide-up">
                <div className="relative overflow-hidden rounded-lg aspect-[3/4] mb-6">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 border border-amber-600/10 rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/50 group-hover:via-black/15 transition-all duration-500"></div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 transform transition-transform duration-300 group-hover:translate-y-[-1px]">{product.title}</h3>
                  <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base transform transition-transform duration-300 group-hover:translate-y-[-1px]">{product.subtitle}</p>
                  <a
                    href="https://wa.me/5575991289033?text=Ol%C3%A1%20Mestre%2C%20vim%20pelo%20site%2C%20quero%20comprar.%20Como%20fa%C3%A7o%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-500 transform hover:scale-105 hover:shadow-lg shadow-md border border-red-600/15 text-sm md:text-base"
                  >
                    Comprar agora
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre o Mestre */}
      <section id="mestre" className="py-24 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8 animate-slide-up">
                CONHEÇA<br />
                MESTRE DOS MAGOS
              </h2>
              <div className="space-y-4 md:space-y-6 text-gray-400 text-base md:text-lg leading-relaxed animate-slide-up">
                <p>
                  Guardião dos segredos ancestrais, o Mestre dos Magos é um sábio que guia aprendizes pelo caminho do poder oculto através de seu artesanato místico.
                </p>
                <p>
                  Agora, ele compartilha sua sabedoria e artefatos encantados com todos que buscam expandir sua consciência e alcançar o extraordinário através do artesanato em Cachoeira BA.
                </p>
              </div>
            </div>
            <div className="relative animate-slide-up">
              <img
                src="https://i.ibb.co/dCy7Zgb/69583529-478230763029515-85221063209779200-n.jpg"
                alt="Mestre dos Magos"
                className="w-full rounded-lg shadow-lg border border-amber-600/15 transition-all duration-500 hover:shadow-amber-500/10 hover:border-amber-500/25 hover:scale-102"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="fale-com-mestre" className="relative py-24 bg-gradient-to-r from-neutral-800 to-neutral-900 overflow-hidden">
        <div className="absolute inset-0 opacity-70">
          <img
            src="https://i.ibb.co/zHDZsDhJ/491938649-3191647910975291-1840759458550327315-n.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.6)'}}>
            FALE COM O MESTRE
          </h2>
          <p className="text-lg md:text-xl text-white mb-6 md:mb-8" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.6)'}}>
            Receba orientações mágicas diretamente no seu WhatsApp e tire suas dúvidas agora mesmo.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="https://wa.me/5575991289033?text=Ol%C3%A1%20Mestre%2C%20vim%20pelo%20site%2C%20quero%20comprar.%20Como%20fa%C3%A7o%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-lg font-semibold transition-all duration-500 transform hover:scale-110 hover:shadow-xl shadow-md border border-green-500/30 text-sm md:text-base"
            >
              <MessageCircle className="h-5 w-5" />
              Chamar no WhatsApp
            </a>
            <a
              href="https://instagram.com/_mestredosmagos1_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-lg font-semibold transition-all duration-500 transform hover:scale-110 hover:shadow-xl shadow-md border border-pink-500/30 text-sm md:text-base"
            >
              <Instagram className="h-5 w-5" />
              Seguir no Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer id="contato" className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-xl md:text-2xl font-bold text-amber-400 mb-6 tracking-wider">
                MESTRE DOS MAGOS
              </h3>
              <div className="flex space-x-6 mb-8">
                <a href="https://instagram.com/_mestredosmagos1_" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-400 transition-colors duration-300">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="https://www.facebook.com/moisesdejesusmarques.marques.9" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-400 transition-colors duration-300">
                  <Facebook className="h-6 w-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-base md:text-lg font-semibold text-white mb-4">ENDEREÇO</h4>
              <p className="text-gray-400 text-sm md:text-base">R. Mestro Irineu Sacramento, S/n</p>
              <p className="text-gray-400 text-sm md:text-base">Centro, Cachoeira - BA</p>
              <p className="text-gray-400 text-sm md:text-base">44300-000</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm md:text-base">
              © 2025 - MESTRE DOS MAGOS. Todos os direitos reservados.
            </p>
            <p className="text-gray-400 text-sm md:text-base mt-2">
              Desenvolvido por <a href="https://lizardai.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 transition-colors duration-300">LizardAI</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Music Player */}
      <MusicPlayer
        ref={musicPlayerRef}
        audioSrc="https://github.com/mestredosmagossite-gif/musica/raw/refs/heads/main/Dirty%20Prydz%20-%20Paradise%20%5BQL26YnGOI44%5D.mp3"
      />
    </div>
  );
}

export default App;