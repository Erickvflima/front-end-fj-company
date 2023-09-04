import { Article, Person } from '@mui/icons-material';

const sections = [
  {
    subheader: 'randomMessages',
    section: 'randomMessages',
    label: 'Mensagens Aleatórias',
    href: '/randomMessages',
    open: true,
    icon: Article,
    isVisible: true,
  },
  {
    subheader: 'teamMessages',
    section: 'teamMessages',
    label: 'Mensagens da Equipe',
    href: '/teamMessages',
    open: true,
    icon: Person,
    isVisible: true,
  },
  {
    subheader: 'messageRegistration',
    section: 'messageRegistration',
    label: 'Cadastro de Mensagens',
    href: '/messageRegistration',
    open: true,
    icon: Person,
    isVisible: true,
  },
  {
    subheader: 'userManagement',
    section: 'userManagement',
    label: 'Usuários',
    href: '/userManagement',
    open: true,
    icon: Person,
    isVisible: true,
  },
];

export default sections;
