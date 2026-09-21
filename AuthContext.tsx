--- src/context/AuthContext.tsx (原始)
import { createContext, useContext, useState, ReactNode } from 'react';
import { Etudiant, etudiantDemo } from '../data/mockData';

interface AuthContextType {
  user: Etudiant | null;
  isAdmin: boolean;
  login: (matricule: string, password: string) => boolean;
  adminLogin: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Etudiant | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (matricule: string, _password: string): boolean => {
    // Demo: accept any password for the demo matricule
    if (matricule === '2024ETU001' || matricule.length > 3) {
      setUser(etudiantDemo);
      return true;
    }
    return false;
  };

  const adminLogin = (username: string, _password: string): boolean => {
    if (username === 'admin' || username === 'agent') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, adminLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


+++ src/context/AuthContext.tsx (修改后)
import { createContext, useContext, useState, ReactNode } from 'react';
import { Etudiant, Demande, etudiantDemo, demandesDemo, allDemandes as initialAllDemandes } from '../data/mockData';

interface AuthContextType {
  user: Etudiant | null;
  isAdmin: boolean;
  login: (matricule: string, password: string) => boolean;
  adminLogin: (username: string, password: string) => boolean;
  logout: () => void;
}

interface DemandeContextType {
  demandes: Demande[];
  updateDemandeStatut: (id: string, newStatutId: string, commentaire?: string) => void;
  addDemande: (demande: Demande) => void;
  getDemandeById: (id: string) => Demande | undefined;
  getDemandesByEtudiant: (etudiantId: string) => Demande[];
}

const AuthContext = createContext<AuthContextType | null>(null);
const DemandeContext = createContext<DemandeContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const useDemandes = () => {
  const context = useContext(DemandeContext);
  if (!context) throw new Error('useDemandes must be used within DemandeProvider');
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Etudiant | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [demandes, setDemandes] = useState<Demande[]>([...initialAllDemandes]);

  const login = (matricule: string, _password: string): boolean => {
    if (matricule === '2024ETU001' || matricule.length > 3) {
      setUser(etudiantDemo);
      return true;
    }
    return false;
  };

  const adminLogin = (username: string, _password: string): boolean => {
    if (username === 'admin' || username === 'agent') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  const updateDemandeStatut = (id: string, newStatutId: string, commentaire?: string) => {
    setDemandes(prev => prev.map(d => {
      if (d.id === id) {
        const now = new Date();
        const dateStr = now.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) +
                       ', ' + now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

        const statutLabels: Record<string, string> = {
          '1': 'En attente',
          '2': 'En cours de traitement',
          '3': 'Validée',
          '4': 'Rejetée',
          '5': 'Disponible'
        };

        const newTimelineEntry = {
          statut: statutLabels[newStatutId] || 'Mis à jour',
          date: dateStr,
          commentaire: commentaire || `Statut changé vers ${statutLabels[newStatutId]}`
        };

        return {
          ...d,
          statut_id: newStatutId,
          updated_at: now.toISOString(),
          timeline: [...d.timeline, newTimelineEntry]
        };
      }
      return d;
    }));
  };

  const addDemande = (demande: Demande) => {
    setDemandes(prev => [demande, ...prev]);
  };

  const getDemandeById = (id: string) => {
    return demandes.find(d => d.id === id);
  };

  const getDemandesByEtudiant = (etudiantId: string) => {
    return demandes.filter(d => d.etudiant_id === etudiantId);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, adminLogin, logout }}>
      <DemandeContext.Provider value={{ demandes, updateDemandeStatut, addDemande, getDemandeById, getDemandesByEtudiant }}>
        {children}
      </DemandeContext.Provider>
    </AuthContext.Provider>
  );
};
