--- src/pages/AdminDashboard.tsx (原始)
import { useState } from 'react';
import { allDemandes, typesActes, statuts } from '../data/mockData';
import {
  BarChart3, FileText, Clock, CheckCircle, XCircle, Loader2, FileCheck,
  Search, Filter, Eye, Check, X, ChevronDown, Users, TrendingUp, AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDemande, setSelectedDemande] = useState<typeof allDemandes[0] | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [actionComment, setActionComment] = useState('');

  const demandes = allDemandes;

  const filteredDemandes = demandes.filter(d => {
    const matchesFilter = filter === 'all' || d.statut_id === filter;
    const matchesSearch = searchTerm === '' ||
      d.code_suivi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      typesActes.find(t => t.id === d.type_acte_id)?.libelle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatutInfo = (statutId: string) => statuts.find(s => s.id === statutId) || statuts[0];

  const getStatutIcon = (code: string) => {
    switch (code) {
      case 'PENDING': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'PROCESSING': return <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />;
      case 'VALIDATED': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'REJECTED': return <XCircle className="w-4 h-4 text-red-400" />;
      case 'READY': return <FileCheck className="w-4 h-5 text-emerald-400" />;
      default: return <Clock className="w-4 h-4 text-yellow-400" />;
    }
  };

  // Stats
  const totalDemandes = demandes.length;
  const pending = demandes.filter(d => d.statut_id === '1').length;
  const processing = demandes.filter(d => d.statut_id === '2').length;
  const validated = demandes.filter(d => d.statut_id === '3').length;
  const ready = demandes.filter(d => d.statut_id === '5').length;
  const rejected = demandes.filter(d => d.statut_id === '4').length;

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Tableau de bord Administration
          </h1>
          <p className="text-slate-400 mt-1">Gestion et suivi des demandes d'actes académiques</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-slate-400">Total</span>
            </div>
            <div className="text-2xl font-bold text-white">{totalDemandes}</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-slate-400">En attente</span>
            </div>
            <div className="text-2xl font-bold text-yellow-400">{pending}</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Loader2 className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-slate-400">En cours</span>
            </div>
            <div className="text-2xl font-bold text-blue-400">{processing}</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-xs text-slate-400">Validées</span>
            </div>
            <div className="text-2xl font-bold text-green-400">{validated}</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-400">Prêtes</span>
            </div>
            <div className="text-2xl font-bold text-emerald-400">{ready}</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-4 h-4 text-red-400" />
              <span className="text-xs text-slate-400">Rejetées</span>
            </div>
            <div className="text-2xl font-bold text-red-400">{rejected}</div>
          </div>
        </div>

        {/* Charts placeholder */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              Répartition par type d'acte
            </h3>
            <div className="space-y-3">
              {typesActes.slice(0, 4).map((type, i) => {
                const count = demandes.filter(d => d.type_acte_id === type.id).length;
                const percentage = Math.round((count / totalDemandes) * 100);
                return (
                  <div key={type.id}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-300">{type.icon} {type.libelle}</span>
                      <span className="text-slate-400">{count} ({percentage}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              Indicateurs de performance
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-3xl font-bold text-emerald-400">85%</div>
                <div className="text-xs text-slate-400 mt-1">Taux de validation</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-3xl font-bold text-blue-400">3.2j</div>
                <div className="text-xs text-slate-400 mt-1">Délai moyen</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-3xl font-bold text-yellow-400">12</div>
                <div className="text-xs text-slate-400 mt-1">Demandes aujourd'hui</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-3xl font-bold text-purple-400">98%</div>
                <div className="text-xs text-slate-400 mt-1">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher par code ou type d'acte..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white appearance-none focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option value="all">Tous les statuts</option>
              {statuts.map(s => (
                <option key={s.id} value={s.id}>{s.libelle}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Demande List */}
        <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Code</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Type d'acte</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Date</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Statut</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredDemandes.map((demande) => {
                  const typeActe = typesActes.find(t => t.id === demande.type_acte_id);
                  const statut = getStatutInfo(demande.statut_id);

                  return (
                    <tr key={demande.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm text-blue-300">{demande.code_suivi}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{typeActe?.icon}</span>
                          <span className="text-white text-sm">{typeActe?.libelle}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {new Date(demande.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statut.color} bg-opacity-20`}>
                          {getStatutIcon(statut.code)}
                          <span className="text-white text-xs font-medium">{statut.libelle}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => { setSelectedDemande(demande); setShowDetail(true); }}
                          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                          title="Voir les détails"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredDemandes.length === 0 && (
            <div className="p-12 text-center">
              <AlertCircle className="w-10 h-10 text-slate-500 mx-auto mb-3" />
              <p className="text-slate-400">Aucune demande trouvée</p>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {showDetail && selectedDemande && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowDetail(false)}>
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-white/10 p-6" onClick={e => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {typesActes.find(t => t.id === selectedDemande.type_acte_id)?.icon}{' '}
                    {typesActes.find(t => t.id === selectedDemande.type_acte_id)?.libelle}
                  </h2>
                  <p className="text-slate-400 font-mono text-sm mt-1">{selectedDemande.code_suivi}</p>
                </div>
                <button onClick={() => setShowDetail(false)} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="text-xs text-slate-400">Année académique</div>
                  <div className="text-white font-medium">{selectedDemande.annee_academique}</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="text-xs text-slate-400">Date de soumission</div>
                  <div className="text-white font-medium">{new Date(selectedDemande.created_at).toLocaleDateString('fr-FR')}</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="text-xs text-slate-400">Statut actuel</div>
                  <div className={`inline-flex items-center gap-2 mt-1 px-2 py-0.5 rounded-full ${getStatutInfo(selectedDemande.statut_id).color} bg-opacity-20`}>
                    {getStatutIcon(getStatutInfo(selectedDemande.statut_id).code)}
                    <span className="text-white text-xs">{getStatutInfo(selectedDemande.statut_id).libelle}</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="text-xs text-slate-400">Pièces jointes</div>
                  <div className="text-white font-medium">{selectedDemande.pieces.length} fichier(s)</div>
                </div>
              </div>

              {/* Pieces */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-white mb-3">Pièces justificatives</h3>
                <div className="space-y-2">
                  {selectedDemande.pieces.map((piece, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 text-sm">
                      <FileText className="w-4 h-4 text-blue-400" />
                      <span className="text-slate-300">{piece.nom}</span>
                      <button className="ml-auto text-xs text-blue-400 hover:underline">Voir</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-white mb-3">Historique</h3>
                <div className="space-y-3">
                  {selectedDemande.timeline.map((step, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium">{step.statut}</span>
                        <span className="text-slate-400 ml-2">{step.date}</span>
                        <p className="text-slate-500 text-xs">{step.commentaire}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-sm font-bold text-white mb-3">Actions de traitement</h3>
                <div className="mb-4">
                  <textarea
                    value={actionComment}
                    onChange={(e) => setActionComment(e.target.value)}
                    placeholder="Ajouter un commentaire interne..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none text-sm"
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:bg-blue-500/30 transition-all text-sm font-medium">
                    <Loader2 className="w-4 h-4" />
                    Mettre en traitement
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-500/20 border border-green-500/30 text-green-300 hover:bg-green-500/30 transition-all text-sm font-medium">
                    <Check className="w-4 h-4" />
                    Valider
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/30 transition-all text-sm font-medium">
                    <FileCheck className="w-4 h-4" />
                    Marquer comme prêt
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30 transition-all text-sm font-medium">
                    <XCircle className="w-4 h-4" />
                    Rejeter
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;


+++ src/pages/AdminDashboard.tsx (修改后)
import { useState } from 'react';
import { typesActes, statuts } from '../data/mockData';
import { useDemandes } from '../context/AuthContext';
import {
  BarChart3, FileText, Clock, CheckCircle, XCircle, Loader2, FileCheck,
  Search, Filter, Eye, Check, X, ChevronDown, Users, TrendingUp, AlertCircle,
  Upload, MessageSquare, Send
} from 'lucide-react';

const AdminDashboard = () => {
  const { demandes, updateDemandeStatut } = useDemandes();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDemande, setSelectedDemande] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [actionComment, setActionComment] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFileName, setUploadFileName] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const currentDemande = selectedDemande ? demandes.find(d => d.id === selectedDemande) : null;

  const filteredDemandes = demandes.filter(d => {
    const matchesFilter = filter === 'all' || d.statut_id === filter;
    const matchesSearch = searchTerm === '' ||
      d.code_suivi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      typesActes.find(t => t.id === d.type_acte_id)?.libelle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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

  const handleStatusChange = (newStatutId: string) => {
    if (!selectedDemande) return;

    const commentaire = actionComment.trim() || getStatutInfo(newStatutId).libelle;
    updateDemandeStatut(selectedDemande, newStatutId, commentaire);
    setActionComment('');

    const labels: Record<string, string> = {
      '1': 'mise en attente',
      '2': 'mise en traitement',
      '3': 'validation',
      '4': 'rejet',
      '5': 'marquée comme prête'
    };

    showToast(`Demande ${labels[newStatutId]} avec succès !`, newStatutId === '4' ? 'error' : 'success');

    // Fermer le modal après un court délai
    setTimeout(() => {
      setShowDetail(false);
      setSelectedDemande(null);
    }, 1000);
  };

  const handleUploadSignedDoc = () => {
    if (!uploadFileName) {
      showToast('Veuillez sélectionner un fichier PDF', 'error');
      return;
    }
    if (!selectedDemande) return;

    // Ajouter le document signé à la demande et changer le statut
    updateDemandeStatut(selectedDemande, '5', `Document signé téléversé : ${uploadFileName}`);
    setUploadFileName('');
    setShowUploadModal(false);
    showToast('Document signé téléversé avec succès ! Demande marquée comme prête.', 'success');

    setTimeout(() => {
      setShowDetail(false);
      setSelectedDemande(null);
    }, 1000);
  };

  // Stats
  const totalDemandes = demandes.length;
  const pending = demandes.filter(d => d.statut_id === '1').length;
  const processing = demandes.filter(d => d.statut_id === '2').length;
  const validated = demandes.filter(d => d.statut_id === '3').length;
  const ready = demandes.filter(d => d.statut_id === '5').length;
  const rejected = demandes.filter(d => d.statut_id === '4').length;

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Toast Notification */}
        {toast && (
          <div className={`fixed top-20 right-4 z-[100] p-4 rounded-xl shadow-2xl border backdrop-blur-xl animate-in flex items-center gap-3 max-w-md ${
            toast.type === 'success' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-200' :
            toast.type === 'error' ? 'bg-red-500/20 border-red-500/30 text-red-200' :
            'bg-blue-500/20 border-blue-500/30 text-blue-200'
          }`}>
            {toast.type === 'success' && <CheckCircle className="w-5 h-5 flex-shrink-0" />}
            {toast.type === 'error' && <XCircle className="w-5 h-5 flex-shrink-0" />}
            {toast.type === 'info' && <AlertCircle className="w-5 h-5 flex-shrink-0" />}
            <span className="text-sm font-medium">{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-auto text-white/60 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Tableau de bord Administration
          </h1>
          <p className="text-slate-400 mt-1">Gestion et suivi des demandes d'actes académiques</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-slate-400">Total</span>
            </div>
            <div className="text-2xl font-bold text-white">{totalDemandes}</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-slate-400">En attente</span>
            </div>
            <div className="text-2xl font-bold text-yellow-400">{pending}</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Loader2 className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-slate-400">En cours</span>
            </div>
            <div className="text-2xl font-bold text-blue-400">{processing}</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-xs text-slate-400">Validées</span>
            </div>
            <div className="text-2xl font-bold text-green-400">{validated}</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-400">Prêtes</span>
            </div>
            <div className="text-2xl font-bold text-emerald-400">{ready}</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-4 h-4 text-red-400" />
              <span className="text-xs text-slate-400">Rejetées</span>
            </div>
            <div className="text-2xl font-bold text-red-400">{rejected}</div>
          </div>
        </div>

        {/* Charts placeholder */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              Répartition par type d'acte
            </h3>
            <div className="space-y-3">
              {typesActes.slice(0, 4).map((type) => {
                const count = demandes.filter(d => d.type_acte_id === type.id).length;
                const percentage = totalDemandes > 0 ? Math.round((count / totalDemandes) * 100) : 0;
                return (
                  <div key={type.id}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-300">{type.icon} {type.libelle}</span>
                      <span className="text-slate-400">{count} ({percentage}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              Indicateurs de performance
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-3xl font-bold text-emerald-400">85%</div>
                <div className="text-xs text-slate-400 mt-1">Taux de validation</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-3xl font-bold text-blue-400">3.2j</div>
                <div className="text-xs text-slate-400 mt-1">Délai moyen</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-3xl font-bold text-yellow-400">{pending + processing}</div>
                <div className="text-xs text-slate-400 mt-1">À traiter</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-3xl font-bold text-purple-400">98%</div>
                <div className="text-xs text-slate-400 mt-1">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher par code ou type d'acte..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white appearance-none focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option value="all">Tous les statuts</option>
              {statuts.map(s => (
                <option key={s.id} value={s.id}>{s.libelle}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Demande List */}
        <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Code</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Type d'acte</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Date</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Statut</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredDemandes.map((demande) => {
                  const typeActe = typesActes.find(t => t.id === demande.type_acte_id);
                  const statut = getStatutInfo(demande.statut_id);

                  return (
                    <tr key={demande.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm text-blue-300">{demande.code_suivi}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{typeActe?.icon}</span>
                          <span className="text-white text-sm">{typeActe?.libelle}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {new Date(demande.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statut.color} bg-opacity-20`}>
                          {getStatutIcon(statut.code)}
                          <span className="text-white text-xs font-medium">{statut.libelle}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => { setSelectedDemande(demande.id); setShowDetail(true); setActionComment(''); }}
                          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                          title="Voir les détails"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredDemandes.length === 0 && (
            <div className="p-12 text-center">
              <AlertCircle className="w-10 h-10 text-slate-500 mx-auto mb-3" />
              <p className="text-slate-400">Aucune demande trouvée</p>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {showDetail && currentDemande && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowDetail(false)}>
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-white/10 p-6" onClick={e => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {typesActes.find(t => t.id === currentDemande.type_acte_id)?.icon}{' '}
                    {typesActes.find(t => t.id === currentDemande.type_acte_id)?.libelle}
                  </h2>
                  <p className="text-slate-400 font-mono text-sm mt-1">{currentDemande.code_suivi}</p>
                </div>
                <button onClick={() => setShowDetail(false)} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="text-xs text-slate-400">Année académique</div>
                  <div className="text-white font-medium">{currentDemande.annee_academique}</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="text-xs text-slate-400">Date de soumission</div>
                  <div className="text-white font-medium">{new Date(currentDemande.created_at).toLocaleDateString('fr-FR')}</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="text-xs text-slate-400">Statut actuel</div>
                  <div className={`inline-flex items-center gap-2 mt-1 px-2 py-0.5 rounded-full ${getStatutInfo(currentDemande.statut_id).color} bg-opacity-20`}>
                    {getStatutIcon(getStatutInfo(currentDemande.statut_id).code)}
                    <span className="text-white text-xs">{getStatutInfo(currentDemande.statut_id).libelle}</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="text-xs text-slate-400">Pièces jointes</div>
                  <div className="text-white font-medium">{currentDemande.pieces.length} fichier(s)</div>
                </div>
              </div>

              {/* Pieces */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-white mb-3">Pièces justificatives fournies</h3>
                <div className="space-y-2">
                  {currentDemande.pieces.map((piece, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 text-sm">
                      <FileText className="w-4 h-4 text-blue-400" />
                      <span className="text-slate-300">{piece.nom}</span>
                      <span className="text-xs text-slate-500 ml-auto">{piece.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-white mb-3">Historique</h3>
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {currentDemande.timeline.map((step, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium">{step.statut}</span>
                        <span className="text-slate-400 ml-2">{step.date}</span>
                        <p className="text-slate-500 text-xs">{step.commentaire}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-sm font-bold text-white mb-3">Actions de traitement</h3>
                <div className="mb-4">
                  <label className="block text-xs text-slate-400 mb-2">Commentaire (optionnel)</label>
                  <textarea
                    value={actionComment}
                    onChange={(e) => setActionComment(e.target.value)}
                    placeholder="Ajouter un commentaire interne ou un motif..."
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none text-sm"
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  {currentDemande.statut_id !== '2' && (
                    <button
                      onClick={() => handleStatusChange('2')}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:bg-blue-500/30 transition-all text-sm font-medium"
                    >
                      <Loader2 className="w-4 h-4" />
                      Mettre en traitement
                    </button>
                  )}
                  {currentDemande.statut_id !== '3' && currentDemande.statut_id !== '4' && currentDemande.statut_id !== '5' && (
                    <button
                      onClick={() => handleStatusChange('3')}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-500/20 border border-green-500/30 text-green-300 hover:bg-green-500/30 transition-all text-sm font-medium"
                    >
                      <Check className="w-4 h-4" />
                      Valider
                    </button>
                  )}
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/30 transition-all text-sm font-medium"
                  >
                    <Upload className="w-4 h-4" />
                    Téléverser doc. signé
                  </button>
                  {currentDemande.statut_id !== '4' && (
                    <button
                      onClick={() => handleStatusChange('4')}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30 transition-all text-sm font-medium"
                    >
                      <XCircle className="w-4 h-4" />
                      Rejeter
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Signed Document Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowUploadModal(false)}>
            <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-white/10 p-6" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Upload className="w-5 h-5 text-emerald-400" />
                  Téléverser le document signé
                </h3>
                <button onClick={() => setShowUploadModal(false)} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-slate-400 text-sm mb-4">
                Sélectionnez le document PDF signé à associer à cette demande. Le statut passera automatiquement à "Prêt".
              </p>

              <div
                onClick={() => {
                  // Simulate file selection
                  const fakeFiles = ['acte_signe_' + currentDemande?.code_suivi + '.pdf', 'document_officiel.pdf', 'certificat_final.pdf'];
                  setUploadFileName(fakeFiles[Math.floor(Math.random() * fakeFiles.length)]);
                }}
                className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all"
              >
                <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <p className="text-white font-medium mb-1">Cliquez pour sélectionner le PDF signé</p>
                <p className="text-slate-400 text-sm">Format PDF uniquement</p>
              </div>

              {uploadFileName && (
                <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-200 text-sm flex-1">{uploadFileName}</span>
                  <button onClick={() => setUploadFileName('')} className="text-slate-400 hover:text-red-400">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
                >
                  Annuler
                </button>
                <button
                  onClick={handleUploadSignedDoc}
                  disabled={!uploadFileName}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
