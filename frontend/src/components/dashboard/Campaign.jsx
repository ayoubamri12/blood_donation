import { useState } from 'react';
import { TextField, Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { Link } from 'react-router-dom';

export default function Campaign() {
  const [inputVals, setInputVals] = useState({
    title: '',
    date: '',
    lieu: ''
  });
  const [errs, setErrs] = useState({
    title: false,
    date: false,
    lieu: false
  });
  const [openToast, setOpenToast] = useState(false);

  function handleChange(e) {
    setInputVals({ ...inputVals, [e.target.name]: e.target.value });
  }

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  return (
    <div className='parent p-5'>
      <div className='p-2 w-75 bg-dark rounded rounded-4 shadow'>
        <h2 className='d-block text-center text-danger'>Create new Campaign</h2>

        <form>
          <div className="mb-3 w-75 mx-auto">
            <TextField
              label="Campaign Title"
              name="title"
              variant="outlined"
              fullWidth
              value={inputVals.title}
              onChange={handleChange}
              error={errs.title}
              helperText={errs.title && 'This field is required'}
              InputProps={{ className: 'text-danger' }}
            />
          </div>
          <div className="mb-3 w-75 mx-auto" style={{ display: 'flex' }}>
            <TextField
              label="Campaign lieu"
              name="lieu"
              variant="outlined"
              fullWidth
              value={inputVals.lieu}
              onChange={handleChange}
              error={errs.lieu}
              helperText={errs.lieu && 'This field is required'}
              InputProps={{ className: 'text-danger' }}
            />
            <Button
              type="button"
              variant="contained"
              color="secondary"
              style={{ marginLeft: '10px', marginTop: '8px', backgroundColor: 'red' }}
            >
              Add lieu
            </Button>
          </div>
          <div className="mb-3 w-75 mx-auto">
            <TextField
              label="Date"
              name="date"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={inputVals.date}
              onChange={handleChange}
              error={errs.date}
              helperText={errs.date && 'This field is required'}
              InputProps={{ className: 'text-danger' }}
            />
          </div>
          <div className="d-flex justify-content-center">
            <Link
              to={{
                pathname: '/detailCompagne',
                state: inputVals
              }}
              className="text-decoration-none"
            >
              <Button
                type="button"
                variant="contained"
                color="secondary"
                className={`font-bold text-center w-25 ${Object.values(errs).some(err => err) && 'btn-danger'}`}
              >
                {Object.values(errs).some(err => err) ? 'All fields are required' : 'Create'}
              </Button>
            </Link>
          </div>
        </form>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openToast}
        autoHideDuration={6000}
        onClose={handleCloseToast}
      >
        <MuiAlert onClose={handleCloseToast} severity="success" sx={{ width: '100%' }}>
          New lieu added successfully!
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
