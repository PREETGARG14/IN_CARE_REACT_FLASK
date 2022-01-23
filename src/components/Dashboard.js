import React, { useEffect, useState } from "react";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { url } from "../utils/url";
import { Container } from "@mui/material";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import EditIcon from "@mui/icons-material/Edit";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const Dashboard = ({ userId, setUserId }) => {
  const [users, setUsers] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    let config = {
      headers: {
        "x-access-token": token,
      },
    };
    Axios.get(`${url}/api/doctor/users`, config).then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  }, []);
  return (
    <Container className="py-5">
      <MaterialTable
        icons={tableIcons}
        title="All Patients"
        columns={[
          { title: "Full Name", field: "fullname" },
          { title: "Email address", field: "email_address" },
          { title: "User name", field: "username" },
        ]}
        data={users}
        actions={[
          {
            icon: EditIcon,
            tooltip: "Show details",
            onClick: (event, rowData) => {
              setUserId(rowData.id);
              sessionStorage.removeItem("user_id");
              sessionStorage.setItem("user_id", rowData.id);
              history("/cards");
            },
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
      />
    </Container>
  );
};

export default Dashboard;
