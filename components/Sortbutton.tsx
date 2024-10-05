import { useThemeColors } from "@/hooks/useThemeColors";
import { useRef, useState } from "react";
import { Dimensions, Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Card } from "./Card";
import { Row } from "./Row";
import { Radio } from "./Radio";
import { Shadows } from "@/constants/Shadows";

type Props = {
  value: "id" | "name",              // Valeur actuelle : "id" ou "name"
  onChange: (v: "id" | "name") => void  // Fonction de callback pour changer la valeur
};

const options = [
  { label: 'Number', value: 'id' },
  { label: 'Name', value: 'name' },
] as const;

export function Sortbutton({ value, onChange }: Props) {
  const colors = useThemeColors();
  const [isModalVisible, setModalVisibility] = useState(false);

  const onButtonPress = () => {
    setModalVisibility(true);
    buttonRef.current?.measureInWindow((x,y,width,height)=>{
        setPosition({
            top:y+height,
            right:Dimensions.get("window").width- x - width
        })
        
        setModalVisibility(true)
    })
  };

  const onClose = () => {
    setModalVisibility(false);
  };

  const buttonRef=useRef<View>(null)
  const[position,setPosition]=useState<null | {top:number, right:number}>(null)

  return (
    <>
      <Pressable onPress={onButtonPress}>
        <View 
        ref={buttonRef}
        style={[styles.button, { backgroundColor: colors.grayWhite }]}>
          <Image
            source={
              value === "id" ?
                require('@/app/assets/images/number.png') :
                require('@/app/assets/images/alpha.png')
            }
            width={16}
            height={16}
          />
        </View>
      </Pressable>
      <Modal 
      animationType="fade"
      transparent visible={isModalVisible} onRequestClose={onClose}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={[styles.popup, { backgroundColor: colors.tint,...position }]}>
          <ThemedText style={styles.title} variant="subtitle2" color="grayWhite">
            Sort by:
          </ThemedText>
          <Card style={styles.card}>
            {options.map((o) => (
              <Pressable key={o.value} onPress={() => onChange(o.value)}>
                <Row gap={8}>
                  <Radio checked={o.value === value} />
                  <ThemedText>{o.label}</ThemedText>
                </Row>
              </Pressable>
            ))}
          </Card>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 32,
    height: 32,
    borderRadius: 32,
    flex: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)"
  },
  popup: {
    position:'absolute',
    width:113,
    padding: 4,
    borderRadius: 12,
    paddingTop: 16,
    gap: 16,
    ...Shadows.dp2,
  },
  title: {
    paddingLeft: 20
  },
  card: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 16
  }
});
