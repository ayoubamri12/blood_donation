import { useState } from 'react';
import { Button as Btn, TextField, RadioGroup, Radio, FormControlLabel, FormGroup } from '@mui/material';
import { DeleteForever } from '@mui/icons-material';

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
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

export default function AddParticipants() {
    const [open, setOpen] = useState(false);
    const [eleminatedParticpant, setEleminatedParticpant] = useState(false);
    const {id}= useParams()
    const [formData, setFormData] = useState({
        CIN: '',
        nom: '',
        prenom: '',
        genre: '',
        tel: '',
        age: '',
        addresse: '',
        bloodType: '',
        id_camp: id
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const [isLoading, setIsLoading] = useState(false);
    const handleEleminated = () => {
        if (!eleminatedParticpant) {
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

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                setIsLoading(true);
                setTimeout(() => {
                    axiosObj.delete(`/api/participants/${eleminatedParticpant}/delete`);
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
                }, 3000)
            }
        });

        // Set a timeout to toggle off the loading indicator after 3 seconds (adjust as needed)


    }
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

       
            axiosObj.post('/api/participants/add', formData).then(()=>{
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

            // Clear the form data
            setFormData({
                CIN: '',
                nom: '',
                prenom: '',
                genre: '',
                tel: '',
                age: '',
                addresse: '',
                bloodType: '',
                id_camp: 1,
            });
            });
            
      
    };


    return (
        <div className='p-5 mx-auto' style={{ width: "90%" }}>
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
                                    <Input autoFocus onChange={(e) => {
                                        setEleminatedParticpant(e.target.value)
                                    }} />
                                </FormControl>
                                <div className='d-flex '>
                                    <Button className='mt-4' type="submit" onClick={handleEleminated}>Eleminate</Button>
                                    <Button className='mt-4 bg-danger ms-auto' type="button" onClick={() => setOpen(false)}>Annuler</Button>
                                </div>
                            </Stack>
                        </form>
                    </ModalDialog>
                </Modal>
                <Btn variant="contained" className='bg-yellow-400'>
                    Terminer Campagne
                </Btn>
            </div>
            <div className='p-4 mt-3  mx-auto bg-gradient rounded rounded-4 shadow' style={{ width: "80%" }}>
                <h1 className='d-block text-center text-danger font-extrabold'>Ajouter un participant</h1>

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
                            helperText={"se champ est obligatoire"}
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
                            helperText={"se champ est obligatoire"}
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
                                helperText={"se champ est obligatoire "}
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
                            helperText={"se champ est obligatoire"}
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
                            helperText={"se champ est obligatoire"}
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
                                    control={<Radio size="small" sx={{ color: '#ff0000' }} />}
                                    label="Homme"
                                    sx={{ marginRight: '10px' }}

                                />
                                <FormControlLabel
                                    value="femme"
                                    control={<Radio size="small" sx={{ color: '#ff0000' }} />}
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
                                        control={<Radio size="small" sx={{ color: '#ff0000' }} />}
                                        label="A+"
                                        name="bloodType"
                                        value="A+"
                                        onChange={handleChange}
                                    />
                                    <FormControlLabel
                                        control={<Radio size="small" sx={{ color: '#ff0000' }} />}
                                        label="A-"
                                        name="bloodType"
                                        value="A-"
                                        onChange={handleChange}
                                    />
                                    <FormControlLabel
                                        control={<Radio size="small" sx={{ color: '#ff0000' }} />}
                                        label="B+"
                                        name="bloodType"
                                        value="B+"
                                        onChange={handleChange}
                                    />
                                    <FormControlLabel
                                        control={<Radio size="small" sx={{ color: '#ff0000' }} />}
                                        label="B-"
                                        name="bloodType"
                                        value="B-"
                                        onChange={handleChange}
                                    />
                                    <FormControlLabel
                                        control={<Radio size="small" sx={{ color: '#ff0000' }} />}
                                        label="O-"
                                        name="bloodType"
                                        value="O-"
                                        onChange={handleChange}
                                    />
                                    <FormControlLabel
                                        control={<Radio size="small" sx={{ color: '#ff0000' }} />}
                                        label="O+"
                                        name="bloodType"
                                        value="O+"
                                        onChange={handleChange}
                                    />
                                    <FormControlLabel
                                        control={<Radio size="small" sx={{ color: '#ff0000' }} />}
                                        label="AB-"
                                        name="bloodType"
                                        value="AB-"
                                        onChange={handleChange}
                                    />
                                    <FormControlLabel
                                        control={<Radio size="small" sx={{ color: '#ff0000' }} />}
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
                            helperText={"se champ est obligatoire"}
                        />

                    </div>
                </div>

                <Btn variant="contained" className='bg-red-700' onClick={handleClick} fullWidth>
                    Ajouter
                </Btn>
                {isLoading && <div className='loading'> <HashLoader color="#FF0000" /></div>}
            </div>
            <ToastContainer />

        </div>
    );
}