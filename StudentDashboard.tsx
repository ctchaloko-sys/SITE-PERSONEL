--- src/pages/StudentDashboard.tsx (原始)
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { demandesDemo, typesActes, statuts } from '../data/mockData';
import { FileText, Clock, CheckCircle, XCircle, Loader2, FileCheck, Plus, Bell, Calendar } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  const demandes = demandesDemo;

  const getStatutInfo = (statutId: string) => statuts.find(s => s.id === statutId) || statuts[0];

  const getStatutIcon = (code: string) => {
    switch (code) {
      case 'PENDING': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'PROCESSING': return <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />;
      case 'VALIDATED': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'REJECTED': return <XCircle className="w-4 h-4 text-red-400" />;
      case 'READY': return <FileCheck className="w-4 h-4 text-emerald-400" />;
      default: return <Clock className="w-4 h-4 text-yellow-400" />;
    }
  };

  const pending = demandes.filter(d => d.statut_id === '1').length;
  const processing = demandes.filter(d => d.statut_id === '2').length;
  const ready = demandes.filter(d => d.statut_id === '5').length;

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Bonjour, {user.prenoms} 👋
              </h1>
              <p className="text-slate-400 mt-1">
                {user.filiere} — {user.departement}
              </p>
            </div>
            <Link
              to="/nouvelle-demande"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/25"
            >
              <Plus className="w-5 h-5" />
              Nouvelle Demande
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{demandes.length}</div>
            <div className="text-sm text-slate-400">Total demandes</div>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{pending}</div>
            <div className="text-sm text-slate-400">En attente</div>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{processing}</div>
            <div className="text-sm text-slate-400">En traitement</div>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{ready}</div>
            <div className="text-sm text-slate-400">Disponibles</div>
          </div>
        </div>

        {/* Notifications */}
        {ready > 0 && (
          <div className="mb-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
            <Bell className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <p className="text-emerald-300 text-sm">
              🎉 Vous avez <strong>{ready} document(s)</strong> prêt(s) au téléchargement !
            </p>
          </div>
        )}

        {/* Demande List */}
        <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              Mes demandes
            </h2>
          </div>
          <div className="divide-y divide-white/5">
            {demandes.map((demande) => {
              const typeActe = typesActes.find(t => t.id === demande.type_acte_id);
              const statut = getStatutInfo(demande.statut_id);

              return (
                <Link
                  key={demande.id}
                  to={`/demande/${demande.id}`}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 hover:bg-white/5 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{typeActe?.icon}</span>
                      <div>
                        <h3 className="text-white font-semibold">{typeActe?.libelle}</h3>
                        <p className="text-slate-400 text-sm font-mono">{demande.code_suivi}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                      <span>Année: {demande.annee_academique}</span>
                      <span>•</span>
                      <span>Soumis le {new Date(demande.created_at).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${statut.color} bg-opacity-20`}>
                    {getStatutIcon(statut.code)}
                    <span className="text-white text-sm font-medium">{statut.libelle}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <Link
            to="/nouvelle-demande"
            className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all group"
          >
            <Plus className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-semibold mb-1">Nouvelle demande</h3>
            <p className="text-slate-400 text-sm">Soumettre une nouvelle demande d'acte académique</p>
          </Link>
          <Link
            to="/suivi"
            className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/30 transition-all group"
          >
            <FileText className="w-8 h-8 text-indigo-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-semibold mb-1">Suivi rapide</h3>
            <p className="text-slate-400 text-sm">Suivre un dossier par code de suivi (accès public)</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;


+++ src/pages/StudentDashboard.tsx (修改后)
import { Link } from 'react-router-dom';
import { useAuth, useDemandes } from '../context/AuthContext';
import { typesActes, statuts } from '../data/mockData';
import { FileText, Clock, CheckCircle, XCircle, Loader2, FileCheck, Plus, Bell, Calendar } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { getDemandesByEtudiant } = useDemandes();

  if (!user) return null;

  const demandes = getDemandesByEtudiant(user.id);

  const getStatutInfo = (statutId: string) => statuts.find(s => s.id === statutId) || statuts[0];

  const getStatutIcon = (code: string) => {
    switch (code) {
      case 'PENDING': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'PROCESSING': return <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />;
      case 'VALIDATED': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'REJECTED': return <XCircle className="w-4 h-4 text-red-400" />;
      case 'READY': return <FileCheck className="w-4 h-4 text-emerald-400" />;
      default: return <Clock className="w-4 h-4 text-yellow-400" />;
    }
  };

  const pending = demandes.filter(d => d.statut_id === '1').length;
  const processing = demandes.filter(d => d.statut_id === '2').length;
  const ready = demandes.filter(d => d.statut_id === '5').length;

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Bonjour, {user.prenoms} 👋
              </h1>
              <p className="text-slate-400 mt-1">
                {user.filiere} — {user.departement}
              </p>
            </div>
            <Link
              to="/nouvelle-demande"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/25"
            >
              <Plus className="w-5 h-5" />
              Nouvelle Demande
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{demandes.length}</div>
            <div className="text-sm text-slate-400">Total demandes</div>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{pending}</div>
            <div className="text-sm text-slate-400">En attente</div>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{processing}</div>
            <div className="text-sm text-slate-400">En traitement</div>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{ready}</div>
            <div className="text-sm text-slate-400">Disponibles</div>
          </div>
        </div>

        {/* Notifications */}
        {ready > 0 && (
          <div className="mb-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
            <Bell className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <p className="text-emerald-300 text-sm">
              🎉 Vous avez <strong>{ready} document(s)</strong> prêt(s) au téléchargement !
            </p>
          </div>
        )}

        {/* Demande List */}
        <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              Mes demandes
            </h2>
          </div>
          <div className="divide-y divide-white/5">
            {demandes.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400 mb-4">Vous n'avez pas encore de demande.</p>
                <Link
                  to="/nouvelle-demande"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:bg-blue-500/30 transition-all text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Créer ma première demande
                </Link>
              </div>
            ) : (
              demandes.map((demande) => {
                const typeActe = typesActes.find(t => t.id === demande.type_acte_id);
                const statut = getStatutInfo(demande.statut_id);

                return (
                  <Link
                    key={demande.id}
                    to={`/demande/${demande.id}`}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{typeActe?.icon}</span>
                        <div>
                          <h3 className="text-white font-semibold">{typeActe?.libelle}</h3>
                          <p className="text-slate-400 text-sm font-mono">{demande.code_suivi}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                        <span>Année: {demande.annee_academique}</span>
                        <span>•</span>
                        <span>Soumis le {new Date(demande.created_at).toLocaleDateString('fr-FR')}</span>
                        <span>•</span>
                        <span>{demande.pieces.length} pièce(s)</span>
                      </div>
                    </div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${statut.color} bg-opacity-20`}>
                      {getStatutIcon(statut.code)}
                      <span className="text-white text-sm font-medium">{statut.libelle}</span>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <Link
            to="/nouvelle-demande"
            className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all group"
          >
            <Plus className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-semibold mb-1">Nouvelle demande</h3>
            <p className="text-slate-400 text-sm">Soumettre une nouvelle demande d'acte académique</p>
          </Link>
          <Link
            to="/suivi"
            className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/30 transition-all group"
          >
            <FileText className="w-8 h-8 text-indigo-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-semibold mb-1">Suivi rapide</h3>
            <p className="text-slate-400 text-sm">Suivre un dossier par code de suivi (accès public)</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
