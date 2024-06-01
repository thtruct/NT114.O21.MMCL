import Router from 'src/routes/sections';

import { LocalizationProvider } from 'src/locales';

import ProgressBar from 'src/components/progress-bar';

import './App.css';
import ThemeProvider from './theme';
import { SettingsProvider } from './components/settings';
import { SnackbarProvider } from './components/snackbar';
import { MotionLazy } from './components/animate/motion-lazy';
import { AuthConsumer, AuthProvider } from './auth/context/jwt';

function App() {
  return (
    <AuthProvider>
      <LocalizationProvider>
        <SettingsProvider
          defaultSettings={{
            themeMode: 'light', // 'light' | 'dark'
            themeDirection: 'ltr', //  'rtl' | 'ltr'
            themeContrast: 'default', // 'default' | 'bold'
            themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
            themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
            themeStretch: false,
          }}
        >
          <ThemeProvider>
            <MotionLazy>
              <SnackbarProvider>
                <ProgressBar />
                <AuthConsumer>
                  <Router />
                </AuthConsumer>
              </SnackbarProvider>
            </MotionLazy>
          </ThemeProvider>
        </SettingsProvider>
      </LocalizationProvider>
    </AuthProvider>
  );
}

export default App;
