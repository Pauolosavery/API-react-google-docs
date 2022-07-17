import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTextFields() {
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [phase, setPhase] = useState('');
  const [APIdata, setAPIdata] = useState([]);
  const [refresh, setRefresh] = useState([]);
  
  const onSubmit = () => {
    axios.post(`https://sheet.best/api/sheets/13513c0d-24f7-4d21-87f3-7eb20ca397ea`, {
      name, group, phase
    })
    .then((data) => {
      setRefresh(data);
    })
  }

  useEffect(()=>{
    axios.get(`https://sheet.best/api/sheets/13513c0d-24f7-4d21-87f3-7eb20ca397ea`)
    .then((incomingData)=> {
      setAPIdata(incomingData.data);
    })
  },[refresh])

  return (
    <>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic" label="Name" variant="standard" 
      onChange = {(e)=> setName(e.target.value)}/>
      <TextField id="standard-basic" label="Group" variant="standard" 
      onChange = {(e)=> setGroup(e.target.value)}/>
      <TextField id="standard-basic" label="Phase" variant="standard" 
      onChange = {(e)=> setPhase(e.target.value)}/>
      <Button variant="outlined" href="#outlined-buttons"
      onClick = {onSubmit}>
        Отправить
      </Button>
    </Box>
    <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Имя студента</TableCell>
                <TableCell align="right">Группа</TableCell>
                <TableCell align="right">Фаза</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {APIdata.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.group}</TableCell>
                  <TableCell align="right">{row.phase}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </>
  );
}
