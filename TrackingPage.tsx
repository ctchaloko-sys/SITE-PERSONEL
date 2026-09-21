--- src/pages/TrackingPage.tsx (原始)
import { useState } from 'react';
import { Search, CheckCircle, Clock, XCircle, Loader2, FileCheck } from 'lucide-react';
import { allDemandes, typesActes, statuts } from '../data/mockData';

const TrackingPage = () => {
  const [code, setCode] = useState('');
  const [result, setResult] = useState<typeof allDemandes[0] | null>(null);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = () => {
    setSearched(true);
    setError('');
    const found = allDemandes.find(d => d.code_suivi.toLowerCase() === code.toLowerCase().trim());
    if (found) {
      setResult(found);
    } else {
      setResult(null);
      setError('Aucun dossier trouvé avec ce code de suivi. Vérifiez votre saisie.');
    }
  };

  const getStatutInfo = (statutId: string) => {
    return statuts.find(s => s.id === statutId) || statuts[0];
  };

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
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Suivi de votre demande
          </h1>
          <p className="text-slate-400 text-lg">
            Entrez votre code de suivi unique pour consulter l'état d'avancement de votre dossier
          </p>
        </div>

        {/* Search Box */}
        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Ex: PARAKOU-2026-A1B2"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all text-lg"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/25 whitespace-nowrap"
            >
              Rechercher
            </button>
          </div>
          <p className="text-slate-500 text-sm mt-3">
            💡 Essayez : <button onClick={() => setCode('PARAKOU-2026-A1B2')} className="text-blue-400 hover:underline">PARAKOU-2026-A1B2</button> ou <button onClick={() => setCode('PARAKOU-2026-C3D4')} className="text-blue-400 hover:underline">PARAKOU-2026-C3D4</button>
          </p>
        </div>

        {/* Error */}
        {error && searched && !result && (
          <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-center">
            <XCircle className="w-8 h-8 mx-auto mb-2" />
            <p>{error}</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-6 animate-in fade-in">
            {/* Status Card */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-sm text-slate-400 mb-1">Code de suivi</div>
                  <div className="text-xl font-mono font-bold text-white">{result.code_suivi}</div>
                </div>
                <div className={`px-4 py-2 rounded-full ${getStatutInfo(result.statut_id).color} bg-opacity-20 flex items-center gap-2`}>
                  {getStatutIcon(getStatutInfo(result.statut_id).code)}
                  <span className="text-white font-medium text-sm">{getStatutInfo(result.statut_id).libelle}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Type d'acte :</span>
                  <span className="text-white ml-2 font-medium">
                    {typesActes.find(t => t.id === result.type_acte_id)?.libelle}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Année académique :</span>
                  <span className="text-white ml-2 font-medium">{result.annee_academique}</span>
                </div>
                <div>
                  <span className="text-slate-400">Date de soumission :</span>
                  <span className="text-white ml-2 font-medium">{new Date(result.created_at).toLocaleDateString('fr-FR')}</span>
                </div>
                <div>
                  <span className="text-slate-400">Dernière mise à jour :</span>
                  <span className="text-white ml-2 font-medium">{new Date(result.updated_at).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white mb-6">Progression du dossier</h3>
              <div className="space-y-0">
                {result.timeline.map((step, i) => (
                  <div key={i} className="relative flex gap-4 pb-8 last:pb-0">
                    {/* Line */}
                    {i < result.timeline.length - 1 && (
                      <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-blue-500/20" />
                    )}
                    {/* Dot */}
                    <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      i === result.timeline.length - 1 ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-slate-700'
                    }`}>
                      <div className="w-3 h-3 rounded-full bg-white" />
                    </div>
                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <div className="font-semibold text-white">{step.statut}</div>
                      <div className="text-sm text-slate-400">{step.commentaire}</div>
                      <div className="text-xs text-slate-500 mt-1">{step.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ready message */}
            {result.statut_id === '5' && (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <FileCheck className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-emerald-300 mb-2">Votre document est prêt !</h3>
                <p className="text-slate-400 text-sm mb-4">Connectez-vous à votre espace pour télécharger le document signé.</p>
                <a href="/login" className="inline-flex px-6 py-3 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors">
                  Télécharger le document
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingPage;


+++ src/pages/TrackingPage.tsx (修改后)
import { useState } from 'react';
import { Search, CheckCircle, Clock, XCircle, Loader2, FileCheck } from 'lucide-react';
import { useDemandes } from '../context/AuthContext';
import { typesActes, statuts } from '../data/mockData';

const TrackingPage = () => {
  const { demandes } = useDemandes();
  const [code, setCode] = useState('');
  const [result, setResult] = useState<typeof demandes[0] | null>(null);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = () => {
    setSearched(true);
    setError('');
    const found = demandes.find(d => d.code_suivi.toLowerCase() === code.toLowerCase().trim());
    if (found) {
      setResult(found);
    } else {
      setResult(null);
      setError('Aucun dossier trouvé avec ce code de suivi. Vérifiez votre saisie.');
    }
  };

  const getStatutInfo = (statutId: string) => {
    return statuts.find(s => s.id === statutId) || statuts[0];
  };

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
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Suivi de votre demande
          </h1>
          <p className="text-slate-400 text-lg">
            Entrez votre code de suivi unique pour consulter l'état d'avancement de votre dossier
          </p>
        </div>

        {/* Search Box */}
        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Ex: PARAKOU-2026-A1B2"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all text-lg"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/25 whitespace-nowrap"
            >
              Rechercher
            </button>
          </div>
          <p className="text-slate-500 text-sm mt-3">
            💡 Essayez : <button onClick={() => setCode('PARAKOU-2026-A1B2')} className="text-blue-400 hover:underline">PARAKOU-2026-A1B2</button> ou <button onClick={() => setCode('PARAKOU-2026-C3D4')} className="text-blue-400 hover:underline">PARAKOU-2026-C3D4</button>
          </p>
        </div>

        {/* Error */}
        {error && searched && !result && (
          <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-center">
            <XCircle className="w-8 h-8 mx-auto mb-2" />
            <p>{error}</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-6 animate-in fade-in">
            {/* Status Card */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-sm text-slate-400 mb-1">Code de suivi</div>
                  <div className="text-xl font-mono font-bold text-white">{result.code_suivi}</div>
                </div>
                <div className={`px-4 py-2 rounded-full ${getStatutInfo(result.statut_id).color} bg-opacity-20 flex items-center gap-2`}>
                  {getStatutIcon(getStatutInfo(result.statut_id).code)}
                  <span className="text-white font-medium text-sm">{getStatutInfo(result.statut_id).libelle}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Type d'acte :</span>
                  <span className="text-white ml-2 font-medium">
                    {typesActes.find(t => t.id === result.type_acte_id)?.libelle}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Année académique :</span>
                  <span className="text-white ml-2 font-medium">{result.annee_academique}</span>
                </div>
                <div>
                  <span className="text-slate-400">Date de soumission :</span>
                  <span className="text-white ml-2 font-medium">{new Date(result.created_at).toLocaleDateString('fr-FR')}</span>
                </div>
                <div>
                  <span className="text-slate-400">Dernière mise à jour :</span>
                  <span className="text-white ml-2 font-medium">{new Date(result.updated_at).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white mb-6">Progression du dossier</h3>
              <div className="space-y-0">
                {result.timeline.map((step, i) => (
                  <div key={i} className="relative flex gap-4 pb-8 last:pb-0">
                    {/* Line */}
                    {i < result.timeline.length - 1 && (
                      <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-blue-500/20" />
                    )}
                    {/* Dot */}
                    <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      i === result.timeline.length - 1 ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-slate-700'
                    }`}>
                      <div className="w-3 h-3 rounded-full bg-white" />
                    </div>
                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <div className="font-semibold text-white">{step.statut}</div>
                      <div className="text-sm text-slate-400">{step.commentaire}</div>
                      <div className="text-xs text-slate-500 mt-1">{step.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ready message */}
            {result.statut_id === '5' && (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <FileCheck className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-emerald-300 mb-2">Votre document est prêt !</h3>
                <p className="text-slate-400 text-sm mb-4">Connectez-vous à votre espace pour télécharger le document signé.</p>
                <a href="/login" className="inline-flex px-6 py-3 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors">
                  Télécharger le document
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingPage;
