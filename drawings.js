//Drawing VMS for 1st Phase
//Drawings made using library SVG.js


class draw_vms {
    constructor() {

    }


}

function calc_draw_vms(orientation,n_viga) {

    //Make a function which will automatically calculate n_viga and draw accordingly
    //As of now, it's hardcoded inside draw_laje_mista because it was actually easier to do it at this time

    switch(orientation) {
        case "Horizontal":

        break;
        case "Vertical":

        break;
    }

}


function draw_laje_mista() {
    var SVG_laje = SVG("drawing-laje").size('100%','100%')
    //Desenho da base da laje - comum a todos
    //Desenho das bordas da laje e linhas auxiliares que representam a continuidade do módulo
    SVG_laje.line(20,50,50,50).stroke({width:1}) //Linha auxiliar esquerda superior - esquerda
    SVG_laje.line(70,50,360,50).stroke({width:1}) //Linha superior da laje
    SVG_laje.line(60,10,60,30).stroke({width:1}) //Linha auxiliar esquerda superior - superior
    SVG_laje.line(60,70,60,300).stroke({width:1}) //Linha esquerda da laje
    SVG_laje.line(20,320,50,320).stroke({width:1}) //Linha auxiliar esquerda inferior - esquerda
    SVG_laje.line(70,320,360,320).stroke({width:1}) //Linha inferior da laje 
    SVG_laje.line(60,335,60,360).stroke({width:1}) //Linha auxiliar esquerda inferior - inferior
    SVG_laje.line(370,10,370,30).stroke({width:1}) //Linha auxiliar direita superior - superior
    SVG_laje.line(380,50,410,50).stroke({width:1}) //Linha auxiliar direita superior - direita
    SVG_laje.line(370,70,370,300).stroke({width:1}) //Linha direita da laje
    SVG_laje.line(370,335,370,360).stroke({width:1}) //Linha auxiliar direita inferior - inferior
    SVG_laje.line(380,320,410,320).stroke({width:1}) //Linha auxiliar direita inferior - direita
    //Desenha as 4 colunas nas bordas das lajes
    //Esquerda superior
    SVG_laje.line(50,35,70,35).stroke({width:1})
    SVG_laje.line(60,35,60,60).stroke({width:1})
    SVG_laje.line(50,60,70,60).stroke({width:1})
    //Esquerda inferior
    SVG_laje.line(50,305,70,305).stroke({width:1})
    SVG_laje.line(60,305,60,330).stroke({width:1})
    SVG_laje.line(50,330,70,330).stroke({width:1})
    //Direita superior
    SVG_laje.line(360,35,380,35).stroke({width:1})
    SVG_laje.line(370,35,370,60).stroke({width:1})
    SVG_laje.line(360,60,380,60).stroke({width:1})
    //Direita inferior
    SVG_laje.line(360,305,380,305).stroke({width:1})
    SVG_laje.line(370,305,370,330).stroke({width:1})
    SVG_laje.line(360,330,380,330).stroke({width:1})


    //Restante do desenho varia de acordo com as condições que foram otimizadas para a laje
    //Instanciando a classe laje mista
    let laje_mista_new = new laje_mista;
    switch (laje_mista_new.direcao_ot) {
        case "Vertical":
            //Linha de cota da medida vertical - esquerda -
            SVG_laje.line(35,55,35,170).stroke({width:0.6})
            SVG_laje.line(35,200,35,315).stroke({width:0.6})
            SVG_laje.line(25,55,45,55).stroke({width:0.9})
            SVG_laje.line(25,315,45,315).stroke({width:0.9})
            
            //Texto medida vertical esquerda
            SVG_laje.text(laje_mista_new.heigth + "m").move(25,175).font({fill:'black',family:"Inconsolata",size:"15px"})

            switch (laje_mista_new.n_viga) {
                case 1:
                //Vigas VMS
                SVG_laje.line(215,50,215,320).stroke({width:0.7})
                //Cotas de espaçamento
                //1
                SVG_laje.line(65,340,65,360).stroke({width:0.9})
                SVG_laje.line(65,350,215,350).stroke({width:0.7})
                SVG_laje.line(215,340,215,360).stroke({width:0.9})
                //2
                SVG_laje.line(215,350,365,350).stroke({width:0.7})
                SVG_laje.line(365,340,365,360).stroke({width:0.9})
                //Textos de espaçamento
                //1
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(125,330).font({fill:'black',family:"Inconsolata",size:"15px"})
                //2
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(290,330).font({fill:'black',family:"Inconsolata",size:"15px"})
                break;
                case 2:
                //Vigas VMS
                SVG_laje.line(163.33,50,163.33,320).stroke({width:0.7})
                SVG_laje.line(266.66,50,266.66,320).stroke({width:0.7})
                //Cotas de espaçamento
                //1
                SVG_laje.line(65,340,65,360).stroke({width:0.9})
                SVG_laje.line(65,350,163.33,350).stroke({width:0.7})
                SVG_laje.line(163.33,340,163.33,360).stroke({width:0.9})
                //2
                SVG_laje.line(163.33,350,266.66,350).stroke({width:0.7})
                SVG_laje.line(266.66,340,266.66,360).stroke({width:0.9})
                //3
                SVG_laje.line(266.66,350,365,350).stroke({width:0.7})
                SVG_laje.line(365,340,365,360).stroke({width:0.9})
                 //Textos de espaçamento
                //1
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(104,330).font({fill:'black',family:"Inconsolata",size:"15px"})
                //2
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(204,330).font({fill:'black',family:"Inconsolata",size:"15px"})
                //3
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(304,330).font({fill:'black',family:"Inconsolata",size:"15px"})
                break;
                case 3:
                //Vigas VMS
                SVG_laje.line(137.5,50,137.5,320).stroke({width:0.7})
                SVG_laje.line(215,50,215,320).stroke({width:0.7})
                SVG_laje.line(292.5,50,292.5,320).stroke({width:0.7})
                //Cotas de espaçamento
                //1
                SVG_laje.line(65,340,65,360).stroke({width:0.9})
                SVG_laje.line(65,350,137.5,350).stroke({width:0.7})
                SVG_laje.line(137.5,340,137.5,360).stroke({width:0.9})
                //2
                SVG_laje.line(137.5,350,215,350).stroke({width:0.7})
                SVG_laje.line(215,340,215,360).stroke({width:0.9})
                //3
                SVG_laje.line(215,350,292.5,350).stroke({width:0.7})
                SVG_laje.line(292.5,340,292.5,360).stroke({width:0.9})
                //4
                SVG_laje.line(292.5,350,365,350).stroke({width:0.7})
                SVG_laje.line(365,340,365,360).stroke({width:0.9})
                //Textos de espaçamento
                //1
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(91,330).font({fill:'black',family:"Inconsolata",size:"15px"})
                //2
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(166,330).font({fill:'black',family:"Inconsolata",size:"15px"})
                //3
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(243,330).font({fill:'black',family:"Inconsolata",size:"15px"})
                //4
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(318,330).font({fill:'black',family:"Inconsolata",size:"15px"})
                break;
                case 4:
                //Vigas VMS
                SVG_laje.line(122,50,122,320).stroke({width:0.7})
                SVG_laje.line(184,50,184,320).stroke({width:0.7})
                SVG_laje.line(246,50,246,320).stroke({width:0.7})
                SVG_laje.line(308,50,308,320).stroke({width:0.7})
                //Cotas de espaçamento
                //1
                SVG_laje.line(65,340,65,360).stroke({width:0.9})
                SVG_laje.line(65,350,122,350).stroke({width:0.7})
                SVG_laje.line(122,340,122,360).stroke({width:0.9})
                //2
                SVG_laje.line(122,350,184,350).stroke({width:0.7})
                SVG_laje.line(184,340,184,360).stroke({width:0.9})
                //3
                SVG_laje.line(184,350,246,350).stroke({width:0.7})
                SVG_laje.line(246,340,246,360).stroke({width:0.9})
                //4
                SVG_laje.line(246,350,308,350).stroke({width:0.7})
                SVG_laje.line(308,340,308,360).stroke({width:0.9})
                //5
                SVG_laje.line(308,350,365,350).stroke({width:0.7})
                SVG_laje.line(365,340,365,360).stroke({width:0.9})
                //Textos de espaçamento
                //1
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(83,330).font({fill:'black',family:"Inconsolata",size:"15px"})
                //2
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(143,330).font({fill:'black',family:"Inconsolata",size:"15px"})
                //3
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(205,330).font({fill:'black',family:"Inconsolata",size:"15px"})
                //4
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(267,330).font({fill:'black',family:"Inconsolata",size:"15px"})
                //5
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(318,330).font({fill:'black',family:"Inconsolata",size:"15px"})
                break;
                case 5:
                //Vigas VMS
                SVG_laje.line(111.66,50,111.66,320).stroke({width:0.7})
                SVG_laje.line(163.33,50,163.33,320).stroke({width:0.7})
                SVG_laje.line(215,50,215,320).stroke({width:0.7})
                SVG_laje.line(266.66,50,266.66,320).stroke({width:0.7})
                SVG_laje.line(318.33,50,318.33,320).stroke({width:0.7})
                //Cotas de espaçamento
                //1
                SVG_laje.line(65,340,65,360).stroke({width:0.9})
                SVG_laje.line(65,350,111.66,350).stroke({width:0.7})
                SVG_laje.line(111.66,340,111.66,360).stroke({width:0.9})
                //2
                SVG_laje.line(111.66,350,163.33,350).stroke({width:0.7})
                SVG_laje.line(163.33,340,163.33,360).stroke({width:0.9})
                //3
                SVG_laje.line(163.33,350,215,350).stroke({width:0.7})
                SVG_laje.line(215,340,215,360).stroke({width:0.9})
                //4
                SVG_laje.line(215,350,266.66,350).stroke({width:0.7})
                SVG_laje.line(266.66,340,266.66,360).stroke({width:0.9})
                //5
                SVG_laje.line(266.66,350,318.33,350).stroke({width:0.7})
                SVG_laje.line(318.33,340,318.33,360).stroke({width:0.9})
                //6
                SVG_laje.line(318.33,350,365,350).stroke({width:0.7})
                SVG_laje.line(365,340,365,360).stroke({width:0.9})
                //Textos de espaçamento
                //1
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(80,330).font({fill:'black',family:"Inconsolata",size:"12px"})
                //2
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(127,330).font({fill:'black',family:"Inconsolata",size:"12px"})
                //3
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(179,330).font({fill:'black',family:"Inconsolata",size:"12px"})
                //4
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(230,330).font({fill:'black',family:"Inconsolata",size:"12px"})
                //5
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(282,330).font({fill:'black',family:"Inconsolata",size:"12px"})
                //6
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(331,330).font({fill:'black',family:"Inconsolata",size:"12px"})
                break;
            }
            break;

        case "Horizontal":
            //Linha de cota da medida horizontal - inferior - 
            SVG_laje.line(65,350,365,350).stroke({width:0.7})
            SVG_laje.line(65,340,65,360).stroke({width:0.9})
            SVG_laje.line(365,340,365,360).stroke({width:0.9})

            //Texto medida horizontal inferior
            SVG_laje.text(laje_mista_new.width + "m").move(205,330).font({fill:'black',family:"Inconsolata",size:"15px"})

            switch(laje_mista_new.n_viga) {
                case 1:
                //Vigas VMS
                SVG_laje.line(60,185,370,185).stroke({width:0.7})
                //Cotas de espaçamento
                //1
                SVG_laje.line(25,55,45,55).stroke({width:0.9})
                SVG_laje.line(35,55,35,185).stroke({width:0.7}) 
                SVG_laje.line(25,185,45,185).stroke({width:0.9})
                //2
                SVG_laje.line(35,185,35,315).stroke({width:0.7}) 
                SVG_laje.line(25,315,45,315).stroke({width:0.9})
                //Textos de espaçamento
                //1
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(0,120).font({fill:'black',family:"Inconsolata",size:"13px"})
                //2
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(0,250).font({fill:'black',family:"Inconsolata",size:"13px"})
                break;
                case 2:
                //Vigas VMS
                SVG_laje.line(60,140,370,140).stroke({width:0.7})
                SVG_laje.line(60,230,370,230).stroke({width:0.7})
                //Cotas de espaçamento
                 //1
                 SVG_laje.line(25,55,45,55).stroke({width:0.9})
                 SVG_laje.line(35,55,35,140).stroke({width:0.7}) 
                 SVG_laje.line(25,140,45,140).stroke({width:0.9})
                 //2
                 SVG_laje.line(35,140,35,230).stroke({width:0.7}) 
                 SVG_laje.line(25,230,45,230).stroke({width:0.9})
                 //3
                 SVG_laje.line(35,230,35,315).stroke({width:0.7}) 
                 SVG_laje.line(25,315,45,315).stroke({width:0.9})
                 //Textos de espaçamento
                 //1
                 SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(0,97).font({fill:'black',family:"Inconsolata",size:"13px"})
                 //2
                 SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(0,185).font({fill:'black',family:"Inconsolata",size:"13px"})
                 //3
                 SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(0,272).font({fill:'black',family:"Inconsolata",size:"13px"})
                 break;
                 case 3:
                //Vigas VMS
                SVG_laje.line(60,117.5,370,117.5).stroke({width:0.7})
                SVG_laje.line(60,185,370,185).stroke({width:0.7})
                SVG_laje.line(60,252.5,370,252.5).stroke({width:0.7})
                //Cotas de espaçamento
                //1
                SVG_laje.line(25,55,45,55).stroke({width:0.9})
                SVG_laje.line(35,55,35,117.5).stroke({width:0.7}) 
                SVG_laje.line(25,117.5,45,117.5).stroke({width:0.9})
                //2
                SVG_laje.line(35,117.5,35,185).stroke({width:0.7}) 
                SVG_laje.line(25,185,45,185).stroke({width:0.9})
                //3
                SVG_laje.line(35,185,35,252.5).stroke({width:0.7}) 
                SVG_laje.line(25,252.5,45,252.5).stroke({width:0.9})
                //4
                SVG_laje.line(35,252.5,35,315).stroke({width:0.7}) 
                SVG_laje.line(25,315,45,315).stroke({width:0.9})
                //Textos de espaçamento
                //1
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(0,86).font({fill:'black',family:"Inconsolata",size:"13px"})
                //2
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(0,151).font({fill:'black',family:"Inconsolata",size:"13px"})
                //3
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(0,218).font({fill:'black',family:"Inconsolata",size:"13px"})
                //4
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(0,283).font({fill:'black',family:"Inconsolata",size:"13px"})
                break;
                case 4:
                SVG_laje.line(60,104,370,104).stroke({width:0.7})
                SVG_laje.line(60,158,370,158).stroke({width:0.7})
                SVG_laje.line(60,212,370,212).stroke({width:0.7})
                SVG_laje.line(60,266,370,266).stroke({width:0.7})
                //Vigas VMS
                //Cotas de espaçamento
                //1
                SVG_laje.line(25,55,45,55).stroke({width:0.9})
                SVG_laje.line(35,55,35,104).stroke({width:0.7}) 
                SVG_laje.line(25,104,45,104).stroke({width:0.9})
                //2
                SVG_laje.line(35,104,35,158).stroke({width:0.7}) 
                SVG_laje.line(25,158,45,158).stroke({width:0.9})
                //3
                SVG_laje.line(35,158,35,212).stroke({width:0.7}) 
                SVG_laje.line(25,212,45,212).stroke({width:0.9})
                //4
                SVG_laje.line(35,212,35,266).stroke({width:0.7}) 
                SVG_laje.line(25,266,45,266).stroke({width:0.9})
                //5
                SVG_laje.line(35,266,35,315).stroke({width:0.7}) 
                SVG_laje.line(25,315,45,315).stroke({width:0.9})
                //Textos de espaçamento
                //1
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(0,79).font({fill:'black',family:"Inconsolata",size:"13px"})
                //2
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(0,131).font({fill:'black',family:"Inconsolata",size:"13px"})
                //3
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(0,185).font({fill:'black',family:"Inconsolata",size:"13px"})
                //4
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(0,239).font({fill:'black',family:"Inconsolata",size:"13px"})
                //5
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(0,290).font({fill:'black',family:"Inconsolata",size:"13px"})
                break;
                case 5:
                //Vigas VMS
                SVG_laje.line(60,95,370,95).stroke({width:0.7})
                SVG_laje.line(60,140,370,140).stroke({width:0.7})
                SVG_laje.line(60,185,370,185).stroke({width:0.7})
                SVG_laje.line(60,230,370,230).stroke({width:0.7})
                SVG_laje.line(60,275,370,275).stroke({width:0.7})
                //Cotas de espaçamento
                //1
                SVG_laje.line(25,55,45,55).stroke({width:0.9})
                SVG_laje.line(35,55,35,95).stroke({width:0.7}) 
                SVG_laje.line(25,95,45,95).stroke({width:0.9})
                //2
                SVG_laje.line(35,95,35,140).stroke({width:0.7}) 
                SVG_laje.line(25,140,45,140).stroke({width:0.9})
                //3
                SVG_laje.line(35,140,35,185).stroke({width:0.7}) 
                SVG_laje.line(25,185,45,185).stroke({width:0.9})
                //4
                SVG_laje.line(35,185,35,230).stroke({width:0.7}) 
                SVG_laje.line(25,230,45,230).stroke({width:0.9})
                //5
                SVG_laje.line(35,230,35,275).stroke({width:0.7}) 
                SVG_laje.line(25,275,45,275).stroke({width:0.9})
                //6
                SVG_laje.line(35,275,35,315).stroke({width:0.7}) 
                SVG_laje.line(25,315,45,315).stroke({width:0.9})
                //Textos de espaçamento
                //1
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(0,75).font({fill:'black',family:"Inconsolata",size:"13px"})
                //2
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(0,117).font({fill:'black',family:"Inconsolata",size:"13px"})
                //3
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(0,162).font({fill:'black',family:"Inconsolata",size:"13px"})
                //4
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(0,239).font({fill:'black',family:"Inconsolata",size:"13px"})
                //5
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(0,252).font({fill:'black',family:"Inconsolata",size:"13px"})
                //6
                SVG_laje.text(laje_mista_new.vao_max_ot + "m").move(0,295).font({fill:'black',family:"Inconsolata",size:"13px"})

                break;
            }
            break;
            
        default:
        console.log("Direção de vigas inválidas")
        break;
    }




    var SVG_laje_detalhe = SVG('drawing-laje-detalhe').size('100%','100%')
}



