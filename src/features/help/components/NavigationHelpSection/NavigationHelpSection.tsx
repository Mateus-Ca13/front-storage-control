import { ExpandMore } from '@mui/icons-material'
import { StartColumnBox } from '../../../../shared/components/Boxes/Boxes'
import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography, useTheme } from '@mui/material'
import CustomLink from '../../../../shared/components/CustomLink/CustomLink'

export default function NavigationHelpSection() {
    const theme = useTheme()
  return (
    <StartColumnBox sx={{border: `1px solid ${theme.palette.primary.light}`, borderRadius: 1, p: 2, height: '100%', justifyContent: 'start'}}>
        <Typography color='primary' fontWeight={700} variant='h5'>Navegação e interface</Typography>
        <Divider orientation='horizontal' flexItem sx={{mt: 2, mb: 2}}/>
        <StartColumnBox my={2} >
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                <Typography fontWeight={500} component="span">Navegando por interfaces</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <StartColumnBox gap={1}>
                        <Typography>
                            Ao entrar na aplicação, você verá uma aba lateral (localizada no lado esquerdo da tela).
                            Essa aba é o principal ponto de controle do sistema.
                        </Typography>
                        <Typography>
                            Na aba lateral, você pode:
                        </Typography>
                        <Typography sx={{marginLeft: 4}}>
                            <li>Navegar entre as telas principais da aplicação.</li>
                            <li>Acessar cadastros, listagens e relatórios.</li>
                            <li>Iniciar ações (como criar ou movimentar produtos).</li>
                        </Typography>
                        <Typography>
                            Pense na aba lateral como um mapa:
                            ela mostra onde você está e permite ir para onde precisa, a qualquer momento.
                        </Typography>               
                    </StartColumnBox>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                <Typography fontWeight={500} component="span">Visualizando listas e dados</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <StartColumnBox gap={1}>
                        <Typography>
                            Nesta aplicação, quase todas as informações são mostradas em listas organizadas.
                            Essas listas servem para que você possa ver, procurar e entender os dados antes de realizar qualquer ação.
                        </Typography>
                        <Typography>
                            Cada entidade possui sua própria tela de visualização, mas todas seguem um padrão visual parecido, para facilitar o uso. As entidades existentes são:
                        </Typography>
                        <Typography sx={{marginLeft: 4}}>
                            <li>Produtos</li>
                            <li>Estoques</li>
                            <li>Categorias</li>
                            <li>Movimentações</li>
                            <li>Usuários</li>
                        </Typography>
                        <Typography>
                            Uma vez na tela de listagem de alguma entidade (acesso atráves do menu lateral), você pode:
                        </Typography>
                        <Typography sx={{marginLeft: 4}}>
                            <li>Buscar por um item específico, usando a barra de pesquisa.</li>
                            <li>Filtrar os itens da lista, usando o botão "Filtrar".</li>
                            <li>Criar um novo item, usando o botão "Criar".</li>
                            <li>Vizualizar e/ou excluir dados atrráves do menu de ações.</li>
                        </Typography>
                    </StartColumnBox>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                <Typography fontWeight={500} component="span">Configurações de interface</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <StartColumnBox gap={1}>
                        <Typography>
                            Dentro da aba de <CustomLink to={'/dashboard/settings'}>configurações</CustomLink>, você pode alterar diversos aspectos da interface para melhor se adequar às suas preferências.
                        </Typography>
                        <Typography>
                            Dentre as possíveis alterações, estão:
                        </Typography>
                        <Typography sx={{marginLeft: 4}}>
                            <li>Alterar o tema da aplicação (claro ou escuro).</li>
                            <li>Alterar a quantidade de linhas exibidas por padrão nas tabelas.</li>
                            <li>Alterar a densidade das tabelas.</li>
                            <li>Alterar complexidade de composição da interface.</li>
                        </Typography>
                        <Typography>
                            As configurações de interface estão estritamente vinculadas ao dispositivo, e não ao perfil de usuário. 
                            Caso seja feito um login atráves de um dispositivo novo, as configurações de interface manterão o padrão definido para aquele dispositivo.
                        </Typography>
                    </StartColumnBox>
                </AccordionDetails>
            </Accordion>
        </StartColumnBox>
    </StartColumnBox>
    
  )
}
