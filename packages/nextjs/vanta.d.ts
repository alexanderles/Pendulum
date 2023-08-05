// // export interface HaloParams {
// //   el: string;
// //   mouseControls: boolean;
// //   touchControls: boolean;
// //   gyroControls: boolean;
// //   minHeight: number;
// //   minWidth: number;
// //   xOffset?: number;
// //   yOffset?: number;
// //   size?: number;
// //   backgroundColor?: string;
// // }

// // export interface HaloInstance {
// //   setOptions: ({
// //     el,
// //     mouseControls,
// //     touchControls,
// //     gyroControls,
// //     minHeight,
// //     minWidth,
// //     size,
// //     xOffset,
// //     yOffset,
// //     backgroundColor,
// //   }: Omit<HaloParams, "el">) => void;
// //   resize: () => void;
// //   destroy: () => void;
// // }

// // declare global {
// //   interface Window {
// //     VANTA: {
// //       HALO: ({
// //         el,
// //         mouseControls,
// //         touchControls,
// //         gyroControls,
// //         minHeight,
// //         minWidth,
// //         size,
// //         xOffset,
// //         yOffset,
// //         backgroundColor,
// //       }: HaloParams) => HaloInstance;
// //     };
// //   }
// // }

// // Import the required interfaces
// export interface HaloParams {
//   el: string | HTMLElement | null;
//   mouseControls: boolean;
//   touchControls: boolean;
//   gyroControls: boolean;
//   minHeight: number;
//   minWidth: number;
//   amplitudeFactor: number;
//   xOffset?: number;
//   yOffset?: number;
//   size?: number;
//   backgroundColor?: string;
// }

// export interface HaloInstance {
//   setOptions: (options: Omit<HaloParams, "el">) => void;
//   resize: () => void;
//   destroy: () => void;
// }

// declare global {
//   interface Window {
//     VANTA: {
//       HALO: (options: HaloParams) => HaloInstance;
//     };
//   }
// }

declare module "vanta/dist/vanta.halo.min";
