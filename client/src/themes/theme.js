import createMuiTheme  from '@material-ui/core/styles/createMuiTheme';
import {primary, red, secondary} from "./colors";

export default createMuiTheme({
    palette: {
        primary: {main:primary},
        secondary: {main:secondary},
        error: {main:red},
        contrastThreshold: 3,
        tonalOffset: 0.2
    }
});