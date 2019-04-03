
//Funções auxiliares


function removeElement(elementId) {
    //Remove o elemento do documento
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

function addElement(parentId, elementTag, elementId, html) {
    //Adiciona um elemento ao documento
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    newElement.innerHTML = html;
    p.appendChild(newElement);
}





//Condição para estabelecer combinações por efeito combinado para estado de limite último
/*if (sobrecarga < 5) {
    var comb_ult_normal = 1.4*(peso_permanente) + 1.4*(peso_variavel)
    var comb_ult_const = 1.3*(peso_permanente) + 1.2*(peso_variavel)
}

else {
    var comb_ult_normal = 1.35*(peso_permanente) + 1.5*(peso_variavel)
    var comb_ult_const = 1.25*(peso_permanente) + 1.3*(peso_variavel) 
}
//Combinações para estado último de serviço
var comb_serv_perm = peso_permanente + gama2*peso_variavel
var comb_serv_freq = peso_permanente  + gama1*var_principal + gama2*(peso_variavel - var_principal) 
var comb_serv_rara = peso_permanente + var_principal + gama1*(peso_variavel - var_principal)*/



//Etapa 1

function calcEtapa1() {

    //Class instaniating


let load_new = new load;
let vmp1_new = new beam_vmp1;
let vmp2_new = new beam_vmp2;
let vms_new = new beam_vms;
let laje_mista_new = new laje_mista;

//===============================================================================================================
//Dimensionamento Lajes Mistas
//===============================================================================================================



//Estes arrays 2D representam os valores de tabela da Metform para cálculo


var direcao = vms_new.orientation;
var l_viga = vms_new.spacing;
var comb_ult_normal = load_new.comb_ult_normal;


//Cálculo momentos vigas dependendo da direção
if (direcao == 'Horizontal') {
    var n_viga = laje_mista_new.n_viga;
    var d_min_vms = (laje_mista_new.width*100)/20 //em cm
    var d_min_vmp1 = (laje_mista_new.heigth*100)/20 //em cm
    var area_influencia_vms = l_viga
    var area_influencia_vmp1 = laje_mista_new.width/2
    var carga_vms = area_influencia_vms*comb_ult_normal
    var carga_vmp1 = area_influencia_vmp1*comb_ult_normal
    var m_max_vms = (area_influencia_vms*comb_ult_normal*(laje_mista_new.width^2))/8
    var apoio_vms = (area_influencia_vms*comb_ult_normal*laje_mista_new.width)/2
    var m_max_vmp2 =(area_influencia_vms*comb_ult_normal*(laje_mista_new.width^2))/8
    var apoio_vmp2 =(area_influencia_vms*comb_ult_normal*laje_mista_new.width)/2    
    var m_max_vmp1
    var apoio_vmp1 = ((area_influencia_vmp1*comb_ult_normal*laje_mista_new.heigth) + (apoio_vms*n_viga))/2
    
}
else if(direcao == 'Vertical') {
    var n_viga = laje_mista_new.n_viga;
    var d_min_vms = (laje_mista_new.heigth*100)/20 //em cm
    var d_min_vmp1 = (laje_mista_new.width*100)/20 //em cm
    var area_influencia_vms = l_viga
    var area_influencia_vmp1 = laje_mista_new.heigth/2
    var carga_vms = area_influencia_vms*comb_ult_normal
    var carga_vmp1 = area_influencia_vmp1*comb_ult_normal
    var m_max_vms = (area_influencia_vms*comb_ult_normal*(laje_mista_new.heigth^2))/8
    var apoio_vms = (area_influencia_vms*comb_ult_normal*laje_mista_new.heigth)/2
    var m_max_vmp2 =(area_influencia_vms*comb_ult_normal*(laje_mista_new.heigth^2))/8
    var apoio_vmp2 =(area_influencia_vms*comb_ult_normal*laje_mista_new.heigth)/2
    var m_max_vmp1 
    var apoio_vmp1 = ((area_influencia_vmp1*comb_ult_normal*laje_mista_new.width) + (apoio_vms*n_viga))/2  
}

else {
    console.log('Direção das vigas inválido')
}

   

    var tw_min_vms = d_min_vms/50; //em mm
    var tw_min_vmp1 = d_min_vmp1/50; // em mm

    /*document.getElementById('mmaxVMS').value = m_max_vms.toFixed(2)
    document.getElementById('apoioVMS').value = apoio_vms.toFixed(2)
    //document.getElementById('mmaxVMP1').value = m_max_vmp1.toFixed(2)
    document.getElementById('apoioVMP1').value = apoio_vmp1.toFixed(2)*/
    document.getElementById('mmaxVMP2').value = m_max_vmp2.toFixed(2)
    document.getElementById('apoioVMP2').value = apoio_vmp2.toFixed(2)
    document.getElementById('d_min_vms').value = d_min_vms
    document.getElementById('d_min_vmp1').value = d_min_vmp1
    document.getElementById('tw_min_vms').value = tw_min_vms
    document.getElementById('tw_min_vmp1').value = tw_min_vmp1
    var mesa_min_vms = d_min_vms/2 //em cm
    var mesa_min_vmp1 = d_min_vmp1/2 // em cm*/

// Memória de Cálculo Etapa 1
var text_etapa1 =  'As cargas atuantes sobre um módulo típico podem ser divididas em permanentes e acidentais. No exemplo citado'+
' são classificadas como cargas permanentes as cargas do peso próprio da laje, da estrutura de aço, das divisórias e do revestimento.'+
' São classificadas como cargas acidentais a sobrecarga. No exemplo, a sobrecarga utilizada é menor que 5 KN/m², de modo que'+
' a combinação última normal atuante pode ser estimada por 1.4*(carga permanente + carga acidental) ='+comb_ult_normal.toFixed(2)+
'KN/m².'+'<br>'+'A área de influência das'+' cargas sobre a VMS e a VMP2 é igual se considerarmos este como um módulo típico que'+ 
' continua em todas as direções. Tal área tem o'+' valor de '+area_influencia_vms.toFixed(2)+'m para a VMS/VMP2 e '+area_influencia_vmp1.toFixed(2)+ 
'm para a VMP1.'+'<br>'+'A carga atuante total sobre a VMS e VMP2 é '+carga_vms.toFixed(2)+'KN/m e a carga sobre a VMP1 é '+carga_vmp1.toFixed(2)+
'KN/m, além de '+n_viga.toFixed(0)+' forças pontuais espaçadas de '+l_viga.toFixed(1)+'m, com valor de '+apoio_vms.toFixed(2)+' KN cada.'+
'Os resultados da análise estrutural podem ser observados nos quadros abaixo.'

var laje_ot_text = `A melhor laje para as dimensões escolhidas é a Metform MF-50 com ${laje_mista_new.slab_height_ot} mm de altura,
 ${laje_mista_new.slab_weight_ot} KN/m³ de peso e ${laje_mista_new.sobrecarga_ot} KN/m² de carga máxima. Os vãos para a disposição escolhida
 são de ${laje_mista_new.vao_max_ot}m e a melhor disposição de vigas secundárias é a ${laje_mista_new.direcao_ot}`


try {
    removeElement('memory1')
    removeElement('laje_mista_ot_text')
    removeElement('laje_mista_title_text')
    
    
}
catch(e) {}
finally {}

if (document.getElementById('memoriaEtapa1').checked) {
    $("#display_drawing1").removeClass("d-none")
    $("#laje_mista_ot").removeClass("d-none")
    addElement('memory1_div','p','memory1',text_etapa1)
    addElement('laje_mista_title','h4','laje_mista_title_text','Dimensões da Laje Mista')
    addElement('laje_mista_ot','p','laje_mista_ot_text',laje_ot_text)
}
//Checks if drawing-laje already exists and deletes it before replacing it for a new drawing

if ($("#drawing-laje").children().length > 0) {
    $("#drawing-laje").empty()
    draw_laje_mista()
} else {
    draw_laje_mista()
}

//Declaring variables which will be used for drawing_loads
var length_vms
var length_vmp1

//Checks if the drawing is vertical or horizontal to determine lengths for VMS, VMP1 and VMP2
laje_mista_new.direcao_ot == "Horizontal" ? length_vms = laje_mista_new.width : length_vms = laje_mista_new.heigth
laje_mista_new.direcao_ot == "Horizontal" ? length_vmp1 = laje_mista_new.heigth : length_vmp1 = laje_mista_new.width

//Checks if drawing_loads already exists and deletes it before replacing it for a new drawing

if ($("#drawing_load_vms").children().length > 0 || $("#drawing_load_vmp1").children().length > 0 || 
$("#drawing_load_vmp2").children().length > 0) {

    console.log("Existem filhos")
$("#drawing_load_vms").empty()
$("#drawing_load_vmp1").empty()
$("#drawing_load_vmp2").empty()

draw_loads("drawing_load_vms",vms_new.max_stress.toFixed(2),length_vms)
draw_loads("drawing_load_vmp1",vmp1_new.max_stress.toFixed(2),length_vmp1)
draw_loads("drawing_load_vmp2",vms_new.max_stress.toFixed(2),length_vms)

} else {

draw_loads("drawing_load_vms",vms_new.max_stress.toFixed(2),length_vms)
draw_loads("drawing_load_vmp1",vmp1_new.max_stress.toFixed(2),length_vmp1)
draw_loads("drawing_load_vmp2",vms_new.max_stress.toFixed(2),length_vms)

}



//Prep Etapa 2

var eff = parseFloat(document.getElementById('eff').value); // em mm
var n_parafusos_vms_est = Math.floor((10*d_min_vms/eff)-2); //sem unidade
var n_parafusos_vmp1_est = Math.floor((10*d_min_vmp1/eff)-2); //sem unidade
document.getElementById('n_paraf_vms').value = n_parafusos_vms_est
document.getElementById('n_paraf_vmp1').value = n_parafusos_vmp1_est

    $('#mmaxVMS').val(vms_new.max_stress.toFixed(2))
    $('#apoioVMS').val(vms_new.support.toFixed(2)) 
    $('#mmaxVMP1').val(vmp1_new.max_stress.toFixed(2))
    $('#apoioVMP1').val(vmp1_new.support.toFixed(2))
    //$('#mmaxVMP2').val(beam_vmp2_new.max_stress.toFixed(2))
    //$('#apoioVMP2').val(beam_vmp2_new.support.toFixed(2))
    
    //$('d_min_vms').val() = d_min_vms
    //$('d_min_vmp1').val() = d_min_vmp1
    //$('tw_min_vms').val() = tw_min_vms
    //$('tw_min_vmp1').val() = tw_min_vmp1
    var mesa_min_vms = d_min_vms/2 //em cm  
    var mesa_min_vmp1 = d_min_vmp1/2 // em cm 
}


//------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------

//===================================================================================================================

//Etapa 2

function calcEtapa2() {

//Instaniating classes

var load_new = new load;
var laje_mista_new = new laje_mista;

var direcao = laje_mista_new.direcao_ot
var l_viga = laje_mista_new.vao_max_ot

var comb_ult_normal = load_new.comb_ult_normal


//Cálculo momentos vigas dependendo da direção
if (direcao == 'Horizontal') {
    var n_viga = (laje_mista_new.heigth/l_viga) - 1
    var d_min_vms = (laje_mista_new.width*100)/20 //em cm
    var d_min_vmp1 = (laje_mista_new.heigth*100)/20 //em cm
    var area_influencia_vms = l_viga
    var area_influencia_vmp1 = laje_mista_new.width/2
    var m_max_vms = (area_influencia_vms*comb_ult_normal*(laje_mista_new.width^2))/8
    var apoio_vms = (area_influencia_vms*comb_ult_normal*laje_mista_new.width)/2
    var m_max_vmp2 =(area_influencia_vms*comb_ult_normal*(laje_mista_new.width^2))/8
    var apoio_vmp2 =(area_influencia_vms*comb_ult_normal*laje_mista_new.width)/2    
    var m_max_vmp1
    var apoio_vmp1 = ((area_influencia_vmp1*comb_ult_normal*laje_mista_new.heigth) + (apoio_vms*n_viga))/2
}
else if(direcao == 'Vertical') {
    var n_viga = (laje_mista_new.width/l_viga) - 1
    var d_min_vms = (laje_mista_new.heigth*100)/20 //em cm
    var d_min_vmp1 = (laje_mista_new.width*100)/20 //em cm
    var area_influencia_vms = l_viga
    var area_influencia_vmp1 = laje_mista_new.heigth/2
    var m_max_vms = (area_influencia_vms*comb_ult_normal*(laje_mista_new.heigth^2))/8
    var apoio_vms = (area_influencia_vms*comb_ult_normal*laje_mista_new.heigth)/2
    var m_max_vmp2 =(area_influencia_vms*comb_ult_normal*(laje_mista_new.heigth^2))/8
    var apoio_vmp2 =(area_influencia_vms*comb_ult_normal*laje_mista_new.heigth)/2
    var m_max_vmp1 
    var apoio_vmp1 = ((area_influencia_vmp1*comb_ult_normal*laje_mista_new.width) + (apoio_vms*n_viga))/2  
}

else {
    console.log('Direção das vigas inválido')
}



//Perfil aço
var material_viga = document.getElementById('viga').value;
var material_cantoneira = document.getElementById('cantoneira_material').value;
var material_parafuso = document.getElementById('parafuso').value;
//Define características por material (em MPa)
switch(material_viga) {
    case "USI Civil 300":
    var fy_viga = 300;
    var fu_viga = 400;
    var class_aco = 1;
    break;
    case "USI Civil 350":
    var fy_viga = 350;
    var fu_viga = 500;
    var class_aco = 2;
    break;
    case "USI SAC 300":
    var fy_viga = 300;
    var fu_viga = 350;
    var class_aco = 3;
    break;
    case "USI SAC 350":
    var fy_viga = 350;
    var fu_viga = 500;
    var class_aco = 4;
    break;
    case "USI FIRE 350":
    var fy_viga = 350;
    var fu_viga = 490;
    var class_aco = 5;
    break;
    case "CSN COR 420":
    var fy_viga = 300;
    var fu_viga = 420;
    var class_aco = 3;
    break;
    case "CSN COR 500":
    var fy_viga = 380;
    var fu_viga = 500;
    var class_aco = 4;
    break;
    default:
    var fy_viga = 350;
    var fu_viga = 500;
    var class_aco = 2;
    break;
}
switch (material_cantoneira) {
    case "ASTM A36":
    var fy_cantoneira = 250;
    var fu_cantoneira = 400;
    break;
}

switch(material_parafuso) {
    case "ASTM A325":
    var fy_parafuso = 635;
    var fu_parafuso = 825;
    break;
}

//Pega valores para cálculo da etapa 2 dentro de inputs
var db = parseFloat(document.getElementById('db').value); //em mm
var modo_parafusamento = parseFloat(document.getElementById('parafusamento').value); //em mm
var tipo_furo = parseFloat(document.getElementById('furo').value); //em mm
var espessura_cantoneira = parseFloat(document.getElementById('cantoneira_espessura').value); //em mm
var largura_cantoneira = parseFloat(document.getElementById('cantoneira_largura').value); //em mm
var res_solda = parseFloat(document.getElementById('solda').value); // em MPa
var gabarito_furacao = parseFloat(document.getElementById('gabarito').value); // em mm
var eff = parseFloat(document.getElementById('eff').value); // em mm
var recorte_hor = parseFloat(document.getElementById('recorte_hor').value); //em mm
var recorte_vert = parseFloat(document.getElementById('recorte_ver').value); //em mm
var tw_vms = parseFloat(document.getElementById('tw_min_vms').value); //em cm
var d_vms = parseFloat(document.getElementById('d_min_vms').value); //em cm
var tw_vmp1 = parseFloat(document.getElementById('tw_min_vmp1').value);//em cm
var d_vmp1= parseFloat(document.getElementById('d_min_vmp1').value); //em cm

//Estabelece valores para cálculo da etapa 2 dentro de conceitos do aço estrutural
var efb = 40; //checar maneiras convincentes de estimar e rever para o caso de recorte
var dh = db+modo_parafusamento+tipo_furo; //em mm
var eff_min = 3*db; //em mm
var eff_max = Math.min(24*tw_vms*10,300); // em mm
var efb_min_vms = 1.25*db; //em mm 
var efb_max_vms = Math.min(12*tw_vms*10,150) //em mm
var efc = Math.min(gabarito_furacao-espessura_cantoneira,(gabarito_furacao)); //Fazer mínimo comparar com tw da viga 2
var n_parafusos_vms_est = Math.floor((10*d_vms/eff)-2); //sem unidade
var n_parafusos_vmp1_est = Math.floor((10*d_vmp1/eff)-2); //sem unidade
var n_parafusos_vms =  document.getElementById('n_paraf_vms').value; //sem unidade
var n_parafusos_vmp1 = document.getElementById('n_paraf_vmp1').value; //sem unidade
var tw_pilar = 9.9 //em mm
var dist_furo_aba = gabarito_furacao - espessura_cantoneira // em mm
var dist_furo_alma_pilar = ((2*gabarito_furacao)+tw_vms-tw_pilar)/2 //em mm
var alfa_b = 0.4;// constante - Rever


//Cisalhamento parafuso (VMS em VMP2)
var fv_solicitante_vms = (apoio_vms/(n_parafusos_vms*2)); // em KN - Rever plano de corte (2)
var area_parafuso = (Math.PI*((db/10)^2)/4); //em cm²
var fv_resistente_vms = ((alfa_b*area_parafuso*(fu_parafuso/10))/1.35); // em KN
console.log(fv_resistente_vms)
//Pressão de contato furos alma da viga e mesa da outra viga (VMS em VMP2)
var fc_solicitante_vms_alma = (apoio_vms/n_parafusos_vms); //em KN
var lf = Math.min(eff-dh,efb-(dh/2)); // em mm
var fc_resistente_vms1 = (1.2*((lf*tw_vms)/100)*(fu_viga/10)/1.35); //em KN
var fc_resistente_vms2 = (2.4*((db*tw_vms)/100)*(fu_viga/10)/1.35); //em KN
var fc_resistente_vms = Math.min(fc_resistente_vms1,fc_resistente_vms2);
//Pressão de contato na cantoneira (VMS em VMP2)
var fc_solicitante_vms_cantoneira = (apoio_vms/(n_parafusos_vms*2)); //em KN
//Rasgamento da cantoneira (VMS em VMP2)
var fr_solicitante_vms = (apoio_vms/2); //em KN
var altura_cantoneira = ((n_parafusos_vms - 1)*eff) + 2*efb; //em mm
var Agv_rasg = (espessura_cantoneira*(altura_cantoneira-efb))/100;   //Área bruta sujeita ao cisalhamento (cm²)
var Anv_rasg = Agv_rasg - (((n_parafusos_vms - 0.5)*(dh*espessura_cantoneira))/100); //Área líquida sujeita ao cisalhamento (cm²)
var Ant_rasg = (((largura_cantoneira - gabarito_furacao) - dh/2)*espessura_cantoneira)/100; //Área líquida sujeita à tração (cm²)
var Cts = 1; // Propor situações que modificam Cts
var fr_resistente_cantoneira1 = ((0.6*Anv_rasg*(fu_cantoneira/10))+(Cts+Ant_rasg+(fu_cantoneira/10)))/1.35; //em KN
var fr_resistente_cantoneira2 = ((0.6*Agv_rasg*(fy_cantoneira/10))+(Cts+Ant_rasg+(fu_cantoneira/10)))/1.35; //em KN
var fr_resistente_cantoneira = Math.min(fr_resistente_cantoneira1,fr_resistente_cantoneira2);
//Cisalhamento na cantoneira (VMS em VMP2)
var fs_solicitante_cantoneira = (apoio_vms/2); //em KN
var Agv_cis = (espessura_cantoneira*altura_cantoneira)/100; //em cm²
var Anv_cis = Agv_cis - ((n_parafusos_vms*dh*espessura_cantoneira)/100); //em cm²
var fs_resistente_cantoneira1 = (0.6*Agv_cis*(fy_cantoneira/10))/1.10; //em KN
var fs_resistente_cantoneira2 = (0.6*Anv_cis*(fu_cantoneira/10))/1.35; //em KN
var fs_resistente_cantoneira = Math.min(fs_resistente_cantoneira1,fs_resistente_cantoneira2);
//Cisalhamento na viga (VMS em VMP2)
var fs_solicitante_vms = apoio_vms;
var Agv_viga = (tw_vms/10)*d_vms; // em cm²
var Anv_viga = Agv_viga - ((n_parafusos_vms*tw_vms*dh)/100); //em cm²
var fs_resistente_vms1 = (0.6*Agv_viga*(fy_viga/10))/1.10; //em KN
var fs_resistente_vms2= (0.6*Anv_viga*(fu_viga/10))/1.35; //em KN
var fs_resistente_vms = Math.min(fs_resistente_vms1,fs_resistente_vms2)
//Cisalhamento parafuso (VMP1 em pilar)
var fv_solicitante_vmp1 = apoio_vmp1/(n_parafusos_vmp1*2);

//Coloca os resultados nos campos previstos
var node_cis_vms = document.createElement('div')
var textnode_cis_vms_ok = document.createTextNode('Fvrd = '+fv_resistente_vms.toFixed(2)+' > Fvsd = ' +fv_solicitante_vms.toFixed(2)+' (OK)')
var textnode_cis_vms_n = document.createTextNode('Fvrd = '+fv_resistente_vms.toFixed(2)+' < Fvsd = ' +fv_solicitante_vms.toFixed(2)+' (X)')
var node_cont_alma_vms = document.createElement('div')
var textnode_cont_alma_vms_ok = document.createTextNode('Fcrd = '+fc_resistente_vms.toFixed(2)+' > Fvsd(alma) = '+fc_solicitante_vms_alma.toFixed(2)+' (OK)')
var textnode_cont_alma_vms_n = document.createTextNode('Fcrd = '+fc_resistente_vms.toFixed(2)+' < Fvsd(alma) = '+fc_solicitante_vms_alma.toFixed(2)+' (X)')
var node_cont_cant_vms = document.createElement('div')
var textnode_cont_cant_vms_ok =document.createTextNode('Fcrd = '+fc_resistente_vms.toFixed(2)+' > Fvsd(cantoneira) = '+fc_solicitante_vms_cantoneira.toFixed(2)+' (OK)')
var textnode_cont_cant_vms_n = document.createTextNode('Fcrd = '+fc_resistente_vms.toFixed(2)+' < Fvsd(cantoneira) = '+fc_solicitante_vms_cantoneira.toFixed(2)+' (X)')
var node_rasg_cant_vms = document.createElement('div')
var textnode_rasg_cant_vms_ok = document.createTextNode('Fcrd = '+fr_resistente_cantoneira.toFixed(2)+' > Fvsd = '+fr_solicitante_vms.toFixed(2)+' (OK)')
var textnode_rasg_cant_vms_n = document.createTextNode('Fcrd = '+fr_resistente_cantoneira.toFixed(2)+' < Fvsd = '+fr_solicitante_vms.toFixed(2)+' (X)')
var node_cis_cant_vms = document.createElement('div')
var textnode_cis_cant_vms_ok = document.createTextNode('Fcrd = '+fs_resistente_cantoneira.toFixed(2)+' > Fvsd = '+fs_solicitante_cantoneira.toFixed(2)+' (OK)')
var textnode_cis_cant_vms_n = document.createTextNode('Fcrd = '+fs_resistente_cantoneira.toFixed(2)+' < Fvsd = '+fs_solicitante_cantoneira.toFixed(2)+' (X)')
var node_cis_viga_vms = document.createElement('div')
var textnode_cis_viga_vms_ok = document.createTextNode('Fcrd = '+fs_resistente_vms.toFixed(2)+' > Fvsd = '+fs_solicitante_vms.toFixed(2)+' (OK)')
var textnode_cis_viga_vms_n = document.createTextNode('Fcrd = '+fs_resistente_vms.toFixed(2)+' < Fvsd = '+fs_solicitante_vms.toFixed(2)+' (X)')

//Seção para automatizar entradas de valores para as condições - a construir

var elements_create_id = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r']

function criaarrayresultadosetapa2 (tipo_viga) {

}


var text_create_id = ['Fvrd = '+fv_resistente_vms.toFixed(2)+' > Fvsd = ' +fv_solicitante_vms.toFixed(2)+' (OK)',
'Fvrd = '+fv_resistente_vms.toFixed(2)+' < Fvsd = ' +fv_solicitante_vms.toFixed(2)+' (X)',
'Fcrd = '+fc_resistente_vms.toFixed(2)+' > Fvsd(alma) = '+fc_solicitante_vms_alma.toFixed(2)+' (OK)',
'Fcrd = '+fc_resistente_vms.toFixed(2)+' < Fvsd(alma) = '+fc_solicitante_vms_alma.toFixed(2)+' (X)',
'Fcrd = '+fc_resistente_vms.toFixed(2)+' > Fvsd(cantoneira) = '+fc_solicitante_vms_cantoneira.toFixed(2)+' (OK)',
'Fcrd = '+fc_resistente_vms.toFixed(2)+' < Fvsd(cantoneira) = '+fc_solicitante_vms_cantoneira.toFixed(2)+' (X)',
'Fcrd = '+fr_resistente_cantoneira.toFixed(2)+' > Fvsd = '+fr_solicitante_vms.toFixed(2)+' (OK)',
'Fcrd = '+fr_resistente_cantoneira.toFixed(2)+' < Fvsd = '+fr_solicitante_vms.toFixed(2)+' (X)',
'Fcrd = '+fs_resistente_cantoneira.toFixed(2)+' > Fvsd = '+fs_solicitante_cantoneira.toFixed(2)+' (OK)',
'Fcrd = '+fs_resistente_cantoneira.toFixed(2)+' < Fvsd = '+fs_solicitante_cantoneira.toFixed(2)+' (X)',
'Fcrd = '+fs_resistente_vms.toFixed(2)+' > Fvsd = '+fs_solicitante_vms.toFixed(2)+' (OK)',
'Fcrd = '+fs_resistente_vms.toFixed(2)+' < Fvsd = '+fs_solicitante_vms.toFixed(2)+' (X)']


var elementos_etapa2 = document.getElementsByClassName('desenhoEtapa2')
var etapa2_id1 = []
for (i=0;i<elementos_etapa2.length;i++) {
    etapa2_id1.push(elementos_etapa2[i].children)
}

var etapa2_id2 = []
for (i=0;i<etapa2_id2.length;i++) {
    etapa2_id2.push(etapa2_id1)
}

try {
    for (i=0;i<=6;i++) {
        removeElement(elements_create_id[i])
    }
}

catch {}


//Checa o que inputar nos campos de verificação das vigas para forças atuantes

//Cisalhamento Parafuso
if (fv_resistente_vms > fv_solicitante_vms) {
   addElement('cis_vms','p',elements_create_id[0],text_create_id[0])
}
else {
    addElement('cis_vms','p',elements_create_id[0],text_create_id[1])
}

//Pressão de contato na alma
if (fc_resistente_vms > fc_solicitante_vms_alma) {
    addElement('cont_alma_vms','p',elements_create_id[1],text_create_id[2])
}
else {
    addElement('cont_alma_vms','p',elements_create_id[1],text_create_id[3])
}

//Pressão de contato na cantoneira
if (fc_resistente_vms > fc_solicitante_vms_cantoneira) {
    addElement('cont_cant_vms','p',elements_create_id[2],text_create_id[4])
}
else {
    addElement('cont_cant_vms','p',elements_create_id[2],text_create_id[5])
}

//Rasgamento da cantoneira

if (fr_resistente_cantoneira > fr_solicitante_vms) {
    addElement('rasg_cant_vms','p',elements_create_id[3],text_create_id[6])
}
else {
    addElement('rasg_cant_vms','p',elements_create_id[3],text_create_id[7])
}

//Cisalhamento cantoneira
if (fs_resistente_cantoneira > fs_solicitante_cantoneira) {
    addElement('cis_cant_vms','p',elements_create_id[4],text_create_id[8])
}
else {
    addElement('cis_cant_vms','p',elements_create_id[4],text_create_id[9])
}

//Cisalhamento viga

if (fs_resistente_vms > fs_solicitante_vms) {
    addElement('cis_viga_vms','p',elements_create_id[5],text_create_id[10])
}
else {
    addElement('cis_viga_vms','p',elements_create_id[5],text_create_id[11])
}

//Checa disposições construtivas

var chec_disp_cont = 'Passou disposições construtivas (OK)'
//VMS e VMP2
//1-Altura de ligação
if ((((n_parafusos_vms-1)*eff)+2*efb) < 0.5*d_vms*10) /*em mm*/ {
    var disp_alt_lig_vms = (((n_parafusos_vms-1)*eff)+2*efb).toFixed(0)+' mm <'+0.5*d_vms*10+' mm Passou altura ligação (OK)'
    console.log("Passou altura ligação")
} else {
    var disp_alt_lig_vms = (((n_parafusos_vms-1)*eff)+2*efb).toFixed(0)+' mm >'+0.5*d_vms*10+' mm Não passou altura ligação (X)'
    var chec_disp_cont = 'Não passou disposições construtivas (X)'
    console.log('Não passou altura ligação')
}
//2-Espessura da Cantoneira
if (espessura_cantoneira < 16) /*em mm*/ {
    var disp_esp_cant_vms = espessura_cantoneira.toFixed(1) + '< 16 mm Passou espessura cantoneira (OK)'
    console.log("Passou espessura cantoneira")
} else {
    var disp_esp_cant_vms = espessura_cantoneira.toFixed(0) + '< 16 mm Não passou espessura cantoneira (X)'
    var chec_disp_cont = 'Não passou disposições construtivas (X)'
    console.log("Não passou espessura cantoneira")
}
//3-Gabarito de furação e excentricidade
if (gabarito_furacao <= 65 && largura_cantoneira <= 102) /*em mm*/ {
    var disp_gab_furacao_vms = gabarito_furacao.toFixed(0) + '<= 65 mm e '+ largura_cantoneira+'<= 102 mm   Passou gabarito e largura - excentricidade desconsiderada (OK)'
    console.log("Passou gabarito e largura - excentricidade desconsiderada")
} else {
    var disp_gab_furacao_vms = gabarito_furacao.toFixed(0) + '> 65 mm ou '+ largura_cantoneira+'> 102 mm   Não passou gabarito e largura - excentricidade deve ser considerada (Não prevista neste cálculo)'
    var chec_disp_cont = 'Não passou disposições construtivas (X)'
    console.log("Não passou gabarito e largura - excentricidade deve ser considerada (Não prevista neste cálculo)")
}
//4-Distância entre furos
if (eff>eff_min && eff<eff_max) /*em mm*/ {
    var disp_dist_furos_vms = eff_min+' < '+eff+' < '+eff_max+' mm  Passou distância entre furos (OK)'
    console.log('Passou distância entre furos')
} else {
    var disp_dist_furos_vms = eff+ ' <' +eff_min+' mm ou '+eff+' > '+eff_max+' mm  Não passou distância entre furos (X)'
    var chec_disp_cont = 'Não passou disposições construtivas (X)'
    console.log('Não passou distância entre furos')
}
//5-Distância entre furos e aba da cantoneira ou alma do pilar
if (dist_furo_aba > 1.35*db)/* em mm*/ {
    var disp_dist_furo_aba_vms = dist_furo_aba.toFixed(2)+' > '+(1.35*db).toFixed(2)+' mm Passou distância entre furos e aba da cantoneira (OK)'
    console.log('Passou distância entre furos e abas')
} else {
    var disp_dist_furo_aba_vms = dist_furo_aba+' < '+1.35*db+' mm Não passou distância entre furos e aba da cantoneira (X)'
    var chec_disp_cont = 'Não passou disposições construtivas (X)'
    console.log('Não passou distância entre furos e aba')
}
//6-Distância dos furos às bordas
if (efb>efb_min_vms && efb<efb_max_vms) {
    var disp_dist_furo_borda_vms = efb_min_vms + ' < '+efb+' < '+efb_max_vms+' mm Passou distância entre furos às bordas (OK)'
    console.log('Passou distância entre furos às bordas')
} else {
    var disp_dist_furo_borda_vms = efb+ ' < ' +efb_min_vms+' mm ou '+efb+' > '+efb_max_vms+' mm  Não passou distância entre furos às bordas (X)'
    var chec_disp_cont = 'Não passou disposições construtivas (X)'
    console.log('Não passou distância entre furos às bordas')
}
//7-Comprimento dos recortes
if(recorte_hor<(2*d_vms*10)) {
    var disp_comp_recorte = `${recorte_hor} < ${20*d_vms} mm Passou comprimento do recorte (OK)`
    console.log('Passou comprimento do recorte')
} else {
    var disp_comp_recorte = `${recorte_hor} > ${20*d_vms} mm Não passou comprimento do recorte (X)`
    var chec_disp_cont = 'Não passou disposições construtivas (X)'
    console.log('Não passou comprimento do recorte')
}
//8-Altura dos recortes
if(recorte_vert<(0.2*d_vms*10)) {
    var disp_altura_recorte = `${recorte_vert} < ${2*d_vms} mm Passou altura do recorte (OK)`
    console.log('Passou altura do recorte')
} else {
    var disp_altura_recorte = `${recorte_vert} < ${2*d_vms} mm Não passou altura do recorte (X)`
    var chec_disp_cont = 'Não passou disposições construtivas (X)'
    console.log('Não passou altura do recorte')
}
//VMP2 e Pilar
//VMP1 e Pilar


//Memória de Cálculo Etapa 2
var text_etapa2 = 'Checar disposições construtivas - VMS em VMP2'+'<br><br>'+`1)${disp_alt_lig_vms} <br> 2)${disp_esp_cant_vms} <br>`+
`3)${disp_gab_furacao_vms} <br> 4)${disp_dist_furos_vms} <br> 5)${disp_dist_furo_aba_vms} <br> 6)${disp_dist_furo_borda_vms} <br>`+
`7)${disp_comp_recorte} <br> 8)${disp_altura_recorte} <br><br> Cisalhamento dos parafusos - VMS em VMP2 <br><br>
 Fvsd = Fsol/(nº parafusos*planos de corte) => ${apoio_vms.toFixed(2)}/(${n_parafusos_vms*2}) = ${fv_solicitante_vms.toFixed(2)} <br>
 Frd = \u03B1b*área parafusos*(fu parafuso)/1.35 => ((${alfa_b}*${area_parafuso.toFixed(2)}*(${(fu_parafuso/10).toFixed(2)}))/1.35)
  = ${fv_resistente_vms.toFixed(2)} <br>
Rever se o maior comprimento de pega não excede cinco vezes o diâmetro do parafuso, para verificar se a força cortante resistente
não precisa ser reduzida. <br><br> Pressão de contato furo da alma da viga VMS com alma da VMP2 <br><br>
Fc solic = (Fapoio VMS/número parafusos) => ${apoio_vms.toFixed(2)}/${n_parafusos_vms} = ${fc_solicitante_vms_alma.toFixed(2)} <br>
Fc res = 
Pressão de contato na cantoneira - VMS <br><br> Fc solic = 
    `

try {
    removeElement('memoria2')
    removeElement('disp_chec_etapa2_vms')
}
catch {}

if (document.getElementById('memoriaEtapa2').checked) {
    console.log('Chegou aqui')
    addElement('button_etapa2','p','memoria2',text_etapa2)
}

addElement('disp_etapa2_vms','p','disp_chec_etapa2_vms',chec_disp_cont)

}






//------------------------------------------------------------------------------------------------------------------------------
//Etapa 3


function calcEtapa3() {
//Pré-requisitos apoio (Retirar quando implantar a classe)
var direcao = document.getElementById('direcao').value
var l_viga = parseInt(document.getElementById('l_viga').value)

//Cálculo momentos vigas dependendo da direção
if (direcao == 'Horizontal') {
    var n_viga = (laje_mista_new.heigth/l_viga) - 1
    var d_min_vms = (laje_mista_new.width*100)/20 //em cm
    var d_min_vmp1 = (laje_mista_new.heigth*100)/20 //em cm
    var area_influencia_vms = l_viga
    var area_influencia_vmp1 = laje_mista_new.width/2
    var m_max_vms = (area_influencia_vms*comb_ult_normal*(laje_mista_new.width^2))/8
    var apoio_vms = (area_influencia_vms*comb_ult_normal*laje_mista_new.width)/2
    var m_max_vmp2 =(area_influencia_vms*comb_ult_normal*(laje_mista_new.width^2))/8
    var apoio_vmp2 =(area_influencia_vms*comb_ult_normal*laje_mista_new.width)/2    
    var m_max_vmp1
    var apoio_vmp1 = ((area_influencia_vmp1*comb_ult_normal*laje_mista_new.heigth) + (apoio_vms*n_viga))/2
}
else if(direcao == 'Vertical') {
    var n_viga = (laje_mista_new.width/l_viga) - 1
    var d_min_vms = (laje_mista_new.heigth*100)/20 //em cm
    var d_min_vmp1 = (laje_mista_new.width*100)/20 //em cm
    var area_influencia_vms = l_viga
    var area_influencia_vmp1 = laje_mista_new.heigth/2
    var m_max_vms = (area_influencia_vms*comb_ult_normal*(laje_mista_new.heigth^2))/8
    var apoio_vms = (area_influencia_vms*comb_ult_normal*laje_mista_new.heigth)/2
    var m_max_vmp2 =(area_influencia_vms*comb_ult_normal*(laje_mista_new.heigth^2))/8
    var apoio_vmp2 =(area_influencia_vms*comb_ult_normal*laje_mista_new.heigth)/2
    var m_max_vmp1 
    var apoio_vmp1 = ((area_influencia_vmp1*comb_ult_normal*laje_mista_new.width) + (apoio_vms*n_viga))/2  
}

else {
    console.log('Direção das vigas inválido')
}

//Cálculo base de pilar


var h_placa = parseInt(document.getElementById('h_placa').value); //em cm
var l_placa = parseInt(document.getElementById('l_placa').value); //em cm
var n_pav = parseInt(document.getElementById('n_pav').value) //sem unidade
var pe_dir = parseFloat(document.getElementById('pe_dir').value) //em m
var res_solda = parseFloat(document.getElementById('solda').value); // em MPa
var fck_bloco = parseInt(document.getElementById('concreto_bloco').value); //em MPa
var fck_argamassa = parseInt(document.getElementById('argamassa').value); //em MPa
var material_placa_base = document.getElementById('material_placa_base').value; //em MPa
var material_chumbadores = document.getElementById('material_chumbadores').value; //em MPa
var material_barra_cisalhamento = document.getElementById('material_barra_cisalhamento').value; //em MPa
//var modo_chumbador = document.getElementById('modo_chumbador').value; //sem unidade
var diametro_chumbador = parseFloat(document.getElementById('diametro_chumbador'.value)); //em mm
var espessura_placa_base = parseInt(document.getElementById('espessura_placa_base').value); //em mm
var comprimento_anc = parseInt(document.getElementById('comprimento_anc').value)
var bf = parseInt(document.getElementById('bf').value); //em cm
var d = parseInt(document.getElementById('d').value); //em cm
var h_placa_min = 1.3*bf //em cm
var l_placa_min = 1.15*d //em cm
var comprimento_pilar = n_pav*pe_dir //em m
var peso_proprio_pilar = (bf/100)*(d/100)*25*comprimento_pilar //em KN
var carga_pilar = (apoio_vmp1 + apoio_vmp2)*(n_pav-1) //em KN
var carga_total = peso_proprio_pilar + carga_pilar //em KN
var momento_base = 0; //Propor condição - em KN*m

//Materiais utilizados (em MPa)
switch(material_placa_base) {
    case "USI Civil 300":
    var fy_placa_base = 300;
    var fu_placa_base = 400;
    var class_aco = 1;
    break;
    case "USI Civil 350":
    var fy_placa_base = 350;
    var fu_placa_base = 500;
    var class_aco = 2;
    break;
    case "USI SAC 300":
    var fy_placa_base = 300;
    var fu_placa_base = 350;
    var class_aco = 3;
    break;
    case "USI SAC 350":
    var fy_placa_base = 350;
    var fu_placa_base = 500;
    var class_aco = 4;
    break;
    case "USI FIRE 350":
    var fy_placa_base = 350;
    var fu_placa_base = 490;
    var class_aco = 5;
    break;
    case "CSN COR 420":
    var fy_placa_base = 300;
    var fu_placa_basea = 420;
    var class_aco = 3;
    break;
    case "CSN COR 500":
    var fy_placa_base = 380;
    var fu_placa_base = 500;
    var class_aco = 4;
    break;
    default:
    var fy_placa_base = 350;
    var fu_placa_base = 500;
    var class_aco = 2;
    break;
}

//Checar disposições construtivas
//Diâmetro chumbadores
//Número chumbadores
//Comprimento ancoragem
//Tabela 11.1
//Distância entre centro de furo e borda e centro de furo e mesa do pilar
//Distância entre os centros de furo
//Distância entre centro de furo e alma do pilar
//Arruela especial
//Dimensões da placa base
//Barra de cisalhamento
//Dimensão da perna da solda de filete entre a alma do pilar e a placa de base

//Solicitações na base

var excent_base = momento_base/carga_total; //em m 
var sigmacrd = (fck_bloco/10)/(1.4*1.4); //em KN/cm²



//Checa para ecrit
var excent_crit_base_teste = 0.5*(h_placa-(carga_total/(l_placa*sigmacrd))) // em cm
if (excent_crit_base_teste > 0) {
    var excent_crit_base = 0.5*(h_placa-(carga_total/(l_placa*sigmacrd))) //em cm
    if (excent_base < excent_crit_base) {
        var Y = h_placa - 2*excent_base //em cm
    }
    else {
    } //Rever a outra condição
    var sigmacsd = carga_total/(Y*l_placa) //em cm
    ////Resistência placa base
    var momento_res_placa = ((espessura_placa_base/10)*(fy_placa_base/10))/(4*1.1); //em KN/cm
    ////Solicitante por compressão
    var m1 = (h_placa-0.95*d)/2; //em cm
    var m2 = (l_placa-(.8*bf))/2; //em cm
    var m3 = Math.sqrt(d*bf)/4; //em cm
    var momento_solic_comp_placa = (sigmacsd*Math.max(m1,m2,m3))/2; // em KN/cm
    ////Solicitante por tração dos chumbadores

    //Inputa os resultados 

    var node_concr_comp = document.createElement('div')
    var textnode_concr_comp_ok = document.createTextNode('\u03C3 crd ='+sigmacrd.toFixed(2)+' > \u03C3 csd = '+sigmacsd.toFixed(2)+' (OK)')
    var textnode_concr_comp_n = document.createTextNode('\u03C3 crd ='+sigmacrd.toFixed(2)+' < \u03C3 csd = '+sigmacsd.toFixed(2)+' (X)')
    var node_placa_base = document.createElement('div')
    var textnode_placa_base_ok = document.createTextNode('Mres = '+momento_res_placa.toFixed(2)+' > Msolic = '+momento_solic_comp_placa.toFixed(2)+ ' (OK)')
    var textnode_placa_base_n = document.createTextNode('Mres = '+momento_res_placa.toFixed(2)+' < Msolic = '+momento_solic_comp_placa.toFixed(2)+ ' (X)')


    //Verificação do concreto comprimido
    ////1-Abaixo da placa base
    if (sigmacrd > sigmacsd) {
        node_concr_comp.appendChild(textnode_concr_comp_ok);
        document.getElementById('con_comp').appendChild(node_concr_comp);
    } 
    else {
        node_concr_comp.appendChild(textnode_concr_comp_n);
        document.getElementById('con_comp').appendChild(node_concr_comp);
    }
    ////2-Junto à barra de cisalhamento

    //Verificações decorrentes da tração nos chumbadores

    //Verificação da placa base
    if (momento_res_placa > momento_solic_comp_placa) {
        node_placa_base.appendChild(textnode_placa_base_ok);
        document.getElementById('placa_base').appendChild(node_placa_base);
    } 
    else {
        node_placa_base.appendChild(textnode_placa_base_n);
        document.getElementById('placa_base').appendChild(node_placa_base);
    }

    //Verificação de solda de ligação de pilar com placa de base
    //Ruptura na região da solda das chapas do pilar e da placa de base
} else {
    console.log(excent_crit_base_teste)
    var node_e_crit = document.createElement('div')
    var textnode_e_crit_n = document.createTextNode('ecrit < 0 / Favor alterar as dimensões da placa ou mudar a resistência à compressão do concreto')   
    node_e_crit.appendChild(textnode_e_crit_n)
    document.getElementById('con_comp').appendChild(node_e_crit)
}









}

