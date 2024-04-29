import { m } from 'framer-motion';

import { SxProps } from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';

import Logo from '../logo';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  right: 0,
  bottom: 0,
  zIndex: 99999,
  width: '100%',
  height: '100%',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgb(255 255 255 / 50%)',
}));

// ----------------------------------------------------------------------

type Props = {
  isDashboard?: boolean;
  sx?: SxProps;
};

export default function LoadingLayer({ isDashboard, ...other }: Props) {
  return (
    <>
      {!isDashboard && (
        <RootStyle {...other}>
          <m.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 360 }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              repeatDelay: 1,
              repeat: Infinity,
            }}
          >
            <Logo disabledLink sx={{ width: 134, height: 64 }} />
          </m.div>
        </RootStyle>
      )}
    </>
  );
}
