import React, { useEffect, useState } from 'react';
import axiosObj from '@/axios/axiosConfig';
import { Link } from 'react-router-dom';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Typography, Button } from '@mui/material';
import Container from '@/components/layout/Container';
import { MDBBadge } from 'mdb-react-ui-kit';

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    if (!window.sessionStorage.getItem('user')) {
      navigate('/');
      return;
    }
    axiosObj.get('/api/campaigns').then((data) => {
      console.log(data.data.data);
      setCampaigns(data.data.data)
    });
  }, []);

  const filteredCampaigns = campaigns.filter((campaign) => {
    const title = campaign.title.toLowerCase();
    const placeName = campaign.placeName.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();

    return title.includes(searchTermLower) || placeName.includes(searchTermLower);
  });

  const filteredCampaignsByDate = selectedDate
    ? filteredCampaigns.filter((campaign) => campaign.created_at.includes(selectedDate))
    : filteredCampaigns;

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const sortedCampaigns = [...filteredCampaignsByDate].sort((a, b) => {
    const valueA = a[sortBy] || ''; // Ensure a fallback value if undefined
    const valueB = b[sortBy] || ''; // Ensure a fallback value if undefined
    if (sortOrder === 'asc') {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className='w-75 mx-auto mt-4'>
      <div className='w-4/3 mx-auto mt-4'>
        <div className="mb-3 row rounded-xl shadow-xl mt-7 p-7">
          <div className="col-12 mb-4 p-2">
            <h1 className="text-red-700 font-extrabold text-lg w-fit mx-auto ">filtrer une campagne</h1>
          </div>
          <div className="row  justify-content-between">
            <div className='col-4'>
              <TextField
                label="Filtrer"
                fullWidth
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-4">
              <TextField
                fullWidth
                label="Date"
                type="date"
                variant="outlined"
                value={selectedDate}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Container>
        {
          filteredCampaignsByDate.length > 0 ?
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell >
                      <div className='row items-center'>
                        <p className="col-7 text-center font-extrabold text-gray-500">Title</p>
                        <div className="col-3 flex flex-col jus">
                          <Button onClick={() => handleSort('title')}>
                            ▲
                          </Button>
                          <Button onClick={() => handleSort('title')}>
                            ▼
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='row items-center'>
                        <p className="col-7 text-center font-extrabold text-gray-500"> Date de debute </p>
                        <div className="col-3 flex flex-col jus">
                          <Button onClick={() => handleSort('startTime')}>
                            ▲
                          </Button>
                          <Button onClick={() => handleSort('startTime')}>
                            ▼
                          </Button>
                        </div>
                      </div>

                    </TableCell>
                    <TableCell>
                      <div className='row items-center'>
                        <p className="col-7 text-center font-extrabold text-gray-500"> Date de fin</p>
                        <div className="col-3 flex flex-col jus">
                          <Button onClick={() => handleSort('endTime')}>
                            ▲
                          </Button>
                          <Button onClick={() => handleSort('endTime')}>
                            ▼
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='row items-center'>
                        <p className="col-7 text-center font-extrabold text-gray-500"> lieu de la campagne</p>
                        <div className="col-3 flex flex-col jus">
                          <Button onClick={() => handleSort('placeName')}>
                            ▲
                          </Button>
                          <Button onClick={() => handleSort('placeName')}>
                            ▼
                          </Button>
                        </div>
                      </div>

                    </TableCell>
                    <TableCell>
                      <div className='row items-center'>
                        <p className="col-7 text-center font-extrabold text-gray-500">date de création</p>
                        <div className="col-3 flex flex-col jus">
                          <Button onClick={() => handleSort('created_at')}>
                            ▲
                          </Button>
                          <Button onClick={() => handleSort('created_at')}>
                            ▼
                          </Button>
                        </div>
                      </div>

                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedCampaigns
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((campaign) => {
                      const date = new Date(campaign.created_at);
                      const formattedDate = date.toISOString().split('T')[0];
                      return (
                        <TableRow key={campaign.id}>
                          <TableCell>
                            <Link className="text-decoration-none font-bold campaing text-green-500" to={`/listCamp/${campaign.id}/details`}>{campaign.title}</Link>
                          </TableCell>
                          <TableCell><MDBBadge color='danger' pill>
                            {campaign.startTime}
                          </MDBBadge></TableCell>
                          <TableCell><MDBBadge color='warning' pill>
                            {campaign.endTime}
                          </MDBBadge></TableCell>
                          <TableCell>{campaign.placeName}</TableCell>
                          <TableCell><MDBBadge color='info' pill>
                            {formattedDate}
                          </MDBBadge></TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={sortedCampaigns.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
            :
            <h1 className='text-red-500 w-fit block mx-auto font-extrabold'>Il n'y a pas de campagne correspondant aux données filtrées</h1>
        }
      </Container>
    </div>
  );
}