function draw_loads(id_element,load,length) {
    var SVG_beam = SVG(id_element).size("100%",200)
    //Draws supports
    SVG_beam.polygon("60,80 70,100 50,100").fill("none").stroke({width:1})
    SVG_beam.polygon("385,80 395,100 375,100").fill("none").stroke({width:1})
    //Draws beam
    SVG_beam.line(60,80,385,80).stroke({width:1})
    //Draws width line
    SVG_beam.line(60,170,60,190).stroke({width:0.8})
    SVG_beam.line(60,180,385,180).stroke({width:0.5})
    SVG_beam.line(385,170,385,190).stroke({width:0.8})
    //Draws reactions
    //Left
    SVG_beam.line(60,110,60,160).stroke({width:0.5})
    SVG_beam.line(45,130,60,110).stroke({width:0.5})
    SVG_beam.line(75,130,60,110).stroke({width:0.5})
    //Right
    SVG_beam.line(385,110,385,160).stroke({width:0.5})
    SVG_beam.line(370,130,385,110).stroke({width:0.5})
    SVG_beam.line(400,130,385,110).stroke({width:0.5})
    //Draws quadratic curve
    SVG_beam.path('M60,80 Q222.5,180 385,80').fill('none').stroke({width:0.5})
    //Draws load text
    SVG_beam.text(load+" KN/m²").move(175,100).font({fill:'black',family:"Inconsolata",size:"15px"})
    //Draws length text
    SVG_beam.text(length+" m").move(195,160).font({fill:'black',family:"Inconsolata",size:"15px"})
    //Draws Vsd text
    //Make code for drawing reaction text - find best fit inside the graph
    


}   

