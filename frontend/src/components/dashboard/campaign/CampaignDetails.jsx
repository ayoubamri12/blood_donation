import React, { useEffect } from 'react'
import { useState } from 'react';
import { Select, MenuItem, FormControl as FCntrl } from '@mui/material';
import { Create } from '@mui/icons-material';
import { Button, DialogContent, DialogTitle, FormLabel, Input, Modal, ModalDialog, Stack } from '@mui/joy';
import FormControl from '@mui/joy/FormControl';
import Container from '@/components/layout/Container';
import Label from '@/components/common/Label';
import axiosObj from '@/axios/axiosConfig';
import { Bounce, ToastContainer as Toastify, toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_campgain } from '@/components/redux/actions/actionsCreator';
import { useNavigate } from 'react-router-dom';
export default function CampaignDetails() {
    const [places, setPlaces] = useState([]);
    const [newPlace, setNewPlace] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const camp = useSelector((state) => state.campaign);
    useEffect(() => {
        axiosObj.get('/api/places').then((data) =>{
            console.log(data.data.data);
            setPlaces(data.data.data)
        });
    }, [isLoading]);
    const [inputVals, setInputVals] = useState({
        title: '',
        lieu: '',
    });
    const [open, setOpen] = useState(false);

    function handleChange(e) {
        setInputVals({ ...inputVals, [e.target.name]: e.target.value });
    }
    const addPlace = (event) => {
        event.preventDefault();
        //const pattern = /^[A-Z]{2,}_\w+$/;
        setIsLoading(true);

        setTimeout(() => {
            axiosObj.post(`/api/places/add`, { place: newPlace }).then(() => setIsLoading(false));
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
        setOpen(false);
    }
    return (
        <div className={`${(Object.keys(camp).length && !camp.endTime) && "opacity-70"} w-4/3 mx-auto p-5`}>
            <Button
                disabled={(Object.keys(camp).length && !camp.endTime) && true}
                variant="outlined"
                color='danger'
                endDecorator={<Create />}
                onClick={() => setOpen(true)}
            >
                Ajouter lieu
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog>
                    <DialogTitle>Éliminer un participant</DialogTitle>
                    <DialogContent>Saisissez le lieu de la campagne</DialogContent>
                    <form
                        onSubmit={(event) => {
                            addPlace(event)
                        }}
                    >
                        <Stack>
                            <FormControl>
                                <FormLabel>Libellé du lieu</FormLabel>
                                <Input autoFocus onChange={(e) => {
                                    setNewPlace(e.target.value)
                                }} />
                                <small className='text-gray-300 block w-fit ms-2'>Veuillez respecter le format suivant : NOM_Ville</small>
                            </FormControl>
                            <div className='d-flex'>
                                <Button className='mt-4 bg-success' type="submit">Ajouter</Button>
                                <Button className='mt-4 bg-danger ms-auto' type="button" onClick={() => setOpen(false)}>Annuler</Button>
                            </div>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
            <h1 className="text-red-700 font-bold mb-4 text-3xl block w-fit mx-auto">Détails de la campagne</h1>
            <Container>
                <form>
                    <div className="mb-3 w-75 mx-auto">
                        <Label className={"text-red-600 py-2 after"} label="Titre de la campagne :" />

                        <input type={"text"} name={"title"} disabled={(Object.keys(camp).length && !camp.endTime) && true} onChange={handleChange} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  flex-1 outline-red-500`} placeholder={"Titre de la campagne"} value={inputVals.title} />
                    </div>
                    <div className="mb-3 w-75 mx-auto">
                        <Label className={"text-red-600 py-2 after"} label="Lieu de la campagne :" />
                        <FCntrl fullWidth>
                            <Select
                                disabled={(Object.keys(camp).length && !camp.endTime) && true}
                                labelId="lieu-label"
                                name="lieu"
                                variant="outlined"
                                value={inputVals.lieu}
                                onChange={handleChange}
                            >
                                <MenuItem value="" selected>Sélectionner le lieu</MenuItem>
                                {
                                    places.map(place => <MenuItem key={place.id} value={place.id}>{place.placeName}</MenuItem>)
                                }
                            </Select>
                        </FCntrl>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="button" disabled={!(inputVals.title && inputVals.lieu)} className={`${!(inputVals.title && inputVals.lieu) && "opacity-45"} mt-3 text-white bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-9 py-2.5 text-center`} onClick={() => {
                            setIsLoading(true);

                            setTimeout(() => {
                                axiosObj.post(`/api/campaigns/add`, inputVals).then((data) => {
                                    setIsLoading(false)
                                    dispatcher(fetch_campgain(data.data.data))
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
                                    navigate("/startCampaign")
                                });


                            }, 2000)
                            setOpen(false);

                        }}>Créer</button>
                    </div>
                </form>
            </Container>
            <Toastify
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
/>
            {/* Same as */}
            <Toastify />
          
            {isLoading && <div className='loading'> <HashLoader color="#FF0000" /></div>}

        </div>
    );
}
