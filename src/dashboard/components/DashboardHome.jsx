import React, {useEffect, useState} from 'react'
import {axiosClient} from '../../utils/axiosClient'

const DashboardHome = () => {
  const [counts, setCounts] = useState({});
  const [earnings, setEarnings] = useState(null);

  async function getCounts(){
    try{
        const response = await axiosClient.post('/api/admin/get-count');
        console.log(response.result);
        setCounts(response.result);
    }catch(error){
        console.log(error);
    }
  }

  async function getEarnings(){
    try{
        const response = await axiosClient.post('/api/admin/earning', {filter: 'lastmonth'});
        console.log(response.result);
        setEarnings(response.result);
    }catch(error){
        console.log(error);
    }
  }

  useEffect(() => {
    getCounts();
    getEarnings();
  }, []);

  return (
    <div>Dashboard</div>
  )
}

export default DashboardHome;