//===============================================================================================================================
//Classe carregamento
//===============================================================================================================================

class load {
    //Classe que representa o carregamento atuando sobre o módulo
    //Forças são obtidas em KN/m²
    constructor(dead_load, live_load, comb_ult_const, comb_ult_normal, comb_serv_perm, comb_serv_freq,
        comb_serv_rara,sobrecarga, slab_weight ) {
        this.dead_load = dead_load;
        this.live_load = live_load;
        this.slab_weight = slab_weight;
        this.steel_weight = 0.3;
        this.floor_weight = 0.5;
        this.div_weight = 1;
        this.sobrecarga = sobrecarga;
        this.wind_load = 0;
        this.gama1 = 0.4;
        this.gama2 = 0.3;
        this.comb_ult_const = comb_ult_const;
        this.comb_ult_normal = comb_ult_normal;
        this.comb_serv_perm = comb_serv_perm;
        this.comb_serv_freq = comb_serv_freq;
        this.comb_serv_rara = comb_serv_rara;
    }

    get slab_weight() {
        let laje_mista_new = new laje_mista;
        return laje_mista_new.slab_weight_ot;
    }

    set slab_weight(value) {
        this._slab_weight = value;
    }

    get sobrecarga() {
        return $("#sobrecarga").val();
    }

    set sobrecarga(value) {
        this._sobrecarga = value;
    }

    get dead_load() {
        return this.slab_weight + this.steel_weight + this.floor_weight + this.div_weight; 
    }

    set dead_load(value) {
        this._dead_load = value;
    }

    get live_load() {
        return parseFloat(this.sobrecarga) + parseFloat(this.wind_load)
    }

    set live_load(value) {
        this._live_load = value;
    }

    get main_live_load() {
        return Math.max(this.sobrecarga, this.wind_load)
    }

    set main_live_load(value) {
        this._main_live_load = value;
    }

    get comb_ult_normal() {
        if (this.live_load < 5) {
            return 1.4*(this.dead_load) + 1.4*(this.live_load)
        } else {
            return 1.3*(this.dead_load) + 1.2*(this.live_load)
        }
    }

    set comb_ult_normal(value) {
        this._comb_ult_normal = value;
    }

    get comb_ult_const() {
        if (this.live_load < 5) {
            return 1.3*(this.dead_load) + 1.2*(this.live_load)
        } else {
            return 1.25*(this.dead_load) + 1.3*(this.live_load)
        }
    }

    set comb_ult_const(value) {
        this._comb_ult_const = value;
    }

    get comb_serv_perm() {
        return this.dead_load + this.gama2*this.live_load
    }

    set comb_serv_perm(value) {
        this._comb_serv_perm = value;
    }

    get comb_serv_freq() {
        return this.dead_load + this.gama1*this.main_live_load + this.gama2*(this.live_load - this.main_live_load) 
    }

    set comb_serv_freq(value) {
        this._comb_serv_freq = value;
    }

    get comb_serv_rara() {
        return this.dead_load + this.main_live_load + this.gama1*(this.live_load - this.main_live_load)
    }

    set comb_serv_rara(value) {
        this._comb_serv_rara = value;
    }

}

//===============================================================================================================================
//Classe laje mista
//===============================================================================================================================


class laje_mista {
    //Classe que representa a laje mista
    //Calcula a opção mais econômica possível entre as lajes
    constructor (width, heigth,array_data_MF50_vaos_080,array_data_MF50_load_080,array_data_MF50_slab_heigth_080,
        vao_max_ot, slab_heigth_ot, slab_weigth_ot, sobrecarga_ot, direcao_ot,n_viga) {
        this.width = width;
        this.heigth = heigth;
        this.array_data_MF50_vaos_080 = array_data_MF50_vaos_080;
        this.array_data_MF50_slab_heigth_080 = array_data_MF50_slab_heigth_080;
        this.array_data_MF50_weigth_080 
        this.array_data_MF50_load_080 = array_data_MF50_load_080;
        this.calc_laje_ot()
        this.vao_max_ot = this.calc_laje_ot()[4];
        this.slab_height_ot = this.calc_laje_ot()[1];
        this.slab_weight_ot = this.calc_laje_ot()[2];
        this.sobrecarga_ot = this.calc_laje_ot()[3];
        this.direcao_ot = this.calc_laje_ot()[5];
        this.n_viga = this.calc_laje_ot()[6];
    }



