import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

export default function TransitionAlerts({ showAlert, setShowAlert, severity, msg }: { showAlert: boolean, setShowAlert: (showAlert: boolean) => void, severity: 'success' | 'info' | 'warning' | 'error', msg: string }) {
  // const [open, setOpen] = React.useState(showAlert);

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={showAlert}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setShowAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {msg}
        </Alert>
      </Collapse>
      {/* <Button
        disabled={open}
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
      >
        Re-open
      </Button> */}
    </Box>
  );
}