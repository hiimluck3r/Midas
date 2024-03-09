import React, { useState } from 'react';
import '../App.css'
import Checkbox from '@mui/material/Checkbox';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel, Grid } from '@mui/material';

const cities = [
    { id: 1, name: 'Москва' },
    { id: 2, name: 'Санкт-Петербург' },
    { id: 3, name: 'Новосибирск' },
];
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const App = () => {
    const [editMode, setEditMode] = useState(false);
    const [autoRenewal, setAutoRenewal] = useState(false);
    const [tariff, setTariff] = useState('Базовый');
    const [status, setStatus] = useState('ожидает оплаты');
    const [cost, setCost] = useState('');
    const [city, setCity] = useState('');

    const handleEditClick = () => {
        setEditMode(!editMode);
    };

    const handleApplyClick = () => {
        setEditMode(false);
    };

    const handleTariffSelect = (selectedTariff) => {
        if (editMode) {
            setTariff(selectedTariff);
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormControlLabel
                    control={<Switch checked={autoRenewal} onChange={(e) => setAutoRenewal(e.target.checked)} />}
                    label="Автопродление"
                    disabled={!editMode}
                />
            </Grid>

            <Grid item xs={12}>
                <Button
                    variant={tariff === 'Базовый' ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => handleTariffSelect('Базовый')}
                    disabled={!editMode}
                >
                    Базовый
                </Button>
                <Button
                    variant={tariff === 'Максимальный' ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => handleTariffSelect('Максимальный')}
                    disabled={!editMode}
                >
                    Максимальный
                </Button>
                <Button
                    variant={tariff === 'Расширенный' ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => handleTariffSelect('Расширенный')}
                    disabled={!editMode}
                >
                    Расширенный
                </Button>
            </Grid>


            <Grid item xs={12}>
                Статус оплаты
                <Checkbox disabled={!editMode}{...label} defaultChecked />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Стоимость за 30 дней"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    fullWidth
                    disabled={!editMode}
                    type="number"
                    className="inputField" 
                />
            </Grid>


            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel>Город</InputLabel>
                    <Select label="Город" value={city} onChange={(e) => setCity(e.target.value)} disabled={!editMode}>
                        {cities.map((city) => (
                            <MenuItem key={city.id} value={city.name}>
                                {city.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                {editMode ? (
                    <Button variant="contained" color="primary" onClick={handleApplyClick}>
                        Применить
                    </Button>
                ) : (
                    <Button variant="contained" color="primary" onClick={handleEditClick}>
                        Редактировать
                    </Button>
                )}
            </Grid>
        </Grid>
    );
};

export default App;


