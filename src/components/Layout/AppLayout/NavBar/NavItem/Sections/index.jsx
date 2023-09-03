/* eslint-disable operator-linebreak */
/* eslint-disable react/no-array-index-key */
import NestedMenuItem from 'mui-nested-menu-item';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
import sections from '../../../../../../menus';
// import { useAppSelector } from 'hooks/useAppStore';

const Sections = () => {
  const navigate = useNavigate();
  // const permissions = useAppSelector((state) => {
  //   return state.groups.groupsAndPermission.data;
  // });

  // eslint-disable-next-line no-unused-vars
  const [_, setCurrentSections] = useState(sections);
  const [currentAnchorEl, setCurrentAnchorEl] = useState([]);

  // useEffect(() => {
  //   const anchorEl = [];
  //   const openControl = [];
  //   sections.forEach((sectionArray) => {
  //     sectionArray.subsections?.forEach((subsection) => {
  //       subsection.partners.forEach((partner) => {
  //         openControl.push({
  //           section: sectionArray.section,
  //           isOpen: sectionArray.open,
  //           partners: [{ partner: partner.title, isOpen: open }],
  //         });

  //         partner.itens.forEach((item) => {
  //           anchorEl.push({ partner: item.title, anchorEl: item.anchorEl });
  //         });
  //       });
  //     });
  //   });
  //   setCurrentAnchorEl([...anchorEl]);
  // }, [open]);

  // useEffect(() => {
  //   const newArray = [...sections];
  //   if (permissions) {
  //     const permissionSection = permissions.filter((section) => {
  //       if (section.tipo === 'SECTION') {
  //         return section;
  //       }

  //       return false;
  //     });

  //     const permissionsSubSection = permissions.filter((subSection) => {
  //       if (subSection.tipo === 'SUBSECTION') {
  //         return subSection;
  //       }
  //       return false;
  //     });

  //     const permissionsItem = permissions.filter((item) => {
  //       if (item.tipo === 'ITEM') {
  //         return item;
  //       }
  //       return false;
  //     });
  //     const permissionsMenu = permissions.filter((menu) => {
  //       if (menu.tipo === 'MENU') {
  //         return menu;
  //       }
  //       return false;
  //     });

  //     permissionSection.forEach((section, index) => {
  //       if (permissionSection[index]) {
  //         const currentSection = sections.findIndex((findSectionIndex) => {
  //           return findSectionIndex.subheader === section.funcionalidade;
  //         });

  //         if (currentSection !== -1) {
  //           newArray[currentSection].isVisible = section.visualizar;
  //           setCurrentSections([...newArray]);
  //         }
  //       } else {
  //         newArray[index].isVisible = false;
  //       }
  //     });

  //     sections.forEach((section, indexSection) => {
  //       const existSubsection = section.subsections;
  //       if (existSubsection) {
  //         const existNewArray = newArray[indexSection];
  //         let existNewArraySubsection: ISections['subsections'];

  //         if (existNewArray) {
  //           existNewArraySubsection = existNewArray.subsections;
  //           if (existNewArraySubsection) {
  //             // eslint-disable-next-line operator-linebreak
  //             existNewArraySubsection[0].partners.forEach((partner, indexPartnerParams) => {
  //               const indexPermissionSubSection = permissionsSubSection.findIndex((permissionSubSection) => {
  //                 return permissionSubSection.funcionalidade === partner.title;
  //               });
  //               if (existNewArraySubsection) {
  //                 if (indexPermissionSubSection > -1) {
  //                   // eslint-disable-next-line operator-linebreak
  //                   existNewArraySubsection[0].partners[indexPartnerParams].isVisible =
  //                     permissionsSubSection[indexPermissionSubSection].visualizar;

  //                   partner.itens.forEach((item, indexItem) => {
  //                     const indexPermissionItem = permissionsItem.findIndex((permissionItem) => {
  //                       return permissionItem.funcionalidade === item.title;
  //                     });

  //                     if (indexPermissionItem > -1 && existNewArraySubsection) {
  //                       // eslint-disable-next-line operator-linebreak
  //                       existNewArraySubsection[0].partners[indexPartnerParams].itens[indexItem].isVisible =
  //                         permissionsItem[indexPermissionItem].visualizar;

  //                       item.menus?.forEach((menu, indexMenu) => {
  //                         const indexPermissionMenu = permissionsMenu.findIndex((permissionMenu) => {
  //                           return permissionMenu.funcionalidade === menu.title;
  //                         });

  //                         if (indexPermissionMenu > -1 && existNewArraySubsection) {
  //                           const existMenu =
  //                             existNewArraySubsection[0].partners[indexPartnerParams].itens[indexItem].menus;
  //                           if (existMenu) {
  //                             existMenu[indexMenu].isVisible = permissionsMenu[indexPermissionMenu].visualizar;
  //                           }
  //                         }
  //                       });
  //                     } else if (existNewArraySubsection) {
  //                       existNewArraySubsection[0].partners[indexPartnerParams].itens[indexItem].isVisible = false;
  //                     }
  //                   });
  //                 } else {
  //                   existNewArraySubsection[0].partners[indexPartnerParams].isVisible = false;
  //                 }
  //               }
  //             });
  //           }
  //         }
  //       }
  //     });
  //   }
  // }, [permissions]);

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
          <Box key={`${section.section + section.href}-sectionBox`}>
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
