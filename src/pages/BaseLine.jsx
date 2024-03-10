import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Add, Check, Clear } from '@mui/icons-material';

function BaseLine() {
    const initialNames = [
        { id: 1, microcategory_id: 1, location_id: 1, name: 'BaseLine 1', price: 100 },
        { id: 2, microcategory_id: 2, location_id: 2, name: 'BaseLine 2', price: 200 },
        { id: 3, microcategory_id: 3, location_id: 3, name: 'BaseLine 3', price: 300 },
        { id: 4, microcategory_id: 4, location_id: 4, name: 'BaseLine 4', price: 1000 },
        { id: 5, microcategory_id: 5, location_id: 5, name: 'BaseLine 44', price: 1200 },
        { id: 6, microcategory_id: 6, location_id: 6, name: 'BaseLine 104', price: 1300 },
        { id: 7, microcategory_id: 7, location_id: 7, name: 'BaseLine 200', price: 1100 },
        { id: 8, microcategory_id: 8, location_id: 8, name: 'BaseLine 5', price: 1030 },
        { id: 9, microcategory_id: 8, location_id: 8, name: 'BaseLine 6', price: 1200 },
        { id: 10, microcategory_id: 8, location_id: 8, name: 'BaseLine 7', price: 1500 },
        { id: 11, microcategory_id: 7, location_id: 6, name: 'BaseLine 8', price: 900 },
        { id: 12, microcategory_id: 7, location_id: 7, name: 'BaseLine 9', price: 800 },
        { id: 13, microcategory_id: 6, location_id: 5, name: 'BaseLine 10', price: 700 },
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

    const getLocationName = (locationId) => {
        const foundLocation = location.find(loc => loc.id === locationId);
        return foundLocation ? foundLocation.name : 'Неизвестно';
    };

    const getCategoryName = (categoryId) => {
        const foundCategory = category.find(cat => cat.id === categoryId);
        return foundCategory ? foundCategory.name : 'Неизвестно';
    };

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

    const handlePriceChange = (name, event) => {
        const updatedNames = names.map(item => {
            if (item.name === name) {
                return {
                    ...item,
                    price: event.target.value,
                };
            }
            return item;
        });
        setNames(updatedNames);

        setSelectedItems({
            ...selectedItems,
            [name]: {
                ...selectedItems[name],
                price: event.target.value,
            },
        });
    };

    const openConfirmModal = (item) => {
        setSelectedItemToUpdate(item);
        setConfirmModalOpen(true);
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

    return (
        <div>
            <TextField
                label="Поиск по матрицам"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
                fullWidth
                style={{ marginBottom: '1rem' }}
            />
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
            <List>
                {Object.values(selectedItems).map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={item.name} secondary={`Локация: ${getLocationName(item.location_id)}, Категория: ${getCategoryName(item.microcategory_id)}`} />
                        <TextField
                            label="Цена"
                            variant="outlined"
                            value={item.price || ''}
                            onChange={(event) => handlePriceChange(item.name, event)}
                            type="number"
                        />
                    </ListItem>
                ))}
            </List>

            <Button
                variant="contained"
                color="primary"
                startIcon={<Check />}
                onClick={handleConfirm}
            >
                Подтвердить
            </Button>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<Clear />}
                onClick={handleClearSelectedItems}
                style={{ marginLeft: '1rem' }}
            >
                Очистить
            </Button>

            <Dialog open={confirmModalOpen} onClose={closeConfirmModal}>
                <DialogTitle>Подтвердить изменение цены</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Вы уверены, что хотите изменить цену для выбранных элементов?
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
