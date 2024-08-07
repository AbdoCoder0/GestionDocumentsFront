import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import Buttons from '../atoms/Buttons';
import Labels from '../atoms/Labels';
import H1 from '../atoms/H1';

const TraineeForm = () => {
  // Utilisation du hook useForm pour gérer les formulaires
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Fonction appelée lors de la soumission du formulaire
  const onSubmit = async (data) => {
    // Préparation des données à envoyer
    const requestData = {
      ...data,
      role: 'trainee',
      idTrainee: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      modeleId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      documentStatus: 0,
      reasonRejection: "string",
      motifRejection: "string"
    };

    console.log('Données soumises:', requestData);

    try {
      // Envoi des données au serveur via une requête POST
      const response = await axios.post('https://localhost:7153/Requests/add', requestData);
      // Affichage d'un toast de succès
      toast.success('Demande envoyée avec succès!');
      console.log('Demande envoyée:', response.data);
      // Réinitialisation du formulaire
      reset();
    } catch (error) {
      // Affichage d'un toast d'erreur en cas de problème
      toast.error('Erreur lors de l\'envoi de la demande');
      console.error('Erreur lors de l\'envoi de la demande:', error);
    }
  };

  return (
    <>
      <H1 className='mt-40 mb-4' color="blue">Interface stagiaire</H1>

      <div className="max-w-md mx-auto mt-10 card p-6">
        <Toaster /> 
        <h2 className="card-title mb-4 text-center">Formulaire de Demande</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          <div className='mb-4'>
            <Labels htmlFor="typeDocument">Type de Document</Labels>

            <select
              id="documentType"
              className={`w-full px-3 py-2 border ${errors.documentType ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              {...register('documentType', { required: true })}
            >
              <option value="">Sélectionnez un type de document</option>
              <option value="Contrat">Contrat</option>
              <option value="Demande de stage">Demande de stage</option>
              <option value="Convention de stage">Convention de stage</option>
              <option value="Attestation d'inscription">Attestation d'inscription</option>
              <option value="Attestation de scolarité">Attestation de scolarité</option>
            </select>
            {errors.documentType && <span className="text-red-500 text-sm">Ce champ est requis</span>}
          </div>
          
          <Buttons type="primary">Envoyer la Demande</Buttons>
        </form>
      </div>
    </>
  );
};

export default TraineeForm;
