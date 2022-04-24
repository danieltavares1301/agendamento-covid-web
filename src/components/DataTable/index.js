import React, { useState, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';
import api from '../../services/api';
import { AppContext } from '../../contexts/AppContextProvider';

const DataTable = ({ list, appointmentDate }) => {
  const [, FetchData] = useContext(AppContext);
  const [description, setDescription] = useState();

  // atualiza valor do status e da descrição
  const updateValues = async (id, description) => {
    // neste path, o atendimento é finalizado apenas com o id do agendamento
    await api
      .put(`/serviceFinished/${id}`, {
        description: description,
      })
      .then(() => FetchData())
      .catch(() => alert('Um erro inesperado ocorreu!'));

    return window.location.reload(true);
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
            {list.map(row => (
              <TableRow
                key={row._id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                {row.appointmentTime < 10 ? (
                  <TableCell align="center" component="th" scope="row">
                    0{row.appointmentTime}:00
                  </TableCell>
                ) : (
                  <TableCell align="center" component="th" scope="row">
                    {row.appointmentTime}:00
                  </TableCell>
                )}

                <TableCell component="th" align="center" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {new Date(row.birthDate).toLocaleDateString()}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {
                    // se o atendimento ainda não estiver finalizado, irá aparecer a opção de finalizar
                    row.isFinished === false ? (
                      <Button
                        onClick={() => updateValues(row._id, description)}
                      >
                        Atender Paciente
                      </Button>
                    ) : (
                      'Atendimento finalizado'
                    )
                  }
                </TableCell>
                {row.isFinished === false ? (
                  <TableCell align="center" component="th" scope="row">
                    <TextField
                      id="outlined-multiline-flexible"
                      placeholder="Adicione uma descrição antes de clicar em ATENDER PACIENTE"
                      multiline
                      maxRows={4}
                      onChange={event => setDescription(event.target.value)}
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
