const fs = require('fs');
const nodemailer = require('nodemailer');
require('dotenv').config();


// Informations de connexion au serveur SMTP
const smtpConfig = {
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_PASSWORD
    }
};

// Chemin du dossier contenant les fiches de paie
const dossierPaies = './paies';

// Fonction pour envoyer un e-mail avec le fichier de paie
async function envoyerFichePaie(destinataire, cheminFichier, month, year, firstName, lastName) {
    const transporter = nodemailer.createTransport(smtpConfig);

    const message = {
        from: process.env.GMAIL_ADDRESS,
        to: destinataire,
        subject: 'Fiche de paie - ' + month + ' ' + year,
        text: 'Bonjour ' + firstName + ' ' + lastName
            + ',\n\nVeuillez trouver ci-joint votre fiche de paie du mois de '
            + month + ' '
            + year
            + '.\n\nCordialement,\n\nL\'équipe RH',
        attachments: [{
            filename: cheminFichier.split('/').pop(),
            path: cheminFichier
        }]
    };

    try {
        await transporter.sendMail(message);
        console.log(`Fiche de paie envoyée à ${destinataire}`);
    } catch (error) {
        console.error(`Erreur lors de l'envoi de la fiche de paie à ${destinataire}:`, error);
    }
}

// Fonction principale pour parcourir les fichiers de paie et les envoyer par e-mail
async function envoyerPaies() {
    try {
        const fichiers = await fs.promises.readdir(dossierPaies);
        const employees = JSON.parse(fs.readFileSync('employees.json', 'utf8'));

        for (const fichier of fichiers) {
            if (fichier.includes('Paies') && fichier.endsWith('.pdf')) {
                const cheminFichier = `${dossierPaies}/${fichier}`;
                const parts = fichier.split('-');
                const month = parts[1];
                const year = parts[2];
                const lastName = parts.slice(3, -1).join('-');
                const firstName = parts[parts.length - 1].split('.')[0];

                for (const employee of employees) {
                    const destinataire = employee.email;
                    await envoyerFichePaie(destinataire, cheminFichier, month, year, firstName, lastName);
                }
            }
        }
    } catch (error) {
        console.error('Erreur lors de la lecture du dossier des fiches de paie:', error);
    }
}

// Appel de la fonction pour envoyer les fiches de paie
envoyerPaies().then(r => console.log('Envoi des fiches de paie terminé'));
