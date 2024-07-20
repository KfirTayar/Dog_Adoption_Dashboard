import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import GenericModal from './components/modal';
import BasicModal from './components/BasicModal'; // Adjust the path as necessary
import Header from './components/header';

// MUI components
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {
  Box, Checkbox, FormControl, FormControlLabel, InputLabel,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import {Button} from "@mui/material";
import Container from '@mui/material/Container';


const App = () => {

  // Creating variables with an initial state
  const [shown, setShown] = useState(false);
  const [dogs, setDogs] = useState([]);
  const [editingDog, setEditingDog] = useState(null);
  const [formState, setFormState] = useState({ chipId: '', name: '', age: '', gender: '', physical: '', arrivalDate: '', sterilized: '', adopdedStatus: '' });
  const [originalTable, setOriginalTable] = useState(dogs);
  const [showOnlyAdopted, setShowOnlyAdopted] = useState(false);
  const [filteredByArrivalDate, setFilteredByArrivalDate] = useState(false);
  const [findByChipIdShown, setFindByChipIdShown] = useState(false);

  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = async () => {
    const response = await axios.get('http://localhost:3000/dogs');
    setDogs(response.data);
  };

  const fetchAdoptedDogs = () => {

    if (!showOnlyAdopted) {
      const onlyAdopted = dogs.filter(dog => dog.adopdedStatus === 'no');
      setOriginalTable(dogs); // Save original dogs list
      setShowOnlyAdopted(true);
      setDogs(onlyAdopted);

    } else {
      setShowOnlyAdopted(false);
      setDogs(originalTable);
    }

  };

  const handleSortByArrivalDate = () => {

    if (!filteredByArrivalDate) {
      const sortedDogs = [...dogs].sort((a, b) => new Date(a.arrivalDate) - new Date(b.arrivalDate));
      setOriginalTable(dogs); // Save original dogs list
      setFilteredByArrivalDate(true);
      setDogs(sortedDogs);
    }

    else {
      setFilteredByArrivalDate(false);
      setDogs(originalTable);
    }
  }

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingDog ? `http://localhost:3000/dogs/${editingDog._id}` : 'http://localhost:3000/dogs';
    const method = editingDog ? 'put' : 'post';
    await axios[method](url, formState);
    setFormState({ chipId: '', name: '', age: '', gender: '', physical: '', arrivalDate: '', sterilized: '', adopdedStatus: '' });
    setEditingDog(null);
    fetchDogs();
    toggleModal();
  };

  const handleEdit = (dog) => {
    setEditingDog(dog);
    setFormState(dog);
    toggleModal();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/dogs/${id}`);
    fetchDogs();
  };

  const handleFindDogByChipId = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/dogs/${formState.chipId}`);
      setDogs([response.data]);
      setFormState({ chipId: '' });
      toggleFindByChipIdModal();

    } catch (error) {
      console.error('Error finding dog by chip ID:', error);
    }
  };


  const toggleModal = () => setShown(prev => !prev);
  const toggleFindByChipIdModal = () => setFindByChipIdShown(prev => !prev);
  let index = 1;

  return (

      <div className="App">
        <Container component="main" maxWidth="lg">
          <Header />
          <div id="content">
            <GenericModal displayModal={shown} closeModal={toggleModal}>
              <h1>Add New Dog</h1>
              <div>
                <Box component="form" onSubmit={handleSubmit} sx={{ m: 1, minWidth: 200 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <TextField
                          name="chipId"
                          value={formState.chipId}
                          onChange={handleChange}
                          label="Chip ID"
                          required
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <TextField name="name"
                                 value={formState.name}
                                 onChange={handleChange}
                                 label="Name"
                                 required
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                          name="age"
                          type="number"
                          value={formState.age}
                          onChange={handleChange}
                          label="Age"
                          required
                      />
                    </Grid>

                    <Grid item xs={4} >
                      <FormControl fullWidth>
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Select
                            sx={{ width: '185px' }}
                            labelId="gender-label"
                            id="gender-select"
                            label="Gender"
                            name="gender"
                            value={formState.gender}
                            onChange={handleChange}
                            required
                        >
                          <MenuItem value={"male"}>Male</MenuItem>
                          <MenuItem value={"female"}>Female</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel id="size-label">Size</InputLabel>
                          <Select
                              sx={{ width: '185px' }}
                              labelId="size-label"
                              id="size-select"
                              label="Size"
                              name="physical"
                              value={formState.physical}
                              onChange={handleChange}
                              required
                          >
                            <MenuItem value={"small"}>Small</MenuItem>
                            <MenuItem value={"medium"}>Medium</MenuItem>
                            <MenuItem value={"large"}>Large</MenuItem>
                          </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                          sx={{ width: '185px', height: '55px' }}
                          name="arrivalDate"
                          type="date"
                          value={formState.arrivalDate}
                          onChange={handleChange}
                          label="Arrival Date"
                          required
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel id="sterilized-label">Sterilized</InputLabel>
                          <Select
                              sx={{ width: '185px' }}
                              labelId="sterilized-label"
                              id="sterilized-select"
                              label="Sterilized"
                              name="sterilized"
                              value={formState.sterilized}
                              onChange={handleChange}
                              required
                            >
                            <MenuItem value={"yes"}>Yes</MenuItem>
                            <MenuItem value={"no"}>No</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel id="size-label">Is Adopted</InputLabel>
                          <Select
                              sx={{ width: '185px' }}
                              labelId="adopt-label"
                              id="adopt-select"
                              label="Is Adopted"
                              name="adopdedStatus"
                              value={formState.adopdedStatus}
                              onChange={handleChange}
                              required
                          >
                            <MenuItem value={"yes"}>Yes</MenuItem>
                            <MenuItem value={"no"}>No</MenuItem>
                          </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                      <Button
                        sx={{ width: '185px', height: '55px' }}
                        variant="outlined"
                        size="large"
                        type="submit"
                      >
                      {editingDog ? 'Update' : 'Create'}</Button></Grid>
                  </Grid>
                </Box>
              </div>
            </GenericModal>
          </div>

          {/* Creates a table that represents the current DB*/}
          <TableContainer component={Paper}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
              <Button sx={{marginRight: 5}} variant="contained" color="info" size="small" onClick={toggleModal}>+</Button>
              <Button sx={{marginRight: 5}} variant="contained" color="warning" size="small" onClick={fetchDogs}>Show all dogs</Button>
              <Button sx={{marginRight: 5}} variant="contained" color="warning" size="small" onClick={toggleFindByChipIdModal}>Find dog by Chip ID</Button>
              <BasicModal
                  open={findByChipIdShown}
                  handleClose={toggleFindByChipIdModal}
                  title="Find Dog by Chip ID"
              >
                <TextField
                    name="chipId"
                    value={formState.chipId}
                    onChange={handleChange}
                    label="Chip ID"
                    required
                />

                <Button sx={{marginY: 1, width: '200px', height: '55px'}} variant="outlined" color="primary" onClick={handleFindDogByChipId}>
                  Find
                </Button>
              </BasicModal>
              <FormControlLabel sx={{marginRight: 5}}  control={<Checkbox onChange={fetchAdoptedDogs} color="warning"/>} label="Show unadopted dogs" />
              <FormControlLabel sx={{marginRight: 5}}  control={<Checkbox onChange={handleSortByArrivalDate} color="warning"/>} label="Sort by date" />
            </Box>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Index</TableCell>
                  <TableCell align="left">Chip ID</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Age</TableCell>
                  <TableCell align="left">Gender</TableCell>
                  <TableCell align="left">Size</TableCell>
                  <TableCell align="left">Arrival Date</TableCell>
                  <TableCell align="left">Sterilized</TableCell>
                  <TableCell align="left">Adopted Status</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dogs.map((dog) => (
                    <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="left">{index++}</TableCell>
                      <TableCell align="left">{dog.chipId}</TableCell>
                      <TableCell align="left">{dog.name}</TableCell>
                      <TableCell align="left">{dog.age}</TableCell>
                      <TableCell align="left">{dog.gender}</TableCell>
                      <TableCell align="left">{dog.physical}</TableCell>
                      <TableCell align="left">{new Date(dog.arrivalDate).toLocaleDateString()}</TableCell>
                      <TableCell align="left">{dog.sterilized}</TableCell>
                      <TableCell align="left">{dog.adopdedStatus}</TableCell>
                      <TableCell align="left">
                        <Button sx={{marginRight: 0.5}} variant="outlined" size="small" color="secondary" onClick={() => handleEdit(dog)}>Edit</Button>
                        <Button variant="outlined" size="small" color="warning" onClick={() => handleDelete(dog._id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
  );
}

export default App;