import axiosObj from '@/axios/axiosConfig';
import Container from '../../layout/Container';
import { CreateTwoTone, DeleteForeverOutlined, StartRounded } from '@mui/icons-material';
import { Button, Typography } from '@mui/joy';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetch_campgain } from '@/components/redux/actions/actionsCreator';
import { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';

export default function StartCampaign() {
  useEffect(() => {
    if (!window.sessionStorage.getItem('user')) {
      navigate('/');
    }
  },[]);
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const camp = useSelector((state) => state.campaign);
  return (
    <div className='parent p-5'>

      <Container>
        {
          Object.keys(camp).length ? (
            <div className="row bg-gray-200 items-center rounded-xl w-4/3  mx-auto my-7 p-4 m">
              <div className="col-3">
                <h1 className='text-red-700 font-bold '>{camp.title}</h1>

              </div>

              <div className='col-3'>
                <Button
                  className='bg-warning text-light'
                  endDecorator={<CreateTwoTone />}
                  onClick={()=>{
                    navigate(`/campaign/${camp.id}/modify`)
                  }}
                >
                  Modify
                </Button>
              </div>
              <div className='col-3'>
                <Button
                  className='bg-danger text-light'
                  endDecorator={<DeleteForeverOutlined />}
                  onClick={() => {
                    setIsLoading(true);

                    axiosObj.delete(`/api/campaigns/${camp.id}/delete`).then((data) => {
                      dispatcher(fetch_campgain({}));
                      setIsLoading(false);

                      navigate(`/createCamp`)
                    });
                  }}
                >
                  DELETE IT
                </Button>
              </div>
              <div className="col-3">


                <Button
                  variant="outlined"
                  className='bg-info text-light'
                  endDecorator={<StartRounded />}
                  onClick={() => {
                    const now = new Date();
                    let hours = now.getHours();
                    let minutes = now.getMinutes();

                    // Add leading zeros if necessary
                    hours = hours < 10 ? '0' + hours : hours;
                    minutes = minutes < 10 ? '0' + minutes : minutes;

                    const StartTime = hours + ':' + minutes;
                    setIsLoading(true);

                    axiosObj.put(`/api/campaigns/${camp.id}/update`, { StartTime }).then((data) => {
                      navigate(`/campaign/${camp.id}/addParticipants`)
                      console.log(data.data.data);
                      setIsLoading(false);

                    });
                  }}
                >
                  Commncer
                </Button>

              </div>
            </div>
          ) :
            <div className="row bg-gray-200 items-center rounded-xl w-4/3  mx-auto my-7 p-4 m">
              <h1 className='text-red-600 font-extrabold block w-fit mx-auto'>There no created campaign !</h1>
            </div>

        }
      </Container>
      {isLoading && <div className='loading'> <HashLoader color="#FF0000" /></div>}

    </div>
  );
}