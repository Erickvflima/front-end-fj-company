/* eslint-disable operator-linebreak */
import React, { useEffect, useMemo, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { IconButton } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
// import { useSnackbar } from 'notistack';
import { textLabels } from '../../../utils/muidatatable';
import CustomBackDrop from '../../../components/CustomBackDrop';

import getColumns from './columnsData';
import { listMessage } from '../../../store/ducks/Message';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

const List = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [refreshList, setRefreshList] = useState(false);
  const {
    user: { sendSignin },
  } = useSelector((state) => {
    return state;
  });

  const [listData, setListData] = useState();

  useEffect(() => {
    (async () => {
      setOpenBackdrop(true);
      const {
        payload,
        meta: { requestStatus },
      } = await dispatch(listMessage({ teamId: sendSignin.document.teamId }));
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

  const columns = useMemo(() => {
    return getColumns(listData);
  }, [listData]);
  const handleRefrashButton = () => {
    setRefreshList(!refreshList);
  };
  const options = {
    filter: true,
    rowsPerPage: 10,
    customToolbar: () => {
      return (
        <IconButton onClick={handleRefrashButton}>
          <Refresh />
        </IconButton>
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
    downloadOptions: { filename: 'mensagem.csv', separator: ';' },
  };

  return (
    <>
      <CustomBackDrop open={openBackdrop} />
      <Helmet>
        <title>Mensagens</title>
      </Helmet>
      <MUIDataTable
        title="Mensagens"
        data={listData}
        columns={columns}
        options={options}
      />
    </>
  );
};

export default List;
