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
import { useNavigate, useParams } from 'react-router-dom';
import { fetch_campgain } from '@/components/redux/actions/actionsCreator';
import { useDispatch } from 'react-redux';

export default function AddParticipants() {
    const [open, setOpen] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const [formData, setFormData] = useState({
        CIN: '',
        nom: '',
        prenom: '',
        genre: '',
        tel: '',
        age: '',
        addresse: '',
        bloodType: '',
        id_camp:id
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
                <Btn variant="contained" className='bg-yellow-400' onClick={() => {
                    const now = new Date();
                    let hours = now.getHours();
                    let minutes = now.getMinutes();

                    // Add leading zeros if necessary
                    hours = hours < 10 ? '0' + hours : hours;
                    minutes = minutes < 10 ? '0' + minutes : minutes;

                    const endTime = hours + ':' + minutes;
                    setIsLoading(true);

                    axiosObj.put(`/api/campaigns/${id}/update`, { endTime }).then((data) => {
                        dispatcher(fetch_campgain({}));
                        setIsLoading(false);
                        navigate(`/createCamp`)
                    });
                  }}>
                    Terminer Campagne
                </Btn>
            </div>
            <div className='p-4 mt-3  mx-auto bg-gradient rounded rounded-4 shadow' style={{width:"80%"}}>
                <h2 className='d-block text-center text-danger'>Ajouter un participant</h2>

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
                {isLoading && <div className='loading'> <HashLoader color="#FF0000" /></div> }
            </div>
        <ToastContainer />

        </div>
    );
}