import { useRef, useState } from "react";
import { Animated, PanResponder, StyleSheet, Text } from "react-native";

export default function DragAndDrop({heading, onDrop, active}: any){
    const position = useRef(new Animated.ValueXY()).current;
    const [dragging, setDragging] = useState(false);
  
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => (active == 1 ? false : true),
        onMoveShouldSetPanResponder: () => (active == 1 ? false : true),
        onPanResponderGrant: () => {
          setDragging(true);
        },
        onPanResponderMove: Animated.event(
          [
            null,
            {
              dx: position.x,
              dy: position.y,
            },
          ],
          {useNativeDriver: false},
        ),
        onPanResponderRelease: (e, gestureState) => {
          setDragging(false);
  
          console.log('gestureStateeee', gestureState);
  
          if (
            gestureState.moveX > 35 &&
            gestureState.moveX < 280 &&
            gestureState.moveY > 250 &&
            gestureState.moveY < 600
          ) {
            onDrop(heading); 
          }
          Animated.spring(position, {
            toValue: {x: 0, y: 0},
            useNativeDriver: false,
          }).start();
        },
      }),
    ).current;
  
    return (
      <Animated.View
        style={[
          styles.colorBtn,
          {
            transform: position.getTranslateTransform(),
            opacity: dragging ? 0.8 : 1,
            backgroundColor: active == 1 ? '#f2f4ee' : 'white',
            borderStyle: active == 1 ? 'dashed' : 'solid',
          },
        ]}
        {...panResponder.panHandlers}>
        <Text style={styles.btnTxt}>{heading}</Text>
      </Animated.View>
    );
  };

  const styles = StyleSheet.create({
    colorBtn: {
        backgroundColor: 'white',
        // padding:10,
        marginHorizontal: 5,
        borderColor: 'lightgrey',
        borderRadius: 5,
        borderWidth: 1,
      },
      btnTxt: {
        fontSize: 15,
        color: 'lightgrey',
        paddingHorizontal: 7,
      },
  })