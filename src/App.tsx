import { useState } from 'react';
import './App.css';
import { AuthConsumer, AuthProvider } from './auth/context/jwt';
import { SettingsProvider } from './components/settings';
import ThemeProvider from './theme';
import { MotionLazy } from './components/animate/motion-lazy';
import { SnackbarProvider } from './components/snackbar';
import Router from 'src/routes/sections';
import ProgressBar from 'src/components/progress-bar';
import { LocalizationProvider } from 'src/locales';

function App() {
  const [count, setCount] = useState(0);

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
