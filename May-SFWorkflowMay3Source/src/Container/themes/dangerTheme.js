/**
 * App Danger Theme
 */
import { createTheme } from '@material-ui/core/styles';
import AppConfig from 'Constants/AppConfig';

const theme = createTheme({
    palette: {
        primary: {
            main: AppConfig.themeColors.danger
        },
        secondary: {
            main: AppConfig.themeColors.primary
        }
    }
});

export default theme;