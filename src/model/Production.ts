export class Production {
  idProduction : number;
  idChercheur : number;
  libelecourt : string;
  libelelong : string;
  dateproduction : Date;
  revuelieu : string;
  adresse : string;
  directeurpub : string;
  motcle : string;
  anneepub : Date;
  numvol : number;
  idThematique : number;
  nomThematique : string;
  pages : string;
  lieu : string;
  evenement : string;
  langue : string;
  typeProduction : {
    "idTypeProduction" : number
    "libelecourt": string
    "libelelong": string
  };
  chercheurProductions: [{
      id : number,
      rangChercheur : string,
      nomChercheur : string,
      idChercheur : number
  }];
  fichier : string;
}
