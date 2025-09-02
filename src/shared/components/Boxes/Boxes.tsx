import { Box, styled } from "@mui/material";
import type { BoxProps } from "@mui/material";


export const CenterFlexBox = styled(Box)<BoxProps>({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const CenterColumnBox = styled(Box)<BoxProps>({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

export const BetweenFlexBox = styled(Box)<BoxProps>({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const FullScreenBoxLayout = styled(Box)<BoxProps>({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  width: "100%",
});