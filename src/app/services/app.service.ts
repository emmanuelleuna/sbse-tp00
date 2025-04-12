import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient,
    private _localstorageService: LocalStorageService) { }

  private apiUrl = 'http://192.168.1.101:5000'; // À adapter selon ton backend


  /**
   * Données de l'utilisateur
   */
  user: any = null;


  logout() {
    this.user = null;
    this._localstorageService.clear()
    console.log('access_token: ', this._localstorageService.getItem('access_token'));

    // localStorage.clear()
  }

  // Ajoute le token dans l'en-tête si nécessaire
  private getAuthHeaders(): HttpHeaders {
    const token = this._localstorageService.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Vérifie si l'utilisateur est connecté
   * @returns 
   */
  isUserConnected(): boolean {
    const token = this._localstorageService.getItem('access_token');
    return token != null || token != undefined;
  }

  /**
   * Récupère les données de l'utilisateur à partir du token
   * @returns 
   */
  getUserData() {
    const token = this._localstorageService.getItem('access_token');
    if (token) {
      let user_data: any;
      // const payload = token.split('.')[1];
      // const decodedPayload = atob(payload);
      // return JSON.parse(decodedPayload);

      return user_data;
    }
    return null;
  }

  /**
   * Set user data
   * @param user 
   */
  setUserData(user: any) {
    this.user = user;
    this._localstorageService.setItem('user', JSON.stringify(user));
  }

  // ------------------ API Routes ------------------

  // 1. Enregistrement employeur
  /**
   * Enregistrement d'un employeur
   * @param data 
   * @returns 
   */
  registerEmployer(data: { username: string; password: string; firstName: string; lastName: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/employer`, data);
  }

  // 2. Enregistrement chercheur d'emploi
  /**
   * Enregistrement d'un chercheur d'emploi
   * @param data 
   * @returns 
   */
  registerJobSeeker(data: { username: string; password: string; firstName: string; lastName: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/job_seeker`, data);
  }

  // 3. Connexion
  /**
   * Connexion d'un utilisateur
   * @param data 
   * @returns 
   */
  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  getUserDataFromServer(user_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${user_id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // 4. Création d'une offre d'emploi (employeur)
  /**
   * Création d'une offre d'emploi
   * @param data 
   * @returns 
   */
  createJobOffer(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/job_offers`, data, {
      headers: this.getAuthHeaders()
    });
  }

  /**
   * 
   * @param job_id Get job offer
   * @returns 
   */
  getJobOffer(job_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/job_offers/${job_id}`, {
      headers: this.getAuthHeaders()
    });
  }


  // 5. Postuler à une offre d'emploi (chercheur)
  /**
   * Postuler à une offre d'emploi
   * @param job_offer_id 
   * @returns 
   */
  applyToJob(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/apply`, data, {
      headers: this.getAuthHeaders()
    });
  }

  // 6. Analyse des candidatures
  /**
   * Analyse des candidatures
   * @param job_offer_id 
   * @returns 
   */
  analyzeCandidatures(job_offer_id: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/analyze/${job_offer_id}`, {}, {
      headers: this.getAuthHeaders()
    });
  }

  /**
   * Get job list
   * @returns 
   */
  getJobList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/job_offers`, {
      headers: this.getAuthHeaders()
    });
  }

  /**
   * Get job candidat list
   * @returns 
   */
  getJobCandidatList(job_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/job_offers/${job_id}/applications`, {
      headers: this.getAuthHeaders()
    });
  }

  /**
   * Send message
   * @returns 
   */
  sendMessage(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/sendmessage`, data);
  }

  /**
   * https://1d6d-129-0-189-50.ngrok-free.app/
   * 


Voici la liste des routes pour interagir avec votre API frontend :

1. Enregistrement d'un employeur : -------------------------------------- ok
   - Route : /register/employer 
   - Méthode : POST
   - Description : Permet à un employeur de s'enregistrer.
   - Données requises : username, password

2. Enregistrement d'un chercheur d'emploi : -------------------------------------- ok
   - Route : /register/job_seeker
   - Méthode : POST
   - Description : Permet à un chercheur d'emploi de s'enregistrer.
   - Données requises : username, password

3. Connexion : -------------------------------------- ok
   - Route : /login
   - Méthode : POST
   - Description : Permet à un utilisateur (employeur ou chercheur d'emploi) de se connecter et d'obtenir un jeton d'accès.
   - Données requises : username, password

4. Création d'une offre d'emploi : --------------------------------------
   - Route : /job_offers
   - Méthode : POST
   - Description : Permet à un employeur de créer une nouvelle offre d'emploi.
   - Données requises : title, description, criteria
   - Authentification : Requiert un jeton d'accès valide.

5. Candidature à une offre d'emploi : --------------------------------------
   - Route : /apply
   - Méthode : POST
   - Description : Permet à un chercheur d'emploi de postuler à une offre d'emploi.
   - Données requises : job_offer_id
   - Authentification : Requiert un jeton d'accès valide.

6. Analyse des candidatures : --------------------------------------
   - Route : /analyze/<int:job_offer_id>
   - Méthode : POST
   - Description : Permet à un employeur d'analyser les candidatures pour une offre d'emploi spécifique.
   - Authentification : Requiert un jeton d'accès valide.
   - Remarque : Cette route nécessite l'implémentation des fonctions get_cv_content, extract_cv_scores, run_ga, et run_ahp pour fonctionner correctement.
   */
}
