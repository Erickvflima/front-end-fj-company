/* eslint-disable operator-linebreak */
/* eslint-disable react/no-array-index-key */
import NestedMenuItem from 'mui-nested-menu-item';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Article, Person } from '@mui/icons-material';
import { ArrowRight, ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItemText,
  Menu,
  MenuItem,
  ListItemSecondaryAction,
  ListItemIcon,
  Typography,
  ListItemButton,
} from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
// import sections from '../../../../../../menus';

const Sections = () => {
  const navigate = useNavigate();
  const {
    user: { sendSignin },
  } = useSelector((state) => {
    return state;
  });
  const sections = [
    {
      subheader: 'randomMessages',
      section: 'randomMessages',
      label: 'Mensagens Aleatórias',
      href: '/randomMessages',
      open: true,
      icon: Article,
      isVisible: sendSignin.document.typeOfAccess === 'Colaborador',
    },
    {
      subheader: 'teamMessages',
      section: 'teamMessages',
      label: 'Mensagens da Equipe',
      href: '/teamMessages',
      open: true,
      icon: Person,
      isVisible: sendSignin.document.typeOfAccess === 'Lider',
    },
    {
      subheader: 'messageRegistration',
      section: 'messageRegistration',
      label: 'Cadastro de Mensagens',
      href: '/messageRegistration',
      open: true,
      icon: Person,
      isVisible: sendSignin.document.typeOfAccess === 'Lider',
    },
    {
      subheader: 'userManagement',
      section: 'userManagement',
      label: 'Usuários',
      href: '/userManagement',
      open: true,
      icon: Person,
      isVisible: sendSignin.document.typeOfAccess === 'Administrador',
    },
  ];
  // eslint-disable-next-line no-unused-vars
  const [_, setCurrentSections] = useState(sections);
  const [currentAnchorEl, setCurrentAnchorEl] = useState([]);

  const handleClose = () => {
    const newArray = [];
    sections.forEach((sectionArray) => {
      sectionArray.subsections?.forEach((subsection) => {
        subsection.partners.forEach((partner) => {
          partner.itens.forEach((item) => {
            newArray.push({ partner: item.title, anchorEl: null });
          });
        });
      });
    });
    setCurrentAnchorEl([...newArray]);
  };

  const showMenuDinamyc = (currentPartner, event) => {
    setCurrentAnchorEl(
      currentAnchorEl.map((anchor) => {
        if (anchor.partner === currentPartner) {
          return {
            partner: anchor.partner,
            anchorEl: event.currentTarget,
          };
        }
        return {
          partner: anchor.partner,
          anchorEl: null,
        };
      }),
    );
  };

  const handleSections = (currentSectionContext = '') => {
    const currentSection = sections.findIndex((findSectionIndex) => {
      return findSectionIndex.section === currentSectionContext;
    });

    const newArray = [...sections];
    newArray[currentSection].open = !sections[currentSection].open;
    setCurrentSections([...newArray]);
  };

  const handleSubsections = (
    currentSubsectionContext,
    currentSectionContext = '',
  ) => {
    const currentSection = sections.findIndex((findSectionIndex) => {
      return findSectionIndex.section === currentSectionContext;
    });

    const existSection = sections[currentSection];
    let existSubsection;
    if (existSection) {
      existSubsection = existSection.subsections;
      if (existSubsection) {
        const currentPartner = existSubsection[0].partners.findIndex(
          (partner) => {
            return partner.title === currentSubsectionContext;
          },
        );

        const newArray = [...sections];
        const existNewArray = newArray[currentSection];
        let existNewArraySubsection;

        if (existNewArray) {
          existNewArraySubsection = existNewArray.subsections;
          if (existNewArraySubsection) {
            // eslint-disable-next-line operator-linebreak
            existNewArraySubsection[0].partners[currentPartner].open =
              !existNewArraySubsection[0].partners[currentPartner].open;
            setCurrentSections([...newArray]);
          }
        }
      }
    }
  };

  return (
    <>
      {sections.map((section) => {
        const IconSection = section.icon;
        return (
          <Box key={uuidv4()}>
            {section.isVisible && (
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                key={`${section}-List`}
              >
                <ListItemButton
                  component={Link}
                  to={section.href ? section.href : '/'}
                  key={`${section.subheader}-listItem`}
                  onClick={() => {
                    if (!section.href) {
                      handleSections(section.section);
                    } else {
                      navigate(section.href);
                    }
                  }}
                >
                  {IconSection && (
                    <ListItemIcon>
                      <IconSection color="secondary" />
                    </ListItemIcon>
                  )}
                  <ListItemText
                    primary={
                      // eslint-disable-next-line react/jsx-wrap-multilines
                      <Typography
                        color="secondary"
                        sx={{ fontSize: '1.25rem', lineHeight: '1.75' }}
                      >
                        {section.label}
                      </Typography>
                    }
                  />
                  {
                    // eslint-disable-next-line operator-linebreak
                    section.subsections &&
                      (section.open ? (
                        <ExpandLess color="secondary" />
                      ) : (
                        <ExpandMore color="secondary" />
                      ))
                  }
                </ListItemButton>
                {section.subsections && (
                  <Collapse
                    key={`partner-${section.href}-collapse}`}
                    in={section.open}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List
                      component="div"
                      disablePadding
                      key={`colapse-section=${section}-ListCollpase`}
                    >
                      {section.subsections?.map((subsection) => {
                        return subsection.partners.map(
                          (partner, indexPartner) => {
                            const Icon = partner.icon;
                            return (
                              partner.isVisible && (
                                <React.Fragment
                                  key={`partner-${indexPartner}-ListButton3`}
                                >
                                  <ListItemButton
                                    component={Link}
                                    to={partner.href ? partner.href : '/'}
                                    sx={{ pl: 4 }}
                                    key={`partner-${indexPartner}-ListButton`}
                                    onClick={() => {
                                      handleSubsections(
                                        partner.title,
                                        section.section,
                                      );
                                    }}
                                  >
                                    <ListItemIcon>
                                      <Icon color="secondary" />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={
                                        // eslint-disable-next-line react/jsx-wrap-multilines
                                        <Typography
                                          sx={{
                                            fontSize: '1.1rem',
                                            lineHeight: '1.75',
                                          }}
                                          color="secondary"
                                        >
                                          {partner.label}
                                        </Typography>
                                      }
                                    />
                                    {!partner.href &&
                                      (partner.open ? (
                                        <ExpandLess color="secondary" />
                                      ) : (
                                        <ExpandMore color="secondary" />
                                      ))}
                                  </ListItemButton>
                                  {partner.itens.map((item) => {
                                    const currentItemIndex =
                                      currentAnchorEl.findIndex(
                                        (findIndexAnchorEl) => {
                                          return (
                                            findIndexAnchorEl.partner ===
                                            item.title
                                          );
                                        },
                                      );
                                    const IconPartner = item.icon;
                                    let existMenu = false;
                                    if (item.menus) {
                                      if (item.menus.length > 0) {
                                        existMenu = !!item.menus.find(
                                          (menu) => {
                                            return menu.isVisible === true;
                                          },
                                        );
                                      }
                                    }
                                    return (
                                      // eslint-disable-next-line operator-linebreak
                                      item.isVisible && (
                                        <Collapse
                                          in={partner.open}
                                          timeout="auto"
                                          unmountOnExit
                                          key={`indexPartner-${item.title}-Collapse2`}
                                        >
                                          <ListItemButton
                                            component={Link}
                                            to={item.href ? item.href : '/'}
                                            key={`${item.title}ListItemButton2`}
                                            sx={{ pl: 6 }}
                                          >
                                            <ListItemIcon>
                                              <IconPartner color="secondary" />
                                            </ListItemIcon>

                                            <ListItemText
                                              primary={
                                                // eslint-disable-next-line react/jsx-wrap-multilines
                                                <Typography
                                                  sx={{
                                                    fontSize: '1rem',
                                                    lineHeight: '1.75',
                                                  }}
                                                  color="secondary"
                                                >
                                                  {item.label}
                                                </Typography>
                                              }
                                              onClick={(event) => {
                                                if (!item.href) {
                                                  showMenuDinamyc(
                                                    item.title,
                                                    event,
                                                  );
                                                }
                                              }}
                                            />

                                            {existMenu && (
                                              <ListItemSecondaryAction>
                                                <Menu
                                                  id={`lock-menu${item.title}`}
                                                  anchorEl={
                                                    currentAnchorEl[
                                                      currentItemIndex
                                                    ]?.anchorEl
                                                  }
                                                  keepMounted
                                                  open={Boolean(
                                                    currentAnchorEl[
                                                      currentItemIndex
                                                    ]?.anchorEl,
                                                  )}
                                                  onClose={handleClose}
                                                  PaperProps={{
                                                    style: {
                                                      backgroundColor:
                                                        '#004668',
                                                    },
                                                  }}
                                                  sx={{
                                                    backgroundColor:
                                                      // eslint-disable-next-line max-len
                                                      'linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8))',
                                                    backgroundBlur: '10px',
                                                    backdropFilter: 'blur(5px)',
                                                  }}
                                                >
                                                  {item.menus?.map(
                                                    (menu, indexMenu) => {
                                                      if (
                                                        menu.isNested &&
                                                        !menu.href
                                                      ) {
                                                        return (
                                                          menu.isVisible && (
                                                            <NestedMenuItem
                                                              label={menu.title}
                                                              parentMenuOpen={Boolean(
                                                                currentAnchorEl[
                                                                  currentItemIndex
                                                                ]?.anchorEl,
                                                              )}
                                                              key={`nested-menu-${menu.title}`}
                                                            >
                                                              {menu.nesteds?.map(
                                                                (nested) => {
                                                                  return (
                                                                    <MenuItem
                                                                      key={`${nested.title}-MenuItem`}
                                                                      component={
                                                                        Link
                                                                      }
                                                                      to={
                                                                        nested.href
                                                                      }
                                                                    >
                                                                      <Typography
                                                                        sx={{
                                                                          fontSize:
                                                                            '1.2rem',
                                                                          lineHeight:
                                                                            '1.75',
                                                                        }}
                                                                        color="secondary"
                                                                      >
                                                                        {
                                                                          nested.label
                                                                        }
                                                                      </Typography>
                                                                    </MenuItem>
                                                                  );
                                                                },
                                                              )}
                                                            </NestedMenuItem>
                                                          )
                                                        );
                                                      }
                                                      return (
                                                        menu.isVisible && (
                                                          <MenuItem
                                                            key={`menu-${indexMenu}-menuItem`}
                                                            component={Link}
                                                            onClick={
                                                              handleClose
                                                            }
                                                            to={menu.href}
                                                          >
                                                            <Typography
                                                              sx={{
                                                                fontSize:
                                                                  '1.2rem',
                                                                lineHeight:
                                                                  '1.75',
                                                              }}
                                                              color="secondary"
                                                            >
                                                              {menu.label}
                                                            </Typography>
                                                          </MenuItem>
                                                        )
                                                      );
                                                    },
                                                  )}
                                                </Menu>

                                                {item.menus && (
                                                  <ArrowRight
                                                    color="secondary"
                                                    id={`arrow-${currentItemIndex}`}
                                                    onMouseMove={(event) => {
                                                      showMenuDinamyc(
                                                        item.title,
                                                        event,
                                                      );
                                                    }}
                                                    onClick={(event) => {
                                                      showMenuDinamyc(
                                                        item.title,
                                                        event,
                                                      );
                                                    }}
                                                  />
                                                )}
                                              </ListItemSecondaryAction>
                                            )}
                                          </ListItemButton>
                                        </Collapse>
                                      )
                                    );
                                  })}
                                </React.Fragment>
                              )
                            );
                          },
                        );
                      })}
                    </List>
                  </Collapse>
                )}
              </List>
            )}
          </Box>
        );
      })}
    </>
  );
};

export default Sections;