    get width() {
        return parseFloat($('#h_total').val())
    }

    set width(value) {
        this._width = value;
    }

    get heigth() {
        return parseFloat($('#v_total').val())
    }

    set heigth(value) {
        this._heigth = value;
    }

    get laje_ot () {
        return calc_laje_ot()
    }

    set laje_ot(value) {
        this._laje_ot = value;
    }

    get array_data_MF50_vaos_080() {
       return [[1.80],[1.90],[2.00],[2.10],[2.20],[2.30],[2.40],[2.50],[2.60],[2.65],[2.70],[2.80],
[2.90],[3.00],[3.10],[3.20]]
    }

    set array_data_MF50_vaos_080(value) {
        this._array_data_MF50_vaos_080 = value;
    }

    //Pega array de dados da tabela para formas MF-50 com espessura de 0.8
    get array_data_MF50_load_080() {
        return [[9.31,10.56,11.81,13.06,14.31,15.57,16.82,18.07],[8.14,9.23,10.33,11.42,
            12.52,13.61,14.71,15.81],[7.14,8.10,9.06,10.02,10.99,11.95,12.91,13.88],[6.28,7.13,7.98,8.82,9.67,10.52,
            11.37,12.22],[5.54,6.29,7.03,7.78,8.53,9.28,10.03,10.78],[4.89,5.55,6.21,6.88,7.54,8.20,8.87,9.53],
            [4.32,4.91,5.5,6.08,6.67,7.26,7.84,8.43],[3.82,4.34,4.86,5.38,5.90,6.42,6.95,7.47],[3.38,3.84,4.30,4.76,5.23,
            5.69,6.15,6.61],[3.18,3.61,4.05,4.48,4.91,5.35,5.78,6.22],[2.99,3.39,3.80,4.21,4.62,5.03,5.44,5.85],
            [2.63,3.00,3.36,3.72,4.08,4.44,4.81,5.17],[2.32,2.64,2.96,3.28,3.60,3.92,4.24,4.56],[2.03,2.32,2.60,2.88,
            3.16,3.44,3.73,4.01],[1.78,2.02,2.27,2.52,2.77,3.02,3.26,3.51],[1.54,1.76,1.98,2.19,2.41,2.63,2.84,3.06]]
    }
    
    set array_data_MF50_load_080(value) {
        this._array_data_MF50_load_080 = value;
    }

    get array_data_MF50_slab_heigth_080() {
        return [100,110,120,130,140,150,160,170]
    }

    set array_data_MF50_slab_heigth_080(value) {
        this._array_data_MF50_slab_heigth_080 = value
    }

    get array_data_MF50_weigth_080() {
        return [1.85,2.08,2.32,2.55,2.79,3.02,3.26,3.49]
    }

    set array_data_MF50_weigth_080(value) {
        this._array_data_MF50_weigth_080 = value;
    }

