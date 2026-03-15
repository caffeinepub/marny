import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { type Product, usePlaceOrder, useProducts } from "@/hooks/useQueries";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ArrowLeft,
  ChevronDown,
  Droplets,
  Leaf,
  Loader2,
  LogIn,
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  Minus,
  Plus,
  Recycle,
  ShoppingCart,
  User,
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

const FLAVOR_IMAGES: Record<string, string> = {
  "Green Apple Fizz": "/assets/uploads/image-6-4.png",
  "Apple Splash Drink": "/assets/uploads/image-4-3.png",
  "Grape Blast Fizz": "/assets/uploads/image-2-2.png",
  "Berry Boom Fizz": "/assets/uploads/Screenshot-2026-03-15-183627-2.png",
  "Pineapple Sparkle Fizz":
    "/assets/uploads/Screenshot-2026-03-15-183450-1.png",
  "Lemon Mint Refresher": "/assets/uploads/Screenshot-2026-03-15-183558-3.png",
  "Cranberry Refresher": "/assets/uploads/Screenshot-2026-03-15-183528-4.png",
  "Strawberry Spark Pop": "/assets/uploads/Screenshot-2026-03-15-183649-1.png",
  "Lychee Blossom Drink": "/assets/uploads/Screenshot-2026-03-15-183907-2.png",
  "Pomegranate Burst Drink":
    "/assets/uploads/Screenshot-2026-03-15-185318-5.png",
};

const PRODUCT_PHOTO =
  "/assets/uploads/WhatsApp-Image-2026-03-15-at-2.50.59-PM-1.jpeg";

type Page = "home" | "flavours" | "login" | "product" | "faq";
type CheckoutStep = "cart" | "checkout";

// ─── Login Page ───────────────────────────────────────────────────────────────

interface LoginPageProps {
  onBack: () => void;
  onSuccess: () => void;
}

function LoginPage({ onBack, onSuccess }: LoginPageProps) {
  const { login, isLoggingIn, isLoginSuccess, isLoginError, loginError } =
    useInternetIdentity();

  useEffect(() => {
    if (isLoginSuccess) {
      toast.success("Welcome back! 🎉");
      onSuccess();
    }
  }, [isLoginSuccess, onSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        <div className="bg-white rounded-3xl shadow-card border border-border/40 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-primary via-accent to-secondary" />
          <div className="p-8 space-y-8">
            <div className="text-center space-y-2">
              <div className="font-display text-4xl font-black tracking-tight">
                <span className="text-primary">M</span>ARNY
              </div>
              <p className="text-muted-foreground text-sm">
                Sign in to start shopping your favourite flavours
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Separator className="flex-1" />
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <Separator className="flex-1" />
            </div>
            {isLoginError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-destructive/10 border border-destructive/20 rounded-2xl p-3 text-center"
              >
                <p className="text-destructive text-sm font-semibold">
                  {loginError?.message ?? "Login failed. Please try again."}
                </p>
              </motion.div>
            )}
            <Button
              data-ocid="login.submit_button"
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl h-12 text-base shadow-fruit gap-3"
              onClick={login}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Login with Internet Identity
                </>
              )}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Secure, private login — no passwords required.
            </p>
          </div>
        </div>
        <div className="mt-4 text-center">
          <Button
            data-ocid="login.back.button"
            variant="ghost"
            className="rounded-full text-muted-foreground hover:text-foreground gap-2 text-sm"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Product Detail Page ──────────────────────────────────────────────────────

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  addToCart: (product: Product, packs: number) => void;
}

