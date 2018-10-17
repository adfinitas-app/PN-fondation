var     urlBySegment = {

	    // Renvoie la partie de l'URL avec le ou les cids
	    getUrlCid: function(iraiser_cid, urlParams) {
            if (typeof iraiser_cid == 'number') {
                var frontURL = "/b?";
                urlParams.cid = iraiser_cid;
            } else if (typeof iraiser_cid == "object"){
                var frontURL = "/ab?";
                urlParams.cids = [];
                for (i in iraiser_cid) {
                    urlParams.cids.push(iraiser_cid[i]);
                }
            }
            return (frontURL);
        },

	    // Renvoie la partie de l'URL concernant les montants
	    // (amount & once_grid[])
        getUrlAmounts: function(myMontants, urlParams) {
            var URL = "";
            urlParams.once_grid = [];
            for (v in myMontants)
            {
                if (v == 0)
                  urlParams.amount = myMontants[v];
              urlParams.once_grid.push(myMontants[v]);
            }
        },

	    // Renvoie l'URL complète
        getUrl: function(mySegment, segAmount, data, default_amount) {
            var segment = data.segments[mySegment];
            var urlAmounts = "";
            var montants = [];
            var urlParams = {};
            if (segment.type == "addition") {
                montants    = this.addition(segment, segAmount);
                this.getUrlAmounts(montants, urlParams);
            }
            else if (segment.type == "percent") {
                montants    = this.percent(segment, segAmount);
                this.getUrlAmounts(montants, urlParams);
            }
            else if (segment.type == "fixe") {
                montants    = this.fixe(segment, segAmount);
                this.getUrlAmounts(montants, urlParams);
            }
            else if (segment.type == "libre") {
		urlParams.once_grid = [];
		urlParams.once_grid.push(0);
            } else if (segment.type == "libre-preremplit") {
                var newAmount	=   segAmount * 100 ;
		urlParams.once_grid = [];
		urlParams.once_grid.push(0);
                urlParams.amount = newAmount;
            }

            var frontURL = this.getUrlCid(data.iraiser_cid, urlParams);

            if (segment.iraiser_params != undefined)
                for (j in segment.iraiser_params)
                  urlParams[j] = segment.iraiser_params[j];
              if (typeof(default_amount) != "undefined")
                urlParams.amount = default_amount * 100;
            return (frontURL +
             decodeURIComponent(jQuery.param(urlParams)) +
             myUrlParams.getAll());
        },

        addition: function(segment, myAmount) {
            var montants = [];
            for (v in segment.values)
            {
                var arrondi = segment.arrondiSup;
                var tmp     = myAmount + segment.values[v];
                if (arrondi !=0 && v >= 0)
                {
                    tmp = (tmp%arrondi !== 0) ? tmp + (arrondi - tmp%arrondi) : tmp ;
                }
                montants[v] = tmp * 100;
            }
            return montants;
        },

        fixe: function(segment, myAmount) {
            var montants = [];
            for (v in segment.values)
            {
                montants[v] = segment.values[v] * 100;
            }
            return montants;
        },

        percent: function(segment, myAmount) {
            var montants = [];
            for (v in segment.values)
            {
                var arrondi = segment.arrondiSup;
                var tmp     = myAmount + Math.round((myAmount * segment.values[v]) / 100);
                if (arrondi !=0 && v >= 0)
                {
                    tmp = (tmp%arrondi !== 0) ? tmp + (arrondi - tmp%arrondi) : tmp ;
                }
                montants[v] = tmp * 100;
            }
            return montants;
        }
    };

    var deFisk = {
        calculation: function(myAmount,mySegment, data) {
            var valeurReelle = 0;

            if ( (data.segments[mySegment] != undefined) && (data.segments[mySegment].defisc == "ISF") && (data.fiscal_rules.ISF != 0) )
            {
                valeurReelle = myAmount - (myAmount * data.fiscal_rules.ISF / 100);
            }
            else
            {
                if (data.fiscal_rules.percentreste == 0 || (myAmount - data.fiscal_rules.plafond) <= 0)
                {
                    valeurReelle = myAmount - Math.floor(myAmount * data.fiscal_rules.percentplafond / 100);
                }
                else
                {
                    var newAmount = myAmount - data.fiscal_rules.plafond ;
                    valeurReelle  = myAmount - Math.floor(data.fiscal_rules.plafond * data.fiscal_rules.percentplafond / 100) - Math.floor(newAmount * data.fiscal_rules.percentreste / 100 );
                    valeurReelle = Math.abs(valeurReelle);
                }
            }
            var sentence = this.replaceAll(data.fiscal_phrase, '{{XX}}', Math.floor(valeurReelle));
            return sentence;
        },
        replaceAll: function(string, find, replace) {
            return string.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
        },
        escapeRegExp: function(string) {
            return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        }
    };