    calc_laje_ot () {

        //Método que calcula a melhor laje possível para as dimensões e carregamentos especificados
    
    let load_new = new load;
    var vao_max_vert = []
    var vao_max_hor = []

        search_load:
            for (let i = this.array_data_MF50_load_080.length - 1; i >= 0;i--) {
                for (let item in this.array_data_MF50_load_080[i]) {
                    if (this.array_data_MF50_load_080[i][item] >= load_new.sobrecarga) {
                        //Checa se o vão é divísivel inteiramente pelas dimensões
                        if (this.width % this.array_data_MF50_vaos_080[i][0] == 0) {
                            vao_max_hor.push(this.array_data_MF50_vaos_080[i][0]) 
                        }
                        
                        if (this.heigth % this.array_data_MF50_vaos_080[i][0] == 0) {
                            vao_max_vert.push(this.array_data_MF50_vaos_080[i][0]) 
                        }

                        if (vao_max_hor.length > 0  && vao_max_vert.length > 0) {
                            break search_load;
                        }    
                    } 
                }   
            }

            //Checks if vao_max_vert exists, else it's 0
            if (vao_max_vert.length > 0) {
                var vao_max_vert = Math.max(...vao_max_vert)
            } else {
                var vao_max_vert = 0;
            }

            //Checks if vao_max_hor exists, else it's 0

            if (vao_max_hor.length > 0) {
                var vao_max_hor = Math.max(...vao_max_hor)
            } else {
                var vao_max_hor = 0;
            }
            
            

            //Gets number of beams for each of selectable directions
            var n_viga_dir_vert = Math.ceil(this.width/vao_max_hor) - 1;
            var n_viga_dir_hor = Math.ceil(this.heigth/vao_max_vert) - 1;

            //Gets the sum of beams length for comparison 
            var comp_viga_dir_vert = n_viga_dir_vert*this.heigth
            var comp_viga_dir_hor = n_viga_dir_hor*this.width

            if (comp_viga_dir_vert < comp_viga_dir_hor) {
                var n_viga = n_viga_dir_vert
                //Adicionado 1 ao n_viga para dividir por causa da maneira de dividir vãos com número de vigas
                var vao_max_ot = this.width/(n_viga + 1)
                var direcao_ot = "Vertical"
            } else if (comp_viga_dir_vert == comp_viga_dir_hor) {
                var n_viga = n_viga_dir_vert
                var vao_max_ot = this.width/(n_viga + 1)
                var direcao_ot = "Vertical"
            } else {
                var n_viga = n_viga_dir_hor
                var vao_max_ot = this.heigth/(n_viga + 1)
                var direcao_ot = "Horizontal"
            }

            //console.log(vao_max_ot)

            //Search for the next highest vao possible
            search_vao_ot:
            for (let i=0;i < this.array_data_MF50_vaos_080.length; i++) {
                if (this.array_data_MF50_vaos_080[i][0] >= vao_max_ot) {
                    var vao_max_ot = this.array_data_MF50_vaos_080[i][0]
                    var index_ref = i;
                    break search_vao_ot;
                }
            }

            //console.log(vao_max_ot)

            search_load_ot:
            for(let i=0;i<this.array_data_MF50_load_080[index_ref].length;i++) {
                if (this.array_data_MF50_load_080[index_ref][i] > load_new.sobrecarga) {
                    var slab_heigth_final = this.array_data_MF50_slab_heigth_080[i]
                    var slab_weigth_final = this.array_data_MF50_weigth_080[i]
                    var sobrecarga_max = this.array_data_MF50_load_080[index_ref][i]
                    break search_load_ot;
                }
            }

            return ["MF-50",slab_heigth_final,slab_weigth_final,sobrecarga_max,vao_max_ot,direcao_ot,n_viga]
    }



}

//===============================================================================================================================
//Classe Materiais Vigas
//===============================================================================================================================

class materials_beams {
    constructor(steel, concrete,connector,fyd,Ec) {
        this.steel = steel;
        this.Ea = 20000; //Em Mpa - Abrir para outros valores de Ea
        this.Ec = Ec;
        this.fy = fy;
        this.fyd = fyd;
        this.concrete = concrete;
        this.connector = connector;
        this.gama1 = 1.1 //Coeficiente de redução do aço - Padrão - Abrir para outros valores de gama
        this.gamac = 1.4 //Coeficiente de redução do concreto - Padrão - Abrir para outros valores


    }

    get Ec() {
        return 0;
    }

    set Ec(value) {
        this._Ec = value;
    }

    get steel () {
        return $("#steel").val()
    }

    set steel (value) {
        this._steel = value;
    }

    get concrete () {
        return $("concrete").val()
    }

    set concrete(value) {
        this._concrete = value;
    }

    get connector() {
        return $("#connector").val();
    }

    set connector (value) {
        this._connector = value;
    }

    get fy () {
        switch (this.steel) {
            case "USI CIVIL 300":
            return 0;
            case "USI CIVIL 350":
            return 0;
        }
    }

    set fy(value) {
        this._fy = value;
    }

    get fyd() {
        return this.fy/this.gama1
    }
    
    set fyd(value) {
        this._fyd = value;
    }

    get fc() {
        switch (this.concrete) {
            case "Concreto X":
            return 0;
            case "Concreto Y":
            return 0;
        }
    }

