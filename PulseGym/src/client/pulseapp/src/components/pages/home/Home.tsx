import './Home.css';
import { Header } from '../../Header/Header';
import { Ender } from '../../Ender/Ender';
import { PromoImage } from '../../Promo/Promo';

export const Home = () => {
  return (
    <>
      <Header />
      <main>
        <section className="promo-container">
          <div className="promo-content">
            <PromoImage />
            <div className="promo-text">
              <p>Чтобы посмотреть алгоритм ближайшего соседа, нажмите "Алгоритм" в верхнем правом углу.</p>
            </div>
          </div>
        </section>
      </main>
      <Ender />
    </>
  );
};
