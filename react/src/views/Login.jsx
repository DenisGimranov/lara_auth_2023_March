import React from 'react';
import {Link} from "react-router-dom";
import {useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {Button, Container, Grid, IconButton, InputAdornment, Paper, Typography} from "@mui/material";
import MyTextField from "../Component/TextField";
import { indigo } from '@mui/material/colors';



export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState(null);
  const {setUser, setToken} = useStateContext();

  const onSubmit = (ev) => {
    ev.preventDefault()
    const payload = {
      email,
      password,
    }
    //console.log(payload);
    setErrors(null)
    axiosClient.post('/login', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token)
      })
      .catch(err => {
        //console.log(err);
        const response = err.response;
        console.log(response);
        if (response && response.status === 422) {
          if(response.data.errors) {
            setErrors(response.data.errors);
          }else{
            setErrors({
              email: [response.data.message],
              //password: [response.data.message]
            });
          }
        }
      })
    //console.log(payload);

  }

  return (

    <Container fixed maxWidth="xs">
      <Paper elevation={6} sx={{mt:'25%', p:2,borderRadius:5}}>
        <form onSubmit={onSubmit}>
          <Typography variant="h1" fontSize={30} sx={{mt:1,mb:2}} align="center">Вход</Typography>
          <MyTextField error={errors?.email} onChange={setEmail}  value={email} type="email" label="E-mail адрес"/>
          <MyTextField error={errors?.password} onChange={setPassword} value={password} type="password" label="Пароль"/>
          <Button sx={{mt:2,mb:2}} type="submit" variant="contained" fullWidth margin="dense" size="large">Вход</Button>
          <Grid sx={{ml:"45%"}} >
            Нет аккаунта?  <Link to="/auth" color={indigo[500]}>Регистрация</Link>
          </Grid>
        </form>
      </Paper>
    </Container >

  )
}