    set fc(value) {
        this._fc = value;
    }

    get fcd() {
        return this.fc/this.gamac
    }

    set fcd(value) {
        this._fcd = value;
    }
}


//===============================================================================================================================
//Classe viga (Pai)
//===============================================================================================================================


class beam {
 /* Fazer uma classe pai para todas as vigas, pensar em atributos que podem ser melhor utilizados aqui*/
}

//===============================================================================================================================
//Classe Viga Mista (Pai)
//===============================================================================================================================

class mixed_beam {
    //Parent class which contains all the values commom to designing every beam made of steel and concrete

    constructor(ext_or_inner) {
        this.ext_or_inner = ext_or_inner;

    }

    get ext_or_inner() {
        //Make a function which determines whether the beam beign analysed is an extremity beam or an inner one
        //For now we'll assume every beam is an inner one
        return "inner"
    }

    set ext_or_inner(value) {
        this._ext_or_inner = value;
    }


    //Method which calculates the resistive moment of the beam

    calc_MRd(h,tw,interaction_type,width_eff) {
        let new_material_beam = new materials_beams;
        let new_laje_mista = new laje_mista;
        if (h/tw < Math.sqrt(new_material_beam.Ea*new_material_beam.fy)*3.76) {
            switch (interaction_type) {
                case "full":
                    if (0.85*new_material_beam.fcd*width_eff*new_laje_mista.heigth/10 /*Em cm*/
                         > Aa*new_material_beam.fyd) {

                        //LNP passa pela laje de concreto

                        var a = Aa /*depende do perfil*/ * new_material_beam.fyd / 0.85 * new_material_beam.fcd
                         * width_eff /* em cm*/

                        var MRd = Aa /*depende do perfil*/ * new_material_beam.fyd * ( d1 /*depende do perfil*/ 
                            + 5 /*hf em cm MF-50*/ + new_laje_mista.heigth/10 - a/2) /* em cm*/

                    } else {
                        //LNP passa pelo perfil de aço

                        var Afs /*depende do perfil, fazer cálculo aqui*/
                        var Ccd = 0.85 * new_material_beam.fcd * width_eff * new_laje_mista.heigth / 10
                        var Cad = 0.5 * ( Aa /*depende do perfil*/ * new_material_beam.fyd - Ccd)

                        if (Cad < Afs /*depende do perfil */ * new_material_beam.fyd) {
                            //LNP passa pela mesa superior do perfil de aço
                            //Posição do LNP a partir do topo do perfil de aço = yp
                            var yp = Cad*tfs/Afs*new_material_beam.fyd
                        } else {
                            //LNP passa pela alma do perfil de aço
                            //Posição do LNP a partir do topo do perfil de aço = yp
                            var yp = tfs + hw * ( ( Cad - Afs * new_material_beam.fyd ) / ( hw * tw * fyd ) )
                        }

                        var MRd = Cad * ( d /*depende do perfil*/ - yt  /*depende do perfil*/ - yc /*depende do perfil*/) 
                        + Ccd * ( new_laje_mista.heigth / 20 + 5 /*hf em cm para MF50*/ + d - yt )

                    }

                break;

                case "partial":
                    var Ccd = n * Qrd
                    //or
                    var Ccd = Alfa * Fhd

                    var a = Ccd / ( 0,85 * fc * b )
                
                    var MRd = Cad * ( d - yt - yc ) + Ccd * ( tc - a/2 + hf + d - yt )

                break;

            }
        }

        else if (h/tw > Math.sqrt(new_material_beam.Ea*new_material_beam.fy)*3.76 
        && h/tw < Math.sqrt(new_material_beam.Ea*new_material_beam.fy)*5.7) {
            //Cálculos normais

            var AlfaE = new_material_beam.Ea/new_material_beam.Ec

            //Calcula posição da LNE ----------------------------------------------
            var ytri = Aa*yai+(btr*tc*(d+hf+tc/2))/Aa+btr*tc

            //Altura comprimida do concreto na laje -------------------------------
            var a = Math.min( d + hf + tc - ytri , tc )

            // Cálculo momento de inércia -------------------------------------------
            var Itr = Ia + Aa*((ytri-yai)^2) + (btr*a^3)/12 + Actr*((d+hf+tc-a/2-ytr,i)^2)

            //Cálculo Módulo de resistência elástico inferior ------------------------
            var Wtri  = Itr/ytri

            //Cálculo Módulo de resistência elástico superior -------------------------
            var Wtrs = Itr/(d+hf+tc-ytri)

            switch (interaction_type) {
                case "full":

                var Mrd = Math.min(Wtri*new_material_beam.fyd, AlfaE*Wtrs*new_material_beam.fcd )

                break;

                case "partial":
                var Wefi = Wai + Math.sqrt(alfa)*(Wtri-Wai)

                //Wa, i = módulo de resistência elástico inferior do perfil de aço

                var Mrd = Math.min(Wefi*fyd, AlfaE*Wtrs*fcd)
                break;
            }



        }

        return Mrd;

    } //Closes calc_Mrd method


} //Closes mixed_beams class

