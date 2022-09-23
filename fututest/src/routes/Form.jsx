import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { TextField, Button, Grid } from '@mui/material';
import endpoints from '../constants/endpoints';
import { useNavigate  } from 'react-router';


const parseForApi = (data) => {
    const parsedData = {
        ...data,
        // keyWords: data.keyWords.split(', ')
    }
    JSON.stringify(parsedData)
}

const Form = () => {
    const navigate = useNavigate()
    const [formState, setFormState] = useState({
        name: '',
        keyWords: '',
        bid: '',
        fund: '',
        status: '',
        town: '',
        radius: '',
    });
    const { id } = useParams()

    const getCamaign = useCallback(async () => {
        const response = await fetch(`${endpoints.getOne}/${id}`);
        const fetchedData =  await response.json();
        const newState = {
            name: fetchedData.name,
            keyWords: fetchedData.keyWords,
            bid: fetchedData.bid,
            fund: fetchedData.fund,
            status: fetchedData.status,
            town: fetchedData.town,
            radius: fetchedData.radius,
        }
        setFormState(fetchedData);
    }, [])

    useEffect(() => {
        if(id) getCamaign();
    }, [id])

    const onChange = (e) => {
        setFormState(prev => ({
            ...prev, 
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(id) {
            const response = await fetch(`${endpoints.getOne}/post`, {
                method: 'POST',
                body: parseForApi(formState)
            })
            const data = await response.json();
            if(data.status < 300) {
                alert('Data updated!')
                navigate('/')
            }
        } else {
            const response = await fetch(endpoints.getOne, {
                method: 'POST',
                body: parseForApi(formState)
            })
            const data = await response.json();
            if(data.status < 300) {
                alert('Data created!')
                navigate('/')
            }
        }
    }

    const onDelete = async () => {
        const response = await fetch(`${endpoints.getOne}/${id}`, {
            method: 'DELETE',
        })
        const data = await response.json();
        if(data.status < 300) {
            alert('Entity removed!')
            navigate('/')
        }
    }

    return <form onSubmit={onSubmit}>
        <Grid container spacing={2} mt={2}>
            <Grid item sm={6} xs={12}><TextField name='name' value={formState.name} onChange={onChange} /></Grid>
            <Grid item sm={6} xs={12}><TextField name='keyWords' value={formState.keyWords} onChange={onChange} /></Grid>
            <Grid item sm={6} xs={12}><TextField name='bid' value={formState.bid} onChange={onChange} /></Grid>
            <Grid item sm={6} xs={12}><TextField name='fund' value={formState.fund} onChange={onChange} /></Grid>
            <Grid item sm={6} xs={12}><TextField name='status' value={formState.status} onChange={onChange} /></Grid>
            <Grid item sm={6} xs={12}><TextField name='town' value={formState.town} onChange={onChange} /></Grid>
            <Grid item sm={6} xs={12}><TextField name='radius' value={formState.radius} onChange={onChange} /></Grid>

            <Grid item sm={6} xs={12}>
                <Button variant='contained' color='primary' type='submit'>{id ? 'Save' : 'Create'}</Button>
            </Grid>
            <Grid item sm={6} xs={12}>
                {id && <Button onClick={onDelete} variant='contained' color='error'>Delete</Button>}
            </Grid>
        </Grid>
    </form>
}

export default Form