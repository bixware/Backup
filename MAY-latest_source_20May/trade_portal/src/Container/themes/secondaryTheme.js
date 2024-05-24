/**
 * App Light Theme
 */
import { createTheme } from '@material-ui/core/styles';
import AppConfig from 'Constants/AppConfig';

const theme = createTheme({
    palette: {
        primary: {
            main: AppConfig.themeColors.secondary
        },
        secondary: {
            main: AppConfig.themeColors.primary
        }
    }
});

export default theme;