//===============================================================================================================================
//Classe Viga (VMS)
//===============================================================================================================================

class beam_vms {
    //Classe que representa as vigas secundárias (VMS)
    //Medidas obtidas em cm
    //Forças obtidas em KN
    //Momentos obtidos em KN*m
    
    constructor (orientation, spacing, num_beam, influence_area, load, max_stress, support, d_min, tw_min, b_ext,
        auto_manual,width_eff) {
        this.orientation = orientation;
        this.spacing = spacing;
        this.num_beam = num_beam;
        this.influence_area = influence_area;
        this.load = load;
        this.max_stress = max_stress;
        this.support = support;
        this.d_min = d_min;
        this.tw_min = tw_min;
        this.b_ext = b_ext;
        this.auto_manual = auto_manual;
        this.width_eff = width_eff;
    }

    get auto_manual() {
        return "auto"
    }

    set auto_manual(value) {
        this._auto_manual = value;
    }

    get orientation() {
        let new_laje_mista = new laje_mista;
        switch (this.auto_manual) {
            case "auto":
            return new_laje_mista.direcao_ot;
            case "manual":
            return $('#direcao').val();
        } 
    }

    set orientation(value) {
        this._orientation = value;
    }

    get spacing() {
        let new_laje_mista = new laje_mista;
        switch (this.auto_manual) {
            case "auto":
            return new_laje_mista.vao_max_ot;
            case "manual":
            return parseFloat($('#l_viga').val())
        }
    }

    set spacing(value) {
        this._spacing = value;
    }

    get b_ext() {
        let slab_new = new slab;
        switch (this.orientation) {
            case "Horizontal":
                return Math.min(slab_new.width/8,this.spacing/2)
                break;
            case "Vertical":
                return Math.min(slab_new.heigth/8,this.spacing/2)
                break;
            default:
                console.log("Direção de vigas inválida")
        }

    }

    set b_ext(value) {
        this._b_ext = value;
    }

    get num_beam() {
        let laje_mista_new = new laje_mista;
        switch (this.orientation) {
            case "Horizontal":
            return (laje_mista_new.heigth/this.spacing) - 1
            case "Vertical":
            return (laje_mista_new.width/this.spacing) - 1
            default:
            Window.alert("Direção de vigas inválida!")
            break;
        }
    }

    set num_beam(value) {
        this._num_beam = value;
    }

    get influence_area() {
        return this.spacing;
    }
    
    set influence_area(value) {
        this._influence_area = value;
    }

    get load() {
        let load_new = new load;
        return this.influence_area*load_new.comb_ult_normal
    }

    set load(value) {
        this._load = value;
    }

    get max_stress() {
        let load_new = new load;
        let laje_mista_new = new laje_mista;
        switch (this.orientation) {
            case "Horizontal":
            return (this.influence_area*load_new.comb_ult_normal*(laje_mista_new.width^2))/8
            case "Vertical":
            return (this.influence_area*load_new.comb_ult_normal*(laje_mista_new.heigth^2))/8
            default:
            console.log("Não foi possível calcular o apoio VMS")
            break;
        }
    }  
       

    set max_stress(value) {
        this._max_stress = value;
    }

