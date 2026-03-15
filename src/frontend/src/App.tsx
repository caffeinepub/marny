import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { type Product, usePlaceOrder, useProducts } from "@/hooks/useQueries";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ArrowLeft,
  ChevronDown,
  Droplets,
  Leaf,
  Minus,
  Plus,
  Recycle,
  ShoppingCart,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const queryClient = new QueryClient();

interface CartItem {
  product: Product;
  packs: number;
}

const FLAVOR_COLORS: Record<string, string> = {
  "Green Apple Fizz": "from-lime-100 to-green-50 border-green-200",
  "Apple Splash Drink": "from-red-50 to-rose-50 border-red-200",
  "Pomegranate Burst Drink": "from-rose-100 to-pink-50 border-rose-300",
  "Lychee Blossom Drink": "from-pink-50 to-fuchsia-50 border-pink-200",
  "Cranberry Refresher": "from-red-100 to-rose-50 border-red-300",
  "Lemon Mint Refresher": "from-yellow-50 to-lime-50 border-yellow-200",
  "Strawberry Spark Pop": "from-pink-100 to-red-50 border-pink-300",
  "Grape Blast Fizz": "from-purple-100 to-violet-50 border-purple-200",
  "Pineapple Sparkle Fizz": "from-yellow-100 to-amber-50 border-yellow-300",
  "Berry Boom Fizz": "from-indigo-100 to-blue-50 border-indigo-200",
};

const FLAVOR_OVERLAY_COLORS: Record<string, string> = {
  "Green Apple Fizz": "rgba(80, 180, 50, 0.45)",
  "Apple Splash Drink": "rgba(220, 40, 40, 0.45)",
  "Pomegranate Burst Drink": "rgba(160, 20, 60, 0.45)",
  "Lychee Blossom Drink": "rgba(230, 130, 180, 0.45)",
  "Cranberry Refresher": "rgba(130, 10, 40, 0.45)",
  "Lemon Mint Refresher": "rgba(190, 210, 30, 0.45)",
  "Strawberry Spark Pop": "rgba(240, 60, 100, 0.45)",
  "Grape Blast Fizz": "rgba(110, 30, 180, 0.45)",
  "Pineapple Sparkle Fizz": "rgba(220, 170, 0, 0.45)",
  "Berry Boom Fizz": "rgba(50, 50, 180, 0.45)",
};

const PRODUCT_PHOTO =
  "/assets/uploads/WhatsApp-Image-2026-03-15-at-2.50.59-PM-1.jpeg";

interface FlavoursPageProps {
  products: Product[];
  onBack: () => void;
  addToCart: (product: Product) => void;
}

