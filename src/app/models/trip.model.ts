export interface Trip {
  id?: string;
  dates: {
    from: string;
    to: string;
  };
  destination: string;
  image?: string;
  participants: string[];
  objective: string;
  transport: Transport[];
  hebergement: Hebergement;
  activites: Activite[];
  checklist: ChecklistItem[];
  status: 'planned' | 'validated' | 'completed' | 'cancelled';
}

export interface Transport {
  id: string;
  personne: string;
  trajet: string;
  cout: number;
  horaires: string;
  type: string;
}

export interface Hebergement {
  nom: string;
  adresse: string;
  type: string;
  prixTotal: number;
  note: string;
}

export interface Activite {
  id: string;
  nom: string;
  description: string;
  lien?: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}