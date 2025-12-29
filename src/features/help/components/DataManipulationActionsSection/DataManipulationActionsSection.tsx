import { ExpandMore } from '@mui/icons-material'
import { StartColumnBox } from '../../../../shared/components/Boxes/Boxes'
import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography, useTheme } from '@mui/material'
import CustomLink from '../../../../shared/components/CustomLink/CustomLink'

export default function DataManipulationActionsSection() {
    const theme = useTheme()
  return (
    <StartColumnBox sx={{border: `1px solid ${theme.palette.primary.light}`, borderRadius: 1, p: 2, height: '100%', justifyContent: 'start'}}>
        <Typography color='primary' fontWeight={700} variant='h5'>Ações e manipulação de dados</Typography>
        <Divider orientation='horizontal' flexItem sx={{mt: 2, mb: 2}}/>
        <StartColumnBox my={2} >
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                <Typography fontWeight={500} component="span">Filtrando dados</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <StartColumnBox gap={1}>
                        <Typography>
                            Dentro de cada interface de listagem, você pode fazer uso de um campo de pesquisa e um menu de filtragem para um melhor direcionamento de busca.
                        </Typography>
                        <Typography>
                            Através do campo de pesquisa, você poderá escrever termos que você deseja buscar. A busca é realizada em tempo real, e os resultados são atualizados enquanto você digita.
                        </Typography>
                        <Typography>
                            Para abrir o menu de filtros, basta clicar no botão "Filtrar" localizado na parte superior da tela de listagem.
                        </Typography>
                        <Typography>
                            Através dele, você pode, por exemplo:
                        </Typography>
                        <Typography sx={{marginLeft: 4}}>
                            <li>Filtrar produtos por estoque, categoria ou se estão abaixo do estoque mínimo.</li>
                            <li>Filtrar movimentações por tipo, usuário ou estoque de origem/destino.</li>
                            <li>Filtrar usuários por cargo.</li>
                            <li>Filtrar categorias por nome.</li>
                            <li>Filtrar estoques por nome, status ou tipo.</li>
                            <li>Ordenar entidades por nome, quantidade em estoque ou pelo tipo de origem.</li>
                        </Typography>
                        <Typography>
                            Todos os filtros são cumulativos, ou seja, você pode combinar diversos deles para refinar ainda mais sua busca.
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
                <Typography fontWeight={500} component="span">Excluindo dados</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <StartColumnBox gap={1}>
                        <Typography>
                            Entidades podem ser excluídas a qualquer momento, com excessões de algumas que requerem conciliação com outras entidades.
                        </Typography>
                        <Typography>
                            Exemplo: Um estoque que possua produtos cadastrados não poderá ser excluído até que todos os produtos sejam removidos ou realocados para outro estoque.
                        </Typography>
                        <Typography>
                            A exclusão pode ser feita a partir de duas interfaces diferentes:
                        </Typography>
                        <Typography sx={{marginLeft: 4}}>
                            <li>A partir da tela de visualização de uma entidade (botão "Visualizar" na listagem).</li>
                            <li>A partir do menu de ações rápidas na listagem de entidades (botão de três pontos).</li>
                        </Typography>
                        <Typography>
                            Uma vez selecionado, a aplicação solicitará à você a confirmação de exclusão. Após essa etapa, a entidade será excluída.
                        </Typography>
                        <Typography>
                            Quando uma entidade é excluída (como produtos e estoques), sua referência é mantida pelo sistema para questões de métricas (movimentações), mas não está mais diponível para gerenciamento. 
                        </Typography>
                        <Typography>
                            Certifique sempre de que validar a importância da entidade para o sistema. Não há nehuma forma de desfazer ações de exclusão.
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
                <Typography fontWeight={500} component="span">Criando/Registrando dados</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <StartColumnBox gap={1}>
                        <Typography>
                            Dentro de cada interface de listagem, você pode fazer uso de um botão de "Criar" para registrar novas entidades.
                        </Typography>
                        <Typography>
                            Ao clicá-lo, um pequeno pop-up surgirá solicitando as informações necessárias para a criação da nova entidade.
                        </Typography>
                        <Typography>
                            Atente-se ao fato de que algumas informações podem ser obrigatórias e outras opcionais. Caso alguma informação obrigatória não seja preenchida, a aplicação exibirá um erro e não permitirá a criação da entidade.
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
                <Typography fontWeight={500} component="span">Importando dados</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <StartColumnBox gap={1}>
                        <Typography>
                            A importação de entidades está limitada somente à produtos, devido a quantidade massiva de dados que pode ser necessária importar de uma só vez.
                        </Typography>
                        <Typography>
                            Para importar produtos, você deve clicar no botão de "Criar produto", na <CustomLink to='/dashboard/products'>tela de listagem de produtos. </CustomLink>
                            Dentro do pop-up de criação, existe um pequeno ícone no canto superior direito. Clique nele para abrir a tela de importação.
                        </Typography>
                        <Typography>
                            Dentro da tela de importação, você pode importar um arquivo CSV, que deve seguir um padrão específico para que a importação seja bem sucedida.
                        </Typography>
                        <Typography>
                            Você pode baixar um modelo de arquivo CSV clicando no botão "Baixar arquivo modelo" na tela de importação.
                        </Typography>
                        <Typography>
                            Após selecionar o arquivo, a aplicação irá processar os dados e devolver a relação de produtos importados. Caso alguns dos produtos não estejam em conformidade,
                            estes serão destacados para a correção (com sua respectiva sugestão de correção). 
                        </Typography>
                        <Typography>
                            Após todos os itens estarem em conformidade com a estrutura de dados da aplicação, você pode cadastrá-los clicando no botão "Importar produtos".
                           
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
                <Typography fontWeight={500} component="span">Editando dados</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <StartColumnBox gap={1}>
                        <Typography>
                            Através da tela de visualização de uma entidade (botão "Visualizar" na listagem), você pode editar os dados de uma entidade. Para isso, basta clicar no botão "Editar".
                        </Typography>
                        <Typography>
                           Edições podem ser confirmadas através do botão "Salvar", ou canceladas através do botão "Cancelar". 
                        </Typography>
                    </StartColumnBox>
                </AccordionDetails>
            </Accordion>
        </StartColumnBox>
    </StartColumnBox>
    
  )
}
