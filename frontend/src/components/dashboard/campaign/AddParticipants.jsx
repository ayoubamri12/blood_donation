import { useEffect, useState } from 'react';
import { Button as Btn, TextField, RadioGroup, Radio, FormControlLabel, FormGroup } from '@mui/material';
import { DeleteForever, SecurityUpdateWarningOutlined } from '@mui/icons-material';
import "react-toastify/dist/ReactToastify.css";
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
import Swal from 'sweetalert2';

export default function AddParticipants() {
    useEffect(() => {
        if (!window.sessionStorage.getItem('user')) {
            navigate('/');
          }
    }, []);
    const [open, setOpen] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const [wanted, setWanted] = useState();
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
    const deleteParticipant = (event) => {
        event.preventDefault();
        
      if(!wanted){
        toast.error('Veuillez remplir le champ CIN.', {
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
        title: 'Confirmation',
        text: 'Êtes-vous sûr(e) de vouloir éliminer ce participant ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmer',
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.isConfirmed) {
            setIsLoading(true);
            axiosObj.delete(`/api/participants/${wanted}/delete`).then(() =>{
                setIsLoading(false)
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
               });

        }
      });
      setOpen(false);
       
                     
       
       
    }
    const handleClick = () => {
        // Check if any of the required fields are empty
        const requiredFields = ['nom', 'prenom', 'CIN', 'tel', 'age', 'addresse'];
        const isEmpty = requiredFields.some((field) => !formData[field]);

        if (isEmpty) {
            toast.error('Veuillez remplir tous les champs obligatoires.', {
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
        setTimeout(() => {
            axiosObj.post('/api/participants/add', formData)
            setIsLoading(false);
            toast.success("Le participant a été ajouté avec succès.", {
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
            setFormData({
                CIN: '',
                nom: '',
                prenom: '',
                genre: '',
                tel: '',
                age: '',
                addresse: '',
                bloodType: '',
                id_camp: id
            })
        }, 3000);
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
                    Annuler 
                </Button>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog>
                        <DialogTitle>Supprimer un participant</DialogTitle>
                        <DialogContent>Saisissez le CIN du participant</DialogContent>
                        <form
                            onSubmit={(event) => {
                                deleteParticipant(event)
                            }}
                        >
                            <Stack>
                                <FormControl>
                                    <FormLabel>CIN</FormLabel>
                                    <Input autoFocus onChange={(e)=>{
                                        e.target.value=e.target.value.toUpperCase()
                                        setWanted(e.target.value.toUpperCase())
                                    }}/>
                                </FormControl>

                               <div className='row mt-4 justify-between'>
                               <Button className='col-4 bg-danger' type="submit">Supprimer</Button>
                                <Button className='col-4 bg-warning' type="button" onClick={()=>{
                                    setOpen(false)
                                }}>Annuler</Button>
                               </div>
                            </Stack>
                        </form>
                    </ModalDialog>
                </Modal>
                <Btn variant="contained" className='bg-yellow-400' onClick={() => {
                    const now = new Date();
                    let hours = now.getHours();
                    let minutes = now.getMinutes();
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
            <div className='p-4 mt-3  mx-auto bg-gradient rounded rounded-4 shadow' style={{ width: "80%" }}>
                <h2 className='d-block text-center text-danger font-extrabold '>Ajouter un participant</h2>

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