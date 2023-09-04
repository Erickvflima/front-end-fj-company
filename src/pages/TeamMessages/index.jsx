/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { stringAvatar } from '../../utils/stringAvatar';
import { maskDateTimeStamp } from '../../utils/conversorDate';
import { useDispatch, useSelector } from 'react-redux';
import { listMessage } from '../../store/ducks/Message';
import CustomBackDrop from '../../components/CustomBackDrop';

const TeamMessages = () => {
  const dispatch = useDispatch();
  const {
    user: { sendSignin },
  } = useSelector((state) => {
    return state;
  });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [data, setData] = useState([]);
  const [openBackdrop, setOpenBackdrop] = useState(false);

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
        setData(payload.document);
      }
      setOpenBackdrop(false);
    })();
  }, [sendSignin.document.teamId]);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '80vh' }}
      spacing={6}
    >
      <Grid item>
        <Typography variant="h4" color="primary" gutterBottom>
          Mensagens da equipe
        </Typography>
      </Grid>
      <Grid item>
        <Paper elevation={3}>
          <CustomBackDrop open={openBackdrop} />
          <Grid item xs={12}>
            <Grid container direction="column" padding={3} alignItems="center">
              <Grid item>
                {data.length > 0 ? (
                  <List
                    sx={{
                      width: '100%',
                      minWidth: 360,
                      bgcolor: 'background.paper',
                    }}
                  >
                    {data.map((data, index) => {
                      return (
                        <Grid key={index}>
                          {/* <Grid key={uuidv4()}> */}
                          <ListItem
                            alignItems="flex-start"
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            style={{
                              transform:
                                hoveredIndex === index
                                  ? 'scale(1.05)'
                                  : 'scale(1)',
                              transition: 'transform 0.2s ease',
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar color="primary">
                                {stringAvatar(data.nameUser)}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography
                                  sx={{ display: 'flex', fontSize: '20px' }}
                                  variant="h6"
                                  color="primary"
                                >
                                  {data.description}
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  sx={{ display: 'inline' }}
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {maskDateTimeStamp(data.createAt)}
                                </Typography>
                              }
                            />
                          </ListItem>
                          <Divider variant="inset" component="li" />
                        </Grid>
                      );
                    })}
                  </List>
                ) : (
                  <Grid container>
                    <Typography variant="h4">
                      Não possui menssagens cadastrado no momento!
                    </Typography>
                    <Typography variant="body2">
                      Solicite ao líder da equipe o cadastro de uma mensagem.
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TeamMessages;