    get support() {
        let load_new = new load;
        let laje_mista_new = new laje_mista;
        switch (this.orientation) {
            case "Horizontal":
            return (this.influence_area*load_new.comb_ult_normal*laje_mista_new.width)/2
            case "Vertical":
            return (this.influence_area*load_new.comb_ult_normal*laje_mista_new.heigth)/2
            default:
            console.log("Não foi possível calcular o apoio VMS")
            break;
        }  
    }

    set support(value) {
        this._support = value;
    }

    get d_min() {
        let laje_mista_new = new laje_mista;
        switch (this.orientation) {
            case "Horizontal":
            return laje_mista_new.heigth*100/20 //em cm
            case "Vertical":
            return laje_mista_new.width*100/20 //em cm
            default:
            console.log("Erro no cálculo de d_min")
        }
        
    }

    set d_min(value) {
        this._d_min = value;
    }

    get tw_min() {
        return this.d_min/50 //em cm
    }

    set tw_min(value) {
        this._tw_min = value;
    }

    //Getter which calculates the effective width of the beam
    //Only calculates for the same interval for spacing left and right of the beam
    //Also always assumes it's always an inner beam

    get width_eff() {
        let new_laje_mista = new laje_mista;
        switch (this.orientation) {
            case "Horizontal":
            return Math.min(new_laje_mista.width/8,new_laje_mista.vao_max_ot/2) + Math.min(new_laje_mista.width/8,new_laje_mista.vao_max_ot/2)
            case "Vertical":
            return Math.min(new_laje_mista.heigth/8,new_laje_mista.vao_max_ot/2) + Math.min(new_laje_mista.heigth/8,new_laje_mista.vao_max_ot/2)
        } 
    }

    set width_eff(value) {
        this._width_eff = value;
    }
}

//===============================================================================================================================
//Viga (VMP2)
//===============================================================================================================================

class beam_vmp2 {
    //Classe que representa a viga principal secundária (VMP2)
    //Forças estão em KN
    //Momentos estão em KN*m
    constructor(orientation, influence_area, load, max_stress, support, d_min, tw_min, auto_manual) {
        this.orientation = orientation;
        this.influence_area = influence_area;
        this.load = load;
        this.max_stress = max_stress;
        this.support = support;
        this.d_min = d_min;
        this.tw_min = tw_min;
        this.auto_manual = auto_manual;
    }

    get auto_manual() {
        return "auto"
    }

    set auto_manual(value) {
        this._auto_manual = value;
    }

    get orientation() {
        switch (this.auto_manual) {
            case "auto":
            return direcao_ot;
            case "manual":
            return $('#direcao').val();
        }   
    }

    set orientation(value) {
        this._orientation = value;
    }

    get influence_area() {
        let beam_vms_new = new beam_vms;
        return beam_vms_new.influence_area;
    }

    set influence_area(value) {
        this._influence_area = value;
    }

    get b_ext() {
        let slab_new = new slab;
        let vms_new = new beam_vms;
        switch (this.orientation) {
            case "Horizontal":
                return Math.min(slab_new.width/8,vms_new.spacing/2)
                break;
            case "Vertical":
                return Math.min(slab_new.heigth/8,vms_new.spacing/2)
                break;
            default:
                console.log("Direção de vigas inválida")
        }

    }

    set b_ext(value) {
        this._b_ext = value;
    }
    

    get load() {

    }

    set load(value) {
        this._load = value;
    }

    get max_stress() {
        
    }

    set max_stress(value) {
        this._max_stress = value;
    }

    get support() {
        
    }

    set support(value) {
        this._support = value;
    }

    get d_min() {

    }

    set d_min(value) {
        this._d_min = value;
    }

    get tw_min() {

    }

    set tw_min(value) {
        this._tw_min = value;
    }
} 

//===============================================================================================================================
//Classe Viga (VMP1)
//===============================================================================================================================

class beam_vmp1 {
    //Classe que representa a viga principal primária (VMP1)
    //Forças estão em KN
    //Momentos estão em KN*m
    constructor(orientation, influence_area, load, max_stress, support, d_min, tw_min, auto_manual) {
        this.orientation = orientation;
        this.influence_area = influence_area;
        this.load = load;
        this.max_stress = max_stress;
        this.support = support;
        this.d_min = d_min;
        this.tw_min = tw_min;
        this.auto_manual = auto_manual;
    }

