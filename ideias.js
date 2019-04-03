/*

====================================================================================================================
Dimensionamento de Lajes Mistas
====================================================================================================================

1 - Checar se concreto possui fck dentro da faixa permitida
2 - Carga característica sobreposta na laje = sobrecarga + revestimento
3 - Escolher baseado na carga característica uma forma seguindo as prioridades -
    I - Menor espessura do aço (a não ser que haja outra opção, sempre usar aço 0,8)
    III - Menor peso próprio
    IV - Maior proximidade da carga calculada com a carga suportada

    PS.: Análise não pode ser feita nessa ordem. Sugestão de análise:

    Sem escoramento:

    Análise com L pré-definido:
    1) Buscar os 5 pontos mais próximos da sobrecarga no MF-50 e no MF-75 com espessura 0,8 que são maiores que a sobrecarga
        1-1)Se nenhum resistência com espessura 0.8 for maior que a sobrecarga característica, 
    buscar os 5 pontos mais próximos da sobrecarga com espessura 0.95 e daí em diante
    2) Comparar dentre os 10 ou menos pontos qual tem o menor peso próprio

    Análise sem L definido:
    1)Buscar o menor valor dentro da espessura 0,8 que atenda a carga característica mínima -> Esse valor corresponderá
    ao vão máximo possível;
    2)Calcular como esse valor se divide pelo vão total horizontal e vertical -> ceil(ParseFloat(valor_calc)) -> Esse valor será
    o número de vigas mínimo para aquela direção
    3)Achar o comprimento total de vigas multiplicando o número de vigas pelo comprimento paralelo -> e.g: Se direção for 
    vertical, multiplicar (h_total/n_vigas)*v_total
    4)Achar a opção que permita o menor valor de comprimento total de vigas
    5)Encontrada a opção, assumir (h ou v_total/n_vigas) como o novo vão máximo da tabela (substituindo ceil(ParseFloat(valor_calc)))
    6)Achar para este vão o menor peso próprio (ou menor altura de laje) dentre as opções para 0,8


    Com escoramento:

    Pensar em modelo


=========================================================================================================================
Hipóteses sobre Vigas Mistas
=========================================================================================================================

Conectados com a laje por conectores de cisalhamento
Para que os cálculos realizados segundo a bibliografia deste método seja válido, deve ser cumprida
a seguinte condição:
h/tw =< 5.7*sqrt(Ea/fy)
h -> altura da alma;
tw -> espessura da alma
Ea -> Módulo elasticidade do aço
fy -> Resistência ao escoamento do aço

Cálculo das vigas mistas --------------------------------------------------------------------------------------=----
====================================================================================================================
Cálculo da largura efetiva sobre a qual cada viga é "responsável"

Viga de extremidade:
bext = min(Le/8,e2) + min(Le/8,e1/2) 

Viga interna:
bext = min(Le/8,e1-esq/2) + min(Le/8,e1-dir/2) 

Le -> vão da viga mista
e1 -> distância entre a linha de centro de uma viga e a viga adjacente
e2 -> distância entre a linha de centro de uma viga e a extremidade

Conectores pino com cabeça ---------------------------------------------------------------------------------------

Padrão: Aço A108

Força horizontal resistente de cálculo:
QRd = min( Rg*Rp*Acs*fucs/gamacs, 0,5*Acs*sqrt(fck*Ec)/gamacs)

gamacs = Coeficiente de ponderação de resistência = 1,25
Acs = Área da seção transversal do fuste do conector
fucs = Resistência do aço do conector 
Ec = Módulo de elasticidade do concreto
Rg = Ponderação para atuação de grupo de conectores (Tabela)
Rp = Ponderação para posição do conector (Tabela)

Conectores em Perfil U ----------------------------------------------------------------------------------------------

Padrão: 

Força horizontal resistente de cálculo:
Perfil U Laminado:

QRd = (0.3*(tfcs+,5*twcs)*Lcs*sqrt(fck*Ec))/gamacs

gamacs = Coeficiente de ponderação de resistência = 1,25
tfcs = Espessura média das mesas
twcs = Espessura da alma
Lcs = Comprimento do conector

OBS: Se o perfil for formado à frio, deve-se tomar tfcs e twcs como iguais à espessura de sua chapa

Valor do esforço horizontal de cálculo -------------------------------------------------------------------------------

Fhd = min( 0.85*fcd*b*tc, Aa*fyd)

b = largura efetiva
tc = altura da laje
Aa = área do perfil de aço

Definindo o grau de interação ------------------------------------------------------------------------------------------

Define a interação entre o perfil de aço e a laje de concreto.
Os conectores de cisalhamento são o que asseguram e influenciam nessa interação.
A interação pode ser inexistente, parcial ou completa

Calculando alfa mínimo -----------------

Se:
Perfil de aço possui mesas de áreas iguais e a viga mista tem vão Le menor que 25m:

Alfa mín = max( 1- (E*(0,75-0,03Le)/578fy), 0,4)

Else if:
Perfil de aço possui mesas de áreas diferentes, com área de mesa inferior igual a 3*área da mesa superior, e a viga
tem vão Le menor que 20m:

Alfa mín = max( 1- (E*(0,75-0,015Le)/578fy), 0,4)


Else if:
Perfil de aço possui mesas de áreas diferentes com razão entre área das mesas inferior e superior entre 1 e 3,
e a viga mista tem vão Le menor ou igual a 20m, deve-se efetuar interpolação linear enrte o resultado das duas 
equações acima

Else:
Tomar Alfa mín = 1,0

Alfa (grau de interação) = n*QRd / Fhd

n = número de conectores

Se:
Alfa > 1,0 => Interação completa (Adota-se Alfa = 1,0);
Alfa mín < Alfa < 1,0 => Interação parcial
Alfa < Alfa mín => Interação inexistente - não pode ser dimensionada como viga mista mas como viga de aço

------------------------------------------------------------------------------------------------------------------------------
Dimensionamento das Vigas Mistas
------------------------------------------------------------------------------------------------------------------------------

MRd >= MSd

Preparação: Calcular h/tw da viga ---- h = altura viga / tw = espessura alma viga
Switch (h/tw):
Case ( < 3,76*sqrt(Ea*fy)):

Flambagem local da viga não ocorre, colapso se dá por plastificação total da seção transversal (rótula plástica)
viga.type = no_flam;

Case ( > 3,76*sqrt(Ea*fy) && < 5,7*sqrt(Ea*fy)):

Flambagem local ocorre em regime elastoplástico, colapso se dá pelo início do escoamento por tração da face inferior
do perfil ou esmagamento da face superior da laje de concreto por compressão

viga.type = flam;


Switch:

Case (viga.type = no_flam && viga.interacao == completa): ---------------------------------------------------

Se (0,85*fcd*b*tc > Aa*fyd):

LNP passa pela laje de concreto 

MRd = Aa*fyd*(d1+hf+tc-a/2)

Aa = Área do perfil de aço
fyd = fy/1,10
d1 = Distância do centro geométrico do perfil de aço até sua face superior
hf = Distância entre o topo do perfil de aço e a base da laje mista (Se a laje for maciça, hf=0)
tc = Altura da laje
a = Ccd/(0,85*fcd*b)

Else:

LNP passa pelo perfil de aço

Calcular Cad ---------------

Ccd = 0,85*fcd*b*tc
Cad = 0,5*(Aa*fyd - Ccd)

Se (Cad < Afs*fyd) --- Afs = Área da mesa superior
LNP passa pela mesa superior do perfil de aço
Posição do LNP a partir do topo do perfil de aço = yp
yp = Cad*tfs/Afs*fyd --- tfs = espessura da mesa superior do perfil de aço

Else if (Cad > Afs*fyd)
LNP passa pela alma do perfil de aço
Posição do LNP a partir do topo do perfil de aço = yp
yp = tfs+ hw*((Cad - Afs*fyd)/(hw*tw*fyd))

hw = distância entre faces internas das mesas do perfil de aço
tw = espessura da alma desse perfil

MRd = Cad*(d-yt-yc) + Ccd*(tc/2+hf+d-yt)

d = altura total do perfil de aço
yt = distância entre o centro geométrico da parte tracionada do perfil de aço até sua face inferior
yc = distância do centro geométrico da parte comprimida do perfil de aço até sua face superior

--------------------------------------------------------------------------------------------------------------------
Case (viga.type == no_flam && viga.interacao == parcial) ----------------------------------------------------------

Ccd = n*Qrd = Alfa*Fhd

a = Ccd / (0,85*fc*b)

MRd = Cad*(d-yt-yc)+ Ccd*(tc-a/2+hf+d-yt)

-------------------------------------------------------------------------------------------------------------------
Case (viga.type == flam)

if (viga.interacao == completa):

Calcula AlfaE -------------------------------------------------------

AlfaE = Ea/Ec

Calcula posição da LNE ----------------------------------------------
ytr,i = Aa*ya,i+(btr*tc*(d+hf+tc/2))/Aa+btr*tc

Aa = Área do perfil
ya = Centro geométrico do perfil de aço
btr = b/AlfaE

Altura comprimida do concreto na laje -------------------------------
a = d + hf + tc - ytr,i <= tc

Cálculo momento de inércia -------------------------------------------
Itr = Ia + Aa*((ytr,i-ya,i)^2) + (btr*a^3)/12 + Ac,tr((d+hf+tc-a/2-ytr,i)^2)

Ia = Momento de inércia da seção do aço em relação ao eixo x-x
Ac,tr = btr*a

Cálculo Módulo de resistência elástico inferior ------------------------
Wtr,i  = Itr/ytr,i

Cálculo Módulo de resistência elástico superior -------------------------
Wtr,s = Itr/(d+hf+tc-ytr,i)

if (viga.interacao == completa): ----------

Mrd = min(Wtr;i*fyd, AlfaE*Wtr;s*fcd )

else if (viga.interacao == parcial): ----------

Wef,i = Wa,i + sqrt(alfa)*(Wtr,i-Wa,i)

Wa, i = módulo de resistência elástico inferior do perfil de aço

Mrd = min(Wef;i*fyd, AlfaE*Wtr;s*fcd)

---------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------











*/