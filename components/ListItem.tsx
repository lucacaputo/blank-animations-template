import { StyleSheet } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { Image } from "expo-image";
import { IMG_HEIGHT, STACK_OFFSET } from "@/constants";

type ListItemProps = {
  source: string;
  listYTranslation: SharedValue<number>;
  index: number;
};

const ListItem = ({ source, listYTranslation, index }: ListItemProps) => {
  const yOffset = useDerivedValue(
    () => listYTranslation.value + index * (IMG_HEIGHT - STACK_OFFSET)
  );

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: yOffset.value }],
  }));

  return (
    <Animated.View style={[styles.itemWrapper, rStyle]}>
      <Image contentFit="cover" source={source} style={styles.image} />
    </Animated.View>
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
