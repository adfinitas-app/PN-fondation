var _DATA_CTA = {
  // Peut-être un tableau ou un nombre
  // L'utilisation de plusieurs cid est utile en cas d'AB test
  iraiser_cid : 40,
  iraiser_url : 'donner.perce-neige.org/b',

  // Nom de la catégorie de l'evenement remonté dans Woopra
  // Doit être une string (le numéro du bouton CTA y sera concaténé)
  woopra_interaction :   'CLIC-BTN-',

  // Upgrade affiché sur iRaiser
  segments : {
    'OPTIN':    {'arrondiSup':0, 'type': 'fixe',     'values':[20, 30, 50]} ,
    'ADHERENT': {'arrondiSup':5, 'type': 'addition', 'values':[0, 5, 10]} ,
    'DONATEUR': {'arrondiSup':5, 'type': 'percent',  'values':[0, 25, 50]} ,
    'MIDDLE':   {'arrondiSup':5, 'type': 'addition', 'values':[0, 25, 100]} ,
    'GD':       {'arrondiSup':0, 'type': 'libre'}
  }
};
