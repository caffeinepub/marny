import Array "mo:core/Array";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";

actor {
  type Product = {
    id : Nat;
    name : Text;
    emoji : Text;
    description : Text;
    pricePerCap : Nat; // in INR paise
  };

  type Order = {
    orderId : Nat;
    user : Principal;
    productId : Nat;
    quantity : Nat; // packs of 2
    totalPrice : Nat;
  };

  let products = Map.empty<Nat, Product>();
  let orders = Map.empty<Nat, Order>();
  var nextOrderId = 1;

  // Initialize products
  public shared ({ caller }) func initialize() : async () {
    let productList = [
      {
        id = 1;
        name = " lime";
        emoji = "🟩";
        description = "Refreshing lime flavor bursting with citrus goodness.";
        pricePerCap = 4999;
      },
      {
        id = 2;
        name = "blueberry";
        emoji = "🍇";
        description = "Sweet and tangy blueberry infusion.";
        pricePerCap = 4999;
      },
      {
        id = 3;
        name = "mango";
        emoji = "🥭";
        description = "Tropical mango fusion with smooth sweetness.";
        pricePerCap = 5499;
      },
      {
        id = 4;
        name = "classic cola";
        emoji = "🥤";
        description = "Fizzy and refreshing cola experience.";
        pricePerCap = 4999;
      },
      {
        id = 5;
        name = "orange zest";
        emoji = "🍊";
        description = "Citrusy orange with a hint of zing.";
        pricePerCap = 4999;
      },
      {
        id = 6;
        name = "strawberry";
        emoji = "🍓";
        description = "Delicious strawberry treat for all ages.";
        pricePerCap = 4999;
      },
      {
        id = 7;
        name = "mint twist";
        emoji = "🌱";
        description = "Cool and refreshing mint sensation.";
        pricePerCap = 5499;
      },
      {
        id = 8;
        name = "grape blast";
        emoji = "🍇";
        description = "Intense grape flavor for a fruity kick.";
        pricePerCap = 4999;
      },
      {
        id = 9;
        name = "apple sparkle";
        emoji = "🍏";
        description = "Crisp apple goodness with bubbles.";
        pricePerCap = 4999;
      },
      {
        id = 10;
        name = "coffee rush";
        emoji = "☕";
        description = "Bold coffee infusion for energy boost.";
        pricePerCap = 5499;
      },
    ];

    for (product in productList.values()) {
      products.add(product.id, product);
    };
  };

  // Query all products
  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  // Place an order
  public shared ({ caller }) func placeOrder(productId : Nat, quantity : Nat) : async Nat {
    if (quantity == 0) {
      Runtime.trap("Quantity must be at least 1");
    };

    let product = switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?p) { p };
    };

    let totalPrice = product.pricePerCap * quantity;

    let order : Order = {
      orderId = nextOrderId;
      user = caller;
      productId;
      quantity;
      totalPrice;
    };

    orders.add(nextOrderId, order);
    let currentOrderId = nextOrderId;
    nextOrderId += 1;
    currentOrderId;
  };

  // Get orders for a user
  public query ({ caller }) func getUserOrders(user : Principal) : async [Order] {
    orders.values().toArray().filter(func(order) { order.user == user });
  };

  // Get specific order by ID
  public query ({ caller }) func getOrderById(orderId : Nat) : async ?Order {
    orders.get(orderId);
  };
};
