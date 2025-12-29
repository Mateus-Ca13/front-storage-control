import { ExpandMore } from '@mui/icons-material'
import { StartColumnBox } from '../../../../shared/components/Boxes/Boxes'
import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography, useTheme } from '@mui/material'
import CustomLink from '../../../../shared/components/CustomLink/CustomLink'

export default function MovementsHelpSection() {
    const theme = useTheme()
  return (
    <StartColumnBox sx={{border: `1px solid ${theme.palette.primary.light}`, borderRadius: 1, p: 2, height: '100%', justifyContent: 'start'}}>
        <Typography color='primary' fontWeight={700} variant='h5'>Movimentações</Typography>
        <Divider orientation='horizontal' flexItem sx={{mt: 2, mb: 2}}/>
        <StartColumnBox my={2} >
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                <Typography fontWeight={500} component="span">Ações de movimentação</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <StartColumnBox gap={1}>
                        <Typography>
                            Movimentações são a principal ferramenta da aplicação. Elas regem todas as alterações de estoque e são a única forma de se alterar a quantidade de um produto em um estoque.
                        </Typography>
                        <Typography>
                           Através das ações de movimentação, você pode registrar entradas, saídas ou transferências de produtos entre estoques
                        </Typography>
                        <Typography>
                            Movimentações podem ser facilmente criadas através da aba de ações rápidas na aba de visão geral, no menu lateral, na aba de listagem de movimentações (Botão "Criar movimentação")
                            ou atráves do menu de caixa (operacional).
                        </Typography>
                        <Typography>
                            Durante o processo de movimentação, produtos são constantemente validados para uma boa consistência de dados. Por exemplo, você não pode retirar mais produtos do que o disponível em estoque.
                        </Typography>
                        <Typography>
                            Após o processo de movimentação ser concluido, um novo registro de movimentação é gerado. Estes registros podem ser facilmente consultados na aba de <CustomLink to='/dashboard/movements'>movimentações</CustomLink>
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
                <Typography fontWeight={500} component="span">Aba de caixa (operacional)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <StartColumnBox gap={1}>
                        <Typography>
                            A aba de caixa (operacional) é uma interface adpatada para controle atráves leitores de barras e teclas de atalho (teclado). Seu uso é direcionado para para pontos de retirada.
                        </Typography>
                        <Typography>
                            Atráves da interface, um operador pode facilmente registrar saídas e transferências de produtos (anteriormente registrados e com código de barras vinculado).
                        </Typography>
                        <Typography>
                            Apesar da pequena limitação à ação de entrada, a interface permite realizar todas as demais tarefas de movimentação, como:
                        </Typography>

                        <Typography sx={{marginLeft: 4}}>
                            <li>Selecionar (e padronizar) estoques de origem e saída.</li>
                            <li>Ler e registrar produtos atráves de leitor de barras.</li>
                            <li>Adicionar observações à movimentação.</li>
                            <li>Alterar dinamicamente a quantidade um produto na movimentação (evitando múltiplas leituras do mesmo produto).</li>
                            <li>Cancelar produtos lidos erroneamente.</li>
                        </Typography>
                    </StartColumnBox>
                </AccordionDetails>
            </Accordion>

        </StartColumnBox>
    </StartColumnBox>
    
  )
}
