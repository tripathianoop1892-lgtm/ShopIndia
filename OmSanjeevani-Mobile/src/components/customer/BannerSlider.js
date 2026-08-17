import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
} from "react-native";

import styles from "./BannerSliderStyles";

const { width } = Dimensions.get("window");

export default function BannerSlider() {

  // ==============================
  // Backend API Integration
  // ==============================

  /*
  const [banners, setBanners] = useState([]);

  useEffect(() => {
      loadBanners();
  }, []);

  const loadBanners = async () => {
      const res = await getBanners();

      if(res.success){
          setBanners(res.data);
      }
  };
  */

  const banners = [
    {
      id: "1",
      title: "Monsoon Offer",
      image: require("../../assets/banner1.jpg"),
      status: "Active",
    },
    {
      id: "2",
      title: "Diwali Sale",
      image: require("../../assets/banner2.jpg"),
      status: "Active",
    },
    {
      id: "3",
      title: "Health Care Week",
      image: require("../../assets/banner3.jpg"),
      status: "Active",
    },
  ];

  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        currentIndex === banners.length - 1
          ? 0
          : currentIndex + 1;

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setCurrentIndex(nextIndex);

    }, 3000);

    return () => clearInterval(interval);

  }, [currentIndex]);

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  return (
    <View style={styles.container}>

      <FlatList
        ref={flatListRef}
        data={banners.filter(
          (item) => item.status === "Active"
        )}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        renderItem={({ item }) => (
          <View style={styles.bannerCard}>

            <Image
              source={item.image}
              style={styles.bannerImage}
              resizeMode="cover"
            />

            <View style={styles.overlay}>
              <Text style={styles.bannerTitle}>
                {item.title}
              </Text>
            </View>

          </View>
        )}
      />

      <View style={styles.dotsContainer}>
        {banners
          .filter((item) => item.status === "Active")
          .map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index &&
                  styles.activeDot,
              ]}
            />
          ))}
      </View>

    </View>
  );
}