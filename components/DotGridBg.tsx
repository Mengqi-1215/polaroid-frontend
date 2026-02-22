import React from "react";
import { View } from "react-native";
interface DotGridProps {
    width: number;
    height: number;
    top?: number;
    left?: number;
  }
  
  function DotGridBg({ width, height, top = 0, left = 0 }: DotGridProps) {
    const spacing = 10;
    const dotSize = 5;
    const cols = Math.ceil(width / spacing);
    const rows = Math.ceil(height / spacing) + 5;
    const dots: React.ReactElement[] = [];
  
    for (let i = 0; i <= rows; i++) {
      for (let j = 0; j <= cols; j++) {
        dots.push(
          <View
            key={`${i}-${j}`}
            style={{
              position: "absolute",
              left: j * spacing,
              top: i * spacing,
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
              backgroundColor: "rgba(239,239,239,1)",
            }}
          />
        );
      }
    }
  
    return (
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          width,
          height,
          top,
          left,
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        {dots}
      </View>
    );
  }
export default DotGridBg;