function ProductDetailPage({
  product,
  onBack,
  addToCart,
}: ProductDetailPageProps) {
  const [packQty, setPackQty] = useState(1);
  const [added, setAdded] = useState(false);
  const specificImage = FLAVOR_IMAGES[product.name];
  const hasSpecificImage = !!specificImage;
  const pricePerPack = Number(product.pricePerCap) * 2;
  const totalPrice = pricePerPack * packQty;

  const handleAddToCart = () => {
    addToCart(product, packQty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Button
            data-ocid="product.back.button"
            variant="outline"
            className="rounded-full gap-2 font-semibold"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
            All Flavours
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`bg-gradient-to-br ${
              FLAVOR_COLORS[product.name] ??
              "from-gray-50 to-white border-gray-200"
            } border-2 rounded-3xl overflow-hidden aspect-square flex items-center justify-center p-8 relative shadow-card`}
          >
            <img
              src={specificImage ?? PRODUCT_PHOTO}
              alt={`${product.name} cap`}
              className="w-full h-full object-contain"
            />
            {!hasSpecificImage && (
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  backgroundColor:
                    FLAVOR_OVERLAY_COLORS[product.name] ?? "rgba(0,0,0,0.1)",
                  mixBlendMode: "multiply",
                }}
              />
            )}
            <div className="absolute top-4 right-4 text-3xl bg-white/80 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center shadow-xs">
              {product.emoji}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-black text-foreground mb-2">
                {product.name}
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-border/60 p-5 space-y-2 shadow-xs">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Price per cap
                </span>
                <span className="font-bold text-foreground">
                  ₹{product.pricePerCap.toString()}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Price per pack (2 caps)
                </span>
                <span className="font-display text-lg font-black text-primary">
                  ₹{pricePerPack}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">
                Number of Packs
              </p>
              <div className="flex items-center gap-4">
                <Button
                  data-ocid="product.quantity.decrease.button"
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 rounded-full border-2 border-primary/30 hover:border-primary"
                  onClick={() => setPackQty((q) => Math.max(1, q - 1))}
                  disabled={packQty <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex flex-col items-center min-w-[3rem]">
                  <span className="font-display text-3xl font-black text-primary">
                    {packQty}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {packQty === 1 ? "pack" : "packs"}
                  </span>
                </div>
                <Button
                  data-ocid="product.quantity.increase.button"
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 rounded-full border-2 border-primary/30 hover:border-primary"
                  onClick={() => setPackQty((q) => q + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <div className="ml-2 text-sm text-muted-foreground">
                  = {packQty * 2} caps
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-display text-2xl font-black text-primary">
                ₹{totalPrice}
              </span>
            </div>

            <Button
              data-ocid="product.add_cart.button"
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl text-base shadow-fruit gap-2 py-3"
              onClick={handleAddToCart}
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    ✓ Added to Cart!
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add {packQty} Pack{packQty !== 1 ? "s" : ""} to Cart — ₹
                    {totalPrice}
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>

            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/10 rounded-xl px-4 py-2.5">
              <Leaf className="h-4 w-4 text-secondary shrink-0" />
              Made from eco-friendly sugarcane bagasse. Single-use,
              biodegradable.
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── Flavours Page ────────────────────────────────────────────────────────────

interface FlavoursPageProps {
  products: Product[];
  onBack: () => void;
  addToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

function FlavoursPage({
  products,
  onBack,
  addToCart,
  onViewProduct,
}: FlavoursPageProps) {
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
          {products.map((product, index) => {
            const specificImage = FLAVOR_IMAGES[product.name];
            const hasSpecificImage = !!specificImage;
            return (
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
                <button
                  type="button"
                  className="relative w-full h-48 bg-white/50 overflow-hidden cursor-pointer focus:outline-none"
                  onClick={() => onViewProduct(product)}
                  aria-label={`View details for ${product.name}`}
                >
                  <img
                    src={specificImage ?? PRODUCT_PHOTO}
                    alt={`${product.name} cap`}
                    className="w-full h-full object-contain p-2"
                  />
                  {!hasSpecificImage && (
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundColor:
                          FLAVOR_OVERLAY_COLORS[product.name] ??
                          "rgba(0,0,0,0.1)",
                        mixBlendMode: "multiply",
                      }}
                    />
                  )}
                </button>
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
                  <div className="flex gap-2">
                    <Button
                      data-ocid={`flavours.detail_button.${index + 1}`}
                      variant="outline"
                      className="flex-1 rounded-2xl border-primary/30 text-primary font-semibold hover:bg-primary/5 text-sm"
                      onClick={() => onViewProduct(product)}
                    >
                      View Details
                    </Button>
                    <Button
                      data-ocid={`cart.add_button.${index + 1}`}
                      className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl shadow-xs text-sm"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── FAQ Page ─────────────────────────────────────────────────────────────────

interface FAQPageProps {
  onBack: () => void;
}

const faqs = [
  {
    q: "Does the cap fit all bottles?",
    a: "Yes! The MARNY cap is designed to be universal — it fits virtually all standard water and beverage bottles, so you can use it on the go wherever you are.",
  },
  {
    q: "Is the cap eco-friendly?",
    a: "Absolutely. Each MARNY cap is made from sugarcane bagasse, a natural byproduct of sugarcane processing. It is 100% single-use and biodegradable, leaving no lasting waste.",
  },
  {
    q: "How do I use the MARNY cap?",
    a: "Simply twist the cap onto your bottle. The powder inside releases instantly into your water, giving you a fresh flavoured drink in seconds — no mixing required.",
  },
  {
    q: "How many caps come in one pack?",
    a: "Each pack contains 2 MARNY caps. You can choose how many packs you want on any product page.",
  },
  {
    q: "Are the flavours natural?",
    a: "MARNY flavours are crafted to taste fresh and natural. We focus on delivering great taste without excessive sugar or artificial additives.",
  },
  {
    q: "Can I use the cap with hot water?",
    a: "The cap is designed for cold or room-temperature water for the best flavour experience. Using it with very hot water is not recommended.",
  },
  {
    q: "How do I place an order?",
    a: "Browse the Flavours page, add your favourite caps to the cart, then proceed to checkout. Enter your delivery address and phone number, and confirm via WhatsApp or email.",
  },
];

function FAQPage({ onBack }: FAQPageProps) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/40 px-4 py-3 flex items-center gap-3">
        <button
          type="button"
          data-ocid="faq.back.button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <Separator orientation="vertical" className="h-4" />
        <span className="font-display font-black text-lg">FAQ</span>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 text-center"
        >
          <h1 className="font-display text-4xl font-black mb-3">
            Frequently Asked <span className="text-primary">Questions</span>
          </h1>
          <p className="text-muted-foreground">
            Everything you need to know about MARNY caps.
          </p>
        </motion.div>

        <div className="space-y-3" data-ocid="faq.list">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              data-ocid={`faq.item.${i + 1}`}
              className="border border-border/60 rounded-2xl overflow-hidden bg-card"
            >
              <button
                type="button"
                data-ocid={`faq.toggle.${i + 1}`}
                className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-sm hover:bg-muted/40 transition-colors gap-3"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

function MarnyApp() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState(false);
  const [page, setPage] = useState<Page>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("cart");
  const [checkoutAddress, setCheckoutAddress] = useState("");
  const [checkoutPhone, setCheckoutPhone] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: products = [] } = useProducts();
  const placeOrder = usePlaceOrder();
  const { identity, clear } = useInternetIdentity();

  const totalItems = cart.reduce((sum, item) => sum + item.packs, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + Number(item.product.pricePerCap) * 2 * item.packs,
    0,
  );

  const addToCart = useCallback((product: Product, packs = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, packs: i.packs + packs } : i,
        );
      }
      return [...prev, { product, packs }];
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
      setCheckoutStep("cart");
      toast.success("Order placed successfully! 🎉");
    } catch {
      setOrderError(true);
      toast.error("Failed to place order. Please try again.");
    }
  };

  const buildOrderMessage = () => {
    const lines = cart.map(
      (item) =>
        `• ${item.product.emoji} ${item.product.name} — ${item.packs} pack${item.packs !== 1 ? "s" : ""} (₹${Number(item.product.pricePerCap) * 2 * item.packs})`,
    );
    return [
      "🛒 MARNY Order",
      "",
      ...lines,
      "",
      `Total: ₹${totalPrice}`,
      "",
      `📍 Delivery Address: ${checkoutAddress}`,
      `📞 Phone: ${checkoutPhone}`,
    ].join("\n");
  };

  const whatsappUrl = () => {
    const msg = encodeURIComponent(buildOrderMessage());
    return `https://wa.me/91XXXXXXXXXX?text=${msg}`;
  };

  const emailUrl = () => {
    const subject = encodeURIComponent("MARNY Order");
    const body = encodeURIComponent(buildOrderMessage());
    return `mailto:orders@marny.in?subject=${subject}&body=${body}`;
  };

  const handleViewProduct = useCallback((product: Product) => {
    setSelectedProduct(product);
    setPage("product");
  }, []);

  useEffect(() => {
    if (cartOpen) {
      setOrderSuccess(false);
      setOrderError(false);
      setCheckoutStep("cart");
      setCheckoutAddress("");
      setCheckoutPhone("");
    }
  }, [cartOpen]);

  const shortPrincipal = identity
    ? `${identity.getPrincipal().toString().slice(0, 8)}...`
    : null;

  const canConfirmOrder =
    checkoutAddress.trim().length > 0 && checkoutPhone.trim().length > 0;

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
            <button
              type="button"
              data-ocid="nav.faq.link"
              className="text-sm font-semibold text-foreground/70 hover:text-primary transition-colors"
              onClick={() => setPage("faq")}
            >
              FAQ
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
          <div className="flex items-center gap-2">
            {identity ? (
              <div className="hidden md:flex items-center gap-2">
                <div className="flex items-center gap-2 bg-muted/60 rounded-full px-3 py-1.5 text-xs font-mono text-muted-foreground">
                  <User className="h-3 w-3" />
                  {shortPrincipal}
                </div>
                <Button
                  data-ocid="nav.logout.button"
                  variant="outline"
                  size="sm"
                  className="rounded-full gap-1.5 text-xs border-destructive/30 text-destructive hover:bg-destructive/5 hover:border-destructive"
                  onClick={clear}
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                data-ocid="nav.login.button"
                variant="outline"
                size="sm"
                className="hidden md:flex rounded-full gap-1.5 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary"
                onClick={() => setPage("login")}
              >
                <LogIn className="h-3.5 w-3.5" />
                Login
              </Button>
            )}
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
            {/* Hamburger button - mobile only */}
            <Button
              data-ocid="nav.mobile_menu.button"
              variant="ghost"
              size="icon"
              className="flex md:hidden rounded-full"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-white/95 backdrop-blur-md px-4 py-3 flex flex-col gap-1">
            <button
              type="button"
              data-ocid="nav.mobile.flavours.link"
              className="text-left w-full px-3 py-2 rounded-lg text-sm font-semibold text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors"
              onClick={() => {
                setPage("flavours");
                setMobileMenuOpen(false);
              }}
            >
              Flavours
            </button>
            <button
              type="button"
              data-ocid="nav.mobile.faq.link"
              className="text-left w-full px-3 py-2 rounded-lg text-sm font-semibold text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors"
              onClick={() => {
                setPage("faq");
                setMobileMenuOpen(false);
              }}
            >
              FAQ
            </button>
          </div>
        )}
      </header>

      {/* Page content */}
      <AnimatePresence mode="wait">
        {page === "login" ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoginPage
              onBack={() => setPage("home")}
              onSuccess={() => setPage("home")}
            />
          </motion.div>
        ) : page === "product" && selectedProduct ? (
          <motion.div
            key="product"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProductDetailPage
              product={selectedProduct}
              onBack={() => setPage("flavours")}
              addToCart={(product, packs) => {
                addToCart(product, packs);
                setPage("flavours");
              }}
            />
          </motion.div>
        ) : page === "flavours" ? (
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
              onViewProduct={handleViewProduct}
            />
          </motion.div>
        ) : page === "faq" ? (
          <motion.div
            key="faq"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FAQPage onBack={() => setPage("home")} />
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
                      The world&#39;s first twist-to-release powder drink cap.
                      Eco-friendly, one-time use, and bursting with 10
                      incredible flavors.
                    </p>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            aria-label="star"
                            role="img"
                            className={`h-5 w-5 ${star <= 4 ? "text-yellow-400" : "text-yellow-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <title>star</title>
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        4.8
                      </span>
                      <span className="text-sm text-muted-foreground">
                        (Rated by customers)
                      </span>
                    </div>
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
                      At MARNY, we believe great taste shouldn&#39;t cost the
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
                <div className="font-display text-3xl font-black text-white">
                  MARNY
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
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center gap-3">
                  {checkoutStep === "checkout" && (
                    <Button
                      data-ocid="checkout.back.button"
                      variant="ghost"
                      size="icon"
                      className="rounded-full -ml-2"
                      onClick={() => setCheckoutStep("cart")}
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                  )}
                  <h2 className="font-display text-2xl font-bold">
                    {checkoutStep === "checkout" ? "Checkout" : "Your Cart"}
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setCartOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Empty cart */}
              {cart.length === 0 && checkoutStep === "cart" ? (
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
              ) : checkoutStep === "cart" ? (
                /* Cart items view */
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
                    <Button
                      data-ocid="cart.submit_button"
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl h-12 text-base shadow-fruit"
                      onClick={() => setCheckoutStep("checkout")}
                    >
                      Checkout — ₹{totalPrice}
                    </Button>
                  </div>
                </>
              ) : (
                /* Checkout form */
                <>
                  <ScrollArea className="flex-1">
                    <div className="p-6 space-y-6">
                      {/* Order summary */}
                      <div className="bg-muted/40 rounded-2xl p-4 space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                          Order Summary
                        </p>
                        {cart.map((item) => (
                          <div
                            key={item.product.id.toString()}
                            className="flex justify-between items-center text-sm"
                          >
                            <span className="text-foreground">
                              {item.product.emoji} {item.product.name}{" "}
                              <span className="text-muted-foreground">
                                ×{item.packs}
                              </span>
                            </span>
                            <span className="font-semibold">
                              ₹
                              {Number(item.product.pricePerCap) *
                                2 *
                                item.packs}
                            </span>
                          </div>
                        ))}
                        <Separator className="my-2" />
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-foreground">
                            Total
                          </span>
                          <span className="font-display text-xl font-black text-primary">
                            ₹{totalPrice}
                          </span>
                        </div>
                      </div>

                      {/* Delivery details form */}
                      <div className="space-y-4">
                        <p className="text-sm font-semibold text-foreground">
                          Delivery Details
                        </p>
                        <div className="space-y-2">
                          <Label
                            htmlFor="checkout-address"
                            className="text-sm font-medium"
                          >
                            Delivery Address
                          </Label>
                          <Textarea
                            data-ocid="checkout.address.textarea"
                            id="checkout-address"
                            placeholder="Enter your full delivery address..."
                            value={checkoutAddress}
                            onChange={(e) => setCheckoutAddress(e.target.value)}
                            className="rounded-xl resize-none min-h-[90px]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="checkout-phone"
                            className="text-sm font-medium"
                          >
                            Phone Number
                          </Label>
                          <Input
                            data-ocid="checkout.phone.input"
                            id="checkout-phone"
                            type="tel"
                            placeholder="e.g. +91 98765 43210"
                            value={checkoutPhone}
                            onChange={(e) => setCheckoutPhone(e.target.value)}
                            className="rounded-xl"
                          />
                        </div>
                      </div>

                      {/* Contact us section */}
                      <div className="space-y-3">
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3">
                          <p className="text-xs text-amber-800 text-center leading-relaxed">
                            You can also confirm your order directly with us via
                            WhatsApp or email.
                          </p>
                        </div>
                        <a
                          data-ocid="checkout.whatsapp.button"
                          href={whatsappUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full h-11 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-2xl text-sm transition-colors"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Order via WhatsApp
                        </a>
                        <a
                          data-ocid="checkout.email.button"
                          href={emailUrl()}
                          className="flex items-center justify-center gap-2 w-full h-11 border-2 border-border text-foreground font-semibold rounded-2xl text-sm hover:bg-muted/50 transition-colors"
                        >
                          <Mail className="h-4 w-4" />
                          Order via Email
                        </a>
                      </div>

                      {/* Status messages */}
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
                    </div>
                  </ScrollArea>

                  <div className="p-6 border-t">
                    <Button
                      data-ocid="checkout.confirm.submit_button"
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl h-12 text-base shadow-fruit disabled:opacity-50"
                      onClick={handlePlaceOrder}
                      disabled={placeOrder.isPending || !canConfirmOrder}
                    >
                      {placeOrder.isPending ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Placing Order...
                        </span>
                      ) : (
                        `Confirm Order — ₹${totalPrice}`
                      )}
                    </Button>
                    {!canConfirmOrder && (
                      <p className="text-xs text-muted-foreground text-center mt-2">
                        Please fill in your address and phone number to
                        continue.
                      </p>
                    )}
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
