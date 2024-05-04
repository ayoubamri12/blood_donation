import { useState } from 'react';
import { Button as Btn, TextField, RadioGroup, Radio, FormControlLabel, FormGroup } from '@mui/material';
import { DeleteForever, Remove } from '@mui/icons-material';

import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import { Button } from '@mui/joy';
import { HashLoader } from 'react-spinners';
import { Bounce, ToastContainer, toast } from 'react-toastify'
import axiosObj from '@/axios/axiosConfig';

export default function AddParticipants() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        CIN: '',
        nom: '',
        prenom: '',
        genre: '',
        tel: '',
        age: '',
        addresse: '',
        bloodType: '',
        id_camp:1
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        // Check if any of the required fields are empty
        const requiredFields = ['nom', 'prenom', 'CIN', 'tel', 'age', 'addresse'];
        const isEmpty = requiredFields.some((field) => !formData[field]);
    
        if (isEmpty) {
            toast.error('Please fill in all required fields.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return;
        }
    
        setIsLoading(true);
        console.log(formData);
        // Set a timeout to toggle off the loading indicator after 3 seconds (adjust as needed)
        setTimeout(() => {
            axiosObj.post('/api/participants/add',formData,)
            setIsLoading(false);
            toast.success('🦄 Wow so easy!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }, 3000);
    };


    return (
        <div className='p-5 mx-auto' style={{width:"90%"}}>
            <div className="d-flex justify-content-between">
                <Button
                    variant="outlined"
                    color="danger"
                    endDecorator={<DeleteForever />}
                    onClick={() => setOpen(true)}
                >
                    Discard
                </Button>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog>
                        <DialogTitle>Elimenate Participant</DialogTitle>
                        <DialogContent>Saisit le CIN du Participant</DialogContent>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                setOpen(false);
                            }}
                        >
                            <Stack>
                                <FormControl>
                                    <FormLabel>CIN</FormLabel>
                                    <Input autoFocus required />
                                </FormControl>
                               
                                <Button className='mt-4' type="submit">Eleminate</Button>
                            </Stack>
                        </form>
                    </ModalDialog>
                </Modal>
                <Btn variant="contained" className='bg-blue-400'>
                    Terminer Campagne
                </Btn>
            </div>
            <div className='p-4 mt-3  mx-auto bg-white rounded rounded-4 shadow' style={{width:"80%"}}>
                <h2 className='d-block text-center text-dark bg-light p-2 rounded'>Ajouter un participant</h2>

                <div className="mb-3 w-75 mx-auto input-container" style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <div className="input-container">
                        <TextField
                            label="Nom"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            className="mb-3"
                            sx={{ width: '48%', marginRight: '4%', marginBottom: '20px' }}
                            helperText={<span style={{ color: 'red' }}>Ce champ est obligatoire</span>}
                        />

                        <TextField
                            label="Prénom"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            className="mb-3"
                            sx={{ width: '48%', marginBottom: '20px' }}
                            helperText={<span style={{ color: 'red' }}>Ce champ est obligatoire</span>}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                            <TextField
                                label="CIN"
                                name="CIN"
                                value={formData.CIN}
                                onChange={handleChange}
                                variant="outlined"
                                className="mb-3"
                                sx={{ width: '40%' }}
                                helperText={<span style={{ color: 'red' }}>Ce champ est obligatoire</span>}
                            />
                        </div>
                        <TextField
                            label="Téléphone"
                            name="tel"
                            value={formData.tel}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            className="mb-3"
                            sx={{ width: '48%', marginRight: '4%' }}
                            helperText={<span style={{ color: 'red' }}>Ce champ est obligatoire</span>}
                        />
                        <TextField
                            label="Age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            className="mb-3"
                            sx={{ width: '48%' }}
                            helperText={<span style={{ color: 'red' }}>Ce champ est obligatoire</span>}
                        />
                        <FormControl component="fieldset" className="mb-3" sx={{ width: '100%' }}>
                            <FormLabel component="legend">Genre</FormLabel>
                            <RadioGroup
                                aria-label="genre"
                                name="genre"
                                value={formData.genre}
                                onChange={handleChange}
                                row
                            >
                                <FormControlLabel
                                    value="homme"
                                    control={<Radio size="small" sx={{ color: '#0000ff' }} />}
                                    label="Homme"
                                    sx={{ marginRight: '10px' }}
                                />
                                <FormControlLabel
                                    value="femme"
                                    control={<Radio size="small" sx={{ color: '#0000ff' }} />}
                                    label="Femme"
                                />
                            </RadioGroup>
                        </FormControl>
                        <FormControl component="fieldset" className="mb-3" sx={{ width: '100%' }}>
                            <FormLabel component="legend">Groupe Sanguin</FormLabel>
                            <FormGroup>
                                <RadioGroup
                                    aria-label="bloodType"
                                    name="bloodType"
                                    value={formData.bloodType}
                                    onChange={handleChange}
                                    row
                                >
                                    <FormControlLabel
                                        control={<Radio size="small" sx={{ color: '#0000ff' }} />}
                                        label="A+"
                                        name="bloodType"
                                        value="A+"
                                        onChange={handleChange}
                                    />
                                    <FormControlLabel
                                        control={<Radio size="small" sx={{ color: '#0000ff' }} />}
                                        label="A-"
                                        name="bloodType"
                                        value="A-"
                                        onChange={handleChange}
                                    />
                                    <FormControlLabel
                                        control={<Radio size="small" sx={{ color: '#0000ff' }} />}
                                        label="B+"
                                        name="bloodType"
                                        value="B+"
                                        onChange={handleChange}
                                    />
                                    <FormControlLabel
                                        control={<Radio size="small" sx={{ color: '#0000ff' }} />}
                                        label="B-"
                                        name="bloodType"
                                        value="B-"
                                        onChange={handleChange}
                                    />
                                    <FormControlLabel
                                        control={<Radio size="small" sx={{ color: '#0000ff' }} />}
                                        label="O-"
                                        name="bloodType"
                                        value="O-"
                                        onChange={handleChange}
                                    />
                                    <FormControlLabel
                                        control={<Radio size="small" sx={{ color: '#0000ff' }} />}
                                        label="O+"
                                        name="bloodType"
                                        value="O+"
                                        onChange={handleChange}
                                    />
                                    <FormControlLabel
                                        control={<Radio size="small" sx={{ color: '#0000ff' }} />}
                                        label="AB-"
                                        name="bloodType"
                                        value="AB-"
                                        onChange={handleChange}
                                    />
                                    <FormControlLabel
                                        control={<Radio size="small" sx={{ color: '#0000ff' }} />}
                                        label="AB+"
                                        name="bloodType"
                                        value="AB+"
                                        onChange={handleChange}
                                    />
                                </RadioGroup>
                            </FormGroup>
                        </FormControl>
                        <TextField 
                            label="Adresse"
                            name="addresse"
                            value={formData.addresse}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            className="mb-3"
                            helperText={<span style={{ color: 'red' }}>Ce champ est obligatoire</span>}
                        />

                    </div>
                </div>

                <Btn variant="contained" className='bg-blue-700' onClick={handleClick} fullWidth>
                    Ajouter
                </Btn>
                {isLoading && <div className='loading'> <HashLoader color="#FF0000" /></div> }
            </div>
        <ToastContainer />

        </div>
    );
}
