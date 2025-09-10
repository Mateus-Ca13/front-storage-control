import { Grid } from "@mui/material";
import SummaryDashboard from "../components/SummaryDashboard/SummaryDashboard";
import QuickActionsPanel from "../components/QuickActionsPanel/QuickActionsPanel";
import MovementsSummaryPanel from "../components/MovementsSummaryPanel/MovementsSummaryPanel";
import BelowStockSummaryPanel from "../components/BelowStockSummaryPanel/BelowStockSummaryPanel";

export default function MainDashboard() {
  return (
    <Grid container spacing={2}>
      <SummaryDashboard/>
      <QuickActionsPanel/>
      <MovementsSummaryPanel/>
      <BelowStockSummaryPanel/>
    </Grid>
  )
}
