import { StyleSheet, ViewStyle } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Image } from "expo-image";
import { IMG_HEIGHT, STACK_OFFSET } from "@/constants";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

type ListItemProps = {
  source: string;
  listYTranslation: SharedValue<number>;
  index: number;
  selectedIndex: SharedValue<number | null>;
};

const ListItem = ({
  source,
  listYTranslation,
  index,
  selectedIndex,
}: ListItemProps) => {
  const yOffset = useSharedValue(0);
  const previousOffset = useSharedValue(0);

  useAnimatedReaction(
    () => listYTranslation.value,
    (curr) => {
      if (selectedIndex.value === null) {
        yOffset.value = curr + index * (IMG_HEIGHT - STACK_OFFSET);
        previousOffset.value = yOffset.value;
      }
    }
  );

  const rItemStyle = useAnimatedStyle<ViewStyle>(() => ({
    transform: [{ translateY: yOffset.value }],
  }));

  const tapGesture = Gesture.Tap().onStart(() => {
    if (index === selectedIndex.value) {
      selectedIndex.value = null;
      return;
    }
    selectedIndex.value = index;
  });

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View style={[styles.itemWrapper, rItemStyle]}>
        <Image contentFit="cover" source={source} style={styles.image} />
      </Animated.View>
    </GestureDetector>
  );
};
const styles = StyleSheet.create({
  itemWrapper: {
    width: "100%",
    position: "absolute",
    marginLeft: 16,
    height: IMG_HEIGHT,
  },
  image: {
    borderWidth: 1,
    borderColor: "#ccc",
    flex: 1,
    width: "100%",
    borderRadius: 8,
  },
});
export default ListItem;
