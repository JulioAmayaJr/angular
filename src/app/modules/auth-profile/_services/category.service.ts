import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesUrl = `${environment.URL_SERVICES}/categories`;
  private subCategoriesUrl=`${environment.URL_SERVICES}/subCategories`;
  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.categoriesUrl);
  }
  getSubCategories(): Observable<any> {
    return this.http.get<any>(this.subCategoriesUrl);
  }
}
