import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
  MedicinesList,
  getOrders,
  addToCart,
} from "../../services/api";

import styles from "./DashboardScreenStyles";

// ==========================================
// SHOPKEEPER DASHBOARD
// ==========================================

export default function DashboardScreen({
  navigation,
}) {
  const [medicines, setMedicines] = useState([]);
  const [orders, setOrders] = useState([]);

  const [selectedDistributor, setSelectedDistributor] =
    useState(null);

  const [search, setSearch] = useState("");
  const [medSearch, setMedSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // ==========================================
  // FETCH DASHBOARD DATA
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
        "Error fetching shopkeeper dashboard:",
        error
      );

      Alert.alert(
        "Error",
        "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ==========================================
  // REFRESH
  // ==========================================

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchData();
    } finally {
      setRefreshing(false);
    }
  };

  // ==========================================
  // EXTRACT DISTRIBUTORS
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
            (
              medicine.owner &&
              medicine.owner.name
            ) ||
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
  // FILTER DISTRIBUTORS
  // ==========================================

  const filteredDistributors =
    useMemo(() => {
      const query =
        search.toLowerCase().trim();

      return distributors.filter(
        (distributor) =>
          distributor.name
            .toLowerCase()
            .includes(query)
      );
    }, [distributors, search]);

  // ==========================================
  // FILTER MEDICINES
  // ==========================================

  const filteredMedicines =
    useMemo(() => {
      if (!selectedDistributor) {
        return [];
      }

      const query =
        medSearch.toLowerCase().trim();

      return medicines.filter((medicine) => {
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
      });
    }, [
      medicines,
      selectedDistributor,
      medSearch,
    ]);

  // ==========================================
  // PROCUREMENT CART
  // ==========================================

  const buyMedicine = async (medicine) => {
    try {
      const rawOwnerId =
        medicine.ownerId &&
        typeof medicine.ownerId === "object"
          ? medicine.ownerId._id
          : medicine.ownerId;

      const response =
        await addToCart({
          medicineId: medicine._id,
          name: medicine.name,
          company: medicine.company,
          ownerId: rawOwnerId,
          ownerRole: medicine.ownerRole,
          type: medicine.type,
          price:
            medicine.offerPrice ||
            medicine.price ||
            0,
          quantity: 1,
          image: medicine.image,
          strength: medicine.strength,
          packSize: medicine.packSize,
          expiry:
            medicine.expiry ||
            "2027-12-31",
        });

      if (
        response?.success ||
        response?._id ||
        response?.message === undefined
      ) {
        Alert.alert(
          "Added",
          `${medicine.name} added to procurement cart.`
        );
      } else {
        Alert.alert(
          "Error",
          response?.message ||
            "Failed to add medicine to cart."
        );
      }
    } catch (error) {
      console.error(
        "Procurement cart error:",
        error
      );

      Alert.alert(
        "Error",
        "Network error. Failed to contact cart service."
      );
    }
  };

  // ==========================================
  // DASHBOARD METRICS
  // ==========================================

  const metrics = useMemo(() => {
    const validProcurements =
      orders.filter(
        (order) =>
          order.status === "Approved" ||
          order.status === "Delivered" ||
          order.status === "Pending"
      );

    const totalMedicines =
      medicines.filter(
        (medicine) =>
          medicine.ownerRole ===
          "distributor"
      ).length;

    const lowStock =
      medicines.filter(
        (medicine) =>
          medicine.ownerRole ===
            "distributor" &&
          Number(medicine.stock) <= 20
      ).length;

    const expenses =
      validProcurements.reduce(
        (sum, order) =>
          sum +
          Number(
            order.totalAmount ||
              order.total ||
              0
          ),
        0
      );

    return {
      totalMedicines,
      lowStock,
      expenses,
    };
  }, [medicines, orders]);

  // ==========================================
  // DISTRIBUTOR ITEM
  // ==========================================

  const renderDistributor = ({
    item,
  }) => {
    const isSelected =
      selectedDistributor?.id ===
      item.id;

    return (
      <TouchableOpacity
        style={[
          styles.distributorItem,
          isSelected &&
            styles.activeDistributorItem,
        ]}
        activeOpacity={0.8}
        onPress={() => {
          setSelectedDistributor(item);
          setMedSearch("");
        }}
      >
        <View
          style={[
            styles.distributorIcon,
            isSelected &&
              styles.activeDistributorIcon,
          ]}
        >
          <Ionicons
            name="storefront-outline"
            size={23}
            color="#008C3A"
          />
        </View>

        <View style={styles.distributorInfo}>
          <Text
            style={styles.distributorName}
            numberOfLines={1}
          >
            {item.name}
          </Text>

          <Text style={styles.distributorRole}>
            VERIFIED {item.role}
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={20}
          color="#777777"
        />
      </TouchableOpacity>
    );
  };

  // ==========================================
  // MEDICINE ITEM
  // ==========================================

  const renderMedicine = ({
    item,
  }) => {
    const price =
      item.offerPrice ||
      item.price ||
      0;

    const isLowStock =
      Number(item.stock) <= 20;

    return (
      <View style={styles.medicineCard}>
        <View style={styles.medicineIcon}>
          <Ionicons
            name="medical-outline"
            size={30}
            color="#008C3A"
          />
        </View>

        <View style={styles.medicineInfo}>
          <Text
            style={styles.medicineName}
            numberOfLines={1}
          >
            {item.name}
          </Text>

          <Text
            style={styles.companyText}
            numberOfLines={1}
          >
            Mfg: {item.company || "N/A"}
          </Text>

          <View style={styles.tagsRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>
                {item.strength || "500mg"}
              </Text>
            </View>

            <View style={styles.tag}>
              <Text style={styles.tagText}>
                {item.packSize || 10} Tabs
              </Text>
            </View>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>
              ₹{price}
            </Text>

            {item.mrp ? (
              <Text style={styles.mrp}>
                ₹{item.mrp}
              </Text>
            ) : null}
          </View>

          <View
            style={[
              styles.stockPill,
              isLowStock
                ? styles.lowStockPill
                : styles.normalStockPill,
            ]}
          >
            <Text
              style={[
                styles.stockText,
                isLowStock
                  ? styles.lowStockText
                  : styles.normalStockText,
              ]}
            >
              Available: {item.stock || 0} units
            </Text>
          </View>

          <TouchableOpacity
            style={styles.buyButton}
            activeOpacity={0.8}
            onPress={() =>
              buyMedicine(item)
            }
          >
            <Ionicons
              name="cart-outline"
              size={18}
              color="#FFFFFF"
            />

            <Text style={styles.buyButtonText}>
              Order Supplies
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#008C3A"
        />

        <Text style={styles.loadingText}>
          Loading Dashboard...
        </Text>
      </View>
    );
  }

  // ==========================================
  // DASHBOARD
  // ==========================================

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#008C3A"]}
          />
        }
      >
        {/* ==================================
            HEADER
        =================================== */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.menuButton}
            activeOpacity={0.8}
            onPress={() => {
            console.log("MENU CLICKED");
            navigation.openDrawer();
            }}
          >
            <Ionicons
              name="menu-outline"
              size={28}
              color="#008C3A"
            />
          </TouchableOpacity>

          <View style={styles.headerInfo}>
            <Text style={styles.title}>
              Shopkeeper Dashboard
            </Text>

            <Text style={styles.subtitle}>
              Select a verified distributor
              to source supply inventory
            </Text>
          </View>

          <View style={styles.orderBadge}>
            <Ionicons
              name="cube-outline"
              size={15}
              color="#008C3A"
            />

            <Text style={styles.orderBadgeText}>
              {orders.length} Orders
            </Text>
          </View>
        </View>

        {/* ==================================
            STATS
        =================================== */}

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statLabel}>
                Wholesale Catalog Stock
              </Text>

              <Ionicons
                name="medical-outline"
                size={22}
                color="#1976D2"
              />
            </View>

            <Text style={styles.statValue}>
              {metrics.totalMedicines}
            </Text>

            <Text style={styles.statUnit}>
              Items
            </Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statLabel}>
                Marketplace Critical Items
              </Text>

              <Ionicons
                name="layers-outline"
                size={22}
                color="#008C3A"
              />
            </View>

            <Text style={styles.statValue}>
              {metrics.lowStock}
            </Text>

            <Text style={styles.statUnit}>
              Low Stock
            </Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statLabel}>
                Verified Distributors
              </Text>

              <Ionicons
                name="storefront-outline"
                size={22}
                color="#F57C00"
              />
            </View>

            <Text style={styles.statValue}>
              {distributors.length}
            </Text>

            <Text style={styles.statUnit}>
              Firms
            </Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statLabel}>
                Procurement Expenses
              </Text>

              <Ionicons
                name="cash-outline"
                size={22}
                color="#8E24AA"
              />
            </View>

            <Text style={styles.statValue}>
              ₹
              {metrics.expenses.toLocaleString(
                "en-IN"
              )}
            </Text>

            <Text style={styles.statUnit}>
              Total
            </Text>
          </View>
        </View>

        {/* ==================================
            WORKFLOW
        =================================== */}

        <View style={styles.workflowContainer}>

          {/* DISTRIBUTORS */}

          <View style={styles.distributorSection}>
            <Text style={styles.sectionTitle}>
              🏢 1. Choose Distributor
            </Text>

            <View style={styles.searchBox}>
              <Ionicons
                name="search-outline"
                size={20}
                color="#777777"
              />

              <TextInput
                style={styles.searchInput}
                placeholder="Filter wholesale firms..."
                placeholderTextColor="#999999"
                value={search}
                onChangeText={setSearch}
              />

              {search.length > 0 && (
                <TouchableOpacity
                  onPress={() =>
                    setSearch("")
                  }
                >
                  <Ionicons
                    name="close-circle"
                    size={19}
                    color="#999999"
                  />
                </TouchableOpacity>
              )}
            </View>

            {filteredDistributors.length ===
            0 ? (
              <View
                style={styles.emptyBox}
              >
                <Ionicons
                  name="storefront-outline"
                  size={40}
                  color="#AAAAAA"
                />

                <Text
                  style={styles.emptyText}
                >
                  No verified distributors
                  found.
                </Text>
              </View>
            ) : (
              <FlatList
                data={
                  filteredDistributors
                }
                renderItem={
                  renderDistributor
                }
                keyExtractor={(item) =>
                  item.id
                }
                scrollEnabled={false}
              />
            )}
          </View>

          {/* MEDICINES */}

          <View style={styles.medicineSection}>
            {selectedDistributor ? (
              <>
                <Text
                  style={styles.sectionTitle}
                >
                  📦 2. Available Stocks
                </Text>

                <Text
                  style={styles.selectedDistributor}
                  numberOfLines={1}
                >
                  {selectedDistributor.name}
                </Text>

                <View
                  style={styles.searchBox}
                >
                  <Ionicons
                    name="search-outline"
                    size={20}
                    color="#777777"
                  />

                  <TextInput
                    style={styles.searchInput}
                    placeholder="Filter drugs from this seller..."
                    placeholderTextColor="#999999"
                    value={medSearch}
                    onChangeText={
                      setMedSearch
                    }
                  />

                  {medSearch.length >
                    0 && (
                    <TouchableOpacity
                      onPress={() =>
                        setMedSearch("")
                      }
                    >
                      <Ionicons
                        name="close-circle"
                        size={19}
                        color="#999999"
                      />
                    </TouchableOpacity>
                  )}
                </View>

                {filteredMedicines.length ===
                0 ? (
                  <View
                    style={styles.emptyBox}
                  >
                    <Ionicons
                      name="medical-outline"
                      size={40}
                      color="#AAAAAA"
                    />

                    <Text
                      style={
                        styles.emptyText
                      }
                    >
                      No inventory items
                      found.
                    </Text>
                  </View>
                ) : (
                  filteredMedicines.map(
                    (medicine) => (
                      <View
                        key={
                          medicine._id
                        }
                      >
                        {renderMedicine({
                          item: medicine,
                        })}
                      </View>
                    )
                  )
                )}
              </>
            ) : (
              <View
                style={styles.selectionState}
              >
                <View
                  style={
                    styles.selectionIcon
                  }
                >
                  <Ionicons
                    name="cube-outline"
                    size={45}
                    color="#008C3A"
                  />
                </View>

                <Text
                  style={
                    styles.selectionTitle
                  }
                >
                  No Distributor Selected
                </Text>

                <Text
                  style={
                    styles.selectionText
                  }
                >
                  Please select an authorized
                  distributor from the list to
                  inspect available medicines
                  and pricing.
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}