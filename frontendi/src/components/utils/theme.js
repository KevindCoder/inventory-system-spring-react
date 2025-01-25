// theme.js
import { createTheme } from '@mui/material/styles';

// Define the default theme as dark
export const theme = createTheme({
    palette: {
        mode: 'dark', // Set default mode to dark
        primary: {
            main: '#1976d2', // Primary color
        },
        secondary: {
            main: '#dc004e', // Secondary color
        },
        background: {
            default: '#121212', // Dark background
            paper: '#1d1d1d', // Paper color for MUI components
        },
        text: {
            primary: '#b0b0b0', // White text for dark mode
            secondary: '#b0b0b0', // Secondary text color
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif', // Default font
    },
});
