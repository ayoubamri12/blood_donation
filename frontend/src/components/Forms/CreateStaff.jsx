import  { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

const CreateStaff = () => {
    const [formData, setFormData] = useState({
        CIN: '',
        nom: '',
        prenom: '',
        tel: '',
        genre: '',
        grade: '',
        id_camp: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/your-backend-route', formData)
            .then(response => {
                console.log(response.data);
                // Handle success response
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle error response
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="CIN"
                name="CIN"
                value={formData.CIN}
                onChange={handleChange}
            />
            <TextField
                label="Nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
            />
            <TextField
                label="Prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
            />
            <TextField
                label="Tel"
                name="tel"
                value={formData.tel}
                onChange={handleChange}
            />
            <FormControl>
                <InputLabel>Genre</InputLabel>
                <Select
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
            />
            <TextField
                label="ID Camp"
                name="id_camp"
                value={formData.id_camp}
                onChange={handleChange}
            />
            <Button variant="contained" type="submit">Submit</Button>
        </form>
    );
};

export default CreateStaff;
