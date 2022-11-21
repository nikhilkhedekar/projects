import { Stack, Typography, Paper } from "@mui/material";
import { useContext } from "react";
import StoreLocations from "../components/Store/StoreLocations";
import AlanContext from "../contexts/alanContext";

function Home() {
  const alanCtx = useContext(AlanContext);

  alanCtx.alanBtn.setVisualState({ screen: "home" });
  
  return (
    <Paper sx={{ padding: '32px' }} elevation={2}>
      <Stack>
        <Stack>
          <Typography gutterBottom variant='h6' align='center' >
            Make Your Choice
          </Typography>
        </Stack>

        <Stack>
          <Typography variant="body1" align="justify" >
            I'm baby viral enamel pin chartreuse cliche retro af selfies kinfolk
            photo booth plaid jianbing actually squid 3 wolf moon lumbersexual.
            Hell of humblebrag gluten-free lo-fi man braid leggings.
          </Typography>
          <Typography variant="body1" align="justify" >
            Cloud bread kale chips wayfarers deep v chicharrones leggings
            fingerstache actually blog cliche four dollar toast. Sriracha ugh
            kickstarter, next level la croix butcher lomo.
          </Typography>
        </Stack>

        <Stack>
          <StoreLocations />
        </Stack>
      </Stack>
    </Paper>
  );
}

export default Home;
