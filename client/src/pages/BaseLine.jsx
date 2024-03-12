import React, { useState, useEffect } from 'react';
import { TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Add, Edit } from '@mui/icons-material';
import axios from 'axios';

function BaseLine() {
    const [names, setNames] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUUID, setSelectedUUID] = useState(null); // Хранение выбранного UUID
    const [matrixData, setMatrixData] = useState([]); // Хранение данных по выбранной матрице
    const [currentPage, setCurrentPage] = useState(0); // Номер текущей страницы
    const [editData, setEditData] = useState(null); // Данные для редактирования
    const [openEditDialog, setOpenEditDialog] = useState(false); // Состояние открытия диалога редактирования
    const backendUrl = import.meta.env.VITE_BACKEND_URL;



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/admin`);
                console.log(backendUrl);
                const filteredData = response.data.filter(item => item.name.startsWith('baselineMatrix_') || item.name.startsWith('discountMatrix'));
                setNames(filteredData.slice(0, 10));
            } catch (error) {
                console.error('Произошла ошибка при запросе к API:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchMatrixData = async () => {
            if (selectedUUID) {
                try {
                    const response = await axios.get(`${backendUrl}/api/admin/${selectedUUID}/${currentPage}`);
                    setMatrixData(response.data);
                } catch (error) {
                    console.error('Произошла ошибка при запросе данных по UUID:', error);
                }
            }
        };

        fetchMatrixData();
    }, [selectedUUID, currentPage]);

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        const results = names.filter(name => name.name.toLowerCase().includes(term.toLowerCase())).slice(0, 5);
        setSearchResults(results);
    };

    const handleAddName = (name, uuid) => {
        setSelectedUUID(uuid); // Установка выбранного UUID
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleEdit = (data) => {
        setEditData(data); // Установка данных для редактирования
        setOpenEditDialog(true); // Открытие диалога редактирования
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false); // Закрытие диалога редактирования
        setEditData(null); // Сброс данных для редактирования
    };

    const handleSaveEdit = async () => {
        try {
            // Создаем объект данных для отправки на сервер
            const requestData = {
                dbID: "ec8805ca-0baf-4455-9e3a-e40d00e21f61",
                arr_obj: [
                    {
                        _id: editData._id,
                        newPrice: editData.newPrice
                    }
                ]
            };

            // Отправляем POST-запрос на сервер с данными для сохранения
            const response = await axios.post(`${backendUrl}/api/admin/`, requestData);
            console.log('Данные успешно сохранены:', response.data);

            // Закрываем диалог и сбрасываем данные для редактирования
            setOpenEditDialog(false);
            setEditData(null);
        } catch (error) {
            console.error('Произошла ошибка при сохранении данных:', error);
        }
    };
    const handlePriceChange = (value) => {
        setEditData(prevState => ({
            ...prevState,
            price: value
        }));
    };
    const handleLocationIdChange = (value) => {
        setEditData(prevState => ({
            ...prevState,
            locationId: value
        }));
    };

    // Функция для обработки изменений значения Microcategory ID
    const handleMicrocategoryIdChange = (value) => {
        setEditData(prevState => ({
            ...prevState,
            microcategoryId: value
        }));
    };

    return (
        <div>
            <TextField
                label="Поиск по матрицам"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
                fullWidth
                sx={{

                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#ffaa01'
                        },
                        '&:hover fieldset': {
                            borderColor: '#ffaa01'
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#ffaa01'
                        },
                        '&.Mui-focused label': {
                            color: '#ffaa01'
                        }
                    }
                }}
            />

            <Button onClick={handlePreviousPage} disabled={currentPage === 0 || matrixData.length === 0} sx={{ color: '#ffaa01' }}>Предыдущая страница</Button>
            <Button onClick={handleNextPage} disabled={matrixData.length === 0} sx={{ color: '#ffaa01' }}>Следующая страница</Button>


            <Typography variant="h6">Результаты поиска:</Typography>
            <List>
                {searchResults.map(result => (
                    <ListItem key={result.id}>
                        <ListItemText primary={result.name} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="add" onClick={() => handleAddName(result.name, result.uuid)}>
                                <Add />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <Typography variant="h6">Данные по выбранной матрице:</Typography>
            <List>
                {matrixData.map((dataItem, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={`ID: ${dataItem._id}, Location ID: ${dataItem.locationId}, Microcategory ID: ${dataItem.microcategoryId}, Price: ${dataItem.price}`} />
                        <IconButton aria-label="edit" onClick={() => handleEdit(dataItem)}>
                            <Edit />
                        </IconButton>
                    </ListItem>
                ))}
            </List>

            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Редактировать данные</DialogTitle>
                <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                    <DialogTitle>Редактировать данные</DialogTitle>
                    <DialogContent>
                        {/* Форма для редактирования данных */}
                        {editData && (
                            <div>
                                <TextField
                                    label="ID"
                                    variant="outlined"
                                    value={editData._id}
                                    disabled
                                    fullWidth
                                    onChange={(e) => handleLocationIdChange(e.target.value)}
                                />
                                <TextField
                                    label="Location ID"
                                    variant="outlined"
                                    value={editData.locationId}
                                    fullWidth
                                    onChange={(e) => handleLocationIdChange(e.target.value)}
                                />
                                <TextField
                                    label="Microcategory ID"
                                    variant="outlined"
                                    value={editData.microcategoryId}
                                    fullWidth
                                    onChange={(e) => handleMicrocategoryIdChange(e.target.value)}
                                />
                                <TextField
                                    label="Price"
                                    variant="outlined"
                                    value={editData.price}
                                    fullWidth
                                    onChange={(e) => handlePriceChange(e.target.value)}
                                />
                            </div>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEditDialog}>Отмена</Button>
                        <Button onClick={handleSaveEdit}>Сохранить</Button>
                    </DialogActions>
                </Dialog>

                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Отмена</Button>
                    <Button onClick={handleSaveEdit}>Сохранить</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default BaseLine;
