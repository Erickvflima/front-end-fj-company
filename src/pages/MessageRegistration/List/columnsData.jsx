import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { customTextColor } from '../../../utils/colorText';
import Label from '../../../components/Label';
import SettingsMessager from '../SettingsMessager';
import { Edit } from '@mui/icons-material';

const getColumns = (customrParams, handleRefesh) => {
  const colunsData = [
    {
      name: 'description',
      label: 'Descrição da Mensagem',
      options: {
        filter: false,
        customHeadLabelRender({ label }) {
          return (
            <Box sx={{ width: { xs: 'auto', md: '250px', sm: '330px' } }}>
              {label}
            </Box>
          );
        },
        setCellProps() {
          return { align: 'center' };
        },
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        customBodyRender: (value) => {
          return <Label color={customTextColor(value)}>{value}</Label>;
        },
        customHeadLabelRender({ label }) {
          return <Box sx={{ width: { xs: 'auto', sm: '170px' } }}>{label}</Box>;
        },
        setCellProps() {
          return { align: 'center' };
        },
      },
    },
    {
      name: 'Ações',
      options: {
        filter: false,
        sort: false,
        empty: true,
        setCellProps() {
          return { align: 'center' };
        },

        customHeadLabelRender({ name }) {
          return (
            <Typography
              fontWeight={700}
              fontSize={15}
              sx={{ width: { xs: 'auto', sm: '20px' } }}
            >
              {name}
            </Typography>
          );
        },
        customBodyRenderLite: (dataindex) => {
          const dataRow = customrParams ? customrParams[dataindex] : 0;

          const [open, setOpen] = useState(false);
          const handleOpenModal = () => {
            setOpen(true);
          };

          const handleCloseModal = () => {
            handleRefesh();
            setOpen(false);
          };
          return (
            <>
              <SettingsMessager
                messageDocument={dataRow}
                handleClose={handleCloseModal}
                open={open}
              />
              <Box sx={{ width: { sm: '80px' } }}>
                <IconButton aria-label="editar" onClick={handleOpenModal}>
                  <Edit />
                </IconButton>
              </Box>
            </>
          );
        },
      },
    },
  ];
  return colunsData;
};

export default getColumns;