function FlavoursPage({ products, onBack, addToCart }: FlavoursPageProps) {
  return (
    <div className="min-h-screen bg-muted/40">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Button
            data-ocid="flavours.back.button"
            variant="outline"
            className="rounded-full gap-2 font-semibold"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-black mb-4">
            Choose Your{" "}
            <span className="text-primary italic font-light">Flavour</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            10 incredible flavours. All sold in packs of 2 caps. Mix and match
            your favourites!
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id.toString()}
              data-ocid={`flavours.item.${index + 1}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`bg-gradient-to-br ${
                FLAVOR_COLORS[product.name] ??
                "from-gray-50 to-white border-gray-200"
              } border-2 rounded-3xl overflow-hidden flex flex-col shadow-card hover:shadow-fruit transition-shadow`}
            >
              <div className="relative w-full h-48 bg-white/50 overflow-hidden">
                <img
                  src={PRODUCT_PHOTO}
                  alt={`${product.name} cap`}
                  className="w-full h-full object-contain p-2"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor:
                      FLAVOR_OVERLAY_COLORS[product.name] ?? "rgba(0,0,0,0.1)",
                    mixBlendMode: "multiply",
                  }}
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display text-lg font-bold mb-2 text-foreground">
                  {product.name}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
                  {product.description}
                </p>
                <div className="space-y-1 mb-4">
                  <div className="text-2xl font-display font-black text-primary">
                    ₹{product.pricePerCap.toString()}{" "}
                    <span className="text-sm font-body font-normal text-muted-foreground">
                      per cap
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground bg-white/60 rounded-xl px-3 py-1.5 inline-block">
                    Pack of 2 —{" "}
                    <strong className="text-foreground">
                      ₹{(Number(product.pricePerCap) * 2).toString()}
                    </strong>
                  </div>
                </div>
                <Button
                  data-ocid={`cart.add_button.${index + 1}`}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl shadow-xs"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MarnyApp() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState(false);
  const [page, setPage] = useState<"home" | "flavours">("home");
  const { data: products = [] } = useProducts();
  const placeOrder = usePlaceOrder();

  const totalItems = cart.reduce((sum, item) => sum + item.packs, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + Number(item.product.pricePerCap) * 2 * item.packs,
    0,
  );

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, packs: i.packs + 1 } : i,
        );
      }
      return [...prev, { product, packs: 1 }];
    });
    toast.success(`${product.emoji} ${product.name} added to cart!`, {
      duration: 2000,
    });
  }, []);

  const updatePacks = useCallback((productId: bigint, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.product.id === productId ? { ...i, packs: i.packs + delta } : i,
        )
        .filter((i) => i.packs > 0),
    );
  }, []);

  const removeFromCart = useCallback((productId: bigint) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    setOrderSuccess(false);
    setOrderError(false);
    try {
      await Promise.all(
        cart.map((item) =>
          placeOrder.mutateAsync({
            productId: item.product.id,
            quantity: BigInt(item.packs),
          }),
        ),
      );
      setOrderSuccess(true);
      setCart([]);
      toast.success("Order placed successfully! 🎉");
    } catch {
      setOrderError(true);
      toast.error("Failed to place order. Please try again.");
    }
  };

  useEffect(() => {
    if (cartOpen) {
      setOrderSuccess(false);
      setOrderError(false);
    }
  }, [cartOpen]);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/50 shadow-xs">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button
            type="button"
            className="font-display text-2xl font-black tracking-tight cursor-pointer"
            onClick={() => setPage("home")}
          >
            <span className="text-primary">M</span>ARNY
          </button>
          <nav className="hidden md:flex items-center gap-8">
            <button
              type="button"
              data-ocid="nav.home.link"
              className="text-sm font-semibold text-foreground/70 hover:text-primary transition-colors"
              onClick={() => setPage("home")}
            >
              Home
            </button>
            {page === "home" && (
              <a
                data-ocid="nav.howitworks.link"
                href="#how-it-works"
                className="text-sm font-semibold text-foreground/70 hover:text-primary transition-colors"
              >
                How It Works
              </a>
            )}
            <button
              type="button"
              data-ocid="nav.flavours.link"
              className="text-sm font-semibold text-foreground/70 hover:text-primary transition-colors"
              onClick={() => setPage("flavours")}
            >
              Flavours
            </button>
            {page === "home" && (
              <a
                data-ocid="nav.about.link"
                href="#about"
                className="text-sm font-semibold text-foreground/70 hover:text-primary transition-colors"
              >
                About
              </a>
            )}
          </nav>
          <Button
            data-ocid="cart.toggle.button"
            variant="outline"
            size="icon"
            className="relative border-primary/30 hover:border-primary hover:bg-primary/5 rounded-full"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCart className="h-5 w-5 text-primary" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary">
                {totalItems}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      {/* Page content */}
      <AnimatePresence mode="wait">
        {page === "flavours" ? (
          <motion.div
            key="flavours"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FlavoursPage
              products={products}
              onBack={() => setPage("home")}
              addToCart={addToCart}
            />
          </motion.div>
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hero */}
            <section id="home" className="relative overflow-hidden">
              <div className="container mx-auto px-4 pt-16 pb-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="space-y-8"
                  >
                    <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-foreground border border-secondary/30 rounded-full px-4 py-1.5 text-sm font-semibold">
                      <Leaf className="h-4 w-4 text-secondary" />
                      Made from sugarcane bagasse
                    </div>
                    <h1 className="font-display text-6xl md:text-7xl font-black leading-[1.05] text-balance">
                      <span className="text-primary">Twist.</span>
                      <br />
                      <span className="text-foreground">Mix.</span>
                      <br />
                      <span className="italic font-light text-foreground/60">
                        Enjoy.
                      </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                      The world's first twist-to-release powder drink cap.
                      Eco-friendly, one-time use, and bursting with 10
                      incredible flavors.
                    </p>
                    <div className="flex gap-4">
                      <Button
                        data-ocid="hero.primary_button"
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-white font-bold rounded-full px-8 shadow-fruit"
                        onClick={() => setPage("flavours")}
                      >
                        Shop Now <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="rounded-full border-2"
                        asChild
                      >
                        <a href="#how-it-works">How It Works</a>
                      </Button>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="relative flex justify-center"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-3xl blur-3xl" />
                    <img
                      src={PRODUCT_PHOTO}
                      alt="MARNY drink cap product"
                      className="relative rounded-3xl w-full max-w-sm object-contain max-h-[520px] shadow-card"
                    />
                  </motion.div>
                </div>
              </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-24">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-16"
                >
                  <h2 className="font-display text-4xl md:text-5xl font-black mb-4">
                    How It{" "}
                    <span className="text-primary italic font-light">
                      Works
                    </span>
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                    Three simple steps to your perfect drink — anywhere,
                    anytime.
                  </p>
                </motion.div>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      step: "01",
                      icon: Droplets,
                      title: "Fill with Water",
                      desc: "Grab your bottle and fill it with regular water. Any size, any bottle.",
                      color: "bg-blue-50 border-blue-200",
                    },
                    {
                      step: "02",
                      icon: () => <span className="text-3xl">🔄</span>,
                      title: "Twist the Cap",
                      desc: "Simply twist the MARNY cap. The powder releases instantly into your water.",
                      color: "bg-orange-50 border-orange-200",
                    },
                    {
                      step: "03",
                      icon: () => <span className="text-3xl">🥤</span>,
                      title: "Shake & Enjoy",
                      desc: "Give it a quick shake, and you have a delicious, refreshing drink ready in seconds.",
                      color: "bg-green-50 border-green-200",
                    },
                  ].map(({ step, icon: Icon, title, desc, color }, i) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.15 }}
                      className={`relative p-8 rounded-3xl border-2 ${color} text-center`}
                    >
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-display font-black text-sm shadow-fruit">
                        {step}
                      </div>
                      <div className="mt-4 mb-6 flex justify-center">
                        {typeof Icon === "function" &&
                        Icon.toString().includes("span") ? (
                          <Icon />
                        ) : (
                          <div className="w-14 h-14 rounded-2xl bg-white/70 flex items-center justify-center shadow-xs">
                            <Icon className="h-7 w-7 text-primary" />
                          </div>
                        )}
                      </div>
                      <h3 className="font-display text-xl font-bold mb-2">
                        {title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* About / Sustainability */}
            <section id="about" className="py-24">
              <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                  >
                    <div className="absolute -inset-4 bg-gradient-to-br from-secondary/20 to-accent/10 rounded-[2.5rem] blur-2xl" />
                    <img
                      src="/assets/generated/marny-cap.dim_600x600.jpg"
                      alt="MARNY eco-friendly sugarcane cap"
                      className="relative rounded-3xl w-full max-w-md mx-auto object-cover shadow-card"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="space-y-8"
                  >
                    <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 rounded-full px-4 py-1.5 text-sm font-semibold text-secondary-foreground">
                      <Recycle className="h-4 w-4 text-secondary" />
                      Our Commitment to Earth
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl font-black leading-tight">
                      Refreshing You,
                      <br />
                      <span className="text-primary italic font-light">
                        Respecting Earth
                      </span>
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      At MARNY, we believe great taste shouldn't cost the
                      planet. Every cap we make is crafted from{" "}
                      <strong className="text-foreground">
                        sugarcane bagasse
                      </strong>{" "}
                      — the fibrous byproduct left after extracting sugarcane
                      juice.
                    </p>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {[
                        {
                          icon: Leaf,
                          label: "Sugarcane Bagasse",
                          desc: "Made from agricultural waste",
                        },
                        {
                          icon: Recycle,
                          label: "Biodegradable",
                          desc: "Breaks down naturally",
                        },
                        {
                          icon: Droplets,
                          label: "One-Time Use",
                          desc: "No cleaning, no waste",
                        },
                      ].map(({ icon: Icon, label, desc }) => (
                        <div
                          key={label}
                          className="bg-white rounded-2xl p-4 border border-secondary/20 text-center shadow-xs"
                        >
                          <Icon className="h-6 w-6 text-secondary mx-auto mb-2" />
                          <div className="font-bold text-sm text-foreground">
                            {label}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-foreground text-white py-12">
              <div className="container mx-auto px-4 text-center space-y-4">
                <div className="font-display text-3xl font-black">
                  <span className="text-primary">M</span>ARNY
                </div>
                <p className="text-white/60 text-sm">Twist. Mix. Enjoy.</p>
                <Separator className="bg-white/10 max-w-xs mx-auto" />
                <p className="text-white/40 text-xs">
                  © {new Date().getFullYear()}. Built with ❤️ using{" "}
                  <a
                    href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-white/60 transition-colors"
                  >
                    caffeine.ai
                  </a>
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              data-ocid="cart.panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="font-display text-2xl font-bold">Your Cart</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setCartOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {cart.length === 0 ? (
                <div
                  data-ocid="cart.empty_state"
                  className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center"
                >
                  <div className="text-6xl">🛒</div>
                  <p className="font-display text-xl font-bold text-foreground">
                    Cart is empty
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Add some flavours to get started!
                  </p>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={() => {
                      setCartOpen(false);
                      setPage("flavours");
                    }}
                  >
                    Explore Flavours
                  </Button>
                </div>
              ) : (
                <>
                  <ScrollArea className="flex-1 p-6">
                    <div className="space-y-4">
                      {cart.map((item, index) => (
                        <div
                          key={item.product.id.toString()}
                          data-ocid={`cart.item.${index + 1}`}
                          className="flex items-center gap-3 bg-muted/40 rounded-2xl p-4"
                        >
                          <div className="text-3xl">{item.product.emoji}</div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm truncate">
                              {item.product.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              ₹
                              {Number(item.product.pricePerCap) *
                                2 *
                                item.packs}{" "}
                              total
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 rounded-full border-primary/30"
                              onClick={() => updatePacks(item.product.id, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="font-bold text-sm w-6 text-center">
                              {item.packs}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 rounded-full border-primary/30"
                              onClick={() => updatePacks(item.product.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              data-ocid={`cart.delete_button.${index + 1}`}
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-full text-destructive hover:bg-destructive/10 ml-1"
                              onClick={() => removeFromCart(item.product.id)}
                            >
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="p-6 border-t space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-muted-foreground">
                        Total ({totalItems} pack{totalItems !== 1 ? "s" : ""})
                      </span>
                      <span className="font-display text-2xl font-black text-primary">
                        ₹{totalPrice}
                      </span>
                    </div>

                    {orderSuccess && (
                      <div
                        data-ocid="cart.success_state"
                        className="bg-green-50 border border-green-200 rounded-2xl p-3 text-center text-green-700 text-sm font-semibold"
                      >
                        🎉 Order placed successfully!
                      </div>
                    )}
                    {orderError && (
                      <div
                        data-ocid="cart.error_state"
                        className="bg-red-50 border border-red-200 rounded-2xl p-3 text-center text-red-700 text-sm font-semibold"
                      >
                        ❌ Failed to place order. Try again.
                      </div>
                    )}

                    <Button
                      data-ocid="cart.submit_button"
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl h-12 text-base shadow-fruit"
                      onClick={handlePlaceOrder}
                      disabled={placeOrder.isPending}
                    >
                      {placeOrder.isPending
                        ? "Placing Order..."
                        : `Place Order — ₹${totalPrice}`}
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Toaster position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MarnyApp />
    </QueryClientProvider>
  );
}
