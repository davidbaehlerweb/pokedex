import { useThemeColors } from "@/hooks/useThemeColors";
import { SafeAreaView } from "react-native-safe-area-context";
import { ViewProps, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = ViewProps;

export function RootView({ style, ...rest }: Props) {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets(); // Pour récupérer les insets du téléphone

  return (
    <SafeAreaView
      style={[
        rootStyle,
        { backgroundColor: colors.tint, paddingBottom: insets.bottom }, // Appliquer du padding en bas
        style,
      ]}
      {...rest}
    />
  );
}

const rootStyle = {
  flex: 1,
  padding: 4,
} satisfies ViewStyle;
