import CounterBtn from '@/components/common/CounterBtn'
import Container from '@/components/layout/Container';
import Slider from '@/components/layout/Slider';
import { AdsClick, DeleteForever, SelectAll } from '@mui/icons-material';
import { Button } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from "react-icons/fa";
export default function CampaignModifs() {
    const [counter, setCounter] = useState(0);
    const [slidesNumber, setSlidesNumber] = useState([]);
    useEffect(() => {
        if (!window.sessionStorage.getItem('user')) {
          navigate('/');
        }
      },[]);
    return (
        <div className='p-5 mx-auto' style={{ width: "90%" }}>
            <div className="row w-11/12 justify-between mx-auto rounded-xl shadow-xl mt-7 p-7 mb-7">
                <div className="row mb-4">
                    <h1 className='text-red-700 font-extrabold w-fit mx-auto'>combien de membres tu veux ajouter ?</h1>
                </div>
                <div className="row justify-between w-50 ">
                    <CounterBtn onClick={() => {
                        if (counter === 0)
                            return
                        setSlidesNumber(slidesNumber.filter(e=>e!=counter))
                        setCounter(counter - 1)
                        console.log(slidesNumber);

                    }} >
                        <FaMinus />
                    </CounterBtn>
                    <input type="text" value={counter} className="border border-gray-400 rounded-md h-10 w-3/5 text-center text-gray-400 font-medium text-2xl content-center" />
                    <CounterBtn onClick={() => {
                        if (counter === 10)
                            return
                        setCounter(counter + 1)
                        setSlidesNumber([...slidesNumber,counter])
                        console.log(slidesNumber);
                    }}>
                        <FaPlus />
                    </CounterBtn>
                </div>
                <div className="col-3 text-end">
                    <Button
                        variant="outlined"
                        endDecorator={<AdsClick />}
                        color='danger'
                        className='bg-red-700 text-white'
                    >
                        Suivant

                    </Button>
                </div>
            </div>
            <Container>
                    <Slider slides={0} numberOfSlides={slidesNumber}/>
            </Container>
        </div>
    )
}
