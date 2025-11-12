import { useState } from 'react';
import { Menu as MenuUI, MenuItem } from '@mui/material'
import { Button } from '@/components/_ui/Button';
import { signOut } from 'next-auth/react';
import Link from 'next/link';


export const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  }

  return (
    <>
      <Button ariaLabel="Open account menu" handleClick={handleClick}>
        Account
      </Button>
      <MenuUI
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div id="account-menu-container">
          <MenuItem>
            <Link href="/settings">Settings</Link>
          </MenuItem>
          <MenuItem>
            <Button ariaLabel="Sign out of the application" onClick={handleSignOut}>
              Sign Out
            </Button>
          </MenuItem>
        </div>
      </MenuUI>
    </>
  )
}