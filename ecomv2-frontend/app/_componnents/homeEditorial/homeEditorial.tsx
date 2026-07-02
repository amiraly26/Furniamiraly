import Link from "next/link";
import { Mail } from "lucide-react";
import "./homeEditorial.css";

const articles = [
  {
    title: "7 ways to decorate your home",
    image: "/images/review1.jpg",
  },
  {
    title: "Kitchen organization",
    image: "/images/review2.jpg",
  },
  {
    title: "Decor your bedroom",
    image: "/images/review3.jpg",
  },
];

export function HomeEditorial() {
  return (
    <>
      <section className="home-sale">
        <div className="home-sale__image" />
        <div className="home-sale__content">
          <p className="home-sale__eyebrow">SALE UP TO 40% OFF</p>
          <h2>HUNDREDS of New lower prices!</h2>
          <p className="home-sale__copy">
            It&apos;s more affordable than ever to give every room in your home a stylish refresh.
          </p>
          <Link href="/shop">
            Shop Now <span className="material-symbols-outlined">arrow_right_alt</span>
          </Link>
        </div>
      </section>

      <section className="home-articles">
        <div className="home-section-head">
          <h2>Articles</h2>
          <Link href="/shop">
            More Articles <span className="material-symbols-outlined">arrow_right_alt</span>
          </Link>
        </div>
        <div className="home-articles__grid">
          {articles.map((article) => (
            <article className="home-article" key={article.title}>
              <div className="home-article__image">
                <img src={article.image} alt="" loading="eager" />
              </div>
              <h3>{article.title}</h3>
              <Link href="/shop">
                Read More <span className="material-symbols-outlined">arrow_right_alt</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="home-newsletter">
        <div className="home-newsletter__visual home-newsletter__visual--left" />
        <div className="home-newsletter__content">
          <h2>Join Our Newsletter</h2>
          <p>Sign up for deals, new products and promotions</p>
          <form>
            <Mail size={18} strokeWidth={1.8} />
            <input type="email" placeholder="Email address" aria-label="Email address" />
            <button type="submit">Signup</button>
          </form>
        </div>
        <div className="home-newsletter__visual home-newsletter__visual--right" />
      </section>
    </>
  );
}
