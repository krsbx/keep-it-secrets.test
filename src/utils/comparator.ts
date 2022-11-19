export const isResolutionSame = <Resolution extends { width: number; height: number }>(
  resolution1: Resolution,
  resolution2: Resolution
) => resolution1.width === resolution2.width && resolution2.height === resolution2.height;
