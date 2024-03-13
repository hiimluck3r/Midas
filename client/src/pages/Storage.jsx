import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
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

    const [segments, setSegments] = useState([]); // Состояние для хранения списка сегментов

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

        const fetchSegments = async () => {
            try {
                const response = await axios.get('https://api.novodigital.ru/api/json/segments');
                setSegments(response.data);
            } catch (error) {
                console.error('Произошла ошибка при запросе сегментов:', error);
            }
        };

        fetchData();
        fetchSegments();
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
                            uuid,
                            segmentId: '' // Начальное значение сегмента
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
                baseline: `baseline_matix_${storageData.baseLineMatrix.name.split('_')[1]}`, // Форматируем имя базовой матрицы
                discount: {}
            };

            storageData.discountMatrices.forEach(matrix => {
                formattedData.discount[matrix.name] = { segmentId: matrix.segmentId }; // Включаем только имя и ID сегмента в формат данных
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



            {/* Таблица с хранилищами и сегментами */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <Typography variant="h6">Собранный storage:</Typography>
                    {storageData.baseLineMatrix && (
                        <Typography>{`baseline: ${storageData.baseLineMatrix.name}`}</Typography>
                    )}
                    {storageData.discountMatrices.map((matrix, index) => (
                        <div key={index}>
                            <Typography>{`discount:${matrix.name}`}</Typography>
                            <select value={matrix.segmentId} onChange={(e) => {
                                const newSegmentId = e.target.value;
                                setStorageData(prevData => ({
                                    ...prevData,
                                    discountMatrices: prevData.discountMatrices.map((item, idx) => idx === index ? { ...item, segmentId: newSegmentId } : item)
                                }));
                            }}>
                                <option value="">Выберите сегмент</option>
                                {segments.map(segment => (
                                    <option key={segment.id} value={segment.segment}>{segment.segment}</option>
                                ))}
                            </select>
                        </div>
                    ))}

                    <Button onClick={handleCreateStorage} variant="contained" color="primary">Создать Storage</Button>
                </div>
                <div>
                    <Typography variant="h6">Сегменты:</Typography>
                    <TableContainer component={Paper}>
                    <TableContainer component={Paper}>
    <Table aria-label="segment table">
        <TableHead>
            <TableRow>
                {segments.slice(0, Math.ceil(segments.length / 4)).map(segment => (
                    <TableCell key={segment.id} align="center">{segment.segment}</TableCell>
                ))}
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
                {segments.slice(Math.ceil(segments.length / 4), Math.ceil(segments.length / 2)).map(segment => (
                    <TableCell key={segment.id} align="center">{segment.segment}</TableCell>
                ))}
            </TableRow>
            <TableRow>
                {segments.slice(Math.ceil(segments.length / 2), Math.ceil((segments.length / 4) * 3)).map(segment => (
                    <TableCell key={segment.id} align="center">{segment.segment}</TableCell>
                ))}
            </TableRow>
            <TableRow>
                {segments.slice(Math.ceil((segments.length / 4) * 3)).map(segment => (
                    <TableCell key={segment.id} align="center">{segment.segment}</TableCell>
                ))}
            </TableRow>
        </TableBody>
    </Table>
</TableContainer>

                    </TableContainer>
                </div>
            </div>
        </div>
    );
}

export default Storage;
