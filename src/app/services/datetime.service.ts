import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {

  constructor() { }

  /**
   * Format date to yyy-mm-dd
   * @param date 
   * @returns 
   */
  formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // mois commence à 0
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