    get auto_manual() {
        return "auto"
    }

    set auto_manual(value) {
        this._auto_manual = value;
    }

    get orientation() {
        let laje_mista_new = new laje_mista;
        switch (this.auto_manual) {
            case "auto":
            return laje_mista_new.direcao_ot;
            case "manual":
            return $('#direcao').val();
        }    
    }

    set orientation(value) {
        this._orientation = value;
    }

    get influence_area() {
        let laje_mista_new = new laje_mista;
        switch (this.orientation) {
            case "Horizontal":
            return laje_mista_new.width/2
            case "Vertical":
            return laje_mista_new.heigth/2
            default:
            console.log("Erro no cálculo área de influência VMP2")
        }
    }

    set influence_area(value) {
        this._influence_area = value;
    }

    get load() {
        let load_new = new load;
        return this.influence_area*load_new.comb_ult_normal
    }

    set load(value) {
        this._load = value;
    }

    get b_ext() {
        let laje_mista_new = new laje_mista;
        switch (this.orientation) {
            case "Horizontal":
                return Math.min(laje_mista_new.heigth/8,laje_mista_new.width/2)
                break;
            case "Vertical":
                return Math.min(laje_mista_new.width/8,laje_mista_new.heigth/2)
                break;
            default:
                console.log("Direção de vigas inválida")
        }

    }

    set b_ext(value) {
        this._b_ext = value;
    }

    get max_stress() {
        return 0;
        
    }

    set max_stress(value) {
        this._max_stress = value;
    }

    get support() {
      let load_new = new load;
      let laje_mista_new = new laje_mista;
      let beam_vms_new = new beam_vms;
      switch (this.orientation) {
          case "Horizontal":
          return ((this.influence_area*load_new.comb_ult_normal*laje_mista_new.heigth) + (beam_vms_new.support*beam_vms_new.num_beam))/2;
          case "Vertical":
          return ((this.influence_area*load_new.comb_ult_normal*laje_mista_new.width) + (beam_vms_new.support*beam_vms_new.num_beam))/2;
          default:
          console.log("Direção das vigas inválidas")
      }
      
    }

    set support(value) {
        this._support = value;
    }

    get d_min() {

    }

    set d_min(value) {
        this._d_min = value;
    }

    get tw_min() {

    }

    set tw_min(value) {
        this._tw_min = value;
    }
}
//===============================================================================================================================
//Classe connector
//===============================================================================================================================

class connector {
    //Classe que representa os conectores que interligam a viga mista e a laje
    constructor(Acs,fucs,Rg,Rp,type,tfcs,twcs,Lcs) {
        this.type = type;
        this.Acs = Acs;
        this.fucs = fucs;
        this.Rg = Rg;
        this.Rp = Rp;
        this.tfcs = tfcs;
        this.twcs = twcs;
        this.Lcs = Lcs;
    }

    get type() {

    }

    set type(value) {
        this._type = value;
    }

    get Acs() {

    }

    set Acs(value) {
        this._Acs = value;
    }

    get fucs() {

    }
    
    set fucs(value) {
        this._fucs = value;
    }

    get Rg() {

    }

    set Rg(value) {
        this._Rg = value;
    }

    get Rp() {

    }

    set Rp(value) {
        this._Rp = value;
    }

    getConnectorRes() {
        return Math.min((this.Rg*this.Rp*this.Acs*this.fucs)/1.25,(0.5*this.Acs*Math.sqrt(/*fck*Ec*/))/1.25);
    }
 

}

//===============================================================================================================================
//Classe Grau de Interação
//===============================================================================================================================

class InterationDegree {
    //Classe que determina o grau de interação da configuração atual viga mista - laje
    //Só calcula para o caso de um perfil de aço com mesas de áreas iguais e vão menor que 25 m
    //******Fazer cálculo para outras situações*******
    constructor(alfa_min) {
        this.alfa_min = alfa_min;
    }

    get alfa_min() {
        
    }

    set alfa_min(value) {
        this._alfa_min = value;
    }
    


}