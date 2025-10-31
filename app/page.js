import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import HeroSection from './components/sections/HeroSection';
import CategoriesSection from './components/sections/CategoriesSection';
import ZX9SpeakerSection from './components/sections/ZX9SpeakerSection';
import ZX7SpeakerSection from './components/sections/ZX7SpeakerSection';
import YX1EarphonesSection from './components/sections/YX1EarphonesSection';
import AboutSection from './components/sections/AboutSection';

export default function Home() {
  return (
    <>
      <Header />
      <Cart />
      <main>
        <HeroSection />
        <CategoriesSection />
        <ZX9SpeakerSection />
        <ZX7SpeakerSection />
        <YX1EarphonesSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
