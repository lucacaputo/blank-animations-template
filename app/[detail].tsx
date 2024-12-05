import { AnimatedExpoImage } from "@/components/ListItem";
import { IMG_HEIGHT } from "@/constants";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const DetailPage = () => {
  const { detail } = useLocalSearchParams<{ detail: string }>();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageWrapper}>
        <AnimatedExpoImage
          source={detail}
          style={styles.image}
          sharedTransitionTag={detail}
        />
      </View>
      <Animated.View style={[{ padding: 16 }]} entering={FadeInDown.delay(400)}>
        <Text style={{ fontSize: 20 }}>
          Eu do nulla officia sunt magna incididunt ipsum do dolor Lorem aliqua.
          Qui aute elit cupidatat adipisicing magna proident adipisicing velit
          quis amet aliquip ut occaecat. Eiusmod Lorem nulla et deserunt amet in
          adipisicing ipsum sit mollit magna ullamco Lorem aliqua. Sint tempor
          reprehenderit commodo fugiat fugiat. Aliquip adipisicing eu eu
          reprehenderit aute pariatur. Deserunt qui sint anim consequat fugiat
          consectetur duis aute.
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageWrapper: {
    height: IMG_HEIGHT + 300,
  },
  image: { flex: 1, width: "100%" },
});

export default DetailPage;
