sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("searchimage.controller.Main", {
            onInit: function () {
                //colchete indica que a variavel eh do tipo tabla interna do abap(lista)
                //vamos fazer um table type dentro de uma e strutura do abap (objeto) chaves
                let ImageList = {
                    Imagens: []
                };

                //CRIACAO DO MODELO PARA EXIBIR DADOS NA TELA (databinding)
                let ImageModel = new JSONModel(ImageList);
                let view = this.getView(); //serve para instaciar o objeto da tela
                view.setModel(ImageModel,"ModeloImagem"); //vc poderia ter feito somente uma linha (41 e 42)

            },

            onPressBuscar: function () {
                let inputBusca = this.byId("inpBusca");
                //coleta o valor digitado no input
                let query = inputBusca.getValue();
                //alert(query);

                const settings = {
                    "async": true,
                    "crossDomain": true,
                    //concatenate
                    "url": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q="
                      + query
                      + "&pageNumber=1&pageSize=10&autoCorrect=true",
                    "method": "GET",
                    "headers": {
                        "X-RapidAPI-Key": "1658455fdcmsh98123184cffa4fdp1822cbjsnb012a79f48cf",
                        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
                    }
                };

               //paratensis serve para passar parametros
                //callback: uma funcao executada no final de outra funcao
                $.ajax(settings).done(function (response) {
                    console.log(response);

                    //instanciar o modelo
                    let oImageModel = this.getView().getModel("ModeloImagem");
                    let oDadosImage = oImageModel.getData(); //retorna os dados
                    //clear tabela interna = array
                    oDadosImage.Imagens = [];

                    //loop que adiciona dados de uma tabela em outa tabela
                    let listaResultados = response.value;
                    let newItem;

                    //vamos ao loop
                    for (var i = 0; i< listaResultados.length; i++) {
                        //read table pelo indice
                        newItem = listaResultados[i];
                        //append doas dados na nova tabela
                        oDadosImage.Imagens.push(newItem);

                    }

                    oImageModel.refresh();

                }.bind(this)
                ); 






            }
        });
    });
