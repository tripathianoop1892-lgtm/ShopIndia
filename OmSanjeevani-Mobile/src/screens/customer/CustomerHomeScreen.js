import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "./CustomerHomeScreenStyles";

import AppHeader from "../../components/headers/AppHeader";
import SearchBar from "../../components/common/SearchBar";

import {
  MedicinesList,
  addToCart,
  getCart,
} from "../../services/api";

export default function CustomerHomeScreen({
  navigation,
  route,
}) {
  const shopId = route?.params?.shopId || "Not Selected";
  const [medicines, setMedicines] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [selectedQuantities, setSelectedQuantities] =
  useState({});
  // ==========================================
  // Fetch Dashboard Data
  // ==========================================

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      await Promise.all([
        fetchMarketplaceStock(),
        fetchCurrentBasket(),
      ]);
    } catch (error) {
      console.error(
        "Customer dashboard loading error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Fetch Medicines
  // ==========================================

  const fetchMarketplaceStock = async () => {
    try {
      const data = await MedicinesList();

      setMedicines(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "Error loading marketplace catalog:",
        error
      );

      setMedicines([]);
    }
  };

  // ==========================================
  // Fetch Cart
  // ==========================================

  const fetchCurrentBasket = async () => {
    try {
      const res = await getCart();

      if (res?.success) {
        setCartItems(
          Array.isArray(res.cart)
            ? res.cart
            : []
        );
      }
    } catch (error) {
      console.error(
        "Error loading cart:",
        error
      );

      setCartItems([]);
    }
  };

  // ==========================================
  // Add Medicine To Cart
  // ==========================================

  const handleAddProductToCart = async (
    medicine
  ) => {
    try {
      setCartLoading(true);

      const sellerId =
        typeof medicine.ownerId === "object"
          ? medicine.ownerId?._id
          : medicine.ownerId;

      const finalCustomerPrice = Number(
        medicine.retailPrice ||
          medicine.price ||
          medicine.mrp ||
          0
      );

      if (!sellerId) {
        Alert.alert(
          "Seller Missing",
          "Seller details are missing. Please refresh the catalog and try again."
        );

        return;
      }

 const payload = {
  medicineId: medicine._id,
  name: medicine.name,
  company: medicine.company || "",
  price: finalCustomerPrice,
  image: medicine.image || "",
  quantity:
  selectedQuantities[medicine._id] || 1,

  sellingUnit:
    medicine.sellingUnit || "Pack",

  individualSaleAllowed:
    medicine.individualSaleAllowed === true,

  packSize:
    Number(medicine.packSize) || 1,

  sellerId,
};

      const res =
        await addToCart(payload);

      if (res?.success) {
        setCartItems(
          Array.isArray(res.cart)
            ? res.cart
            : []
        );

        Alert.alert(
          "Added to Cart",
          `${medicine.name} added to your basket successfully.`
        );
      } else {
        Alert.alert(
          "Unable to Add",
          res?.message ||
            "Failed to add product to cart."
        );
      }
    } catch (error) {
      console.error(
        "Add to cart error:",
        error
      );

      Alert.alert(
        "Error",
        "Network error. Failed to add product to cart."
      );
    } finally {
      setCartLoading(false);
    }
  };

  // ==========================================
  // Search
  // ==========================================

  const filteredMedicines =
    medicines.filter((medicine) =>
      medicine.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // ==========================================
  // Dashboard Calculations
  // ==========================================

  const customerTotalMedsCount =
    cartItems.length;

  const customerLowStockProcurements =
    cartItems.filter((cartItem) => {
      const marketplaceMatch =
        medicines.find(
          (medicine) =>
            medicine.name ===
            cartItem.name
        );

      return (
        marketplaceMatch &&
        Number(
          marketplaceMatch.stock
        ) > 0 &&
        Number(
          marketplaceMatch.stock
        ) <= 5
      );
    }).length;

  const totalStagedUnits =
    cartItems.reduce(
      (total, item) =>
        total +
        (Number(
          item.quantity
        ) || 0),
      0
    );

  const totalBasketValue =
    cartItems.reduce(
      (total, item) =>
        total +
        (Number(item.price) || 0) *
          (Number(
            item.quantity
          ) || 0),
      0
    );

  // ==========================================
  // Cart Quantity Helper
  // ==========================================

  const getCartQuantity = (
    medicine
  ) => {
    const sellerId =
      typeof medicine.ownerId ===
      "object"
        ? medicine.ownerId?._id
        : medicine.ownerId;

    const cartMatch =
      cartItems.find(
        (item) =>
          item.medicineId ===
            medicine._id ||
          (item.name ===
            medicine.name &&
            item.sellerId ===
              sellerId)
      );

    return cartMatch
      ? Number(
          cartMatch.quantity || 0
        )
      : 0;
  };

  // ==========================================
  // Medicine Card
  // ==========================================

  const renderMedicineCard = (
    medicine
  ) => {
    const isOutOfStock =
      Number(
        medicine.stock || 0
      ) <= 0;

    const displayMRP = Number(
      medicine.mrp || 0
    );

    const finalCustomerPrice =
      Number(
        medicine.retailPrice ||
          medicine.price ||
          medicine.mrp ||
          0
      );

    const computedDiscount =
      displayMRP >
        finalCustomerPrice &&
      displayMRP > 0
        ? Math.round(
            ((displayMRP -
              finalCustomerPrice) /
              displayMRP) *
              100
          )
        : 0;

    const quantityInCart =
      getCartQuantity(
        medicine
      );

    return (
      <View
        key={medicine._id}
        style={styles.medicineCard}
      >
        {/* Medicine Image */}

        <View
          style={
            styles.imageContainer
          }
        >
          {medicine.image ? (
            <Image
              source={{
                uri: medicine.image,
              }}
              style={
                styles.medicineImage
              }
              resizeMode="contain"
            />
          ) : (
            <View
              style={
                styles.imagePlaceholder
              }
            >
              <Ionicons
                name="medical-outline"
                size={45}
                color="#2E7D32"
              />

              <Text
                style={
                  styles.placeholderText
                }
              >
                No Image
              </Text>
            </View>
          )}
        </View>

        {/* Medicine Body */}

        <View
          style={
            styles.medicineBody
          }
        >
          {/* Name + Stock */}

          <View
            style={
              styles.titleRow
            }
          >
            <Text
              style={
                styles.medicineName
              }
              numberOfLines={2}
            >
              {medicine.name}
            </Text>

            <View
              style={[
                styles.stockDot,
                {
                  backgroundColor:
                    isOutOfStock
                      ? "#E53935"
                      : "#2E7D32",
                },
              ]}
            />
          </View>

          {/* Company */}

          <Text
            style={
              styles.company
            }
          >
            {medicine.company ||
              "Generic Manufacturer"}
          </Text>

          {/* Specifications */}

          <View
            style={
              styles.specifications
            }
          >
            <View
              style={styles.specRow}
            >
              <Text
                style={
                  styles.specLabel
                }
              >
                Strength
              </Text>

              <Text
                style={
                  styles.specValue
                }
              >
                {medicine.strength ||
                  "N/A"}
              </Text>
            </View>

            <View
              style={styles.specRow}
            >
              <Text
                style={
                  styles.specLabel
                }
              >
                Packaging
              </Text>

              <Text
                style={
                  styles.specValue
                }
              >
                {medicine.packSize ||
                  10}{" "}
                Units /{" "}
                {medicine.packType ||
                  "Strip"}
              </Text>
            </View>

            <View
              style={styles.specRow}
            >
              <Text
                style={
                  styles.specLabel
                }
              >
                Classification
              </Text>

              <Text
                style={
                  styles.specValue
                }
              >
                {medicine.type ||
                  "Tablet"}
              </Text>
            </View>
          </View>

          {/* Price */}

          <View
            style={
              styles.priceRow
            }
          >
            <View>
              {computedDiscount >
              0 ? (
                <Text
                  style={
                    styles.mrpText
                  }
                >
                  MRP:{" "}
                  <Text
                    style={
                      styles.mrpStrike
                    }
                  >
                    ₹
                    {displayMRP}
                  </Text>
                </Text>
              ) : null}

              <Text
                style={
                  styles.priceText
                }
              >
                Price:{" "}
                <Text
                  style={
                    styles.priceValue
                  }
                >
                  ₹
                  {finalCustomerPrice}
                </Text>
              </Text>
            </View>

            {computedDiscount >
              0 && (
              <View
                style={
                  styles.discountBadge
                }
              >
                <Text
                  style={
                    styles.discountText
                  }
                >
                  -{computedDiscount}%
                </Text>
              </View>
            )}
          </View>
        </View>
     
        {/* Individual Quantity Selector */}

{medicine.individualSaleAllowed === true && (
  <View style={styles.quantityContainer}>
    
    <Text style={styles.quantityLabel}>
      Quantity ({medicine.sellingUnit || "Unit"})
    </Text>

    <View style={styles.quantityControls}>

      <TouchableOpacity
        style={styles.quantityButton}
        disabled={
          (selectedQuantities[medicine._id] || 1) <= 1
        }
        onPress={() => {
          const currentQuantity =
            selectedQuantities[medicine._id] || 1;

          setSelectedQuantities((prev) => ({
            ...prev,
            [medicine._id]:
              Math.max(1, currentQuantity - 1),
          }));
        }}
      >
        <Ionicons
          name="remove"
          size={20}
          color="#2E7D32"
        />
      </TouchableOpacity>

      <Text style={styles.quantityValue}>
        {selectedQuantities[medicine._id] || 1}
      </Text>

      <TouchableOpacity
        style={styles.quantityButton}
        disabled={
          (selectedQuantities[medicine._id] || 1) >=
          Number(medicine.stock || 0)
        }
        onPress={() => {
          const currentQuantity =
            selectedQuantities[medicine._id] || 1;

          const maxStock =
            Number(medicine.stock || 0);

          setSelectedQuantities((prev) => ({
            ...prev,
            [medicine._id]:
              Math.min(
                maxStock,
                currentQuantity + 1
              ),
          }));
        }}
      >
        <Ionicons
          name="add"
          size={20}
          color="#2E7D32"
        />
      </TouchableOpacity>

    </View>
  </View>
)}
        {/* Add To Basket */}

        <TouchableOpacity
          style={[
            styles.addButton,
            quantityInCart > 0 &&
              styles.addButtonActive,
            isOutOfStock &&
              styles.addButtonDisabled,
          ]}
          disabled={
            isOutOfStock ||
            cartLoading
          }
          onPress={() =>
            handleAddProductToCart(
              medicine
            )
          }
        >
          {cartLoading ? (
            <ActivityIndicator
              size="small"
              color="#FFFFFF"
            />
          ) : (
            <>
              <Ionicons
                name="cart-outline"
                size={19}
                color="#FFFFFF"
              />

              <Text
                style={
                  styles.addButtonText
                }
              >
                {quantityInCart > 0
                  ? `In Cart (${quantityInCart})`
                  : isOutOfStock
                  ? "Out of Stock"
                  : "Add to Basket"}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  // ==========================================
  // Main Screen
  // ==========================================

  return (
    <SafeAreaView
      style={styles.container}
    >
      <AppHeader
  title="Pharmacy Marketplace"
  showBackButton={false}
  onBackPress={() => {}}
  onMenuPress={() => navigation.openDrawer()}
/>

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.content
        }
      >
        {/* ====================================
            Header
        ===================================== */}

        <View
          style={
            styles.marketplaceHeader
          }
        >
          <View>
            <Text
              style={
                styles.dashboardTitle
              }
            >
              Pharmacy Marketplace
            </Text>

            <View
              style={
                styles.shopIdContainer
              }
            >
              <Ionicons
                name="business-outline"
                size={16}
                color="#2E7D32"
              />

              <Text
               style={styles.shopIdText}
                >
                   SHOP ID: {shopId}
                   </Text>
            </View>
          </View>
        </View>

        {/* ====================================
            Search
        ===================================== */}

       <SearchBar
    value={search}
    onChangeText={setSearch}
    placeholder="Search medicines..."
    />

        {/* ====================================
            Statistics
        ===================================== */}

        <View
          style={
            styles.statsContainer
          }
        >
          {/* Total Medicines */}

          <View
            style={
              styles.statCard
            }
          >
            <View
              style={
                styles.statIconBox
              }
            >
              <Ionicons
                name="medkit-outline"
                size={22}
                color="#2E7D32"
              />
            </View>

            <Text
              style={
                styles.statTitle
              }
            >
              Total Medicines
            </Text>

            <Text
              style={
                styles.statValue
              }
            >
              {customerTotalMedsCount}
            </Text>

            <Text
              style={
                styles.statSubtitle
              }
            >
              Items in cart
            </Text>
          </View>

          {/* Low Stock */}

          <View
            style={
              styles.statCard
            }
          >
            <View
              style={
                styles.statIconBox
              }
            >
              <Ionicons
                name="warning-outline"
                size={22}
                color="#F57C00"
              />
            </View>

            <Text
              style={
                styles.statTitle
              }
            >
              Low Stock Alerts
            </Text>

            <Text
              style={
                styles.statValue
              }
            >
              {
                customerLowStockProcurements
              }
            </Text>

            <Text
              style={
                styles.statSubtitle
              }
            >
              Low availability
            </Text>
          </View>

          {/* Total Quantity */}

          <View
            style={
              styles.statCard
            }
          >
            <View
              style={
                styles.statIconBox
              }
            >
              <Ionicons
                name="cube-outline"
                size={22}
                color="#1565C0"
              />
            </View>

            <Text
              style={
                styles.statTitle
              }
            >
              Total Quantity
            </Text>

            <Text
              style={
                styles.statValue
              }
            >
              {totalStagedUnits}
            </Text>

            <Text
              style={
                styles.statSubtitle
              }
            >
              Package volume
            </Text>
          </View>

          {/* Cart Value */}

          <View
            style={
              styles.statCard
            }
          >
            <View
              style={
                styles.statIconBox
              }
            >
              <Ionicons
                name="cash-outline"
                size={22}
                color="#7B1FA2"
              />
            </View>

            <Text
              style={
                styles.statTitle
              }
            >
              Total Cart Value
            </Text>

            <Text
              style={
                styles.statValue
              }
            >
              ₹
              {totalBasketValue.toLocaleString(
                "en-IN"
              )}
            </Text>

            <Text
              style={
                styles.statSubtitle
              }
            >
              Estimated value
            </Text>
          </View>
        </View>

        {/* ====================================
            Procurement Banner
        ===================================== */}

        <View
          style={
            styles.promoBanner
          }
        >
          <Ionicons
            name="cart-outline"
            size={36}
            color="#2E7D32"
          />

          <View
            style={
              styles.promoContent
            }
          >
            <Text
              style={
                styles.promoBadge
              }
            >
              B2C RETAIL PHARMACY
            </Text>

            <Text
              style={
                styles.promoTitle
              }
            >
              Inventory Procurement
            </Text>

            <Text
              style={
                styles.promoSubtitle
              }
            >
              Real-time medicines available
              from connected pharmacies.
            </Text>
          </View>

          <TouchableOpacity
            style={
              styles.historyButton
            }
            onPress={() =>
              navigation.navigate(
                "Orders"
              )
            }
          >
            <Text
              style={
                styles.historyButtonText
              }
            >
              Orders
            </Text>
          </TouchableOpacity>
        </View>

        {/* ====================================
            Loading
        ===================================== */}

        {loading ? (
          <View
            style={
              styles.loadingContainer
            }
          >
            <ActivityIndicator
              size="large"
              color="#2E7D32"
            />

            <Text
              style={
                styles.loadingText
              }
            >
              Loading medicines...
            </Text>
          </View>
        ) : (
          <>
            {/* ==================================
                Catalog Header
            =================================== */}

            <View
              style={
                styles.catalogHeader
              }
            >
              <Text
                style={
                  styles.catalogTitle
                }
              >
                Available Medicines
              </Text>

              <Text
                style={
                  styles.catalogCount
                }
              >
                {filteredMedicines.length}{" "}
                items
              </Text>
            </View>

            {/* ==================================
                Empty Catalog
            =================================== */}

            {filteredMedicines.length ===
            0 ? (
              <View
                style={
                  styles.emptyContainer
                }
              >
                <Ionicons
                  name="medical-outline"
                  size={60}
                  color="#CCCCCC"
                />

                <Text
                  style={
                    styles.emptyTitle
                  }
                >
                  No Inventory Matches
                </Text>

                <Text
                  style={
                    styles.emptySubtitle
                  }
                >
                  No medicines match your
                  search.
                </Text>
              </View>
            ) : (
              /* ==================================
                  Medicine Cards
              =================================== */

              filteredMedicines.map(
                renderMedicineCard
              )
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}