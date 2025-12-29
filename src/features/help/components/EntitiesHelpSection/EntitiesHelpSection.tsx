import { ExpandMore } from '@mui/icons-material'
import { StartColumnBox } from '../../../../shared/components/Boxes/Boxes'
import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography, useTheme } from '@mui/material'
import CustomLink from '../../../../shared/components/CustomLink/CustomLink'

export default function EntitiesHelpSection() {
    const theme = useTheme()
  return (
    <StartColumnBox sx={{border: `1px solid ${theme.palette.primary.light}`, borderRadius: 1, p: 2, height: '100%', justifyContent: 'start'}}>
        <Typography color='primary' fontWeight={700} variant='h5'>Entidades e dados</Typography>
        <Divider orientation='horizontal' flexItem sx={{mt: 2, mb: 2}}/>
        <StartColumnBox my={2} >
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                <Typography fontWeight={500} component="span">O que são entidades?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <StartColumnBox gap={1}>
                        <Typography>
                            Entidades são representações de objetos físicos ou lógicos que possuem características e propriedades, e que podem ser cadastradas, visualizadas e gerenciadas.
                        </Typography>
                        <Typography>
                            No contexto do sistema de controle de estoque, as entidades são os elementos principais que você gerencia. As principais entidades são:
                        </Typography>
                        <Typography sx={{marginLeft: 4}}>
                          <li>Produtos</li>
                          <li>Estoques</li>
                          <li>Categorias</li>
                          <li>Usuários</li>
                          <li>Movimentações</li>
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
                <Typography fontWeight={500} component="span">Produtos</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <StartColumnBox gap={1}>
                        <Typography>
                            Produtos são todos e quaisquer itens que você gerencia e quantifica em seus estoques. Cada produto possui os seguintes campos:
                        </Typography>
                        <Typography sx={{marginLeft: 4}}>
                          <li>Nome</li>
                          <li>Descrição</li>
                          <li>Código de barras</li>
                          <li>Ùltimo preço pago</li>
                          <li>Estoque mínimo</li>
                          <li>Estoque atual</li>
                          <li>Categoria</li>
                          <li>Unidade de medida</li>
                        </Typography>
                        <Typography>
                           <strong>NOME:</strong>  Campo de texto que identifica produto
                        </Typography>
                        <Typography>
                           <strong>DESCRIÇÃO:</strong> Campo de texto que descreve características ou detalhes do produto.
                        </Typography>
                        <Typography>

                            <strong>CÓDIGO DE BARRAS:</strong> Campo numérico que identifica o código de barras do produto. Caso o produto não possua um código de barras, o sistema irá gerar um automaticamente.
                        </Typography>
                        <Typography>
                             <strong>ÚLTIMO PREÇO PAGO:</strong> Campo numérico que registra o último preço de compra do produto. Atualizado a cada movimentação de entrada (compra).
                        </Typography>
                        <Typography>
                             <strong>ESTOQUE MÍNIMO:</strong> Campo numérico que define a quantidade mínima de estoque para o produto. Quando o estoque atual atinge ou fica abaixo desse valor, o produto é sinalizado.
                        </Typography>
                        <Typography>
                             <strong>ESTOQUE ATUAL:</strong> Relação de quantidades e estoques em em que o produto está presente. A quantidade de um produto só pode ser modificada através de movimentações.
                        </Typography>
                        <Typography>
                             <strong>CATEGORIA:</strong> Campo de seleção que vincula o produto a uma categoria pré-cadastrada.
                        </Typography>
                        <Typography>
                             <strong>UNIDADE DE MEDIDA:</strong> Campo de seleção que define a unidade de medida do produto (UN, KG, M e L).
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
                <Typography fontWeight={500} component="span">Estoques</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <StartColumnBox gap={1}>
                        <Typography>
                            Estoques são locais físicos ou virtuais onde os produtos são armazenados. Cada estoque possui os seguintes campos:
                        </Typography>
                        <Typography sx={{marginLeft: 4}}>
                          <li>Nome</li>
                          <li>Tipo</li>
                          <li>Status</li>
                          <li>Produtos associados</li>
                        </Typography>
                        <Typography>
                           <strong>NOME:</strong> Campo de texto que identifica o estoque.
                        </Typography>
                        <Typography>
                           <strong>TIPO:</strong> Campo de seleção que define o tipo de estoque (Central ou Secundário).
                        </Typography>
                        <Typography>
                           <strong>STATUS:</strong> Campo de texto que indica se o estoque está ativo, inativo ou em manutenção.
                        </Typography>
                        <Typography>
                           <strong>PRODUTOS ASSOCIADOS:</strong> Lista de produtos que estão armazenados neste estoque.
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
                <Typography fontWeight={500} component="span">Categorias</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <StartColumnBox gap={1}>
                        <Typography>
                          Categorias são agrupamentos de produtos com características semelhantes. Cada categoria possui os seguintes campos:
                        </Typography>
                        <Typography sx={{marginLeft: 4}}>
                          <li>Nome</li>
                          <li>Padrão de cor</li>
                          <li>Produtos associados</li>
                        </Typography>
                        <Typography>
                           <strong>NOME:</strong> Campo de texto que identifica o estoque.
                        </Typography>
                        <Typography>
                           <strong>PADRÃO DE COR:</strong> Campo de seleção que define a cor padrão de uma categoria, apenas para fins visuais.
                        </Typography>
                        <Typography>
                           <strong>PRODUTOS ASSOCIADOS:</strong> Lista de produtos que estão armazenados associados à categoria.
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
                <Typography fontWeight={500} component="span">Usuários</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <StartColumnBox gap={1}>
                        <Typography>
                          Usuários são as pessoas que utilizam o sistema. Cada usuário possui os seguintes campos:
                        </Typography>
                        <Typography sx={{marginLeft: 4}}>
                          <li>Nome</li>
                          <li>Usuário</li>
                          <li>E-mail</li>
                          <li>Senha</li>
                          <li>Função</li>
                        </Typography>
                        <Typography>
                           <strong>NOME:</strong> Campo de texto que identifica o usuário .
                        </Typography>
                        <Typography>
                           <strong>USUÁRIO:</strong> Campo de texto que define o nome de usuário para login.
                        </Typography>
                        <Typography>
                           <strong>E-MAIL:</strong> Campo de texto que registra o endereço de e-mail do usuário. Também é utilizado para login.
                        </Typography>
                        <Typography>
                           <strong>SENHA:</strong> Campo de texto para a senha de acesso do usuário.
                        </Typography>
                        <Typography>
                           <strong>FUNÇÃO:</strong> Campo de seleção que define o nível de acesso e permissões do usuário no sistema (Usuário, Administrador e Super Administrador).
                        </Typography>
                        
                        <Typography>
                            Funções definem o nível de acesso e as permissões que cada usuário possui dentro da aplicação. Segue abaixo uma relação das permissões atribuídas a cada função:
                        </Typography>
                        <Typography sx={{marginLeft: 4}}>
                            <li>
                                <strong>Usuário:</strong> Pode apenas visualizar produtos, estoques, categorias, etc., aos quais possui permissão de acesso.
                            </li>
                            <li>
                                <strong>Administrador:</strong> Possui todas as permissões de um usuário comum, além de poder gerenciar produtos, estoques, categorias, etc. Pode também criar novas movimentações entre estoques
                            </li>
                            <li>
                                <strong>Super Administrador:</strong> Acesso irrestrito a todas as funcionalidades do sistema, incluindo gerenciamento de outros usuários e administradores.
                            </li>       
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
                <Typography fontWeight={500} component="span">Movimentações</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <StartColumnBox gap={1}>
                        <Typography>
                          Movimentações registram todas as entradas e saídas de produtos nos estoques. Cada movimentação possui os seguintes campos:
                        </Typography>
                        <Typography sx={{marginLeft: 4}}>
                          <li>Tipo</li>
                          <li>Produtos associados</li>
                          <li>Estoque de origem</li>
                          <li>Estoque de destino</li>
                          <li>Operador responsável</li>
                          <li>Observações</li>
                          <li>Data da movimentação</li>
                        </Typography>
                        <Typography>
                           <strong>TIPO:</strong> Campo de seleção que define o tipo de movimentação (Entrada, Saída, Transferência).
                        </Typography>
                        <Typography>
                           <strong>PRODUTOS ASSOCIADOS:</strong> Lista de produtos que estão associados à movimentação. Cada um destes, possui quantidade e valor unitário associados.
                        </Typography>
                        <Typography>
                           <strong>ESTOQUE DE ORIGEM:</strong> Campo de seleção que indica o estoque de onde o produto está saindo (obrigatório para Saída e Transferência).
                        </Typography>
                        <Typography>
                           <strong>ESTOQUE DE DESTINO:</strong> Campo de seleção que indica o estoque para onde o produto está indo (obrigatório para Entrada e Transferência).
                        </Typography>
                        <Typography>
                           <strong>OPERADOR RESPONSÁVEL:</strong> Campo que identifica o usuário que realizou a movimentação.
                        </Typography>
                        <Typography>
                           <strong>OBSERVAÇÕES:</strong> Campo de texto opcional para adicionar informações sobre a movimentação.
                        </Typography>
                        <Typography>
                           <strong>DATA DA MOVIMENTAÇÃO:</strong> Campo de data que registra quando a movimentação ocorreu.
                        </Typography>
                        <Typography>
                            Movimentações não possuem possibilidade de edição após serem criadas.
                        </Typography>
                    </StartColumnBox>
                </AccordionDetails>
                
            </Accordion>

        </StartColumnBox>
    </StartColumnBox>
    
  )
}
