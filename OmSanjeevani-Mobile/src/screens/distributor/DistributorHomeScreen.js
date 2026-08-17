import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "./DistributorHomeScreenStyles";

import AppHeader from "../../components/headers/AppHeader";

import { MedicinesList } from "../../services/api";

export default function DistributorHomeScreen({
  navigation,
}) {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // Fetch Distributor Inventory
  // ==========================================

  const fetchInventory = useCallback(async () => {
    try {
      setLoading(true);

      const data = await MedicinesList();

      setMedicines(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "Distributor inventory loading error:",
        error
      );

      setMedicines([]);

      Alert.alert(
        "Inventory Error",
        "Unable to load distributor inventory."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  // ==========================================
  // Inventory Statistics
  // ==========================================

  const statistics = useMemo(() => {
    const totalMedicines =
      medicines.length;

    const inStock = medicines.filter(
      (medicine) =>
        Number(medicine.stock || 0) > 20
    ).length;

    const lowStock = medicines.filter(
      (medicine) => {
        const stock = Number(
          medicine.stock || 0
        );

        return stock > 0 && stock <= 20;
      }
    ).length;

    const outOfStock = medicines.filter(
      (medicine) =>
        Number(medicine.stock || 0) <= 0
    ).length;

    const now = new Date();

    const thirtyDaysFromNow =
      new Date();

    thirtyDaysFromNow.setDate(
      now.getDate() + 30
    );

    const expiringSoon =
      medicines.filter((medicine) => {
        if (!medicine.expiry) {
          return false;
        }

        const expiryDate = new Date(
          medicine.expiry
        );

        return (
          expiryDate >= now &&
          expiryDate <= thirtyDaysFromNow
        );
      }).length;

    const totalInventoryValue =
      medicines.reduce(
        (total, medicine) => {
          const unitPrice = Number(
            medicine.offerPrice ||
              medicine.mrp ||
              0
          );

          const stock = Number(
            medicine.stock || 0
          );

          return (
            total +
            unitPrice * stock
          );
        },
        0
      );

    return {
      totalMedicines,
      inStock,
      lowStock,
      outOfStock,
      expiringSoon,
      totalInventoryValue,
    };
  }, [medicines]);

  // ==========================================
  // Low Stock Medicines
  // ==========================================

  const lowStockMedicines =
    useMemo(() => {
      return medicines
        .filter(
          (medicine) =>
            Number(medicine.stock || 0) >
              0 &&
            Number(medicine.stock || 0) <=
              20
        )
        .slice(0, 5);
    }, [medicines]);

  // ==========================================
  // Recent Medicines
  // ==========================================

  const recentMedicines =
    useMemo(() => {
      return [...medicines]
        .sort((a, b) => {
          const dateA = new Date(
            a.createdAt || 0
          );

          const dateB = new Date(
            b.createdAt || 0
          );

          return dateB - dateA;
        })
        .slice(0, 5);
    }, [medicines]);

  // ==========================================
  // Expiry Helper
  // ==========================================

  const getExpiryStatus = (
    expiry
  ) => {
    if (!expiry) {
      return {
        text: "Expiry N/A",
        color: "#777777",
      };
    }

    const expiryDate = new Date(
      expiry
    );

    const now = new Date();

    if (expiryDate < now) {
      return {
        text: "Expired",
        color: "#E53935",
      };
    }

    const difference =
      expiryDate.getTime() -
      now.getTime();

    const days = Math.ceil(
      difference /
        (1000 * 60 * 60 * 24)
    );

    if (days <= 30) {
      return {
        text: `${days} days left`,
        color: "#F57C00",
      };
    }

    return {
      text: expiryDate.toLocaleDateString(
        "en-IN"
      ),
      color: "#2E7D32",
    };
  };

  // ==========================================
  // Medicine Card
  // ==========================================

  const renderMedicine = (
    medicine,
    index
  ) => {
    const stock = Number(
      medicine.stock || 0
    );

    const price = Number(
      medicine.offerPrice ||
        medicine.mrp ||
        0
    );

    const expiry =
      getExpiryStatus(
        medicine.expiry
      );

    const isLow =
      stock > 0 && stock <= 20;

    const isOut =
      stock <= 0;

    return (
      <View
        key={
          medicine._id ||
          `${medicine.name}-${index}`
        }
        style={
          styles.medicineCard
        }
      >
        <View
          style={
            styles.medicineTopRow
          }
        >
          <View
            style={
              styles.medicineIcon
            }
          >
            <Ionicons
              name="medical-outline"
              size={24}
              color="#2E7D32"
            />
          </View>

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
              {medicine.name ||
                "Medicine"}
            </Text>

            <Text
              style={
                styles.medicineCompany
              }
            >
              {medicine.company ||
                "Generic Manufacturer"}
            </Text>
          </View>

          <View
            style={[
              styles.stockBadge,
              isOut
                ? styles.stockBadgeOut
                : isLow
                ? styles.stockBadgeLow
                : styles.stockBadgeGood,
            ]}
          >
            <Text
              style={
                styles.stockBadgeText
              }
            >
              {isOut
                ? "Out"
                : isLow
                ? "Low"
                : "In Stock"}
            </Text>
          </View>
        </View>

        <View
          style={
            styles.medicineDetails
          }
        >
          <View
            style={
              styles.detailItem
            }
          >
            <Text
              style={
                styles.detailLabel
              }
            >
              Stock
            </Text>

            <Text
              style={
                styles.detailValue
              }
            >
              {stock}
            </Text>
          </View>

          <View
            style={
              styles.detailItem
            }
          >
            <Text
              style={
                styles.detailLabel
              }
            >
              Price
            </Text>

            <Text
              style={
                styles.detailValue
              }
            >
              ₹
              {price.toLocaleString(
                "en-IN"
              )}
            </Text>
          </View>

          <View
            style={
              styles.detailItem
            }
          >
            <Text
              style={
                styles.detailLabel
              }
            >
              Expiry
            </Text>

            <Text
              style={[
                styles.detailValue,
                {
                  color:
                    expiry.color,
                },
              ]}
              numberOfLines={1}
            >
              {expiry.text}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <SafeAreaView
        style={styles.container}
      >
        <AppHeader
          title="Distributor Dashboard"
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
            style={
              styles.loadingText
            }
          >
            Loading inventory...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // ==========================================
  // Dashboard
  // ==========================================

  return (
    <SafeAreaView
      style={styles.container}
    >
      <AppHeader
        title="Distributor Dashboard"
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
              styles.headerTextContainer
            }
          >
            <Text
              style={
                styles.dashboardTitle
              }
            >
              📦 Distributor Dashboard
            </Text>

            <Text
              style={
                styles.dashboardSubtitle
              }
            >
              Monitor your medicine inventory,
              stock levels and expiry alerts.
            </Text>
          </View>

          <TouchableOpacity
            style={
              styles.refreshButton
            }
            onPress={fetchInventory}
          >
            <Ionicons
              name="refresh"
              size={20}
              color="#2E7D32"
            />
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
          {/* Total Medicines */}

          <View
            style={
              styles.statCard
            }
          >
            <View
              style={
                styles.statIconGreen
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
              {
                statistics.totalMedicines
              }
            </Text>

            <Text
              style={
                styles.statSubtitle
              }
            >
              Catalog items
            </Text>
          </View>

          {/* In Stock */}

          <View
            style={
              styles.statCard
            }
          >
            <View
              style={
                styles.statIconBlue
              }
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={22}
                color="#1565C0"
              />
            </View>

            <Text
              style={
                styles.statTitle
              }
            >
              In Stock
            </Text>

            <Text
              style={
                styles.statValue
              }
            >
              {statistics.inStock}
            </Text>

            <Text
              style={
                styles.statSubtitle
              }
            >
              Stock &gt; 20
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
                styles.statIconOrange
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
              Low Stock
            </Text>

            <Text
              style={
                styles.statValue
              }
            >
              {statistics.lowStock}
            </Text>

            <Text
              style={
                styles.statSubtitle
              }
            >
              1 - 20 units
            </Text>
          </View>

          {/* Out Of Stock */}

          <View
            style={
              styles.statCard
            }
          >
            <View
              style={
                styles.statIconRed
              }
            >
              <Ionicons
                name="close-circle-outline"
                size={22}
                color="#E53935"
              />
            </View>

            <Text
              style={
                styles.statTitle
              }
            >
              Out of Stock
            </Text>

            <Text
              style={
                styles.statValue
              }
            >
              {
                statistics.outOfStock
              }
            </Text>

            <Text
              style={
                styles.statSubtitle
              }
            >
              Requires refill
            </Text>
          </View>

          {/* Expiring Soon */}

          <View
            style={
              styles.statCard
            }
          >
            <View
              style={
                styles.statIconPurple
              }
            >
              <Ionicons
                name="time-outline"
                size={22}
                color="#7B1FA2"
              />
            </View>

            <Text
              style={
                styles.statTitle
              }
            >
              Expiring Soon
            </Text>

            <Text
              style={
                styles.statValue
              }
            >
              {
                statistics.expiringSoon
              }
            </Text>

            <Text
              style={
                styles.statSubtitle
              }
            >
              Next 30 days
            </Text>
          </View>

          {/* Inventory Value */}

          <View
            style={
              styles.statCard
            }
          >
            <View
              style={
                styles.statIconTeal
              }
            >
              <Ionicons
                name="cash-outline"
                size={22}
                color="#00897B"
              />
            </View>

            <Text
              style={
                styles.statTitle
              }
            >
              Inventory Value
            </Text>

            <Text
              style={
                styles.statValueSmall
              }
            >
              ₹
              {statistics.totalInventoryValue.toLocaleString(
                "en-IN"
              )}
            </Text>

            <Text
              style={
                styles.statSubtitle
              }
            >
              Current stock value
            </Text>
          </View>
        </View>

        {/* ====================================
            Alerts & Notifications
        ===================================== */}

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
            <View
              style={
                styles.sectionTitleRow
              }
            >
              <Ionicons
                name="notifications-outline"
                size={21}
                color="#F57C00"
              />

              <Text
                style={
                  styles.sectionTitle
                }
              >
                Alerts & Notifications
              </Text>
            </View>

            <View
              style={
                styles.alertCountBadge
              }
            >
              <Text
                style={
                  styles.alertCountText
                }
              >
                {statistics.lowStock +
                  statistics.expiringSoon}
              </Text>
            </View>
          </View>

          {/* Low Stock Alert */}

          {statistics.lowStock > 0 && (
            <View
              style={
                styles.alertItem
              }
            >
              <View
                style={
                  styles.alertIconOrange
                }
              >
                <Ionicons
                  name="warning-outline"
                  size={18}
                  color="#F57C00"
                />
              </View>

              <View
                style={
                  styles.alertContent
                }
              >
                <Text
                  style={
                    styles.alertTitle
                  }
                >
                  Low Stock Alert
                </Text>

                <Text
                  style={
                    styles.alertText
                  }
                >
                  {
                    statistics.lowStock
                  }{" "}
                  medicine
                  {statistics.lowStock >
                  1
                    ? "s are"
                    : " is"}{" "}
                  running low on stock.
                </Text>
              </View>
            </View>
          )}

          {/* Expiry Alert */}

          {statistics.expiringSoon >
            0 && (
            <View
              style={
                styles.alertItem
              }
            >
              <View
                style={
                  styles.alertIconRed
                }
              >
                <Ionicons
                  name="time-outline"
                  size={18}
                  color="#E53935"
                />
              </View>

              <View
                style={
                  styles.alertContent
                }
              >
                <Text
                  style={
                    styles.alertTitle
                  }
                >
                  Expiry Alert
                </Text>

                <Text
                  style={
                    styles.alertText
                  }
                >
                  {
                    statistics.expiringSoon
                  }{" "}
                  medicine
                  {statistics.expiringSoon >
                  1
                    ? "s are"
                    : " is"}{" "}
                  expiring within 30 days.
                </Text>
              </View>
            </View>
          )}

          {statistics.lowStock ===
            0 &&
            statistics.expiringSoon ===
              0 && (
              <View
                style={
                  styles.noAlertContainer
                }
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={25}
                  color="#2E7D32"
                />

                <Text
                  style={
                    styles.noAlertText
                  }
                >
                  All inventory systems are
                  currently healthy.
                </Text>
              </View>
            )}
        </View>

        {/* ====================================
            Low Stock Medicines
        ===================================== */}

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
            <View
              style={
                styles.sectionTitleRow
              }
            >
              <Ionicons
                name="warning-outline"
                size={21}
                color="#F57C00"
              />

              <Text
                style={
                  styles.sectionTitle
                }
              >
                Low Stock Medicines
              </Text>
            </View>

            <Text
              style={
                styles.sectionCount
              }
            >
              {lowStockMedicines.length}
            </Text>
          </View>

          {lowStockMedicines.length ===
          0 ? (
            <View
              style={
                styles.emptySection
              }
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={35}
                color="#2E7D32"
              />

              <Text
                style={
                  styles.emptySectionText
                }
              >
                No low stock medicines.
              </Text>
            </View>
          ) : (
            lowStockMedicines.map(
              renderMedicine
            )
          )}
        </View>

        {/* ====================================
            Recent Medicines
        ===================================== */}

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
            <View
              style={
                styles.sectionTitleRow
              }
            >
              <Ionicons
                name="time-outline"
                size={21}
                color="#1565C0"
              />

              <Text
                style={
                  styles.sectionTitle
                }
              >
                Recent Medicines
              </Text>
            </View>

            <Text
              style={
                styles.sectionCount
              }
            >
              {recentMedicines.length}
            </Text>
          </View>

          {recentMedicines.length ===
          0 ? (
            <View
              style={
                styles.emptySection
              }
            >
              <Ionicons
                name="medkit-outline"
                size={35}
                color="#CCCCCC"
              />

              <Text
                style={
                  styles.emptySectionText
                }
              >
                No medicines available.
              </Text>
            </View>
          ) : (
            recentMedicines.map(
              renderMedicine
            )
          )}
        </View>

        {/* ====================================
            Manage Inventory
        ===================================== */}

        <TouchableOpacity
          style={
            styles.manageButton
          }
          onPress={() =>
            navigation.navigate(
              "DistributorMedicines"
            )
          }
        >
          <Ionicons
            name="medical-outline"
            size={20}
            color="#FFFFFF"
          />

          <Text
            style={
              styles.manageButtonText
            }
          >
            Manage Medicine Inventory
          </Text>

          <Ionicons
            name="arrow-forward"
            size={19}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}