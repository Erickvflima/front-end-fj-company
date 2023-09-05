/* eslint-disable operator-linebreak */
import React, { useEffect, useMemo, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { IconButton, Tooltip } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { textLabels } from '../../../utils/muidatatable';
import CustomBackDrop from '../../../components/CustomBackDrop';

import getColumns from './columnsData';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import SettingsUser from '../SettingsUser';
import { listUser } from '../../../store/ducks/User/index.js';

const List = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [open, setOpen] = useState(false);
  const [refreshList, setRefreshList] = useState(false);

  const [listData, setListData] = useState();

  useEffect(() => {
    (async () => {
      setOpenBackdrop(true);
      const {
        payload,
        meta: { requestStatus },
      } = await dispatch(listUser());
      if (
        requestStatus === 'fulfilled' &&
        payload.status === 'success' &&
        payload.document
      ) {
        setOpenBackdrop(false);
        setListData(payload.document);
      } else {
        enqueueSnackbar('Erro ao baixar lista', {
          variant: 'error',
          autoHideDuration: 2000,
        });
      }
    })();
  }, [refreshList]);

  const handleRefesh = () => {
    setRefreshList(!refreshList);
  };
  const columns = useMemo(() => {
    return getColumns(listData, handleRefesh);
  }, [listData]);

  const handleNewUser = () => {
    setOpen(!open);
    setRefreshList(!refreshList);
  };

  const options = {
    filter: true,
    rowsPerPage: 10,
    customToolbar: () => {
      return (
        <>
          <SettingsUser
            data={{
              nameTeam: null,
              statusTeam: null,
              id: null,
              name: '',
              cpf: '',
              typeOfAccess: '',
              teamId: 0,
              status: '',
            }}
            handleClose={handleNewUser}
            open={open}
          />
          <Tooltip title="Adicionar novo usuario">
            <IconButton onClick={handleNewUser}>
              <PersonAdd />
            </IconButton>
          </Tooltip>
        </>
      );
    },
    selectableRows: 'none',
    sort: true,
    sortOrder: {
      name: 'id',
      direction: 'desc',
    },
    responsive: 'vertical',
    page: 0,
    searchPlaceholder: 'Digite a mensagem desejada para busca',
    textLabels,
    downloadOptions: { filename: 'user.csv', separator: ';' },
  };

  return (
    <>
      <CustomBackDrop open={openBackdrop} />
      <Helmet>
        <title>Usuarios</title>
      </Helmet>
      <MUIDataTable
        title="Usuarios"
        data={listData}
        columns={columns}
        options={options}
      />
    </>
  );
};

export default List;
