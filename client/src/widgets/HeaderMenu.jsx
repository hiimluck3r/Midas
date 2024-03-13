import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import MidasLogo from '../images/midas_logo.png'; // Импортируем изображение

export default function HeaderMenu() {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#ffaa01' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "left" }}>
                    Admin panel
                </Typography>
                <img src={MidasLogo} alt="Midas Logo" style={{ width: '60px', height: '60px' }} />
            </Toolbar>
        </AppBar>
    );
}
