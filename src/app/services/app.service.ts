import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://1d6d-129-0-189-50.ngrok-free.app'; // À adapter selon ton backend


  /**
   * Données de l'utilisateur
   */
  user: any = null;

  // Ajoute le token dans l'en-tête si nécessaire
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Vérifie si l'utilisateur est connecté
   * @returns 
   */
  isUserConnected(): boolean {
    const token = localStorage.getItem('access_token');
    return token !== null && token !== undefined;
  }

  /**
   * Récupère les données de l'utilisateur à partir du token
   * @returns 
   */
  getUserData() {
    const token = localStorage.getItem('access_token');
    if (token) {
      // const payload = token.split('.')[1];
      // const decodedPayload = atob(payload);
      // return JSON.parse(decodedPayload);
    }
    return null;
  }

  /**
   * Set user data
   * @param user 
   */
  setUserData(user: any) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }
  // ------------------ API Routes ------------------

  // 1. Enregistrement employeur
  registerEmployer(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/employer`, data);
  }

  // 2. Enregistrement chercheur d'emploi
  registerJobSeeker(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/job_seeker`, data);
  }

  // 3. Connexion
  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  // 4. Création d'une offre d'emploi (employeur)
  createJobOffer(data: { title: string; description: string; criteria: any }): Observable<any> {
    return this.http.post(`${this.apiUrl}/job_offers`, data, {
      headers: this.getAuthHeaders()
    });
  }

  // 5. Postuler à une offre d'emploi (chercheur)
  applyToJob(job_offer_id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/apply`, { job_offer_id }, {
      headers: this.getAuthHeaders()
    });
  }

  // 6. Analyse des candidatures
  analyzeCandidatures(job_offer_id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/analyze/${job_offer_id}`, {}, {
      headers: this.getAuthHeaders()
    });
  }

  /**
   * https://1d6d-129-0-189-50.ngrok-free.app/
   * 


Voici la liste des routes pour interagir avec votre API frontend :

1. Enregistrement d'un employeur : --------------------------------------
   - Route : /register/employer 
   - Méthode : POST
   - Description : Permet à un employeur de s'enregistrer.
   - Données requises : username, password

2. Enregistrement d'un chercheur d'emploi : --------------------------------------
   - Route : /register/job_seeker
   - Méthode : POST
   - Description : Permet à un chercheur d'emploi de s'enregistrer.
   - Données requises : username, password

3. Connexion : --------------------------------------
   - Route : /login
   - Méthode : POST
   - Description : Permet à un utilisateur (employeur ou chercheur d'emploi) de se connecter et d'obtenir un jeton d'accès.
   - Données requises : username, password

4. Création d'une offre d'emploi :
   - Route : /job_offers
   - Méthode : POST
   - Description : Permet à un employeur de créer une nouvelle offre d'emploi.
   - Données requises : title, description, criteria
   - Authentification : Requiert un jeton d'accès valide.

5. Candidature à une offre d'emploi :
   - Route : /apply
   - Méthode : POST
   - Description : Permet à un chercheur d'emploi de postuler à une offre d'emploi.
   - Données requises : job_offer_id
   - Authentification : Requiert un jeton d'accès valide.

6. Analyse des candidatures :
   - Route : /analyze/<int:job_offer_id>
   - Méthode : POST
   - Description : Permet à un employeur d'analyser les candidatures pour une offre d'emploi spécifique.
   - Authentification : Requiert un jeton d'accès valide.
   - Remarque : Cette route nécessite l'implémentation des fonctions get_cv_content, extract_cv_scores, run_ga, et run_ahp pour fonctionner correctement.
   */
}
