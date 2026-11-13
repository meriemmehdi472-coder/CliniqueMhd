import { PageHeading } from './HomeSection';
import { Field, PrimaryButton, SecondaryButton } from './AppointmentSection';

interface MedicalRecordSectionProps {
  bloodGroup: string;
  setBloodGroup: (value: string) => void;
  allergies: string;
  setAllergies: (value: string) => void;
  emergencyContact: string;
  setEmergencyContact: (value: string) => void;
  editing: boolean;
  setEditing: (value: boolean) => void;
  onSave: () => void;
  onBack: () => void;
}

export function MedicalRecordSection(props: MedicalRecordSectionProps) {
  function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); props.onSave(); }
  return <>
    <PageHeading title="📁 Mon dossier médical" description="Consultez et mettez à jour vos informations de santé" />
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-6 text-lg font-bold text-slate-900">Synthèse médicale</h2>
      {props.editing ? <form onSubmit={submit} className="grid max-w-2xl gap-5">
        <Field label="Groupe sanguin"><input value={props.bloodGroup} onChange={event => props.setBloodGroup(event.target.value)} /></Field>
        <Field label="Allergies connues"><input value={props.allergies} onChange={event => props.setAllergies(event.target.value)} /></Field>
        <Field label="Contact d’urgence"><input value={props.emergencyContact} onChange={event => props.setEmergencyContact(event.target.value)} /></Field>
        <div className="flex flex-wrap gap-3"><PrimaryButton>Enregistrer les modifications</PrimaryButton><SecondaryButton onClick={() => props.setEditing(false)}>Annuler</SecondaryButton></div>
      </form> : <>
        <dl className="mb-6 grid gap-3">
          <RecordItem label="Médecin référent" value="Dr. Jean Martin" />
          <RecordItem label="Groupe sanguin" value={props.bloodGroup} />
          <RecordItem label="Allergies connues" value={props.allergies} />
          <RecordItem label="Contact d’urgence" value={props.emergencyContact} />
        </dl>
        <div className="flex flex-wrap gap-3"><PrimaryButton type="button" onClick={() => props.setEditing(true)}>Modifier mes informations</PrimaryButton><SecondaryButton onClick={props.onBack}>← Retour à l’accueil</SecondaryButton></div>
      </>}
    </section>
  </>;
}

function RecordItem({ label, value }: { label: string; value: string }) {
  return <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm"><dt className="font-semibold text-slate-800">{label}</dt><dd className="mt-1 text-slate-600">{value}</dd></div>;
}
