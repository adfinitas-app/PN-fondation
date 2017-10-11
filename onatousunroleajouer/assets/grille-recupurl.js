// - Config récupération URL
    var     _RECUP_URL      =   [   'email',
                                    'civility',
                                    'firstname',
                                    'lastname',
                                    'address1',
                                    'address2',
                                    'postcode',
                                    'city',
                                    'country'
                                ];
/* -------> Récupération des paramètres d'URL */
    var myUrlParams = {
        params:     {},
        size:       0,
        urlToGet:   "",

        // INIT : On récupère les params bruts
        init:   function () {
            var qd = {};
            location.search.substr(1).split("&").forEach( function(item) {
                var k = item.split("=")[0],
                    v = decodeURIComponent(item.split("=")[1]);
                    (k in qd) ? qd[k].push(v) : qd[k] = [v,]
            });
            this.params = qd;
            //console.log(this.params);
        },

        // CALCULATE : on checke le nombre de params récupérés
        calculateSize: function() {
            var obj = this.params,
                mySize = 0,
                key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) mySize++;
            }
            this.size = mySize;
            //console.log(this.size);
        },

        // FORMAT : on crée la chaine de caractères a ajouter à l'URL
        formatUrlParams: function() {
            var key,
                myKey;
            for (key in _RECUP_URL) {
                myKey = _RECUP_URL[key];

                if (this.params.hasOwnProperty(myKey))
                {
                    this.urlToGet += '&'+myKey+'='+this.params[myKey];
                }
            }
            //console.log(this.urlToGet);
        },

        // GETALL : Rock'n'Roll
        getAll: function() {
            this.urlToGet = "";
            this.init();
            this.calculateSize();
            if (this.size >= 1)
            {
                this.formatUrlParams();
            }
            return this.urlToGet;
        },

        // GETOBJECT : To
        getObject: function() {
            this.init();
            this.calculateSize();
            if (this.size >= 1)
            {
                return this.params;
            }
        }

    }
