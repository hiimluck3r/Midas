import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function HeaderMenu() {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#ffaa01' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "left" }}>
                    Admin panel
                </Typography>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
