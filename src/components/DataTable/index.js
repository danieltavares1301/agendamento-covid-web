import React, { useState, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import api from "../../services/api";
import { AppContext } from "../../AppContextProvider";

const DataTable = ({ list, appointmentDate }) => {
  const [, loadingData] = useContext(AppContext);
  const [description, setDescription] = useState();

  // atualiza valor do status e da descrição
  const updateValues = async (id, description) => {
    await api
      .put(`/serviceFinished/${id}`, {
        description: description,
      })
      .then(() => loadingData())
      .catch(() => alert("Um erro inesperado ocorreu!"));

    return window.location.reload(true);

    // se não existisse banco de dados, seria mudado dessa forma:
    //
    //   const updateStatus = data
    //     .filter((value) => value._id === id && value.isFinished === false) // pega apenas o objeto que for igual o id passado
    //     .map((item) => {
    //     // muda valor do status para true e nova descrição, e os outros itens do obj continuam os mesmo
    //        if (item._id === id) {
    //          item.isFinished = true;
    //          item.description = description;
    //        }
    //        return item;
    //      });
    // // adiciona itens antigos diferentes do que foi alterado, e também adiciona o alterado.
    // setData([data.filter((value) => value._id !== id), ...updateStatus].flat());
    // // altera data no localStorage
    // return localStorage.setItem("data", JSON.stringify(data));
    // // refresh para reorganização de dados
  };
  return (
    <>
      <h3>{appointmentDate}</h3>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Horário agendado</TableCell>
              <TableCell align="center">Nome do paciente</TableCell>
              <TableCell align="center">Data de nascimento</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row) => (
              <TableRow
                key={row._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.appointmentTime}
                </TableCell>
                <TableCell component="th" align="center" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {new Date(row.birthDate).toLocaleDateString()}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {row.isFinished === false ? (
                    <Button onClick={() => updateValues(row._id, description)}>
                      Atender Paciente
                    </Button>
                  ) : (
                    "Paciente Atendido"
                  )}
                </TableCell>
                {row.isFinished === false ? (
                  <TableCell align="center" component="th" scope="row">
                    <TextField
                      id="outlined-multiline-flexible"
                      placeholder="Adicione uma descrição antes de clicar em ATENDER PACIENTE"
                      multiline
                      maxRows={4}
                      onChange={(event) => setDescription(event.target.value)}
                    />
                  </TableCell>
                ) : (
                  <TableCell align="center" component="th" scope="row">
                    {row.description}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default DataTable;
