import Grid from "@mui/material/Grid";
import { Config, ConfigMethods } from "@/hooks/config-hook";
import CursorConfigElm from "@/components/configComponents/CursorConfigElm";
import SummonPosConfElm from "@/components/configComponents/SummonPosConfElm";
import AutoSummonConfElm from "@/components/configComponents/autoSummon/AutoSummonConfElm";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MouseIcon from "@mui/icons-material/Mouse";
import { useState } from "react";
import { Box } from "@mui/system";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import { useMediaQuery } from "@mui/material";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import MapIcon from "@mui/icons-material/Map";
import { appWindow, LogicalSize } from "@tauri-apps/api/window";
import { getVersion } from "@tauri-apps/api/app";
import { useEffect } from "react";

interface ConfigElmProps {
  config: Config;
  configMethods: ConfigMethods;
  showMap: boolean;
}

const ConfigElm = ({ config, configMethods, showMap }: ConfigElmProps) => {
  const [opened, setOpened] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [version, setVersion] = useState("");

  useEffect(() => {
    getVersion().then((v) => {
      setVersion(v);
    });
  }, []);

  const closedElm = (
    <Box
      sx={{
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingTop: 2,
        paddingLeft: 1,
      }}
    >
      <Button
        variant="outlined"
        startIcon={<SettingsIcon />}
        endIcon={<ArrowDropDownIcon />}
        onClick={() => setOpened(true)}
        sx={{
          marginRight: 1,
        }}
      >
        Config
      </Button>
      <Chip
        icon={<MouseIcon />}
        label={config.summon_mouse_cursor_shortcut}
        sx={{
          marginRight: 1,
        }}
      />
      <Chip
        icon={<AutoAwesomeMotionIcon />}
        label={config.auto_summon_shortcut}
        variant={config.auto_summon_enabled ? "filled" : "outlined"}
        onClick={() => {
          configMethods.setAutoSummonEnabled(!config.auto_summon_enabled);
        }}
        sx={{
          marginRight: 1,
        }}
      />
      <Chip
        icon={<MapIcon />}
        label={"Map"}
        variant={showMap ? "filled" : "outlined"}
        onClick={() => {
          configMethods.toggleShowMap();
        }}
        sx={{
          marginRight: 1,
        }}
      />
      {isMobile ? (
        <Chip
          icon={<OpenInFullIcon />}
          label={"expand"}
          onClick={() => {
            appWindow.setSize(new LogicalSize(800, 600));
          }}
        />
      ) : (
        <Chip
          icon={<CloseFullscreenIcon />}
          label={"minify"}
          onClick={() => {
            appWindow.setSize(new LogicalSize(600, 100));
          }}
        />
      )}
    </Box>
  );

  const openedElm = (
    <Grid
      container
      spacing={2}
      sx={{
        paddingTop: 2,
        paddingLeft: 1,
      }}
      alignItems="center"
    >
      <Grid item xs={12}>
        <Button
          variant="outlined"
          startIcon={<SettingsIcon />}
          endIcon={<ArrowDropUpIcon />}
          onClick={() => setOpened(false)}
        >
          Config
        </Button>
      </Grid>
      <Grid item xs={6}>
        <SummonPosConfElm config={config} configMethods={configMethods} />
      </Grid>
      <Grid item xs={6}>
        <CursorConfigElm config={config} configMethods={configMethods} />
      </Grid>
      <Grid item xs={12}>
        <AutoSummonConfElm config={config} configMethods={configMethods} />
      </Grid>
      <Grid item xs={12}>
        {`Ver. ${version}`}
      </Grid>
    </Grid>
  );

  return opened ? openedElm : closedElm;
};

export default ConfigElm;
