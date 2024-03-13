import React, { useState, useEffect } from 'react';
import { TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import axios from 'axios';

function Storage() {
    const [names, setNames] = useState([]); // Состояние для хранения списка имен
    const [searchTerm, setSearchTerm] = useState(''); // Состояние для хранения строки поиска
    const [searchResults, setSearchResults] = useState([]); // Состояние для хранения результатов поиска
    const [selectedUUID, setSelectedUUID] = useState(null); // Хранение выбранного UUID
    const [matrixData, setMatrixData] = useState([]); // Состояние для хранения данных по выбранной матрице
    const [currentPage, setCurrentPage] = useState(0); // Состояние для хранения номера текущей страницы
    const [storageData, setStorageData] = useState({ // Состояние для хранения данных в storage
        baseLineMatrix: null, // Базовая матрица
        discountMatrices: [] // Массив матриц скидок
    });

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/admin`);
                const filteredData = response.data.filter(item => item.name.startsWith('baselineMatrix_') || item.name.startsWith('discountMatrix'));
                setNames(filteredData.slice(0, 10));
                setSearchResults(filteredData); // Установка всех данных в searchResults
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
        const isBaseline = name.startsWith('baselineMatrix_');
        let alreadyExists = false;

        if (isBaseline) {
            alreadyExists = storageData.baseLineMatrix && storageData.baseLineMatrix.uuid === uuid;
        } else {
            alreadyExists = storageData.discountMatrices.some(matrix => matrix.uuid === uuid);
        }

        if (!alreadyExists) {
            if (isBaseline) {
                setStorageData(prevData => ({
                    ...prevData,
                    baseLineMatrix: {
                        name,
                        uuid
                    }
                }));
            } else {
                setStorageData(prevData => ({
                    ...prevData,
                    discountMatrices: [
                        ...prevData.discountMatrices,
                        {
                            name,
                            uuid
                        }
                    ]
                }));
            }
        } else {
            console.log('Матрица уже добавлена в storage');
        }
    };

    const handleCreateStorage = async () => {
        try {
            const formattedData = {
                baseline: storageData.baseLineMatrix.name,
                discount: {}
            };

            storageData.discountMatrices.forEach(matrix => {
                formattedData.discount[matrix.uuid] = matrix.name;
            });

            const response = await axios.post(`${backendUrl}/api/admin/storage`, formattedData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Storage успешно создан:', response.data);
        } catch (error) {
            console.error('Ошибка при создании Storage:', error);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
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
                    <ListItem key={result.uuid}>
                        <ListItemText primary={result.name} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="add" onClick={() => handleAddName(result.name, result.uuid)}>
                                <Add />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>

            <Typography variant="h6">Собранный storage:</Typography>
            {storageData.baseLineMatrix && (
                <Typography>{`baseline: ${storageData.baseLineMatrix.name}`}</Typography>
            )}
            {storageData.discountMatrices.map((matrix, index) => (
                <Typography key={index}>{`discount:${matrix.name}`}</Typography>
            ))}

            <Button onClick={handleCreateStorage} variant="contained" color="primary">Создать Storage</Button>
        </div>
    );
}

export default Storage;
