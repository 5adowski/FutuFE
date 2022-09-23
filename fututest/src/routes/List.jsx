import React, { useState, useEffect, useCallback } from 'react';
import endpoints from '../constants/endpoints';
import Loader from '../components/Loader';
import CampaignRow from '../components/CampaignRow'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Box } from '@mui/material'
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";



const List = () => {
    const [data, setData] = useState(); 

    const getAllCamaigns = useCallback(async () => {
        const response = await fetch(endpoints.getAll);
        const fetchedData =  await response.json()
        setData(fetchedData);
    }, [])

    useEffect(() => {
        getAllCamaigns();
    }, [])

    if (!data) return <Loader />
    return (
        <Box padding={2}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Keywords</TableCell>
                            <TableCell>Bid</TableCell>
                            <TableCell>Fund</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Town</TableCell>
                            <TableCell>Radius</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{data.map((props) => <CampaignRow key={props.id} {...props} />)}</TableBody>
                </Table>
            </TableContainer>
            <Box marginTop={2}>
                <Button as={Link} to='/add' variant='contained' color='success'>Add new</Button>
            </Box>
        </Box>
    )
}

export default List
