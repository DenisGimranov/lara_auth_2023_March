import React from 'react';
import {Link} from "react-router-dom";
import {useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {Button, Container, Grid, IconButton, InputAdornment, Paper, Typography} from "@mui/material";
import MyTextField from "../Component/TextField";
import { indigo } from '@mui/material/colors';



export default function Auth() {

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [surName, setSurName] = useState('');
  const [phone, setPhone] = useState('');
  const [keyOO, setKeyOO] = useState('');

  const [errors, setErrors] = useState(null);
  const {setUser, setToken} = useStateContext();

  const onSubmit = (ev) => {
    ev.preventDefault()
    const payload = {
      email,
      password,
      password_confirmation,
      lastName,
      firstName,
      surName,
      phone,
      keyOO,
    }
    console.log(payload);

    axiosClient.post('/auth', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token)
      })
      .catch(err => {
        //console.log(err);
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
          setErrors(response.data.errors);
        }
      })
    //console.log(payload);

  }
  function vasya(a,b){
    console.log("lol")
  }

  return (

      <Container fixed maxWidth="xs">
        <Paper elevation={6} sx={{mt:'25%', p:2,borderRadius:5}}>
        <form onSubmit={onSubmit}>
          {/*<h1 >Регистрация аккаунта</h1>*/}
          <Typography variant="h1" fontSize={30} sx={{mt:1,mb:2}} align="center">Регистрация аккаунта</Typography>
          <MyTextField  error={errors?.email} onChange={setEmail}  value={email} type="email" label="E-mail адрес"/>
          <MyTextField  error={errors?.password} onChange={setPassword} value={password} type="password" label="Пароль"/>
          <MyTextField  error={errors?.password_confirmation}  onChange={setPasswordConfirmation}  value={password_confirmation} type="password" label="Подтверждение"/>

          <MyTextField  error={errors?.lastName} onChange={setLastName}  value={lastName} type="text" label="Фамилия"/>
          <MyTextField  error={errors?.firstName} onChange={setFirstName}  value={firstName} type="text" label="Имя"/>
          <MyTextField  notrequired error={errors?.surName} onChange={setSurName}  value={surName} type="text" label="Отчество"/>
          <MyTextField error={errors?.phone} phone="phone" onChange={setPhone} value={phone} type="text" pattern="[0-9]{18}" label="Телефон без +7"
                        InputProps={{startAdornment: <InputAdornment position="start">+7</InputAdornment>,}}/>
          {/*<MyTextField  error={errors?.phone} onChange={setPhone}  value="1234567890" type="text" pattern="[0-9]{10}" label="Телефон"/>*/}

          <MyTextField  error={errors?.keyOO} onChange={setKeyOO}  value={keyOO} type="text" pattern="[0-9]{6}" label="Код района или Организации"/>
          {/*<MyTextField  error={errors?.key} onChange={setKey}  value="222222" type="text" pattern="[0-9]{6}" label="Код района или Организации"/>*/}

          <Button  sx={{mt:2,mb:2}} type="submit" variant="contained" fullWidth margin="dense" size="large">Регистрация</Button>
          <Grid sx={{ml:"45%"}} >
            Уже есть аккаунт? <Link to="/login" color={indigo[500]}>Войти</Link>
          </Grid>
          <Button onClick={e => vasya("a")}>sdfsd</Button>
        </form>
        </Paper>
      </Container >

  )
}
