import { Navbar }        from '../components/Navbar';
import { Hero }          from '../components/Hero';
import { Stats }         from '../components/Stats';
import { About }         from '../components/About';
import { Skills }        from '../components/Skills';
import { Programs }      from '../components/Programs';
import { Journey }       from '../components/Journey';
import { Collaborations }from '../components/Collaborations';
import { Gallery }       from '../components/Gallery';
import { Videos }        from '../components/Videos';
import { Blog }          from '../components/Blog';
import { Testimonials }  from '../components/Testimonials';
import { Coaching }      from '../components/Coaching';
import { FAQ }           from '../components/FAQ';
import { Contact }       from '../components/Contact';
import { Footer }        from '../components/Footer';

export const Home = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <Stats />
      <About />
      <Skills />
      <Programs />
      <Journey />
      <Collaborations />
      <Gallery />
      <Videos />
      <Blog />
      <Testimonials />
      <Coaching />
      <FAQ />
      <Contact />
    </main>
    <Footer />
  </>
);
