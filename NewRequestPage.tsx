--- src/pages/NewRequestPage.tsx (原始)
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { typesActes } from '../data/mockData';
import { ArrowLeft, ArrowRight, Upload, CheckCircle, FileText, Info } from 'lucide-react';

const NewRequestPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [anneeAcademique, setAnneeAcademique] = useState('2025-2026');
  const [motif, setMotif] = useState('');
  const [commentaires, setCommentaires] = useState('');
  const [files, setFiles] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');

  const selectedActe = typesActes.find(t => t.id === selectedType);

  const handleFileAdd = () => {
    const fakeFiles = ['carte_etudiant.pdf', 'piece_identite.jpg', 'lettre_motivation.pdf'];
    const randomFile = fakeFiles[Math.floor(Math.random() * fakeFiles.length)];
    if (!files.includes(randomFile)) {
      setFiles([...files, randomFile]);
    }
  };

  const handleSubmit = () => {
    const code = `PARAKOU-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setTrackingCode(code);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 pb-16 px-4 flex items-center justify-center">
        <div className="max-w-lg w-full text-center">
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Demande soumise avec succès !</h1>
            <p className="text-slate-400 mb-6">
              Votre demande a été enregistrée. Conservez précieusement votre code de suivi.
            </p>

            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-6">
              <p className="text-sm text-slate-400 mb-1">Votre code de suivi unique :</p>
              <p className="text-2xl font-mono font-bold text-blue-300">{trackingCode}</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all"
              >
                Voir mon tableau de bord
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
              >
                Retour à l'accueil
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Retour au tableau de bord
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Nouvelle demande</h1>
          <p className="text-slate-400 mt-1">Remplissez les étapes pour soumettre votre demande d'acte</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-10">
          {['Type d\'acte', 'Informations', 'Pièces jointes', 'Validation'].map((label, i) => (
            <div key={i} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step > i + 1 ? 'bg-emerald-500 text-white' : step === i + 1 ? 'bg-blue-500 text-white' : 'bg-white/10 text-slate-400'
              }`}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className={`hidden sm:block ml-2 text-sm ${step === i + 1 ? 'text-white font-medium' : 'text-slate-400'}`}>
                {label}
              </span>
              {i < 3 && <div className={`w-8 sm:w-16 h-0.5 mx-2 ${step > i + 1 ? 'bg-emerald-500' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          {/* Step 1: Type selection */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Choisissez le type d'acte</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {typesActes.map((acte) => (
                  <button
                    key={acte.id}
                    onClick={() => setSelectedType(acte.id)}
                    className={`p-5 rounded-xl border text-left transition-all ${
                      selectedType === acte.id
                        ? 'bg-blue-500/10 border-blue-500/50 ring-2 ring-blue-500/20'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="text-3xl mb-3">{acte.icon}</div>
                    <h3 className="text-white font-semibold mb-1">{acte.libelle}</h3>
                    <p className="text-slate-400 text-sm mb-3">{acte.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">~{acte.delai_moyen} jours</span>
                      <span className="text-blue-400 font-semibold">{acte.frais.toLocaleString()} FCFA</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Information */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Informations complémentaires</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Année académique</label>
                  <select
                    value={anneeAcademique}
                    onChange={(e) => setAnneeAcademique(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  >
                    <option value="2025-2026">2025-2026</option>
                    <option value="2024-2025">2024-2025</option>
                    <option value="2023-2024">2023-2024</option>
                    <option value="2022-2023">2022-2023</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Motif de la demande *</label>
                  <select
                    value={motif}
                    onChange={(e) => setMotif(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  >
                    <option value="">Sélectionnez un motif</option>
                    <option value="stage">Demande de stage</option>
                    <option value="inscription">Inscription universitaire</option>
                    <option value="bourse">Demande de bourse</option>
                    <option value="emploi">Candidature emploi</option>
                    <option value="personnel">Usage personnel</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Commentaires (optionnel)</label>
                  <textarea
                    value={commentaires}
                    onChange={(e) => setCommentaires(e.target.value)}
                    rows={4}
                    placeholder="Précisions supplémentaires..."
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                  />
                </div>
                {selectedActe && (
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-slate-300">
                      <p className="font-medium text-blue-300 mb-1">{selectedActe.libelle}</p>
                      <p>Frais administratifs : <strong>{selectedActe.frais.toLocaleString()} FCFA</strong></p>
                      <p>Délai estimé : <strong>~{selectedActe.delai_moyen} jours ouvrables</strong></p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Files */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Pièces justificatives</h2>
              <p className="text-slate-400 text-sm mb-6">Téléversez les documents requis (PDF, JPG, PNG — max 5 Mo par fichier)</p>

              <div
                onClick={handleFileAdd}
                className="border-2 border-dashed border-white/20 rounded-xl p-10 text-center cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
              >
                <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <p className="text-white font-medium mb-1">Cliquez pour ajouter un fichier</p>
                <p className="text-slate-400 text-sm">ou glissez-déposez vos fichiers ici</p>
              </div>

              {files.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h3 className="text-sm font-medium text-slate-300">Fichiers ajoutés ({files.length})</h3>
                  {files.map((file, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                      <FileText className="w-5 h-5 text-blue-400" />
                      <span className="text-white text-sm flex-1">{file}</span>
                      <button
                        onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
                        className="text-slate-400 hover:text-red-400 transition-colors text-sm"
                      >
                        Supprimer
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 4: Validation */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Récapitulatif et validation</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sm text-slate-400 mb-1">Type d'acte</div>
                  <div className="text-white font-medium flex items-center gap-2">
                    <span className="text-2xl">{selectedActe?.icon}</span>
                    {selectedActe?.libelle}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-sm text-slate-400 mb-1">Année académique</div>
                    <div className="text-white font-medium">{anneeAcademique}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-sm text-slate-400 mb-1">Motif</div>
                    <div className="text-white font-medium capitalize">{motif || 'Non spécifié'}</div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sm text-slate-400 mb-1">Pièces jointes</div>
                  <div className="text-white font-medium">{files.length} fichier(s)</div>
                </div>
                {commentaires && (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-sm text-slate-400 mb-1">Commentaires</div>
                    <div className="text-white">{commentaires}</div>
                  </div>
                )}
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Frais administratifs</span>
                    <span className="text-xl font-bold text-blue-300">{selectedActe?.frais.toLocaleString()} FCFA</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Précédent
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && !selectedType}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Suivant
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/25"
              >
                <CheckCircle className="w-5 h-5" />
                Soumettre la demande
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRequestPage;


+++ src/pages/NewRequestPage.tsx (修改后)
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { typesActes } from '../data/mockData';
import { useDemandes, useAuth } from '../context/AuthContext';
import { ArrowLeft, ArrowRight, Upload, CheckCircle, FileText, Info, AlertTriangle, X, File, XCircle } from 'lucide-react';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

const NewRequestPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addDemande } = useDemandes();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [anneeAcademique, setAnneeAcademique] = useState('2025-2026');
  const [motif, setMotif] = useState('');
  const [commentaires, setCommentaires] = useState('');
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [fileError, setFileError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');

  const selectedActe = typesActes.find(t => t.id === selectedType);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    setFileError('');
    const newFiles: UploadedFile[] = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      // Vérifier que c'est un PDF
      if (file.type !== 'application/pdf') {
        setFileError(`❌ "${file.name}" n'est pas un fichier PDF. Seuls les fichiers PDF sont acceptés.`);
        continue;
      }

      // Vérifier la taille (max 5 Mo)
      if (file.size > 5 * 1024 * 1024) {
        setFileError(`❌ "${file.name}" dépasse la taille maximale de 5 Mo.`);
        continue;
      }

      // Vérifier les doublons
      if (files.some(f => f.name === file.name)) {
        setFileError(`❌ "${file.name}" est déjà dans la liste.`);
        continue;
      }

      newFiles.push({
        name: file.name,
        size: file.size,
        type: file.type
      });
    }

    if (newFiles.length > 0) {
      setFiles([...files, ...newFiles]);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' Ko';
    return (bytes / (1024 * 1024)).toFixed(1) + ' Mo';
  };

  const canGoNext = () => {
    switch (step) {
      case 1: return !!selectedType;
      case 2: return !!motif;
      case 3: return files.length > 0;
      default: return true;
    }
  };

  const handleSubmit = () => {
    if (!user) return;

    const code = `PARAKOU-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const now = new Date().toISOString();

    const newDemande = {
      id: Date.now().toString(),
      code_suivi: code,
      etudiant_id: user.id,
      type_acte_id: selectedType,
      statut_id: '1',
      annee_academique: anneeAcademique,
      commentaires: commentaires || `Motif: ${motif}`,
      created_at: now,
      updated_at: now,
      pieces: files.map(f => ({
        nom: f.name,
        type: 'JUSTIFICATIF',
        date: new Date().toISOString().split('T')[0]
      })),
      timeline: [{
        statut: 'Soumise',
        date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        commentaire: 'Demande reçue avec succès. En attente de traitement.'
      }]
    };

    addDemande(newDemande);
    setTrackingCode(code);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 pb-16 px-4 flex items-center justify-center">
        <div className="max-w-lg w-full text-center">
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Demande soumise avec succès !</h1>
            <p className="text-slate-400 mb-6">
              Votre demande a été enregistrée. Conservez précieusement votre code de suivi.
            </p>

            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-6">
              <p className="text-sm text-slate-400 mb-1">Votre code de suivi unique :</p>
              <p className="text-2xl font-mono font-bold text-blue-300">{trackingCode}</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6 text-left">
              <p className="text-sm text-slate-400 mb-2">Documents fournis :</p>
              {files.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-300 py-1">
                  <File className="w-4 h-4 text-blue-400" />
                  <span className="flex-1 truncate">{f.name}</span>
                  <span className="text-slate-500 text-xs">{formatFileSize(f.size)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all"
              >
                Voir mon tableau de bord
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
              >
                Retour à l'accueil
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Retour au tableau de bord
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Nouvelle demande</h1>
          <p className="text-slate-400 mt-1">Remplissez les étapes pour soumettre votre demande d'acte</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-10">
          {['Type d\'acte', 'Informations', 'Pièces PDF', 'Validation'].map((label, i) => (
            <div key={i} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step > i + 1 ? 'bg-emerald-500 text-white' : step === i + 1 ? 'bg-blue-500 text-white' : 'bg-white/10 text-slate-400'
              }`}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className={`hidden sm:block ml-2 text-sm ${step === i + 1 ? 'text-white font-medium' : 'text-slate-400'}`}>
                {label}
              </span>
              {i < 3 && <div className={`w-8 sm:w-16 h-0.5 mx-2 ${step > i + 1 ? 'bg-emerald-500' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          {/* Step 1: Type selection */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Choisissez le type d'acte</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {typesActes.map((acte) => (
                  <button
                    key={acte.id}
                    onClick={() => setSelectedType(acte.id)}
                    className={`p-5 rounded-xl border text-left transition-all ${
                      selectedType === acte.id
                        ? 'bg-blue-500/10 border-blue-500/50 ring-2 ring-blue-500/20'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="text-3xl mb-3">{acte.icon}</div>
                    <h3 className="text-white font-semibold mb-1">{acte.libelle}</h3>
                    <p className="text-slate-400 text-sm mb-3">{acte.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">~{acte.delai_moyen} jours</span>
                      <span className="text-blue-400 font-semibold">{acte.frais.toLocaleString()} FCFA</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Information */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Informations complémentaires</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Année académique</label>
                  <select
                    value={anneeAcademique}
                    onChange={(e) => setAnneeAcademique(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  >
                    <option value="2025-2026">2025-2026</option>
                    <option value="2024-2025">2024-2025</option>
                    <option value="2023-2024">2023-2024</option>
                    <option value="2022-2023">2022-2023</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Motif de la demande *</label>
                  <select
                    value={motif}
                    onChange={(e) => setMotif(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  >
                    <option value="">Sélectionnez un motif</option>
                    <option value="stage">Demande de stage</option>
                    <option value="inscription">Inscription universitaire</option>
                    <option value="bourse">Demande de bourse</option>
                    <option value="emploi">Candidature emploi</option>
                    <option value="personnel">Usage personnel</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Commentaires (optionnel)</label>
                  <textarea
                    value={commentaires}
                    onChange={(e) => setCommentaires(e.target.value)}
                    rows={4}
                    placeholder="Précisions supplémentaires..."
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                  />
                </div>
                {selectedActe && (
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-slate-300">
                      <p className="font-medium text-blue-300 mb-1">{selectedActe.libelle}</p>
                      <p>Frais administratifs : <strong>{selectedActe.frais.toLocaleString()} FCFA</strong></p>
                      <p>Délai estimé : <strong>~{selectedActe.delai_moyen} jours ouvrables</strong></p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Files - PDF ONLY */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Pièces justificatives (PDF obligatoire)</h2>
              <p className="text-slate-400 text-sm mb-4">
                Vous devez obligatoirement fournir au moins un fichier au format <strong className="text-blue-300">PDF</strong> (max 5 Mo par fichier).
              </p>

              {/* Warning */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 mb-6">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-200">
                  <p className="font-medium mb-1">Important</p>
                  <p className="text-amber-300/80">
                    Seuls les fichiers <strong>PDF</strong> sont acceptés. Les formats JPG, PNG ou autres seront refusés.
                    Assurez-vous que vos documents sont scannés ou exportés en PDF.
                  </p>
                </div>
              </div>

              {/* File upload zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/20 rounded-xl p-10 text-center cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
              >
                <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <p className="text-white font-medium mb-1">Cliquez pour sélectionner un fichier PDF</p>
                <p className="text-slate-400 text-sm">Format PDF uniquement — Max 5 Mo par fichier</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* File error */}
              {fileError && (
                <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-300 text-sm">{fileError}</p>
                  <button onClick={() => setFileError('')} className="ml-auto text-red-400 hover:text-red-300">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* File list */}
              {files.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h3 className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-400" />
                    Fichiers PDF ajoutés ({files.length})
                  </h3>
                  {files.map((file, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-red-400">PDF</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{file.name}</p>
                        <p className="text-slate-400 text-xs">{formatFileSize(file.size)}</p>
                      </div>
                      <button
                        onClick={() => removeFile(i)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                        title="Supprimer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* No files warning */}
              {files.length === 0 && (
                <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <p className="text-yellow-300 text-sm">
                    Vous devez ajouter au moins un fichier PDF pour continuer.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Validation */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Récapitulatif et validation</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sm text-slate-400 mb-1">Type d'acte</div>
                  <div className="text-white font-medium flex items-center gap-2">
                    <span className="text-2xl">{selectedActe?.icon}</span>
                    {selectedActe?.libelle}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-sm text-slate-400 mb-1">Année académique</div>
                    <div className="text-white font-medium">{anneeAcademique}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-sm text-slate-400 mb-1">Motif</div>
                    <div className="text-white font-medium capitalize">{motif || 'Non spécifié'}</div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sm text-slate-400 mb-2">Pièces jointes PDF ({files.length})</div>
                  <div className="space-y-2">
                    {files.map((file, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <File className="w-4 h-4 text-blue-400" />
                        <span className="text-slate-300 flex-1 truncate">{file.name}</span>
                        <span className="text-slate-500 text-xs">{formatFileSize(file.size)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {commentaires && (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-sm text-slate-400 mb-1">Commentaires</div>
                    <div className="text-white">{commentaires}</div>
                  </div>
                )}
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Frais administratifs</span>
                    <span className="text-xl font-bold text-blue-300">{selectedActe?.frais.toLocaleString()} FCFA</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Précédent
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canGoNext()}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Suivant
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/25"
              >
                <CheckCircle className="w-5 h-5" />
                Soumettre la demande
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRequestPage;
