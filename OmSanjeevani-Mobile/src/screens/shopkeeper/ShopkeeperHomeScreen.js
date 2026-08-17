import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "./ShopkeeperHomeScreenStyles";

import AppHeader from "../../components/headers/AppHeader";

import {
  MedicinesList,
  getOrders,
  addToCart,
} from "../../services/api";

// ==========================================
// Shopkeeper Dashboard
// ==========================================

export default function ShopkeeperHomeScreen({
  navigation,
}) {
  const [medicines, setMedicines] = useState([]);
  const [orders, setOrders] = useState([]);

  const [selectedDistributor, setSelectedDistributor] =
    useState(null);

  const [search, setSearch] = useState("");
  const [medSearch, setMedSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);

  // ==========================================
  // Fetch Dashboard Data
  // ==========================================

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const [medData, orderData] =
        await Promise.all([
          MedicinesList(),
          getOrders("b2b-purchases"),
        ]);

      setMedicines(
        Array.isArray(medData)
          ? medData
          : []
      );

      setOrders(
        Array.isArray(orderData)
          ? orderData
          : []
      );
    } catch (error) {
      console.error(
        "Error fetching B2B procurement dashboard:",
        error
      );

      setMedicines([]);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ==========================================
  // Extract Unique Distributors
  // ==========================================

  const distributors = useMemo(() => {
    const distributorMap = new Map();

    medicines.forEach((medicine) => {
      const rawOwnerId =
        medicine.ownerId &&
        typeof medicine.ownerId === "object"
          ? medicine.ownerId._id
          : medicine.ownerId;

      if (
        rawOwnerId &&
        medicine.ownerRole === "distributor"
      ) {
        if (!distributorMap.has(rawOwnerId)) {
          const resolvedName =
            (
              medicine.ownerId &&
              typeof medicine.ownerId ===
                "object" &&
              medicine.ownerId.name
            ) ||
            medicine.ownerName ||
            medicine.distributorName ||
            medicine.owner?.name ||
            `Distributor (${String(
              rawOwnerId
            ).slice(-6)})`;

          distributorMap.set(
            rawOwnerId,
            {
              id: rawOwnerId,
              role: medicine.ownerRole,
              name: resolvedName,
            }
          );
        }
      }
    });

    return Array.from(
      distributorMap.values()
    );
  }, [medicines]);

  // ==========================================
  // Search Distributors
  // ==========================================

  const filteredDistributors =
    useMemo(() => {
      const query = search
        .toLowerCase()
        .trim();

      return distributors.filter(
        (distributor) =>
          distributor.name
            .toLowerCase()
            .includes(query)
      );
    }, [distributors, search]);

  // ==========================================
  // Medicines Of Selected Distributor
  // ==========================================

  const filteredMedicines =
    useMemo(() => {
      if (!selectedDistributor) {
        return [];
      }

      const query = medSearch
        .toLowerCase()
        .trim();

      return medicines.filter(
        (medicine) => {
          const rawOwnerId =
            medicine.ownerId &&
            typeof medicine.ownerId ===
              "object"
              ? medicine.ownerId._id
              : medicine.ownerId;

          const matchesDistributor =
            rawOwnerId ===
              selectedDistributor.id &&
            medicine.ownerRole ===
              "distributor";

          const matchesSearch =
            !query ||
            medicine.name
              ?.toLowerCase()
              .includes(query);

          return (
            matchesDistributor &&
            matchesSearch
          );
        }
      );
    }, [
      medicines,
      selectedDistributor,
      medSearch,
    ]);

  // ==========================================
  // Dashboard Metrics
  // ==========================================

  const metrics = useMemo(() => {
    const validProcurements =
      orders.filter(
        (order) =>
          order.status === "Approved" ||
          order.status === "Delivered" ||
          order.status === "Pending"
      );

    return {
      totalMedicines:
        medicines.filter(
          (medicine) =>
            medicine.ownerRole ===
            "distributor"
        ).length,

      lowStock:
        medicines.filter(
          (medicine) =>
            medicine.ownerRole ===
              "distributor" &&
            Number(medicine.stock) <= 20
        ).length,

      expenses:
        validProcurements.reduce(
          (sum, order) =>
            sum +
            Number(
              order.totalAmount ||
                order.total ||
                0
            ),
          0
        ),
    };
  }, [medicines, orders]);

  // ==========================================
  // Order Supplies
  // ==========================================

  const buyMedicine = async (
    medicine
  ) => {
    try {
      setOrderLoading(true);

      const rawOwnerId =
        medicine.ownerId &&
        typeof medicine.ownerId ===
          "object"
          ? medicine.ownerId._id
          : medicine.ownerId;

      const payload = {
        medicineId: medicine._id,

        name: medicine.name,

        company:
          medicine.company || "",

        ownerId: rawOwnerId,

        ownerRole:
          medicine.ownerRole,

        type:
          medicine.type || "",

        price:
          Number(
            medicine.offerPrice ||
              medicine.price ||
              0
          ),

        quantity: 1,

        image:
          medicine.image || "",

        strength:
          medicine.strength || "",

        packSize:
          medicine.packSize || 10,

        expiry:
          medicine.expiry ||
          "2027-12-31",
      };

      const res =
        await addToCart(payload);

      if (
        res?.success ||
        res?._id ||
        res?.message === undefined
      ) {
        Alert.alert(
          "Procurement Cart",
          `${medicine.name} added to procurement cart successfully.`
        );
      } else {
        Alert.alert(
          "Unable to Add",
          res?.message ||
            "Failed to add item to procurement cart."
        );
      }
    } catch (error) {
      console.error(
        "Procurement cart error:",
        error
      );

      Alert.alert(
        "Error",
        "Network error. Failed to contact supply cart service."
      );
    } finally {
      setOrderLoading(false);
    }
  };

  // ==========================================
  // Select Distributor
  // ==========================================

  const handleSelectDistributor = (
    distributor
  ) => {
    setSelectedDistributor(
      distributor
    );

    setMedSearch("");
  };

  // ==========================================
  // Loading Screen
  // ==========================================

  if (loading) {
    return (
      <SafeAreaView
        style={styles.container}
      >
        <AppHeader
          title="Shopkeeper Dashboard"
          showBackButton={false}
        />

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
            style={styles.loadingText}
          >
            Loading procurement data...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // ==========================================
  // Main Dashboard
  // ==========================================

  return (
    <SafeAreaView
      style={styles.container}
    >
      <AppHeader
        title="Shopkeeper Dashboard"
        showBackButton={false}
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
            Dashboard Header
        ===================================== */}

        <View
          style={
            styles.dashboardHeader
          }
        >
          <View
            style={
              styles.headerContent
            }
          >
            <Text
              style={
                styles.dashboardTitle
              }
            >
              🏪 Shopkeeper Dashboard
            </Text>

            <Text
              style={
                styles.dashboardSubtitle
              }
            >
              Select a verified distributor
              to source supply inventory.
            </Text>
          </View>

          <TouchableOpacity
            style={
              styles.historyBadge
            }
            onPress={() =>
              navigation.navigate(
                "ShopkeeperOrders"
              )
            }
          >
            <Ionicons
              name="receipt-outline"
              size={16}
              color="#2E7D32"
            />

            <Text
              style={
                styles.historyText
              }
            >
              {orders.length} Orders
            </Text>
          </TouchableOpacity>
        </View>

        {/* ====================================
            Statistics
        ===================================== */}

        <View
          style={
            styles.statsContainer
          }
        >
          {/* Wholesale Catalog */}

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
                color="#1565C0"
              />
            </View>

            <Text
              style={
                styles.statTitle
              }
            >
              Wholesale Catalog
            </Text>

            <Text
              style={
                styles.statValue
              }
            >
              {
                metrics.totalMedicines
              }
            </Text>

            <Text
              style={
                styles.statSubtitle
              }
            >
              Items
            </Text>
          </View>

          {/* Critical Items */}

          <View
            style={
              styles.statCard
            }
          >
            <View
              style={
                styles.statIconBoxOrange
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
              Critical Items
            </Text>

            <Text
              style={
                styles.statValue
              }
            >
              {metrics.lowStock}
            </Text>

            <Text
              style={
                styles.statSubtitle
              }
            >
              Stock ≤ 20
            </Text>
          </View>

          {/* Verified Distributors */}

          <View
            style={
              styles.statCard
            }
          >
            <View
              style={
                styles.statIconBoxGreen
              }
            >
              <Ionicons
                name="storefront-outline"
                size={22}
                color="#2E7D32"
              />
            </View>

            <Text
              style={
                styles.statTitle
              }
            >
              Distributors
            </Text>

            <Text
              style={
                styles.statValue
              }
            >
              {distributors.length}
            </Text>

            <Text
              style={
                styles.statSubtitle
              }
            >
              Verified firms
            </Text>
          </View>

          {/* Expenses */}

          <View
            style={
              styles.statCard
            }
          >
            <View
              style={
                styles.statIconBoxPurple
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
              Procurement
            </Text>

            <Text
              style={
                styles.statValue
              }
            >
              ₹
              {metrics.expenses.toLocaleString(
                "en-IN"
              )}
            </Text>

            <Text
              style={
                styles.statSubtitle
              }
            >
              Total expenses
            </Text>
          </View>
        </View>

        {/* ====================================
            Procurement Workflow
        ===================================== */}

        <View
          style={
            styles.workflowContainer
          }
        >
          {/* ==================================
              Step 1 - Distributor
          =================================== */}

          <View
            style={
              styles.sectionCard
            }
          >
            <View
              style={
                styles.sectionHeader
              }
            >
              <View>
                <Text
                  style={
                    styles.sectionTitle
                  }
                >
                  🏢 1. Choose Distributor
                </Text>

                <Text
                  style={
                    styles.sectionSubtitle
                  }
                >
                  Select a wholesale supplier
                  to view medicines.
                </Text>
              </View>

              <Ionicons
                name="business-outline"
                size={23}
                color="#2E7D32"
              />
            </View>

            {/* Distributor Search */}

            <View
              style={
                styles.searchContainer
              }
            >
              <Ionicons
                name="search-outline"
                size={19}
                color="#888888"
              />

              <TextInput
                style={
                  styles.searchInput
                }
                placeholder="Filter wholesale firms..."
                placeholderTextColor="#999999"
                value={search}
                onChangeText={
                  setSearch
                }
              />
            </View>

            {/* Distributor List */}

            {filteredDistributors.length ===
            0 ? (
              <View
                style={
                  styles.emptySmall
                }
              >
                <Ionicons
                  name="business-outline"
                  size={35}
                  color="#CCCCCC"
                />

                <Text
                  style={
                    styles.emptySmallText
                  }
                >
                  No verified distributors
                  found.
                </Text>
              </View>
            ) : (
              filteredDistributors.map(
                (distributor) => {
                  const isSelected =
                    selectedDistributor
                      ?.id ===
                    distributor.id;

                  return (
                    <TouchableOpacity
                      key={
                        distributor.id
                      }
                      style={[
                        styles.distributorItem,
                        isSelected &&
                          styles.distributorItemActive,
                      ]}
                      onPress={() =>
                        handleSelectDistributor(
                          distributor
                        )
                      }
                    >
                      <View
                        style={[
                          styles.distributorAvatar,
                          isSelected &&
                            styles.distributorAvatarActive,
                        ]}
                      >
                        <Ionicons
                          name="storefront-outline"
                          size={21}
                          color={
                            isSelected
                              ? "#FFFFFF"
                              : "#2E7D32"
                          }
                        />
                      </View>

                      <View
                        style={
                          styles.distributorInfo
                        }
                      >
                        <Text
                          style={
                            styles.distributorName
                          }
                        >
                          {
                            distributor.name
                          }
                        </Text>

                        <Text
                          style={
                            styles.distributorRole
                          }
                        >
                          DISTRIBUTOR
                        </Text>
                      </View>

                      <Ionicons
                        name={
                          isSelected
                            ? "checkmark-circle"
                            : "chevron-forward"
                        }
                        size={22}
                        color={
                          isSelected
                            ? "#2E7D32"
                            : "#AAAAAA"
                        }
                      />
                    </TouchableOpacity>
                  );
                }
              )
            )}
          </View>

          {/* ==================================
              Step 2 - Medicines
          =================================== */}

          <View
            style={
              styles.sectionCard
            }
          >
            {selectedDistributor ? (
              <>
                <View
                  style={
                    styles.sectionHeader
                  }
                >
                  <View
                    style={
                      styles.sectionHeaderText
                    }
                  >
                    <Text
                      style={
                        styles.sectionTitle
                      }
                    >
                      📦 2. Available Stocks
                    </Text>

                    <Text
                      style={
                        styles.selectedDistributor
                      }
                      numberOfLines={1}
                    >
                      {
                        selectedDistributor.name
                      }
                    </Text>
                  </View>

                  <Ionicons
                    name="cube-outline"
                    size={23}
                    color="#2E7D32"
                  />
                </View>

                {/* Medicine Search */}

                <View
                  style={
                    styles.searchContainer
                  }
                >
                  <Ionicons
                    name="search-outline"
                    size={19}
                    color="#888888"
                  />

                  <TextInput
                    style={
                      styles.searchInput
                    }
                    placeholder="Filter medicines..."
                    placeholderTextColor="#999999"
                    value={medSearch}
                    onChangeText={
                      setMedSearch
                    }
                  />
                </View>

                {/* Medicine List */}

                {filteredMedicines.length ===
                0 ? (
                  <View
                    style={
                      styles.emptySmall
                    }
                  >
                    <Ionicons
                      name="medical-outline"
                      size={40}
                      color="#CCCCCC"
                    />

                    <Text
                      style={
                        styles.emptySmallText
                      }
                    >
                      No medicines found
                      for this distributor.
                    </Text>
                  </View>
                ) : (
                  filteredMedicines.map(
                    (medicine) => {
                      const stock =
                        Number(
                          medicine.stock ||
                            0
                        );

                      const isLowStock =
                        stock <= 20;

                      const price =
                        Number(
                          medicine.offerPrice ||
                            medicine.price ||
                            0
                        );

                      return (
                        <View
                          key={
                            medicine._id
                          }
                          style={
                            styles.medicineCard
                          }
                        >
                          {/* Image */}

                          <View
                            style={
                              styles.medicineImageBox
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
                              <Ionicons
                                name="medical-outline"
                                size={38}
                                color="#2E7D32"
                              />
                            )}
                          </View>

                          {/* Details */}

                          <View
                            style={
                              styles.medicineInfo
                            }
                          >
                            <Text
                              style={
                                styles.medicineName
                              }
                              numberOfLines={2}
                            >
                              {
                                medicine.name
                              }
                            </Text>

                            <Text
                              style={
                                styles.medicineCompany
                              }
                            >
                              {medicine.company ||
                                "Generic"}
                            </Text>

                            <View
                              style={
                                styles.medicineMeta
                              }
                            >
                              <Text
                                style={
                                  styles.metaText
                                }
                              >
                                {medicine.strength ||
                                  "500mg"}
                              </Text>

                              <Text
                                style={
                                  styles.metaDivider
                                }
                              >
                                •
                              </Text>

                              <Text
                                style={
                                  styles.metaText
                                }
                              >
                                {medicine.packSize ||
                                  10}{" "}
                                Tabs
                              </Text>
                            </View>

                            {/* Price */}

                            <View
                              style={
                                styles.priceRow
                              }
                            >
                              <Text
                                style={
                                  styles.price
                                }
                              >
                                ₹
                                {price}
                              </Text>

                              {medicine.mrp ? (
                                <Text
                                  style={
                                    styles.mrp
                                  }
                                >
                                  ₹
                                  {
                                    medicine.mrp
                                  }
                                </Text>
                              ) : null}
                            </View>

                            {/* Stock */}

                            <View
                              style={[
                                styles.stockPill,
                                isLowStock
                                  ? styles.stockPillLow
                                  : styles.stockPillNormal,
                              ]}
                            >
                              <View
                                style={[
                                  styles.stockDot,
                                  {
                                    backgroundColor:
                                      isLowStock
                                        ? "#F57C00"
                                        : "#2E7D32",
                                  },
                                ]}
                              />

                              <Text
                                style={[
                                  styles.stockText,
                                  isLowStock
                                    ? styles.stockTextLow
                                    : styles.stockTextNormal,
                                ]}
                              >
                                Available:{" "}
                                {stock}{" "}
                                units
                              </Text>
                            </View>
                          </View>

                          {/* Order Button */}

                          <TouchableOpacity
                            style={
                              styles.buyButton
                            }
                            disabled={
                              orderLoading ||
                              stock <= 0
                            }
                            onPress={() =>
                              buyMedicine(
                                medicine
                              )
                            }
                          >
                            {orderLoading ? (
                              <ActivityIndicator
                                size="small"
                                color="#FFFFFF"
                              />
                            ) : (
                              <>
                                <Ionicons
                                  name="cart-outline"
                                  size={18}
                                  color="#FFFFFF"
                                />

                                <Text
                                  style={
                                    styles.buyButtonText
                                  }
                                >
                                  {stock <= 0
                                    ? "Out of Stock"
                                    : "Order Supplies"}
                                </Text>
                              </>
                            )}
                          </TouchableOpacity>
                        </View>
                      );
                    }
                  )
                )}
              </>
            ) : (
              <View
                style={
                  styles.selectDistributorState
                }
              >
                <Ionicons
                  name="business-outline"
                  size={55}
                  color="#C8E6C9"
                />

                <Text
                  style={
                    styles.selectDistributorTitle
                  }
                >
                  Select a Distributor
                </Text>

                <Text
                  style={
                    styles.selectDistributorText
                  }
                >
                  Choose a verified distributor
                  above to view their available
                  wholesale medicines.
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}