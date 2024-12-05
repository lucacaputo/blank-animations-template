import { ALL_IMAGES, IMG_HEIGHT, STACK_OFFSET } from "@/constants";
import ListItem from "./ListItem";
import { StyleSheet, useWindowDimensions, View, ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";

const List = () => {
  const listYTranslation = useSharedValue(0);

  const selectedIndex = useSharedValue<number | null>(null);

  const [panEnabled, setPanEnabled] = useState(true);
  useAnimatedReaction(
    () => selectedIndex.value,
    (current) => {
      if (current !== null) {
        runOnJS(setPanEnabled)(false);
      } else {
        runOnJS(setPanEnabled)(true);
      }
    }
  );

  const { height } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();

  const panGesture = Gesture.Pan()
    .enabled(panEnabled)
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
      <View style={styles.listWrapper}>
        {ALL_IMAGES.map((img, index) => (
          <ListItem
            source={img}
            key={img}
            listYTranslation={listYTranslation}
            index={index}
            selectedIndex={selectedIndex}
          />
        ))}
      </View>
    </GestureDetector>
  );
};
const styles = StyleSheet.create({
  listWrapper: { flex: 1, overflow: "hidden", paddingHorizontal: 16 },
});
export default List;
