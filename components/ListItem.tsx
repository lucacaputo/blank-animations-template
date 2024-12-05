import { Button, StyleSheet, ViewStyle } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Image } from "expo-image";
import { IMG_HEIGHT, STACK_OFFSET } from "@/constants";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Link } from "expo-router";
type ListItemProps = {
  source: string;
  listYTranslation: SharedValue<number>;
  index: number;
  selectedIndex: SharedValue<number | null>;
};

export const AnimatedExpoImage = Animated.createAnimatedComponent(Image);

const ListItem = ({
  source,
  listYTranslation,
  index,
  selectedIndex,
}: ListItemProps) => {
  const yOffset = useSharedValue(0);
  const previousOffset = useSharedValue(0);

  const rItemStyle = useAnimatedStyle<ViewStyle>(() => ({
    transform: [{ translateY: yOffset.value }],
  }));

  useAnimatedReaction(
    () => listYTranslation.value,
    (curr) => {
      if (selectedIndex.value === null) {
        yOffset.value = curr + index * (IMG_HEIGHT - STACK_OFFSET);
        previousOffset.value = yOffset.value;
      }
    }
  );

  useAnimatedReaction(
    () => selectedIndex.value,
    (current) => {
      switch (true) {
        case current === index:
          yOffset.value = withSpring(0, { damping: 28 });
          break;
        case current === null:
          yOffset.value = withSpring(previousOffset.value, { damping: 28 });
          break;
        default:
          yOffset.value = withSpring(500 + index * 30, { damping: 28 });
      }
    }
  );

  const rImgStyle = useAnimatedStyle<ViewStyle>(() => ({
    height: withTiming(
      index === selectedIndex.value ? IMG_HEIGHT + 200 : IMG_HEIGHT
    ),
  }));

  const tapGesture = Gesture.Tap().onStart(() => {
    if (index === selectedIndex.value) {
      selectedIndex.value = null;
      return;
    }
    selectedIndex.value = index;
  });

  return (
    <Animated.View style={[styles.itemWrapper, rItemStyle]}>
      <GestureDetector gesture={tapGesture}>
        <Animated.View style={[styles.imageWrapper, rImgStyle]}>
          <AnimatedExpoImage
            source={source}
            style={styles.image}
            contentFit="cover"
            sharedTransitionTag={source}
          />
        </Animated.View>
      </GestureDetector>
      <Link href={`/${source}`} asChild>
        <Button title="More" />
      </Link>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  itemWrapper: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    position: "absolute",
    marginLeft: 16,
  },
  imageWrapper: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
  },
});
export default ListItem;
