import { Box, styled } from "@mui/material";
import type { BoxProps } from "@mui/material";


export const CenterFlexBox = styled(Box)<BoxProps>({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const EndFlexBox = styled(Box)<BoxProps>({
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
});

export const StartFlexBox = styled(Box)<BoxProps>({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
});

export const CenterColumnBox = styled(Box)<BoxProps>({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

export const StartColumnBox = styled(Box)<BoxProps>({
  display: "flex",
  justifyContent: "center",
  alignItems: "start",
  width: '100%',
  flexDirection: "column",
});


export const BetweenFlexBox = styled(Box)<BoxProps>({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: '100%'
});

export const BetweenColumnBox = styled(Box)<BoxProps>({
  display: "flex",
  flexDirection: "column",  
  justifyContent: "space-between",
  alignItems: "center",
  height: '100%',
});


export const FullScreenBoxLayout = styled(Box)<BoxProps>({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  width: "100%",
});