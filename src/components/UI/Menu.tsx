import { ReactNode, useState } from 'react';
import { Menu as MenuUI } from '@mui/material'
import { Button } from './Button';

interface MenuProps {
  buttonText: string;
  children: ReactNode;

}

export const Menu = ({ buttonText, children }: MenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick}>{buttonText}</Button>
      <MenuUI
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {children}
      </MenuUI>
    </>
  )
}