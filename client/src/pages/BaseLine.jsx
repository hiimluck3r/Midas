import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, MenuItem, Box, Grid, FormControl, InputLabel, Select } from '@mui/material';
import { Add, Check, Clear, Margin } from '@mui/icons-material';
import { Remove } from '@mui/icons-material';

function BaseLine() {
    const initialNames = [
        {
            id: 1,
            name: 'BaseLine 1',
            prices: [
                { microcategory_id: 1, location_id: 1, price: 100 },
                { microcategory_id: 2, location_id: 2, price: 200 },
                { microcategory_id: 3, location_id: 3, price: 300 },
                { microcategory_id: 4, location_id: 4, price: 1000 }
            ]
        },
        {
            id: 2,
            name: 'BaseLine 2',
            prices: [
                { microcategory_id: 5, location_id: 5, price: 1200 },
                { microcategory_id: 6, location_id: 6, price: 1300 },
                { microcategory_id: 7, location_id: 7, price: 1100 },
                { microcategory_id: 8, location_id: 8, price: 1200 },
                { microcategory_id: 8, location_id: 8, price: 1500 }
            ]
        },
        {
            id: 3,
            name: 'BaseLine 3',
            prices: [
                { microcategory_id: 1, location_id: 1, price: 800 },
                { microcategory_id: 2, location_id: 2, price: 900 },
                { microcategory_id: 3, location_id: 3, price: 1000 },
                { microcategory_id: 4, location_id: 4, price: 1100 }
            ]
        },
        {
            id: 4,
            name: 'BaseLine 4',
            prices: [
                { microcategory_id: 5, location_id: 5, price: 1400 },
                { microcategory_id: 6, location_id: 6, price: 1500 },
                { microcategory_id: 7, location_id: 7, price: 1600 },
                { microcategory_id: 8, location_id: 8, price: 1700 },
                { microcategory_id: 8, location_id: 8, price: 1800 }
            ]
        }
    ];

    const location = [
        { id: 1, name: 'Архангельск' },
        { id: 2, name: 'Москва' },
        { id: 3, name: 'Липецк' },
        { id: 4, name: 'Владивосток' },
        { id: 5, name: 'Краснодар' },
        { id: 6, name: 'Ижевск' },
        { id: 7, name: 'Перьмь' },
        { id: 8, name: 'Сургут' }
    ];

    const category = [
        { id: 1, name: 'Телефоны' },
        { id: 2, name: 'Автомобили' },
        { id: 3, name: 'Услуги' },
        { id: 4, name: 'Компьютеры' },
        { id: 5, name: 'Кухонная техника' },
        { id: 6, name: 'Игрушки' },
        { id: 7, name: 'Мебель' }
    ];

    const [names, setNames] = useState(initialNames);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [selectedItemToUpdate, setSelectedItemToUpdate] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState('Все');
    const [locationFilter, setLocationFilter] = useState('Все');

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        const results = names.filter(name => name.name.toLowerCase().includes(term.toLowerCase())).slice(0, 3);
        setSearchResults(results);
    };

    const handleAddName = (name) => {
        if (!selectedItems[name]) {
            setSelectedItems({
                ...selectedItems,
                [name]: names.find(item => item.name === name),
            });
        } else {
            alert('Это имя уже было добавлено.');
        }
    };

    const handlePriceChange = (name, microcategoryId, locationId, event) => {
        const updatedNames = names.map(item => {
            if (item.name === name) {
                const updatedPrices = item.prices.map(priceItem => {
                    if (priceItem.microcategory_id === microcategoryId && priceItem.location_id === locationId) {
                        return {
                            ...priceItem,
                            price: event.target.value
                        };
                    }
                    return priceItem;
                });
                return {
                    ...item,
                    prices: updatedPrices
                };
            }
            return item;
        });
        setNames(updatedNames);

        setSelectedItems({
            ...selectedItems,
            [name]: {
                ...selectedItems[name],
                prices: selectedItems[name].prices.map(priceItem => {
                    if (priceItem.microcategory_id === microcategoryId && priceItem.location_id === locationId) {
                        return {
                            ...priceItem,
                            price: event.target.value
                        };
                    }
                    return priceItem;
                })
            }
        });
    };

    const openConfirmModal = (item) => {
        setSelectedItemToUpdate(item);
        setConfirmModalOpen(true);
    };

    const handleRemoveItem = (id) => {
        const updatedSelectedItems = { ...selectedItems };
        delete updatedSelectedItems[id];
        setSelectedItems(updatedSelectedItems);
    };

    const closeConfirmModal = () => {
        setConfirmModalOpen(false);
    };

    const handleConfirm = () => {
        console.log("Обновление цен выбранных элементов:", selectedItems);
        openConfirmModal(selectedItems);
    };

    const handleUpdatePrice = () => {
        closeConfirmModal();
    };

    const handleClearSelectedItems = () => {
        setSelectedItems({});
    };

    const handleCategoryFilterChange = (event) => {
        setCategoryFilter(event.target.value);
    };

    const handleLocationFilterChange = (event) => {
        setLocationFilter(event.target.value);
    };

    const getLocationName = (locationId) => {
        const foundLocation = location.find(loc => loc.id === locationId);
        return foundLocation ? foundLocation.name : 'Неизвестно';
    };

    const getCategoryName = (categoryId) => {
        const foundCategory = category.find(cat => cat.id === categoryId);
        return foundCategory ? foundCategory.name : 'Неизвестно';
    };

    return (
        <div>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} md={12}>
                    <TextField
                        label="Поиск по матрицам"
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearch}
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Typography variant="h6">Результаты поиска:</Typography>
            <List>
                {searchResults.map(result => (
                    <ListItem key={result.id}>
                        <ListItemText primary={result.name} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="add" onClick={() => handleAddName(result.name)}>
                                <Add />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <Typography variant="h6">Выбранные матрицы:</Typography>
            <Grid container spacing={2} alignItems="center" style={{ marginBottom: '1rem', marginTop: '0rem' }}>
                <Grid item xs={12} sm={6} md={3}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Фильтр по категориям</InputLabel>
                        <Select
                            value={categoryFilter}
                            onChange={handleCategoryFilterChange}
                            label="Фильтр по категориям"
                        >
                            <MenuItem value="Все">Все</MenuItem>
                            {category.map(cat => (
                                <MenuItem key={cat.id} value={cat.name}>{cat.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Фильтр по городам</InputLabel>
                        <Select
                            value={locationFilter}
                            onChange={handleLocationFilterChange}
                            label="Фильтр по городам"
                        >
                            <MenuItem value="Все">Все</MenuItem>
                            {location.map(loc => (
                                <MenuItem key={loc.id} value={loc.name}>{loc.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            {Object.values(selectedItems).map((item, index) => (
                <div key={index}>
                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>{item.name}

                        <IconButton
                            aria-label="remove"
                            onClick={() => handleRemoveItem(item.name)}
                            style={{ marginTop: '-3px' }}>
                            <Remove />
                        </IconButton>
                    </Typography>

                    {item.prices.filter(priceItem => {
                        if (categoryFilter !== 'Все') {
                            return priceItem.microcategory_id === category.find(cat => cat.name === categoryFilter).id;
                        }
                        return true;
                    }).filter(priceItem => {
                        if (locationFilter !== 'Все') {
                            return priceItem.location_id === location.find(loc => loc.name === locationFilter).id;
                        }
                        return true;
                    }).map((priceItem, idx) => (
                        <ListItem key={idx}>
                            <ListItemText
                                secondary={
                                    <TextField
                                        label="Цена"
                                        variant="outlined"
                                        value={priceItem.price || ''}
                                        onChange={(event) => handlePriceChange(item.name, priceItem.microcategory_id, priceItem.location_id, event)}
                                        type="number"
                                        style={{ marginLeft: '1rem', marginTop: '5px' }}
                                    />
                                }
                                primary={`Локация: ${getLocationName(priceItem.location_id)}, Категория: ${getCategoryName(priceItem.microcategory_id)}`}

                            />
                        </ListItem>
                    ))}
                </div>
            ))}

            <Button
                variant="contained"
                color="primary"
                startIcon={<Check />}
                onClick={handleConfirm}
            >
                Подтвердить изменения
            </Button>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<Clear />}
                onClick={handleClearSelectedItems}
                style={{ marginLeft: '1rem' }}
            >
                Очистить список
            </Button>

            <Dialog open={confirmModalOpen} onClose={closeConfirmModal}>
                <DialogTitle>Подтвердить изменение цены</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Вы уверены, что хотите изменить цену
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdatePrice} color="primary" autoFocus>
                        Да, изменить цену
                    </Button>
                    <Button onClick={closeConfirmModal} color="primary">
                        Отмена
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}

export default BaseLine;
