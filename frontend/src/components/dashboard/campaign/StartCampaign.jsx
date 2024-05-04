import Container from '../../layout/Container';
import { CreateTwoTone, DeleteForeverOutlined, StartRounded } from '@mui/icons-material';
import { Button, Typography } from '@mui/joy';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function StartCampaign() {

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
                >
                  Modify
                </Button>
              </div>
              <div className='col-3'>
                <Button
                  className='bg-danger text-light'
                  endDecorator={<DeleteForeverOutlined />}
                >
                  DELETE IT
                </Button>
              </div>
              <div className="col-3">

                <Link to={`/campaign/${camp.id}/addParticipants`}>
                <Button
                  variant="outlined"
                  className='bg-info text-light'
                  endDecorator={<StartRounded />}
                >
                  Commncer
                </Button>
                </Link>
              </div>
            </div>
            ):
            <div className="row bg-gray-200 items-center rounded-xl w-4/3  mx-auto my-7 p-4 m">
              <h1 className='text-red-600 font-extrabold block w-fit mx-auto'>There no created campaign !</h1>
            </div>
                
              }
      </Container>
    </div>
  );
}