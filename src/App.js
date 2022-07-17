import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function BasicTextFields() {
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [phase, setPhase] = useState('');
  
  const onSubmit = () => {
    axios.post(`https://sheet.best/api/sheets/13513c0d-24f7-4d21-87f3-7eb20ca397ea`, {
      name, group, phase
    })
  }

  return (
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
  );
}
