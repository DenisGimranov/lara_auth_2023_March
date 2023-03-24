import React, {useEffect} from 'react';
import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
  const {user, token, setUser, setToken} = useStateContext()

  if (!token) {
    return <Navigate to="/login"/>
  }

  const onLogout = (ev) => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data)
      })
  }, [])




 return(
 <div id="defaultLayout">
   <aside>
     <Link to="/dashboard">Администрирование</Link>
     <Link to="/users">Личный Кабинет</Link>
   </aside>
   <div className="content">
     <header>
       <div>
         Header
       </div>
       <div>
         {user.keyOO || "Учётная запись не подтверждена"}
         <a href="#" onClick={onLogout} className="btn-logout">Выход</a>
       </div>
     </header>
     <main>
       <Outlet />
     </main>
   </div>
 </div>
 )
}
