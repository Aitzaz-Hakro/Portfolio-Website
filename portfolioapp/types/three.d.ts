/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MeshProps, PointsProps, BufferGeometryProps } from "@react-three/fiber";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      mesh: MeshProps;
      points: PointsProps;
      bufferGeometry: BufferGeometryProps;
      bufferAttribute: any;
      icosahedronGeometry: any;
      pointsMaterial: any;
      ambientLight: any;
      directionalLight: any;
      pointLight: any;
    }
  }
}

export {};
