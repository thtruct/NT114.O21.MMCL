import { forwardRef } from 'react';

import Link from '@mui/material/Link';
// @mui
import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

// routes
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const DextrLogo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const theme = useTheme();

    const PRIMARY_LIGHT = theme.palette.primary.light;

    const PRIMARY_MAIN = theme.palette.primary.main;

    const PRIMARY_DARK = theme.palette.primary.dark;

    // OR using local (public folder)
    // -------------------------------------------------------
    // const logo = (
    //   <Box
    //     component="img"
    //     src="/logo/logo_single.svg" => your path
    //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
    //   />
    // );

    const dextrLogo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="199.322"
          height="40.416"
          viewBox="0 0 199.322 40.416"
        >
          <defs>
            <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
              <stop offset="0%" stopColor={PRIMARY_DARK} />
              <stop offset="100%" stopColor={PRIMARY_MAIN} />
            </linearGradient>

            <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
              <stop offset="0%" stopColor={PRIMARY_LIGHT} />
              <stop offset="100%" stopColor={PRIMARY_MAIN} />
            </linearGradient>

            <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
              <stop offset="0%" stopColor={PRIMARY_LIGHT} />
              <stop offset="100%" stopColor={PRIMARY_MAIN} />
            </linearGradient>
          </defs>
          <g id="Group_9972">
            <path
              id="Path_2924"
              d="M33.692,20.22c0,11.178-8.489,19.556-19.741,19.556H0V.664H13.951C25.2.664,33.692,8.991,33.692,20.22Z"
              transform="translate(0 0.007)"
              fill={PRIMARY_LIGHT}
            />
            <path
              id="Path_2925"
              d="M81.261,39.776,93.724,19.491,81.867.664h36.215L106,20.1,118.41,39.776Z"
              transform="translate(0.844 0.007)"
              fill={PRIMARY_LIGHT}
            />
            <path
              id="Path_2926"
              d="M154.524,16.251h-7.354V39.776H129.2V16.251h-7.3V.664h32.626Z"
              transform="translate(1.266 0.007)"
              fill={PRIMARY_LIGHT}
            />
            <path
              id="Path_2927"
              d="M163.178,39.776V.664h19.117c8.268,0,13.182,4.972,13.182,12.737,0,6.372-3.254,10.283-8.659,11.676l10.81,14.692H163.178Z"
              transform="translate(1.695 0.007)"
              fill={PRIMARY_LIGHT}
            />
            <path
              id="Path_2928"
              d="M58.938,20.208l14.1,14.29a19.819,19.819,0,0,1-14.1,5.918A20.21,20.21,0,1,1,78.881,20.208Z"
              transform="translate(0.405)"
              fill={PRIMARY_LIGHT}
            />
          </g>
        </svg>
      </Box>
    );

    if (disabledLink) {
      return dextrLogo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
        {dextrLogo}
      </Link>
    );
  }
);

export default DextrLogo;
