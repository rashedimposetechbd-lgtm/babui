import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import ProductCard from '@/components/ProductCard';
import ComboCard from '@/components/ComboCard';
import Navigation from '@/components/Navigation';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/_core/hooks/useAuth';
import { toast } from 'sonner';
import BrandShowcase from '@/components/BrandShowcase';
import Footer from '@/components/Footer';

export default function Home() {
  const utils = trpc.useUtils();
  const { user } = useAuth();
  const [cartItemCount, setCartItemCount] = useState(0);

  const { data: categories } = trpc.categories.list.useQuery();
  const { data: topSelling } = trpc.products.topSelling.useQuery({ limit: 8 });
  const { data: combos } = trpc.combos.list.useQuery();
  const { data: allProducts } = trpc.products.list.useQuery();
  const { data: cartItems } = trpc.cart.list.useQuery();

  useEffect(() => {
    if (cartItems) setCartItemCount(cartItems.length);
  }, [cartItems]);

  const addToCartMutation = trpc.cart.add.useMutation({
    onSuccess: () => {
      toast.success('Added to cart!');
      utils.cart.list.invalidate();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to add to cart');
    },
  });

  const handleAddToCart = (productId: number) => {
    addToCartMutation.mutate({ productId, quantity: 1 });
  };

  const categoriesList = Array.isArray(categories) ? categories : [];
  const allProductsList = Array.isArray(allProducts) ? allProducts : [];
  const topSellingList = Array.isArray(topSelling) ? topSelling : [];
  const combosList = Array.isArray(combos) ? combos : [];

  const honeyCategory = categoriesList.find((c) => /honey/i.test(c.name));
  const oilCategory = categoriesList.find((c) => /oil|ghee/i.test(c.name));
  const dateCategory = categoriesList.find((c) => /date|khejur/i.test(c.name));

  const honeyProducts = honeyCategory ? allProductsList.filter((p) => p.categoryId === honeyCategory.id).slice(0, 6) : [];
  const oilProducts = oilCategory ? allProductsList.filter((p) => p.categoryId === oilCategory.id).slice(0, 6) : [];
  const dateProducts = dateCategory ? allProductsList.filter((p) => p.categoryId === dateCategory.id).slice(0, 6) : [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation cartItemCount={cartItemCount} />

      <section className="gb-hero">
        <div className="container">
          <div className="gb-hero__shell">
            <div className="gb-hero__copy">
              <span className="gb-hero__eyebrow">Trusted natural grocery</span>
              <h1>Premium groceries from trusted local sources.</h1>
              <p>
                Discover authentic, high-quality products from trusted brands. From pure honey to organic spices, find everything for your kitchen.
              </p>

              <div className="gb-hero__actions">
                <Link href="/category/1" className="gb-cta">Shop Now</Link>
                <Link href="/combos" className="gb-cta gb-cta--outline">View Combo Deals</Link>
              </div>

              <div className="gb-hero__stats">
                <div className="gb-stat">
                  <strong>10k+</strong>
                  <span>Happy customers</span>
                </div>
                <div className="gb-stat">
                  <strong>50+</strong>
                  <span>Natural products</span>
                </div>
                <div className="gb-stat">
                  <strong>24/7</strong>
                  <span>Support</span>
                </div>
              </div>
            </div>

            <div className="gb-hero__visual">
              <div className="gb-hero__panel">
                <img alt="Featured grocery selection" src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {categoriesList.length > 0 && (
        <section className="gb-section">
          <div className="container">
            <div className="gb-section__head">
              <h2>Featured Categories</h2>
            </div>
            <div className="gb-categories">
              {categoriesList.map((category) => (
                <Link key={category.id} href={`/category/${category.id}`} className="gb-category-card">
                  <div className="gb-category-card__icon">
                    {category.imageUrl ? (
                      <img src={category.imageUrl} alt={category.name} className="w-8 h-8 object-cover rounded-full mx-auto" />
                    ) : (
                      category.name.charAt(0)
                    )}
                  </div>
                  <p>{category.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {topSellingList.length > 0 && (
        <section className="gb-section" style={{ background: 'linear-gradient(180deg, rgba(15, 139, 88, 0.03), rgba(15, 139, 88, 0.01))' }}>
          <div className="container">
            <div className="gb-section__head">
              <h2>Top Selling Products</h2>
              <Link href="/category/1">View All</Link>
            </div>
            <div className="gb-product-grid">
              {topSellingList.map((product) => (
                <ProductCard
                  imageUrl={product.imageUrl}
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={parseFloat(String(product.price))}
                  discountPrice={product.discountPrice ? parseFloat(String(product.discountPrice)) : null}
                  discountPercentage={product.discountPercentage ? parseFloat(String(product.discountPercentage)) : null}
                  isBestSelling={product.isBestSelling || false}
                  isNewArrival={product.isNewArrival || false}
                  stock={product.stock}
                  hasLimitedTimeOffer={product.hasLimitedTimeOffer || false}
                  offerEndsAt={product.offerEndsAt ? new Date(product.offerEndsAt) : null}
                  onAddToCart={() => handleAddToCart(product.id)}
                  isLoading={addToCartMutation.isPending}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <BrandShowcase />

      {combosList.length > 0 && (
        <section className="gb-section">
          <div className="container">
            <div className="gb-section__head">
              <h2>Exclusive Combo Deals</h2>
              <Link href="/combos">View All Combos</Link>
            </div>
            <div className="gb-product-grid">
              {combosList.slice(0, 4).map((combo) => (
                <ComboCard
                  key={combo.id}
                  id={combo.id}
                  name={combo.name}
                  price={parseFloat(String(combo.price))}
                  originalPrice={parseFloat(String(combo.originalPrice))}
                  savingsPercentage={parseFloat(String(combo.savingsPercentage))}
                  stock={combo.stock}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {honeyProducts.length > 0 && (
        <section className="gb-section" style={{ background: 'linear-gradient(180deg, rgba(15, 139, 88, 0.03), rgba(15, 139, 88, 0.01))' }}>
          <div className="container">
            <div className="gb-section__head">
              <h2>{honeyCategory?.name || 'All Natural Honey'}</h2>
              <Link href={`/category/${honeyCategory?.id || 1}`}>View all items</Link>
            </div>
            <div className="gb-product-grid">
              {honeyProducts.map((product) => (
                <ProductCard
                  imageUrl={product.imageUrl}
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={parseFloat(String(product.price))}
                  discountPrice={product.discountPrice ? parseFloat(String(product.discountPrice)) : null}
                  discountPercentage={product.discountPercentage ? parseFloat(String(product.discountPercentage)) : null}
                  isBestSelling={product.isBestSelling || false}
                  isNewArrival={product.isNewArrival || false}
                  stock={product.stock}
                  hasLimitedTimeOffer={product.hasLimitedTimeOffer || false}
                  offerEndsAt={product.offerEndsAt ? new Date(product.offerEndsAt) : null}
                  onAddToCart={() => handleAddToCart(product.id)}
                  isLoading={addToCartMutation.isPending}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {dateProducts.length > 0 && (
        <section className="gb-section">
          <div className="container">
            <div className="gb-section__head">
              <h2>{dateCategory?.name || 'Premium Dates'}</h2>
              <Link href={`/category/${dateCategory?.id || 1}`}>View all items</Link>
            </div>
            <div className="gb-product-grid">
              {dateProducts.map((product) => (
                <ProductCard imageUrl={product.imageUrl} key={product.id} id={product.id} name={product.name} price={parseFloat(String(product.price))} discountPrice={product.discountPrice ? parseFloat(String(product.discountPrice)) : null} discountPercentage={product.discountPercentage ? parseFloat(String(product.discountPercentage)) : null} isBestSelling={product.isBestSelling || false} isNewArrival={product.isNewArrival || false} stock={product.stock} hasLimitedTimeOffer={product.hasLimitedTimeOffer || false} offerEndsAt={product.offerEndsAt ? new Date(product.offerEndsAt) : null} onAddToCart={() => handleAddToCart(product.id)} isLoading={addToCartMutation.isPending} />
              ))}
            </div>
          </div>
        </section>
      )}

      {oilProducts.length > 0 && (
        <section className="gb-section" style={{ background: 'linear-gradient(180deg, rgba(15, 139, 88, 0.03), rgba(15, 139, 88, 0.01))' }}>
          <div className="container">
            <div className="gb-section__head">
              <h2>{oilCategory?.name || 'Cooking Essentials'}</h2>
              <Link href={`/category/${oilCategory?.id || 1}`}>View all items</Link>
            </div>
            <div className="gb-product-grid">
              {oilProducts.map((product) => (
                <ProductCard
                  imageUrl={product.imageUrl}
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={parseFloat(String(product.price))}
                  discountPrice={product.discountPrice ? parseFloat(String(product.discountPrice)) : null}
                  discountPercentage={product.discountPercentage ? parseFloat(String(product.discountPercentage)) : null}
                  isBestSelling={product.isBestSelling || false}
                  isNewArrival={product.isNewArrival || false}
                  stock={product.stock}
                  hasLimitedTimeOffer={product.hasLimitedTimeOffer || false}
                  offerEndsAt={product.offerEndsAt ? new Date(product.offerEndsAt) : null}
                  onAddToCart={() => handleAddToCart(product.id)}
                  isLoading={addToCartMutation.isPending}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
