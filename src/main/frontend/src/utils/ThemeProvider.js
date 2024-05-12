import { createTheme as createThemeV5 } from '@mui/material/styles';
import { colors } from './colors';

export const themeV5 = createThemeV5({
    palette: {
        primary: {
            main: colors.darkBlue,
        },
        secondary: {
            main: colors.blue,
        },
        background: {
            main: colors.background,
        },
        success: {
            main: colors.green1,
        },
        warning: {
            main: colors.warn,
        },
        error: {
            main: colors.error,
        },
    },
    typography: {
        fontFamily: ['Nunito Sans', 'sans-serif'].join(","),
        body1: {
            fontSize: 14,
            color: colors.darkBlue
        },
        subtitle1: {
            fontSize: 16,
            color: colors.darkBlue,
            fontWeight: "bold"
        },
        h6: {
            color: colors.blue,
            fontWeight: "bold"
        },
    },
    shape: {
        borderRadius: 10,
    },
});
