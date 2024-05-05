import CounterBtn from '@/components/common/CounterBtn'
import Container from '@/components/layout/Container';
import Slider from '@/components/layout/Slider';
import { DeleteForever } from '@mui/icons-material';
import { Button } from '@mui/joy';
import React, { useState } from 'react';
import { FaMinus, FaPlus } from "react-icons/fa";
export default function CampaignModifs() {
    const [counter, setCounter] = useState(0);
    const [slidesNumber, setSlidesNumber] = useState(["ele"]);
    return (
        <div className='p-5 mx-auto' style={{ width: "90%" }}>
            <div className="row w-11/12 justify-between mx-auto">
                <div className="row justify-between w-25">
                    <CounterBtn onClick={() => {
                        if (counter === 0)
                            return
                        setSlidesNumber(slidesNumber.filter(e=>e!=`ele${counter}`))
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
                        setSlidesNumber([...slidesNumber,`ele${counter}`])
                        console.log(slidesNumber);
                    }}>
                        <FaPlus />
                    </CounterBtn>
                </div>
                <div className="col-3 text-end">
                    <Button
                        variant="outlined"
                        color="danger"
                        endDecorator={<DeleteForever />}
                    >
                        Discard

                    </Button>
                </div>
            </div>
            <Container>
                    <Slider slides={0} numberOfSlides={slidesNumber}/>
            </Container>
        </div>
    )
}
