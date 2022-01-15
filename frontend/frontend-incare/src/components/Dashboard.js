import React,{useEffect,useState} from 'react'
import MaterialTable from 'material-table'
import {useNavigate} from 'react-router-dom'
import Axios from 'axios';
import { ShowChartOutlined } from '@mui/icons-material';

const Dashboard =({userId,setUserId}) =>{
    const [users,setUsers] = useState([])
    const history = useNavigate();

    useEffect(() => {
        Axios.get('http://127.0.0.1:5000/api/admin/users').then((res)=>{
            console.log(res.data)
            setUsers(res.data)
        })
    },[])
    return (
      <MaterialTable
        title="All users"
        columns={[
          { title: 'Full Name', field: 'fullname' },
          { title: 'Email address', field: 'email_address' },
          { title: 'User name', field: 'username'},
        ]}
        data={users}        
        actions={[
          {
            icon: ShowChartOutlined,
            tooltip: 'Show details',
            onClick: (event, rowData) => {
                setUserId(rowData.id)
                history('/cards')
                
            }
          }
        ]}
        options={{
            actionsColumnIndex: -1
          }}
      />
    )
  }

export default Dashboard
