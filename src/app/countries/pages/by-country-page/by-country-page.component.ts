import { Component } from '@angular/core';
import { CountriesService } from '../../services/country.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {

  public countries: Country[] = []
  public isLoading: boolean = false

  constructor(private contryService: CountriesService) { }
  public initialValue: string = ""
  ngOnInit(): void {
    this.initialValue = this.contryService.cacheStore.byCountry.term
    this.countries = this.contryService.cacheStore.byCountry.countries
  }

  searchByCountry( term: string ): void {
    this.isLoading = true
    this.contryService.searchByCountry(term)
    .subscribe( countries => {
      this.countries = countries
      this.isLoading = false
    })
  }


}
