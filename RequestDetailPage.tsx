--- src/pages/RequestDetailPage.tsx (原始)
import { useParams, Link, useNavigate } from 'react-router-dom';
import { demandesDemo, typesActes, statuts } from '../data/mockData';
import { ArrowLeft, Download, Clock, CheckCircle, XCircle, Loader2, FileCheck, FileText, Calendar, MessageSquare } from 'lucide-react';

const RequestDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const demande = demandesDemo.find(d => d.id === id);

  if (!demande) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Demande non trouvée</h2>
          <Link to="/dashboard" className="text-blue-400 hover:underline">Retour au tableau de bord</Link>
        </div>
      </div>
    );
  }

  const typeActe = typesActes.find(t => t.id === demande.type_acte_id);
  const statut = statuts.find(s => s.id === demande.statut_id) || statuts[0];

  const getStatutIcon = (code: string) => {
    switch (code) {
      case 'PENDING': return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'PROCESSING': return <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />;
      case 'VALIDATED': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'REJECTED': return <XCircle className="w-5 h-5 text-red-400" />;
      case 'READY': return <FileCheck className="w-5 h-5 text-emerald-400" />;
      default: return <Clock className="w-5 h-5 text-yellow-400" />;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Retour au tableau de bord
        </button>

        {/* Header Card */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{typeActe?.icon}</div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white">{typeActe?.libelle}</h1>
                <p className="text-slate-400 font-mono text-sm mt-1">{demande.code_suivi}</p>
                <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-slate-400">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(demande.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span>•</span>
                  <span>Année: {demande.annee_academique}</span>
                </div>
              </div>
            </div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statut.color} bg-opacity-20 self-start`}>
              {getStatutIcon(statut.code)}
              <span className="text-white font-medium">{statut.libelle}</span>
            </div>
          </div>

          {demande.commentaires && (
            <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10 flex items-start gap-2">
              <MessageSquare className="w-4 h-4 text-slate-400 mt-0.5" />
              <p className="text-slate-300 text-sm">{demande.commentaires}</p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Timeline */}
          <div className="md:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              Historique du traitement
            </h2>
            <div className="space-y-0">
              {demande.timeline.map((step, i) => (
                <div key={i} className="relative flex gap-4 pb-8 last:pb-0">
                  {i < demande.timeline.length - 1 && (
                    <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-blue-500/20" />
                  )}
                  <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    i === demande.timeline.length - 1 ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-slate-700'
                  }`}>
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="font-semibold text-white">{step.statut}</div>
                    <div className="text-sm text-slate-400">{step.commentaire}</div>
                    <div className="text-xs text-slate-500 mt-1">{step.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Documents */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                Pièces jointes
              </h3>
              <div className="space-y-2">
                {demande.pieces.map((piece, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 text-sm">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300 flex-1 truncate">{piece.nom}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Download */}
            {demande.statut_id === '5' && (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <h3 className="text-sm font-bold text-emerald-300 mb-3">Document disponible</h3>
                <p className="text-slate-400 text-sm mb-4">Votre document signé est prêt au téléchargement.</p>
                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors">
                  <Download className="w-4 h-4" />
                  Télécharger le PDF
                </button>
                <p className="text-xs text-slate-500 mt-2 text-center">
                  📱 QR code de vérification inclus
                </p>
              </div>
            )}

            {/* Info */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-sm font-bold text-white mb-3">Informations</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Délai estimé</span>
                  <span className="text-white">~{typeActe?.delai_moyen} jours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Frais</span>
                  <span className="text-white">{typeActe?.frais.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Dernière MAJ</span>
                  <span className="text-white">{new Date(demande.updated_at).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailPage;


+++ src/pages/RequestDetailPage.tsx (修改后)
import { useParams, Link, useNavigate } from 'react-router-dom';
import { typesActes, statuts } from '../data/mockData';
import { useDemandes } from '../context/AuthContext';
import { ArrowLeft, Download, Clock, CheckCircle, XCircle, Loader2, FileCheck, FileText, Calendar, MessageSquare } from 'lucide-react';

const RequestDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getDemandeById } = useDemandes();
  const demande = id ? getDemandeById(id) : undefined;

  if (!demande) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Demande non trouvée</h2>
          <Link to="/dashboard" className="text-blue-400 hover:underline">Retour au tableau de bord</Link>
        </div>
      </div>
    );
  }

  const typeActe = typesActes.find(t => t.id === demande.type_acte_id);
  const statut = statuts.find(s => s.id === demande.statut_id) || statuts[0];

  const getStatutIcon = (code: string) => {
    switch (code) {
      case 'PENDING': return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'PROCESSING': return <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />;
      case 'VALIDATED': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'REJECTED': return <XCircle className="w-5 h-5 text-red-400" />;
      case 'READY': return <FileCheck className="w-5 h-5 text-emerald-400" />;
      default: return <Clock className="w-5 h-5 text-yellow-400" />;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Retour au tableau de bord
        </button>

        {/* Header Card */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{typeActe?.icon}</div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white">{typeActe?.libelle}</h1>
                <p className="text-slate-400 font-mono text-sm mt-1">{demande.code_suivi}</p>
                <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-slate-400">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(demande.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span>•</span>
                  <span>Année: {demande.annee_academique}</span>
                </div>
              </div>
            </div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statut.color} bg-opacity-20 self-start`}>
              {getStatutIcon(statut.code)}
              <span className="text-white font-medium">{statut.libelle}</span>
            </div>
          </div>

          {demande.commentaires && (
            <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10 flex items-start gap-2">
              <MessageSquare className="w-4 h-4 text-slate-400 mt-0.5" />
              <p className="text-slate-300 text-sm">{demande.commentaires}</p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Timeline */}
          <div className="md:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              Historique du traitement
            </h2>
            <div className="space-y-0">
              {demande.timeline.map((step, i) => (
                <div key={i} className="relative flex gap-4 pb-8 last:pb-0">
                  {i < demande.timeline.length - 1 && (
                    <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-blue-500/20" />
                  )}
                  <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    i === demande.timeline.length - 1 ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-slate-700'
                  }`}>
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="font-semibold text-white">{step.statut}</div>
                    <div className="text-sm text-slate-400">{step.commentaire}</div>
                    <div className="text-xs text-slate-500 mt-1">{step.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Documents */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                Pièces jointes fournies
              </h3>
              <div className="space-y-2">
                {demande.pieces.map((piece, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 text-sm">
                    <div className="w-8 h-8 rounded bg-red-500/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-red-400">PDF</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-slate-300 truncate block">{piece.nom}</span>
                      <span className="text-slate-500 text-xs">{piece.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Download */}
            {demande.statut_id === '5' && (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <h3 className="text-sm font-bold text-emerald-300 mb-3">Document disponible</h3>
                <p className="text-slate-400 text-sm mb-4">Votre document signé est prêt au téléchargement.</p>
                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors">
                  <Download className="w-4 h-4" />
                  Télécharger le PDF
                </button>
                <p className="text-xs text-slate-500 mt-2 text-center">
                  📱 QR code de vérification inclus
                </p>
              </div>
            )}

            {/* Info */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-sm font-bold text-white mb-3">Informations</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Délai estimé</span>
                  <span className="text-white">~{typeActe?.delai_moyen} jours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Frais</span>
                  <span className="text-white">{typeActe?.frais.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Dernière MAJ</span>
                  <span className="text-white">{new Date(demande.updated_at).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailPage;
