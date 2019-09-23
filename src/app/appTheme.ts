import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: blue,
    background: {
      default: "#212121"
    }
  },
  props: {
    MuiTextField: {
      variant: "outlined"
    },
    MuiButtonBase: {
      disableRipple: true
    },
    MuiStepButton: {
      style: {
        textAlign: "left"
      }
    },
    MuiTab: {
      style: {
        minWidth: "135px"
      }
    }
  }
});

export default theme;
