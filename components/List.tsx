import { ALL_IMAGES, IMG_HEIGHT, STACK_OFFSET } from "@/constants";
import ListItem from "./ListItem";
import { StyleSheet, useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, withDecay } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const List = () => {
  const listYTranslation = useSharedValue(0);

  const { height } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();

  const panGesture = Gesture.Pan()
    .onChange(({ changeY }) => {
      listYTranslation.value += changeY;
    })
    .onEnd(({ velocityY }) => {
      listYTranslation.value = withDecay({
        velocity: velocityY,
        clamp: [
          -(ALL_IMAGES.length + 1) * (IMG_HEIGHT - STACK_OFFSET) +
            (height - top - bottom),
          0,
        ],
        rubberBandEffect: true,
        rubberBandFactor: 0.8,
      });
    });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={styles.listWrapper}>
        {ALL_IMAGES.map((img, index) => (
          <ListItem
            source={img}
            key={img}
            listYTranslation={listYTranslation}
            index={index}
          />
        ))}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  listWrapper: { flex: 1, overflow: "hidden", paddingHorizontal: 16 },
});

export default List;
