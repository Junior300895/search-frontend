export class Chercheur {
  prenom : string;
  nom : string;
  ne_le : Date;
  lieu_de_naissance : string;
  email : string;
  url_page_person : string;
  civilite : string;
  nationalite : string;
  tel_perso : string;
  adresse_perso : string;
  tel_pro : string;
  adresse_pro : string;
  boite_postal : string;

  lcThematique : string;
  lcFonction : string;
  lcGrade : string;
  lcStatut : string;
  lcStructure : string;
  lcUniteRecherche : string;

  fonction : {
    "idFonction": number,
    "libeleCourt": string,
    "libeleLong": string,
  };
  grade: {
    "idGrade": number,
    "libeleCourt": string,
    "libeleLong": string,
  };
  statut: {
    "idStatut": number,
    "libeleCourt": string,
    "libeleLong": string,
  };
  thematiques: [
    {
      "idThematique": number,
      "libeleCourt": string,
      "libeleLong": string
    }
  ]
}
