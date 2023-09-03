import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import { Breadcrumbs, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[300]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': { backgroundColor: emphasize(backgroundColor, 0.06) },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const CustomizedBreadcrumbs = ({ breadCrumb }) => {
  const navigate = useNavigate();

  const handleNavigate = (to) => {
    navigate(to);
  };

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {breadCrumb.map(({ href, label, icon: Icon }) => {
          if (Icon) {
            return (
              <StyledBreadcrumb
                key={label}
                onClick={() => {
                  handleNavigate(href);
                }}
                label={label}
                icon={<Icon style={{ color: '#005882' }} />}
              />
            );
          }
          return (
            <StyledBreadcrumb
              key={label}
              onClick={() => {
                handleNavigate(href);
              }}
              label={label}
            />
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default CustomizedBreadcrumbs;
