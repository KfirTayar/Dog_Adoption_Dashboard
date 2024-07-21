import React, {useEffect, useState} from 'react';
import axios from "axios";
import FindDogByIdModal from './components/FindDogByIdModal';
import AddNewDogModal from './components/AddNewDogModal';
import Header from './components/header';

// MUI components
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Box, Checkbox, FormControl, FormControlLabel, InputLabel, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import {Button} from "@mui/material";
import Container from '@mui/material/Container';


const App = () => {

  const [dogs, setDogs] = useState([]);
  const [editingDog, setEditingDog] = useState(null);
  const [formState, setFormState] = useState(
      { chipId: '', name: '', age: '', gender: '', physical: '', arrivalDate: '', sterilized: '', adopdedStatus: '' });
  const [addNewDogShown, setAddNewDogShown] = useState(false);
  const [findByChipIdShown, setFindByChipIdShown] = useState(false);
  const [showOnlyUnadopted, setShowOnlyUnadopted] = useState(false);
  const [filteredByArrivalDate, setFilteredByArrivalDate] = useState(false);

  useEffect(() => {
    getAllDogs();
  }, []);

  // Client-Side filters
  const getUnadoptedDogs = () => {
    if (!showOnlyUnadopted) {
      const onlyUnadopted = dogs.filter(dog => dog.adopdedStatus === 'no');
      setShowOnlyUnadopted(true);
      setDogs(onlyUnadopted);
    }
    else {
      setShowOnlyUnadopted(false);
      getAllDogs();
    }
  };

  const getSortedTableByArrivalDate = () => {
    if (!filteredByArrivalDate) {
      const sortedDogs = [...dogs].sort((a, b) => new Date(a.arrivalDate) - new Date(b.arrivalDate));
      setFilteredByArrivalDate(true);
      setDogs(sortedDogs);
    }
    else {
      setFilteredByArrivalDate(false);
      getAllDogs();
    }
  }

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // APIs
  const getAllDogs = async () => {
    const res = await axios.get('http://localhost:3000/dogs');
    setDogs(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create or Update a dog according to editingDog value
    const url = editingDog ? `http://localhost:3000/dogs/${editingDog._id}` : 'http://localhost:3000/dogs';
    const method = editingDog ? 'put' : 'post';
    await axios[method](url, formState);

    // Clean the cells
    setFormState({ chipId: '', name: '', age: '', gender: '', physical: '', arrivalDate: '', sterilized: '', adopdedStatus: '' });
    setEditingDog(null);

    // Show the updated table
    getAllDogs();
    toggleAddNewDogModal();
  };

  const handleEdit = (dog) => {
    // editingDog != null
    setEditingDog(dog);
    // Fill the form with exist values of the dog
    setFormState(dog);
    toggleAddNewDogModal();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/dogs/${id}`);
    getAllDogs();
  };

  const handleFindDog = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/dogs/${formState.chipId}`);
      setDogs([res.data]);
      toggleFindByChipIdModal();

    }
    catch (error) {
      console.error('Error: Chip ID not exist:', error);
    }
    finally {
      setFormState({ chipId: '' });
    }
  };

  // Set toggle modals
  const toggleAddNewDogModal = () => setAddNewDogShown(prev => !prev);
  const toggleFindByChipIdModal = () => setFindByChipIdShown(prev => !prev);

  // Define table index
  let index = 1;

  return (

      <div className="App">
        <Container component="main" maxWidth="lg">
          <Header />

          {/* Creates the forms for adding new dog and finding dog by Chip ID*/}
          <div>
            <AddNewDogModal open={addNewDogShown} handleClose={toggleAddNewDogModal} title="Add New Dog" >
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
                      <TextField
                          name="name"
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
                          label="Arrival Date"
                          type="date"
                          value={formState.arrivalDate}
                          onChange={handleChange}
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
                        <InputLabel id="adopt-label">Is Adopted</InputLabel>
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
            </AddNewDogModal>

            <FindDogByIdModal open={findByChipIdShown} handleClose={toggleFindByChipIdModal} title="Find Dog by Chip ID" >

              <Grid item xs={4}>
                <TextField
                    name="chipId"
                    value={formState.chipId}
                    onChange={handleChange}
                    label="Chip ID"
                    required
                />
              </Grid>

              <Button sx={{marginY: 1, width: '200px', height: '55px'}} variant="outlined" color="primary" onClick={handleFindDog}>
                Find
              </Button>
            </FindDogByIdModal>
          </div>

          {/* Creates a table that represents the current DB*/}
          <TableContainer component={Paper} sx={{mb:10}}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2}}>
              <Button sx={{marginRight: 5}} variant="contained" color="info" size="small" onClick={toggleAddNewDogModal}>+</Button>
              <Button sx={{marginRight: 5}} variant="contained" color="warning" size="small" onClick={getAllDogs}>Show all dogs</Button>
              <Button sx={{marginRight: 5}} variant="contained" color="warning" size="small" onClick={toggleFindByChipIdModal}>Find dog by Chip ID</Button>
              <FormControlLabel sx={{marginRight: 5}}  control={<Checkbox onChange={getUnadoptedDogs} color="warning"/>} label="Show unadopted dogs" />
              <FormControlLabel sx={{marginRight: 5}}  control={<Checkbox onChange={getSortedTableByArrivalDate} color="warning"/>} label="Sort by date" />
            </Box>
            <Table sx={{ minWidth: 650}} aria-label="simple table">
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